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

var faceSchema = mongoose.Schema({
   name: String,
   face1: Array ,
   face2: Array,
   face3: Array 
});

var Face = mongoose.model("Face", faceSchema);



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
   
   var newFace = new Face({
      name: faceInfo.name,
      face1: 1,
      face2: faceInfo.face2,
      face3: faceInfo.face3

   });


   //console.log(arr);    
   newFace.save(function(err, Face){
      if(err)
         console.log(err);
      else{
         console.log("success saveing face ino");
         console.log(newFace.face1);
      }
      });

    

   


});





app.listen(3000);