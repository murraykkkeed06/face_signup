var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

var faceSchema = mongoose.Schema({
   name: String,
   face1: Number,
   face2: Number,
   face3: Number
});

var Face = mongoose.model("Face", faceSchema);

app.get('/face_show', function(req, res){
   Face.find(function(err, response){
      res.json(response);
   });
});

app.listen(3000);