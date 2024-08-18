document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sendButton').addEventListener('click', sendMessage);
    document.getElementById('closeBtn').addEventListener('click', function() {
        document.getElementById('chatbotPopup').classList.add('hidden');
    });
    document.getElementById('minimizeBtn').addEventListener('click', function() {
        // Logic to minimize the popup
    });
});

function sendMessage() {
    var input = document.getElementById('userInput').value;
    if (input.trim() === '') {
        alert('Please type a message.'); // Alert if no input provided
        return; // Stop the function if no input
    }
    var chatOutput = document.getElementById('chatOutput');
    chatOutput.innerHTML += `<div style="text-align: right;">You said: ${input}</div>`;
    chatOutput.innerHTML += `<div style="text-align: right;">Yay this works!</div>`;
    document.getElementById('userInput').value = ''; // Clear input after sending
}
