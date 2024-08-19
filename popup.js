document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sendButton').addEventListener('click', sendMessage);
    document.getElementById('closeBtn').addEventListener('click', function() {
        document.getElementById('chatbotPopup').classList.add('hidden');
    });
    document.getElementById('minimizeBtn').addEventListener('click', function() {
        document.getElementById('chatbotPopup').classList.add('minimized');
    });
});

async function sendMessage() {
    const input = document.getElementById('userInput').value.trim();
    if (!input) {
        alert('Please type a message.');
        return;
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer sk-proj-hiddem` // Replace with your actual API key
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', 
                messages: [
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": input}
                ],
                max_tokens: 150
            })
        });

        const data = await response.json();
        const chatOutput = document.getElementById('chatOutput');

        if (response.ok) {
            console.log('Full response data:', data); 
            if (data.choices && data.choices.length > 0) {
                const reply = data.choices[0].message.content.trim();
                chatOutput.innerHTML += `<div class="user-message">${input}</div>`;
                chatOutput.innerHTML += `<div class="chat-response">${reply}</div>`;
            } else {
                chatOutput.innerHTML += `<div class="chat-response">No valid response received.</div>`;
            }
        } else {
            console.error('API Error:', data);
            chatOutput.innerHTML += `<div class="chat-response">Error: ${data.error.message}</div>`;
        }
    } catch (error) {
        console.error('Network or API Error:', error);
        const chatOutput = document.getElementById('chatOutput');
        chatOutput.innerHTML += `<div class="chat-response">Error: Unable to reach the API. Please check your internet connection or try again later.</div>`;
    }

    document.getElementById('userInput').value = ''; 
}
