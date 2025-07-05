require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 5000;

// Serve static files
app.use(express.static(__dirname + '/views'));  // For HTML
app.use(express.static(__dirname + '/public')); // For JS, CSS, images

// Root Route
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/views' });
});

// Simple responses for testing (since Dialogflow API might have issues)
const responses = [
  "Hello! How can I help you today?",
  "That's interesting! Tell me more.",
  "I understand. What else would you like to know?",
  "Thanks for sharing that with me!",
  "That sounds great! Anything else?",
  "I'm here to help. What's on your mind?",
  "Interesting point! What do you think about that?",
  "I appreciate you talking with me!",
  "That's a good question. Let me think about that.",
  "Thanks for chatting with me today!"
];

// Setup Socket.IO connection
io.on('connection', function(socket) {
  console.log('A user connected');

  socket.on('chat message', (text) => {
    console.log('Received message:', text);
    
    // For now, let's use simple responses while we fix Dialogflow
    // This will ensure the app works immediately
    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      console.log('AI Response:', randomResponse);
      socket.emit('bot reply', randomResponse);
    }, 1000); // 1 second delay to simulate processing
    
    // TODO: Implement proper Dialogflow integration
    // The issue with the original code is that the 'apiai' package is deprecated
    // We need to use the newer @google-cloud/dialogflow package
    /*
    try {
      // This is how we would implement it with the new SDK:
      const dialogflow = require('@google-cloud/dialogflow');
      const sessionClient = new dialogflow.SessionsClient();
      const sessionPath = sessionClient.projectAgentSessionPath(
        'your-project-id',
        process.env.APIAI_SESSION_ID
      );
      
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: text,
            languageCode: 'en-US',
          },
        },
      };
      
      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;
      socket.emit('bot reply', result.fulfillmentText);
    } catch (error) {
      console.error('Dialogflow error:', error);
      socket.emit('bot reply', "I'm having trouble connecting to my brain right now. Please try again!");
    }
    */
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start Server
http.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('Note: Currently using simple responses. Dialogflow integration needs to be updated.');
});
