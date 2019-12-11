var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

var numSchema = mongoose.Schema({num: Number});

var faceSchema = mongoose.Schema({
   name: String,
   face1: [numSchema] ,
   face2: [numSchema] ,
   face3: [numSchema] 
});



var Face = mongoose.model("Face2", faceSchema);



app.get('/face_show', function(req, res){
   Face.find(function(err, response){

      //res.json(response[0].face1[0].num);
     // console.log(response[0].face1[0].num)
      
      var arr = []

      for(var i=0; i<128; i++){
         arr.push(response[0].face1[i].num);

      }
      console.log(response.length)

      res.send(arr);

     

      //var count = Object.keys(myObject).length;
   });
});

app.listen(3000);