const lib= require("./main.js");
let obj;
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
  	"objectUrl": lib.url()
  });


  req.end(function (res) {
  	if (res.error) throw new Error(res.error);
   obj=res.body.Labels
   //console.log(obj)
   lib.logging(obj)

  })

}


module.exports = { Fapi };
