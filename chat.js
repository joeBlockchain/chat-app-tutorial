class ChatInterface {
    constructor() {
        this.chatContainer = document.getElementById('chat-container');
        this.loadingIndicator = document.getElementById('loading');
        this.form = document.getElementById('chat-form');
        this.messageInput = document.getElementById('message-input');
        this.apiKeyInput = document.getElementById('api-key');
        
        this.messages = [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit();
        });
    }

    addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', isUser ? 'user-message' : 'assistant-message');
        messageDiv.textContent = content;
        this.chatContainer.appendChild(messageDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
        
        // Store message in history
        this.messages.push({ role: isUser ? 'user' : 'assistant', content });
    }

    async makeApiCall(messages) {
        const apiKey = this.apiKeyInput.value;
        if (!apiKey) {
            throw new Error('Please enter your OpenAI API key');
        }

        // TODO: Implement API call to OpenAI for the model: gpt-4o-mini

        return 'Hello! I am your AI assistant. How can I help you today?';
    }

    async handleSubmit() {
        const userMessage = this.messageInput.value.trim();
        if (!userMessage) return;

        // Add user message to chat
        this.addMessage(userMessage, true);
        this.messageInput.value = '';

        // Show loading indicator
        this.loadingIndicator.style.display = 'block';

        try {
            const assistantMessage = await this.makeApiCall(this.messages);
            this.addMessage(assistantMessage);
        } catch (error) {
            this.addMessage(`Error: ${error.message}`);
        } finally {
            this.loadingIndicator.style.display = 'none';
        }
    }
}

// Initialize the chat interface
const chat = new ChatInterface();