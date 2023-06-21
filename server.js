
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("node:https");
const portName=process.env.PORT || 3000;

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const firstName=req.body.FirstName;
    const lastName=req.body.LastName;
    const email=req.body.email;
    
    const data={
                
                members: [
                    {
                        email_address: email,
                        status:"subscribed",
                        merge_fields:{
                            FNAME: firstName,
                            LNAME: lastName
                        }
                    }
                ]
      
    }
    const jsonData=JSON.stringify(data);

    const url="https://us8.api.mailchimp.com/3.0/lists/e09e371beaj";

    const options={
        method: "POST",
        auth: "Pabel:81e9d1ca61bd602624a5a46ddcfc7769-us8"
    }
    const request=https.request(url,options,function(response){
        console.log("Your stauts Code is: ");
        if(response.statusCode===200) {
            res.sendFile(__dirname+"/success.html");
        }
        else{
           // res.redirect("/");
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
           // console.log(JSON.parse(data));
        });
    });
    
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.listen(portName,function(){
    console.log("Server is running on port 3000");
});


///Api key Name
///NewsLatter
///Api
//81e9d1ca61bd602624a5a46ddcfc7769-us8

 
//https://<dc>.api.mailchimp.com/3.0/lists/{list_id}/members/{subscriber_hash}/notes/{id}.
//audience id:  e09e371bea



