
const port = 3000;
const express = require('express');
const exphbs = require('express-handlebars');


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