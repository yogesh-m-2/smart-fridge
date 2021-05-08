const express = require('express');
const http = require('http')
app=express();
const server = http.createServer(app);
const port = process.env.port || 8080;
const path = require('path');
const bodyparser = require('body-parser');

global.globalString = "This can be accessed anywhere!";







app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
server.listen(port,()=>console.log(port))
const lib= require("./public/js/main.js");
const libapi= require("./public/js/fastapi.js");



var resbody;




app.get("/",function(request,response){
resbody=libapi.Fapi()
console.log(globalString);
for(i in resbody){
  console.log(resbody[i].Name);
}

response.render('index',{body:resbody})


});
