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
   face1: Float32Array,
   face2: Float32Array,
   face3: Float32Array
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
   var num = req.body;
   console.log(num.face_num);


   


});





app.listen(3000);