const libapi= require("./fastapi.js");
global.globalString;
let keep;
const fs = require('fs');
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


function imagecontrol() {
  url="https://i.imgur.com/DDhe5aq.jpeg"
  res=libapi.Fapi()
  return 1
}

module.exports = { add,outputMessage,imagecontrol };
