// DOM Elements
const joinSection = document.getElementById('join-section');
const chatSection = document.getElementById('chat-section');
const usernameInput = document.getElementById('username');
const joinButton = document.getElementById('join-btn');
const leaveButton = document.getElementById('leave-btn');
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send-btn');

// Variables
let username = '';
let messages = [];

// Load messages from LocalStorage (if available)
window.onload = () => {
    if (localStorage.getItem('messages')) {
        messages = JSON.parse(localStorage.getItem('messages'));
        renderMessages();
    }
}

// Function to render messages
function renderMessages() {
    messagesContainer.innerHTML = ''; // Clear previous messages
    messages.forEach(msg => {
        const messageElement = document.createElement('p');
        messageElement.innerText = `${msg.username}: ${msg.text}`;
        if (msg.username === username) {
            messageElement.classList.add('my-message'); // Style user's own messages
        } else {
            messageElement.classList.add('other-message'); // Style other users' messages
        }
        messagesContainer.appendChild(messageElement);
    });
    // Scroll to the bottom to show the latest messages
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Join chat by setting username
joinButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        joinSection.classList.add('hidden');
        chatSection.classList.remove('hidden');
        messageInput.focus();
    }
});

// Send message
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Function to send a message
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText) {
        const message = {
            username: username,
            text: messageText,
            timestamp: new Date().toLocaleTimeString()
        };
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages)); // Save messages to LocalStorage
        renderMessages();
        messageInput.value = ''; // Clear the input field
    }
}

// Leave chat
leaveButton.addEventListener('click', () => {
    localStorage.removeItem('messages'); // Clear messages when leaving
    chatSection.classList.add('hidden');
    joinSection.classList.remove('hidden');
    usernameInput.value = '';
    username = '';
});

// Clear chat input on refresh
window.addEventListener('beforeunload', () => {
    messageInput.value = '';
});
