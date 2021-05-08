const express = require('express');
const http = require('http')
app=express();
const server = http.createServer(app);
const port = process.env.port || 8080;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
server.listen(port,()=>console.log(port))

app.get("/",function(request,response){

    response.sendFile(__dirname+"/index.html");
});
