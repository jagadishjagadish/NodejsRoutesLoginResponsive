/*globals require */
var express     = require('express'),
    hbs         = require('express-handlebars'),
    app         = express(),
    fs          = require("fs"),
    bodyParser  = require('body-parser'),
    dirname     = __dirname;

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: '',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');

app.use("/styles", express.static(dirname + "/styles"));

app.use(bodyParser.json());

app.get("/", function (req, res) {
    'use strict';
    res.sendFile(dirname + "/login.html");
});

app.post("/auth", function (req, res) {
    'use strict';
    var userAccounts;
    // Maintaining User Account info in JSON file instead of DB(Any MangoDB, CouchDB etc.)
    fs.readFile(dirname + "/userAccounts.json" , "utf8", function (err, userData) {
        if (!err && userData) {
            userAccounts = JSON.parse(userData);
            if (userAccounts.hasOwnProperty(req.body.user_name) && userAccounts[req.body.user_name] === req.body.user_password) {
                res.writeHead(200, { 'Content-Type': 'application/json' }); 
                res.end(JSON.stringify(req.body.user_name));
            } else {
                res.status(404, { 'Content-Type': 'application/json' }); 
                res.end(JSON.stringify("user account not found"));
            }
        } else {
            res.status(500);
            res.end("Error in reading file...!");
        }
    });
    
});


app.get("/home", function (req, res) {
    'use strict';
    res.render(dirname + "/views/layouts/index.hbs");
});

app.get("/vision", function (req, res) {
    'use strict';
    fs.readFile(dirname + "/views/partials/vision.hbs", "utf8", function (err, data) {
        if (!err && data) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } else {
            res.status(500);
            res.end("Error in reading file...!");
        }
    });
});

app.get("/about", function (req, res) {
    'use strict';
    fs.readFile(dirname + "/views/partials/about.hbs", "utf8", function (err, data) {
        if (!err && data) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } else {
            res.status(500);
            res.end("Error in reading file...!");
        }
    });
});

app.get("/contact", function (req, res) {
    'use strict';
    fs.readFile(dirname + "/views/partials/contact.hbs", "utf8", function (err, data) {
        if (!err && data) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } else {
            res.status(500);
            res.end("Error in reading file...!");
        }
    });
});

app.listen("3000", function () {
    console.log("Server listening at port 3000");
});

