const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Enter your name to join:')

} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    
    // Send to server 
    socket.emit('message', msg)
    socket.emit('new-user-joined', name);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('user-joined',name =>{
    appendMessage(msg, 'outgoing')
})
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})



function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
