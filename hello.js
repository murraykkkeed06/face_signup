var express = require('express')
var path = require('path')
var app = express()


console.log(__dirname);
//path.join(__dirname, 'public')
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './images')));
app.use(express.static(path.join(__dirname, './models')));
app.use(express.static(path.join(__dirname, './face-api.js/dist')));

app.set('view engine', 'pug');
app.set('views','./views');



app.use(function(req,res,next){
    console.log("get!");
    next();
});

/*
app.post('/hello',function(req,res){
    res.send("hello from post");
});
*/

//app.get('/test', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/TEST', (req, res) => res.sendFile(path.join(__dirname, 'sign_up.html')))

app.get('/first', function(req, res){
    res.render('view');
 });

 app.get('/sign',function(req, res){
    res.sendFile(path.join(__dirname, 'form.php'))
 });


app.listen(3000);
console.log("listening to 3000");