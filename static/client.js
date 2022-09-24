const socket =io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");

var audio = new Audio('../ting.mp3');
var audio1 = new Audio('../ting1.mp3')

const append =(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left')
    {
        audio.play();
    }
    else if(position=='center')
    audio1.play();
}

//to send the msg on pressing send btn  to server(node.js)
form.addEventListener('submit' ,(e)=>{
    e.preventDefault(); //it prevent from page loading
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})

const namey =prompt("Enter your name to join");
socket.emit('new-user-joined', namey);

socket.on('user-joined', namei=>{
    append(`${namei} joined the chat`,'center');
})


socket.on('receive', data=>{
    if(data.n != 'null')
    append(`${data.n}: ${data.message}`,'left');
})

socket.on('leave',msg=>{
    if(msg!= 'null')
    append(`${msg} left the chat`,'center');
})