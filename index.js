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
   age: Number,
   nationality: String
});
var Person = mongoose.model("Person", personSchema);
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
/*
 app.get('/face',function(req,res){
   res.sendFile(path.join(__dirname+'/index_s.html'));
   //__dirname : It will resolve to your project folder.
 });
*/

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
   
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('show_message', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });
		
      newPerson.save(function(err, Person){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added in database", type: "success", person: personInfo});
      });

      Person.find(function(err, response){
         console.log(response);
      });

   }
});

app.listen(3000);