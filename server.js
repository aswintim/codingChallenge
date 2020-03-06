var exp = require("express");
var app = exp();
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/register', function(req, res){
    res.sendFile(path.join(__dirname+'/public/registration.html'));
})

app.get('/login',function(req, res){
    res.sendFile(path.join(__dirname+'/public/login.html'));
}
    )


app.listen(3030, function(){
    console.log('listening at port 3030');
});