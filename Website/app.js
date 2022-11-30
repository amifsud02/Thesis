const express = require('express');
const app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Calling Form Model
var Form = require('./models/form');

// Database coonection
mongoose.connect("mongodb+srv://admin:admin@userprofiles.s7grdzc.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

// Accessing Static Files
app.use(express.static("public"));

// Render Form.ejs
app.get('/', function(req, res){
    res.render("form");
});

// Form Submission
app.get('result', (req, res) => {
    res.render('results');
});

// Creating Form
app.post("/", function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var age = req.body.age;
    var gender = req.body.gender;

 
    var f = {
        username: username, 
        password: password, 
        age: age, 
        gender: gender,

    };

    Form.create(f, function(err, newlyCreatedForm){
        if(err){
            console.log(err);
        }
        else {
            console.log("Submitted: ", f)
        }
    });
});

app.listen(3000, function() {
    console.log("Server running on post 3000");
})