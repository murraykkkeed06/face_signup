var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
const path = require('path');


//console.log(__dirname);
//path.join(__dirname, 'public')
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './images')));
app.use(express.static(path.join(__dirname, './models')));
app.use(express.static(path.join(__dirname, './face-api.js/dist')));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

var personSchema = mongoose.Schema({
   name: String,
   password: String,
   nationality: String
});
var Person = mongoose.model("Person", personSchema);


var numSchema = mongoose.Schema({num: Number});

var faceSchema = mongoose.Schema({
   name: String,
   face1: [numSchema] ,
   face2: [numSchema] ,
   face3: [numSchema] 
});



var Face = mongoose.model("Face2", faceSchema);




//console.log((new ToyBox()).toys); // []
/*
var Empty1 = new ToyBox({ toys: [{name:123},{name:456}]});//[]
Empty1.toys[0].name = 789;

Empty1.save(function(err,ToyBox){
   if(err)
      console.log(err);
   else
      console.log("success");
});
*/

/*
app.get('/', function(req, res){
   res.render('person');
});
*/
app.get('/', (req, res) => res.redirect('/index'));

app.get('/index',function(req,res){
   res.sendFile(path.join(__dirname+'/login_form.html'));
   //__dirname : It will resolve to your project folder.
 });

 app.get('/test_page',function(req,res){
   res.sendFile(path.join(__dirname+'/form_html.html'));
   //__dirname : It will resolve to your project folder.
 });

 app.get

/*
 app.get('/face',function(req,res){
   res.sendFile(path.join(__dirname+'/index_s.html'));
   //__dirname : It will resolve to your project folder.
 });
*/

app.get('/fbcall',function(req,res){
   if(req)
      //console.log(req.query.name);
   res.render('fbcall',{name : req.query.name});

});

app.get('/face_final',function(req,res){
   if(req)
      //console.log(req.query.name);
   res.render('fbcall',{name : req.query.name});

});




app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/', function(req, res){
   var personInfo = req.body; //Get the parsed information
   
   if(!personInfo.name || !personInfo.password || !personInfo.nationality){
      res.render('show_message', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         password: personInfo.password,
         nationality: personInfo.nationality
      });
		
      newPerson.save(function(err, Person){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added in database", type: "success", person: personInfo});
      });

      

   }
});

app.post('/check',function(req, res){

   var userInfo = req.body;
/*
   if(!userInfo.username || !userInfo.password){
      res.render('welcome_back', {
         message: "Sorry, you provided worng info", type: "error"});
   }
   else
      res.render('welcome_back', {message: "hi", type:"success", person: userInfo})

   //console.log(userInfo.username);
*/

   Person.find({name: userInfo.username , password: userInfo.password}, "nationality", 
      function(err, response){
      
         if(response[0] == null){
            res.render('welcome_back', {
               message: "Sorry, you provided worng info", type: "error"
            });
      
         }
         else{
            res.render('welcome_back', {
               message: "hi", type:"success", person: userInfo, country: response[0].nationality
            });

         }
            
         
      
   });


});


app.post('/face_check',function (req, res){
  

   var faceInfo = req.body; //Get the parsed information
   console.log(faceInfo.name);
   console.log(faceInfo.face1.length);
   console.log(faceInfo.face2.length);
   console.log(faceInfo.face3.length);
  
/*
   var arr = [];
   for (var i = 0; i < 81; ++i) {
   arr.push( i );
   }

   Face.create({name:faceInfo.name, face1: arr }).
   then(doc => {
      console.log(doc);
      process.exit(0);
   });
  */

 
   var emptyls = []

   for (var i = 0; i < faceInfo.face1.length; i++) {
      emptyls.push({
          num: 999,
      });
  }

   var newFace = new Face({
      name: faceInfo.name,
      face1: emptyls,
      face2: emptyls,
      face3: emptyls
   });


   for(var i=0; i<faceInfo.face1.length; i++){
      newFace.face1[i].num=faceInfo.face1[i];
      newFace.face2[i].num=faceInfo.face2[i];
      newFace.face3[i].num=faceInfo.face3[i];
   }

   //console.log(faceInfo.face1[0]);


   //console.log(arr);    
   newFace.save(function(err, Face){
      if(err)
         console.log(err);
      else{
         console.log("success saveing face into");
         console.log(newFace.face1);
      }
      });

    

   


});




app.post('/face_match',function(req, res){

   //faceMatch = req.body;
   //console.log(faceMatch.match);

   Face.find(function(err, response){

      res.send(response);
     // console.log(Object.keys(response[0])[0]);
      //console.log(response);
   }
   );
//var count = Object.keys(myObject).length;
   //res.send({name: "test", age: "test"});
   
});

/*
app.get('/face_result',function(req, res){

   newFace.find   


   res.render('show_face_reading_msg',{message: "test", type: "test", name: "test"})

})
*/



app.listen(3000);