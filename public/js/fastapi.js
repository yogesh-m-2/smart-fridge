const lib= require("./main.js");
var MongoClient = require('mongodb').MongoClient;
var urli = 'mongodb+srv://yogesh:yogesh14@cluster0.eauui.mongodb.net/test'
const bodyparser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csv = require('csv-parser');
const fs = require('fs');

const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'Name', title: 'Name'},
  ]
});
const csvWriter2 = createCsvWriter({
  path: 'result.csv',
  header: [
    {id: 'Item', title: 'Item'},
  ]
});

function writecsv(data){


  console.log("in write csv");
  csvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully'));
}
function writecsv2(res){

  console.log(res);
  console.log("in write csv");
  csvWriter2
    .writeRecords(res)
    .then(()=> console.log('The CSV file was written successfully'));
}




function Fapi(url){

  var unirest = require("unirest");

var req = unirest("POST", "https://deep-image-object-recognition.p.rapidapi.com/prod");

req.headers({
	"content-type": "application/x-www-form-urlencoded",
	"x-rapidapi-key": "d34f3aadc1msh554f99688cb8275p1b3612jsn83604ca0ccea",
	"x-rapidapi-host": "deep-image-object-recognition.p.rapidapi.com",
	"useQueryString": true
});

req.form({
	"objectUrl": url
});


  req.end(function (res) {

if (res.error) throw new Error(res.error);
if (res.error) return 0;
var myobj=res.body;
var jsn=myobj.Labels

writecsv(jsn);

   //  MongoClient.connect(urli,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, function(err, db) {
   //   if (err) throw err;
   //   if (err) return 0;
   //   var dbo = db.db("fridge");
   //   //var myobj = { name: "Company Inc", address: "Highway 37" };
   //
   //
   //   dbo.collection("items").insertOne(myobj, function(err, res) {
   //     if (err) throw err;
   //     if (err) return 0;
   //     //console.log("1 document inserted");
   //     db.close();
   //   });
   // });
  })


}


function filter(){

  let array1 = [];
  let array2 = [];
  let array3 = [];
  fs.createReadStream('out.csv')
  .pipe(csv())
  .on('data', (row1) => {

   fs.createReadStream('items.csv').pipe(csv()).on('data',(row2)=>{
      if(row1.Name==row2.Item && !array1.includes(row2.Item) ) {
        array1.push(row2.Item);
        row2=[
          row2
        ]
        writecsv2(row2);
      }

   })

  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

}

module.exports = { Fapi,filter,writecsv };
