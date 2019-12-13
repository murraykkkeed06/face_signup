var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
const path = require('path');

var upload = multer();
var app = express();


app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, './models')));
app.use(express.static(path.join(__dirname, './face-api.js/dist')));
app.use(express.static(path.join(__dirname, './CSS')));
app.use(express.static(path.join(__dirname, './JS')));

app.set('view engine', 'pug');
app.set('views', './views');

//for parsing response
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 

//mongoose.connect('mongodb://localhost/my_db');


mongoose.connect('mongodb://localhost/my_db',{ useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


//Database for username/password signup
var personSchema = mongoose.Schema({
   name: String,
   password: String,
   nationality: String
});
var Person = mongoose.model("Person", personSchema);

//Database for face signup
var numSchema = mongoose.Schema({num: Number});
var faceSchema = mongoose.Schema({
   name: String,
   face1: [numSchema] ,
   face2: [numSchema] ,
   face3: [numSchema] 
});
var Face = mongoose.model("Face2", faceSchema);




app.get('/', (req, res) => res.redirect('/index'));

app.get('/index',function(req,res){
   res.sendFile(path.join(__dirname+'/index.html'));
 });

app.get('/welcome',function(req,res){
   if(req){
      console.log(req.query);
      res.render('welcome',{name : req.query.name});
   }
});

//saving user data to database
app.post('/', function(req, res){
   var personInfo = req.body; //Get the parsed information
   
   if(!personInfo.name || !personInfo.password || !personInfo.nationality){
      console.log("error fetching user data")
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         password: personInfo.password,
         nationality: personInfo.nationality
      });
		
      newPerson.save(function(err, Person){
        if(err)
               console.log("save error")
      });
   }
});



//save face data in database
app.post('/face_check',function (req, res){
  
   var faceInfo = req.body; //Get the parsed informatio

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

   newFace.save(function(err, Face){
      if(err)
         console.log(err);
      else{
         console.log("success saveing face into");
      }
   });

});

//check user data in database
app.post('/checkSubmit',function(req,res){
  
   var userInfo = req.body;
      
   Person.find({name: userInfo.name , password: userInfo.pwd}, "nationality", 
      function(err, response){
         if(err)
            console.log("error checking user data")
         if(response[0] == null){
            res.send({type: "error"});
            console.log("error checking user data")
         }
         else{
            res.send({person:userInfo.name, country: response[0].nationality, type:"success"})
         }
   });
});


//find face data in database
app.post('/face_match',function(req, res){

   Face.find(function(err, response){
      if(err)
         console.log("error finding face data")
      res.send(response);
      }
   );
});


app.listen(3000,'0.0.0.0');
