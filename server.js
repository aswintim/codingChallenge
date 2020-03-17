var exp = require("express");
var app = exp();
var path = require("path"); // ???for sending html files on request, determining the path

var axios = require("axios");


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(/*'/tub', */exp.static(__dirname+'/public'));   //actually the static files are in public but to the client it shows they are in pub -- virtual directory

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/register', function(req, res){
    res.sendFile(path.join(__dirname+'/public/registration.html'));
})

app.get('/login',function(req, res){
    // res.sendFile(path.join(__dirname+'/public/login.html'));  //instead of this one
    res.sendFile('/public/login.html', {root:__dirname});
}
    )

    app.post('/login', (req, res)=>{
        var url = "http://ec2-3-14-152-181.us-east-2.compute.amazonaws.com/api/data/getuserlist?username="+req.body.username+"&password="+req.body.password;
        axios.get(url)
        .then((response)=>{
            var statu = response.data.Status; //.data.Status;
            var valu = statu.localeCompare('Success'); //comparing method
            if(valu===0){
                console.log("User is logged in!");
                res.sendFile('/public/enter.html', {root: __dirname});   //???
            }
            else{
                console.log("Wrong credentials!");
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    })

    app.post('/register', (req, res)=>{
        var url = "http://ec2-3-14-152-181.us-east-2.compute.amazonaws.com/api/data/adduser?username="+req.body.username+"&password="+req.body.password;
        axios.post(url)
        .then((response)=>{
            var statu = response.data.status;
            var valu = statu.localeCompare("Fail: User already exist"); //string comparison
            if( valu === 0){
                console.log("User Already Exist!!");
                res.sendFile(path.join(__dirname +'/public/login.html'));
            }
            else{ 
                console.log("New account created! Please login.");
                res.sendFile(path.join(__dirname +'/public/login.html'));
                          }
            
        })
        .catch((error)=>{
            console.log(error);
        })
    })


app.listen(3030, function(){
    console.log('listening at port 3030');
});