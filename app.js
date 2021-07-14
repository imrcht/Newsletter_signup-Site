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
    const url = "https://us6.api.mailchimp.com/3.0/lists/";
    const options = {
        method: "POST",
        auth: "Rach:",
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





app.listen(process.env.PORT || 7000, ()=> {
    if (process.env.PORT) console.log(`Listening to port ${process.env.PORT}`);
    else console.log("Listening to port 7000");
})









// f6a5002c02