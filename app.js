var request = require("request"),
    readline = require("readline");

let num_fields = 3;
let counter = 1;
let field = 1;
let moistarization = 0;
let time = 0;
let check = false;
let totalTime = 0;

const startCountdown = (increase_rate) => {
    console.log("Field: ", field);
    var interval = setInterval(() => {
        console.log("Time: ", counter);
        img = document.getElementById("#img123");

        if(field == 1){
            img.setAttribute("src=./irrigation_3.jpg");
        }else if (field == 2){
            img.setAttribute("src=./irrigation_2.jpg");
        }else if(field == 3){
            img.setAttribute("src=./irrigation_1.jpg");
        }

        let count = document.getElementById("#count")
        count.innerHTML(counter);

        counter++;
        moistarization += increase_rate;

        let moist = document.getElementById("#moist")
        moist.innerHTML(moistarization);

        console.log("Moistarization: ", moistarization);
        if(moistarization == 100){
            moistarization = 0;
            if(field < num_fields){
                field += 1;
                console.log("\nField: ", field);
            }
        }

        if(counter > totalTime || check == true){
            if(counter > totalTime){
                counter = 1;
                field = 1;
                moistarization = 0;
                time = 0;
                check = false;
                totalTime = 0;
            }
            clearInterval(interval);
        };
    }, 1000);
};

function start(){
    time = document.getElementById("#time123");
    check = false;

    if(time != 0){
        let rate = 100/time;
        startCountdown(rate);
    }
}

function stop(){
    if(time != 0){
        check = true;
    }
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// const getTime = (url)=>{
//     request(url,(err, res, body)=>{
//         console.log("\nConnected!!!\n");
//         if(err){
//             console.log("Error!");
//             return 0;
//         }
//         var test = JSON.parse(res.body);
//         time = test["time"];
//         let rate = 100/time;
//         totalTime = time * num_fields;
//         startCountdown(rate);
//     });
// }

// console.log("Welcome to IrriApp!!");
// console.log("Press 1 to log-in or any key to register: ");
// rl.question("Option key: ", (key)=>{
//     if(key == 1){
//         rl.question("Enter your username: ", (u)=>{
//             rl.question("Enter your password: ", (p)=>{
//                 const aut_url = `http://ec2-3-14-152-181.us-east-2.compute.amazonaws.com/api/data/getuserlist?username=${u}&password=${p}`;
//                 request(aut_url, (err, res, body)=>{
//                 var state = JSON.parse(res.body);
//                 if(!err && state["Status"] == "Success"){
//                     rl.question("Enter number of rows in the field: ", function(num){
//                         num_fields = num;
//                         getTime("http://ec2-3-14-152-181.us-east-2.compute.amazonaws.com/api/data/gettime");
//                         rl.close();
//                     });
//                 }else{
//                     console.log("Couldn't authenticate!");
//                     rl.close();
//                 }
//             });
//             });
//         });
//     }else{
//         rl.question("Make a username: ", (na)=>{
//             rl.question("Make a password: ", (pa)=>{
//                 const reg_url = `http://ec2-3-14-152-181.us-east-2.compute.amazonaws.com/api/data/adduser?username=${na}&password=${pa}`
//                 request.post({
//                     url:reg_url,
//                 }, function(err, res, body){
//                     if(err){
//                         console.log("\nCouldn't register!!!");
//                     }else{
//                         console.log("You are registered!!!");
//                     }
//                 });
//                 rl.close()
//             })
//         });
//     }
// });