// Initialize Socket.IO
const socket = io();

// Check for browser support for SpeechRecognition and SpeechSynthesis APIs
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const synth = window.speechSynthesis;

// DOM References
const talkBtn = document.getElementById('talk-btn');
const testBtn = document.getElementById('test-btn');
const chatContainer = document.getElementById('chat-container');
const statusDiv = document.getElementById('status');

// Check browser support
if (!SpeechRecognition) {
  showStatus("Your browser does not support Speech Recognition. Please try Chrome or Edge.", "error");
  talkBtn.disabled = true;
}

if (!synth) {
  showStatus("Your browser does not support Speech Synthesis.", "error");
}

// Initialize Speech Recognition if supported
let recognition;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;
}

// Event listener for Talk button
talkBtn.addEventListener('click', () => {
  if (!recognition) {
    showStatus("Speech recognition not available", "error");
    return;
  }
  
  try {
    recognition.start();
    talkBtn.disabled = true;
    talkBtn.innerHTML = '<span class="mic-icon">🔴</span>Listening...';
    showStatus("Listening... Please speak now", "listening");
  } catch (error) {
    console.error('Error starting recognition:', error);
    showStatus("Error starting speech recognition", "error");
    resetButton();
  }
});

// Event listener for Test button (simulates a message without microphone)
testBtn.addEventListener('click', () => {
  const testMessages = [
    "Hello, how are you?",
    "What's the weather like today?",
    "Tell me a joke",
    "How can you help me?",
    "What can you do?",
    "Nice to meet you",
    "Thank you for your help",
    "What's your favorite color?"
  ];
  
  const randomMessage = testMessages[Math.floor(Math.random() * testMessages.length)];
  
  // Simulate user message
  appendMessage('user', randomMessage);
  showStatus("Processing your message...", "processing");
  
  // Send to server
  socket.emit('chat message', randomMessage);
});

// On receiving speech recognition results
if (recognition) {
  recognition.addEventListener('result', (event) => {
    let resultIndex = event.resultIndex;
    let transcript = event.results[resultIndex][0].transcript.trim();
    let confidence = event.results[resultIndex][0].confidence;
    
    console.log('User Transcript:', transcript);
    console.log('Confidence:', confidence);
    
    if (transcript) {
      // Emit the user's message to the server
      socket.emit('chat message', transcript);
      
      // Append user message to chat container
      appendMessage('user', transcript);
      showStatus("Processing your message...", "processing");
    } else {
      showStatus("No speech detected. Please try again.", "error");
    }
    
    resetButton();
  });

  // Reset button state after speech recognition ends
  recognition.addEventListener('end', () => {
    resetButton();
  });

  // Error handling for Speech Recognition errors
  recognition.addEventListener('error', (event) => {
    console.error("Speech Recognition Error:", event.error);
    let errorMessage = "Speech recognition error: ";
    
    switch(event.error) {
      case 'no-speech':
        errorMessage += "No speech detected. Please try again.";
        break;
      case 'audio-capture':
        errorMessage += "No microphone found or permission denied.";
        break;
      case 'not-allowed':
        errorMessage += "Microphone permission denied.";
        break;
      case 'network':
        errorMessage += "Network error occurred.";
        break;
      default:
        errorMessage += event.error;
    }
    
    showStatus(errorMessage, "error");
    resetButton();
  });

  recognition.addEventListener('start', () => {
    console.log('Speech recognition started');
  });
}

// Listen for bot reply from the server
socket.on('bot reply', (replyText) => {
  console.log('Bot Reply:', replyText);
  appendMessage('bot', replyText);
  synthVoice(replyText);
  showStatus("", "");
});

// Socket connection events
socket.on('connect', () => {
  console.log('Connected to server');
  showStatus("Connected to chat server", "success");
  setTimeout(() => showStatus("", ""), 2000);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
  showStatus("Disconnected from server", "error");
});

// Function to perform speech synthesis (text-to-speech)
function synthVoice(text) {
  if (!synth) {
    console.log('Speech synthesis not supported');
    return;
  }
  
  // Cancel any ongoing speech
  synth.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Configure voice properties
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 0.8;
  
  // Try to use a more natural voice if available
  const voices = synth.getVoices();
  const preferredVoice = voices.find(voice => 
    voice.lang.startsWith('en') && 
    (voice.name.includes('Google') || voice.name.includes('Microsoft'))
  );
  
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  utterance.onstart = () => {
    showStatus("🔊 Speaking...", "speaking");
  };
  
  utterance.onend = () => {
    showStatus("", "");
  };
  
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event.error);
    showStatus("", "");
  };
  
  synth.speak(utterance);
}

// Function to append messages to the chat container
function appendMessage(sender, message) {
  const msgElem = document.createElement('div');
  msgElem.classList.add('message', sender);
  msgElem.textContent = message;
  chatContainer.appendChild(msgElem);
  
  // Auto-scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to show status messages
function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = type;
}

// Function to reset the talk button
function resetButton() {
  talkBtn.disabled = false;
  talkBtn.innerHTML = '<span class="mic-icon">🎤</span>Talk';
}

// Load voices when they become available
if (synth) {
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {
      console.log('Voices loaded:', synth.getVoices().length);
    };
  }
}

// Add some CSS for status styling
const style = document.createElement('style');
style.textContent = `
  #status.success { color: #38ef7d; }
  #status.error { color: #ff6b6b; }
  #status.listening { color: #4ecdc4; }
  #status.processing { color: #ffe66d; }
  #status.speaking { color: #a8e6cf; }
`;
document.head.appendChild(style);
