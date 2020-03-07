var exp = require("express");
var app = exp();
var path = require('path');
var axios = require('axios');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/register', function(req, res){
    res.sendFile(path.join(__dirname+'/public/registration.html'));
<<<<<<< HEAD
    res.send("Yup!!")
})

// app.post('/appendRegister', function(req, res){
//     // var url = "http://ec2-3-14-152-181.us-east-2.compute.amazonaws.com/api/data/adduser?" + "username=" + req.username + "&password=" + req.password;
   
// })

// app.get('/submit', function(){

// })

// app.get('/login',function(){
//     app.send("login page");
// }
//     )
=======
})

app.get('/login',function(req, res){
    res.sendFile(path.join(__dirname+'/public/login.html'));
}
    )
>>>>>>> login-solved


app.listen(3030, function(){
    console.log('listening at port 3030');
});