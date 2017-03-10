//server.js
'use strict';

const port = 3000;
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const pg = require('pg');
//database-table is named "person"
const conString = 'postgres://postgres:1234@localhost/node_users';
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
console.log("before static");
app.use("/js",express.static(path.join(__dirname,'public')));
console.log("after static");


app.engine('.html', exphbs({
    defaultLayout: 'main',
    extname: '.html',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (request, response) => {
    response.render('home', {
        name: 'John'
    });
});
app.get("/register", (req, res) => {
    res.render('create_person');
});

//the API-part
app.post('/user', function (req, res, next) {
    console.log(req);
    console.log("body is here " + req.body);
    const user = req.body;
    console.log("hej1");
    console.log(user.name);

    pg.connect(conString, function (err, client, done) {
        if (err) {
            console.error("fix this laterz?");
            //will create a error handler #yayy
            return next(err);
        }
        client.query("INSERT INTO person(name, age) VALUES ($1, $2);",
                [user.name, user.age], function (err, result) {
            console.log("here i´m bloody done");
            done();//Signal pg == conn.close();
            if (err) {
                console.log("here is some blody error " + err);
                //pass to errorhandler
                return next(err);
            }
            console.log("here i send a response ");
            res.sendStatus(200);
        });
    });
});
app.get('/users', function (req, res, next) {
    console.log("You try and get some users?");
    pg.connect(conString, function (err, client, done) {
        if (err) {
            //pass to errorhandler
            return next(err);
        }

        client.query("SELECT * FROM person;", [], function (err, result) {
            done();

            if (err) {
                //pass to errorhandler
                return next(err);
            }
            res.json(result.rows);
        });
    });
});


app.listen(port);



//const port = 3000;
//const express = require('express');
//const app = express();
//
//app.use((request, response, next) => {
//    console.log(request.headers);
//    next();
//});
//
//app.use((request, response, next) => {
//    request.chance = Math.random();
//    next();
//});
//app.get('/', (request, response) => {
//    response.json({
//        chance: request.chance
//    });
//});
//app.use((err, request, response, next) => {
//    console.log(err);
//    response.status(500).send("Something broke");
//});
//app.listen(port);
//
//
//
//
//http://www.nodebeginner.org/
////const http = require('http');
//const port = 8888;
//
//http.createServer(function(request, response){
//    response.writeHead(200, {"Content-Type": "text/plain"});
//    response.write("Hello wärldden");
//    response.end();
//}).listen(port);