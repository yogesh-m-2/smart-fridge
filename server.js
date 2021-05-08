const express = require('express');

app=express();
const server = http.createServer(app);
const port = process.env.port || 8080;
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
server.listen(port,()=>console.log(port))

app.get("/",function(request,response){

    response.sendFile(__dirname+"/index.html");
});
