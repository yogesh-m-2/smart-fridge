
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

function url(){
  return "https://i.imgur.com/DDhe5aq.jpeg";
}

function logging(obj) {
  //console.log(obj);
  globalString=obj
}

module.exports = { add,outputMessage,url,logging };
