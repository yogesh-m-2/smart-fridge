const express = require('express');
const http = require('http')
app=express();
const server = http.createServer(app);
const port = process.env.port || 8080;
const path = require('path');
const bodyparser = require('body-parser');
const csv = require('csv-parser');
const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;



var results=[];



app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
server.listen(port,()=>console.log(port))
const lib= require("./public/js/main.js");
const libapi= require("./public/js/fastapi.js");
const mongoose      =require('mongoose')
const fastcsv = require('csv-parser');

var url = ('mongodb+srv://yogesh:yogesh14@cluster0.eauui.mongodb.net/test')

app.get("/",function(request,response){
var resbody;
results=[];
fs.createReadStream('result.csv')
.pipe(csv({})).on('data',(data)=>results.push(data))
.on('end',()=>{
  response.render('index',{body:results})
})

  // MongoClient.connect(url, function(err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("fridge");
  //   //Find the first document in the customers collection:
  //   dbo.collection("filtered").findOne({}, function(err, result) {
  //     if (err) throw err;
  //     console.log(result);
  //     resbody=result
  //     response.render('index',{body:resbody})
  //     db.close();
  //   });
  // });
});

function deletefile(pathToFile){
  fs.unlink(pathToFile, function(err) {
    if (err) {
      return("already exist")
    } else {
      console.log("Successfully deleted the file.");
    }
  });
}

app.get("/insert",function(request,response){
  deletefile('out.csv');
  //deletefile('result.csv')
  res=lib.imagecontrol();
  console.log(res);
  if(res==0){
    response.json({ status: 'failed' });
  }else
  {
    response.json({ status: 'ok' });
  }
});

app.get("/filter",function(request,response){
  libapi.filter();
  response.json({ status: 'ok' });
})
app.get("/csv",function(request,response){
  libapi.filter();
  response.sendFile(__dirname+"/out.csv");
})
app.get("/items",function(request,response){
  libapi.filter();
  response.sendFile(__dirname+"/items.csv");
})
