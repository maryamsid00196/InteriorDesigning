const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((error) => {
        console.log("Error in connection:", error);
    });

var db = mongoose.connection;

app.post("/contact", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phonenumber = req.body.phonenumber;
    var query = req.body.query;

    var data = {
        "name": name,
        "email": email,
        "phonenumber": phonenumber,
        "query": query
    };

    db.collection('user').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record inserted");
    });

    return res.redirect('contactsuccess.html');
});

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    return res.redirect('index.html');
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});