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
      res.send(response);
   });
});

app.listen(3000);