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


app.get('/', function(req, res){
   Face.find(function(err, response){

      var arr = []

      for(var i=0; i<128; i++){
         arr.push(response[0].face1[i].num);
      }
      res.send(arr);
      
   });
});

app.listen(3000);