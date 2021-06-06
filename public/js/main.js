const libapi= require("./fastapi.js");
const ImageSlicer = require('image-slicer');
const fs = require('fs');
const AWS = require('aws-sdk');
var MongoClient = require('mongodb').MongoClient;
var urli = 'mongodb+srv://yogesh:yogesh14@cluster0.eauui.mongodb.net/test'

global.globalString;
let keep;

const s3 = new AWS.S3({
    accessKeyId: 'AKIAX3ZURLBX364GOWMB',
    secretAccessKey: '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'
});


function outputMessage(){
  console.log("here");
  const div = document.createElement('div');

  div.classList.add('message');
  div.innerHTML =`<p class="meta">kjlkjkdfs <span>ljljlljgd</span></p>
  <p class="text">
  hhjhshfd
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);

}

function add(){
  console.log("Added");
}

const uploadFile = (fileName) => {
  const fileContent = fs.readFileSync(fileName);
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'inside-fridge',
         contentType : 'image/jpeg', // pass your bucket name
         Key: fileName.slice(7),
         ACL: 'public-read', // file will be saved as testBucket/contacts.csv
         Body: fileContent

     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         //console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};

function download(){

  return new Promise(resolve=> {

    const ACCESS_KEY_ID = "AKIAX3ZURLBX364GOWMB"
  const SECRET_ACCESS_KEY = "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"
  const BUCKET_NAME = "inside-fridge"
  var s3 = new AWS.S3({
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY
  })
    var params = {
      Key: 'opencv_frame_0.png',
      Bucket: BUCKET_NAME
  }
  s3.getObject(params, function(err, data) {
      if (err) {
          throw err
      }
      fs.writeFileSync('./imagesFolder/s.jpeg', data.Body)
      console.log('file downloaded successfully')
      resolve('1');
  })
  })

}

async function imagecontrol() {
await download();
await ImageSlicer.slice('./imagesFolder', ['.png','.jpg','.jpeg'], 180, 180, './output', {r:255, g:255, b:255, a:255})
.then((numberImagesWritten) => {
  console.log(numberImagesWritten.toString(),'images written');
   for(var i=0;i<20;i++){
    const fileName='\output/s_'+i+'.jpeg';
    uploadFile(fileName);
  }
}).catch((err) => {
  console.log(err);
});
// await MongoClient.connect(urli,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, function(err, db) {
//   if (err) throw err;
//   if (err) return 0;
//   var dbo = db.db("fridge");
//
//  dbo.collection("items").remove({})
//  .then(console.log("removed"));
//  dbo.collection("filtered").remove({})
//  .then(console.log("removed"));
//
// });
for(var i=0;i<20;i++){
  await libapi.Fapi('https://inside-fridge.s3.us-east-2.amazonaws.com/s_'+i+'.jpeg');
}

  return 1
}

module.exports = { add,outputMessage,imagecontrol };
