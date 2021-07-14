const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    firstname = req.body.fname;
    lastname = req.body.lname;
    emailid = req.body.email;
    data = {
        members: [
            {
                email_address: emailid,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname,
                }
            }
        ]
    };
    jsondata = JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/f6a5002c02";
    const options = {
        method: "POST",
        auth: "Rach:0e413cfe52b06f3a1174e4708bf3f3c0-us6",
    }

    const request = https.request(url, options, (response) =>{
        response.on("data", (chunk) => {
 
        })
        if (response.statusCode === 200) {
            res.render("success", {
                fname: firstname,
            })
        }
        else {
            res.render("failure", {
                fname: firstname,
            })
        }
    })

    request.write(jsondata);
    request.end();

})

app.post("/failure", (req, res) =>{
    res.redirect("/")
})





app.listen(7000, ()=> {
    console.log(`Listening to 7000.`);
})








// api key
// 0e413cfe52b06f3a1174e4708bf3f3c0-us6

// aud id
// f6a5002c02