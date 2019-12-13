var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_db');
var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Person = mongoose.model("Person", personSchema);

app.get('/', function(req, res){
   Person.find(function(err, response){
      res.send(response[0]);
   });
});

app.listen(3000);