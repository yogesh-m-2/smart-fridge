const lib= require("./main.js");
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://yogesh:yogesh14@cluster0.eauui.mongodb.net/test'


function Fapi(){
  var unirest = require("unirest");

  var req = unirest("POST", "https://deep-image-object-recognition.p.rapidapi.com/prod");

  req.headers({
  	"content-type": "application/x-www-form-urlencoded",
  	"x-rapidapi-key": "d34f3aadc1msh554f99688cb8275p1b3612jsn83604ca0ccea",
  	"x-rapidapi-host": "deep-image-object-recognition.p.rapidapi.com",
  	"useQueryString": true
  });

  req.form({
  	"objectUrl": "https://inside-fridge.s3.us-east-2.amazonaws.com/sfridge.jpeg"
  });


  req.end(function (res) {
  	if (res.error) throw new Error(res.error);
    if (res.error) return 0;
   //myobj=res.body.Labels
   MongoClient.connect(url, function(err, db) {
     if (err) throw err;
     if (err) return 0;
     var dbo = db.db("fridge");
     //var myobj = { name: "Company Inc", address: "Highway 37" };
     var myobj=res.body
     dbo.collection("items").insertOne(myobj, function(err, res) {
       if (err) throw err;
       if (err) return 0;
       console.log("1 document inserted");
       db.close();
     });
   });
  })

}


module.exports = { Fapi };
