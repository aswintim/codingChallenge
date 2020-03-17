var request = require("request"),
    readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let num_fields = 0;

const startCountdown = (seconds, numField, increase_rate) => {
    var total_time = seconds * numField;
    var counter = 1;
    var field = 1;
    let moistarization = 0;
    console.log("Field: ", field);
    var interval = setInterval(() => {
        console.log("Time: ", counter);
        counter++;

        moistarization += increase_rate;
        console.log("Moistarization: ", moistarization);
        if(moistarization == 100){
            moistarization = 0;
            if(field < numField){
                field += 1;
                console.log("\nField: ", field);
            }
        }

        if(counter > total_time){
        clearInterval(interval);
        };
    }, 1000);
};

const getTime = (url)=>{
    request(url,(err, res, body)=>{
        console.log(res);
        console.log("\nConnected!!!\n");
        if(err){
            console.log("Error!");
            return 0;
        }
        var test = JSON.parse(res.body);
        time = test["time"];
        let rate = 100/time;
        startCountdown(time, num_fields, rate);
    });
}

console.log("Welcome to IrriApp!!");
console.log("Press 1 to log-in or any key to register: ");
rl.question("Option key: ", (key)=>{
    if(key == 1){
        rl.question("Enter your username: ", (u)=>{
            rl.question("Enter your password: ", (p)=>{
                const aut_url = `http://ec2-3-14-152-181.us-east-2.compute.amazonaws.com/api/data/getuserlist?username=${u}&password=${p}`;
                request(aut_url, (err, res, body)=>{
                var state = JSON.parse(res.body);
                if(!err && state["Status"] == "Success"){
                    rl.question("Enter number of rows in the field: ", function(num){
                        num_fields = num;
                        getTime("http://ec2-3-14-152-181.us-east-2.compute.amazonaws.com/api/data/gettime");
                        rl.close();
                    });
                }else{
                    console.log("Couldn't authenticate!");
                    rl.close();
                }
            });
            });
        });
    }else{
        rl.question("Make a username: ", (na)=>{
            rl.question("Make a password: ", (pa)=>{
                const reg_url = `http://ec2-3-14-152-181.us-east-2.compute.amazonaws.com/api/data/adduser?username=${na}&password=${pa}`
                request.post({
                    url:reg_url,
                }, function(err, res, body){
                    if(err){
                        console.log("\nCouldn't register!!!");
                    }else{
                        console.log("You are registered!!!");
                    }
                });
                rl.close()
            })
        });
    }
});
