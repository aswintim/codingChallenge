let num_fields = 3;
        let counter = 1;
        let field = 1;
        let moistarization = 0;
        let time = 0;
        let check = false;
        let totalTime = 0;
        let imag = document.getElementById("img123");

        function startCountdown (increase_rate){

            
            
            var interval = setInterval(function(){    //setInterval IMPORTANT
                console.log("Field: ", field);
                console.log("Time: ", counter);

                if(field == 1){
                    imag.setAttribute("src", "irrigation_3.jpg");
                    console.log("img1");
                }else if (field == 2){
                    imag.setAttribute("src", "irrigation_2.jpg");
                }else if(field == 3){
                    imag.setAttribute("src", "irrigation_1.jpg");
                }

                let count = document.getElementById("count")
                count.innerHTML = counter;

                counter++;
                moistarization += increase_rate;

                let moist = document.getElementById("moist")
                moist.innerHTML = moistarization;

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
                    console.log("out", counter, totalTime);
                    clearInterval(interval);
                };
            }, 1000);
        };

        function start(){
            time = document.getElementById("exampleInputPassword1").value;
            console.log(time);
            totalTime = time * num_fields;
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

        function printer(){
            console.log("Hello World!");
        }

        // document.getElementById("btn12").addEventListener("click", start)