const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})


app.post("/",function(req,res){
    
    const Name = req.body.yourname;
    const Email = req.body.email;
    const pass = req.body.password;
    const cpass = req.body.cpassword;

    const data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: Name,
                    LNAME: pass
                  },
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = 'https://us21.api.mailchimp.com/3.0/lists/68e3b88c84'

    const options = {
        method:"POST",
        auth:"vivek:dfe09a72e64a29d6779a41fcecac9254-us21"
    }

    const request = https.request(url,options,function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})


app.listen(3000,function(){
    console.log('server is running onport 3000');
});

// API KEY 
// dfe09a72e64a29d6779a41fcecac9254-us21

// list id or audience id
// 68e3b88c84