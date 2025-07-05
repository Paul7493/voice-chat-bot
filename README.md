# Voice Chat Bot

A modern web application that integrates Web Speech API with Dialogflow (formerly API.AI) for voice-enabled conversations using Socket.IO for real-time communication.

## Features

- 🎤 **Voice Recognition**: Uses Web Speech API to convert speech to text
- 🤖 **AI Responses**: Integrates with Dialogflow for intelligent conversation
- 🔊 **Text-to-Speech**: Converts AI responses back to speech
- 💬 **Real-time Chat**: Socket.IO enables instant bidirectional communication
- 📱 **Responsive Design**: Modern UI that works on all devices
- 🎨 **Beautiful Interface**: Gradient backgrounds and smooth animations

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Dialogflow (Required)

1. **Create a Dialogflow Account**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Dialogflow API

2. **Create a Dialogflow Agent**:
   - Go to [Dialogflow Console](https://dialogflow.cloud.google.com/)
   - Create a new agent
   - Enable "Small Talk" from the prebuilt agents for basic conversation

3. **Get API Credentials**:
   - In your Dialogflow agent settings, go to "General" tab
   - Copy the "Project ID"
   - Create a service account key in Google Cloud Console
   - Download the JSON key file

4. **Update Environment Variables**:
   - Open the `.env` file
   - Replace `your_dialogflow_client_access_token` with your actual token
   - Replace `unique_session_id_12345` with a unique session identifier

### 3. Run the Application
```bash
npm start
```

The application will be available at `http://localhost:5000`

## Usage

1. **Open the Application**: Navigate to `http://localhost:5000` in your browser
2. **Grant Microphone Permission**: Allow microphone access when prompted
3. **Start Talking**: Click the "Talk" button and speak your message
4. **Listen to Response**: The AI will respond both in text and speech

## Browser Compatibility

- **Chrome**: Full support (recommended)
- **Edge**: Full support
- **Firefox**: Limited speech recognition support
- **Safari**: Limited support

## Project Structure

```
voice-chat-bot/
├── index.js              # Main server file
├── package.json          # Project dependencies
├── .env                  # Environment variables
├── views/
│   └── index.html        # Main HTML file
└── public/
    ├── css/
    │   └── style.css     # Styling
    └── js/
        └── script.js     # Client-side JavaScript
```

## Technologies Used

- **Node.js & Express**: Server framework
- **Socket.IO**: Real-time communication
- **Dialogflow**: Natural language processing
- **Web Speech API**: Speech recognition and synthesis
- **Modern CSS**: Gradients, animations, and responsive design

## Troubleshooting

### Common Issues:

1. **"Speech Recognition not supported"**:
   - Use Chrome or Edge browser
   - Ensure you're using HTTPS in production

2. **"Microphone permission denied"**:
   - Check browser permissions
   - Reload the page and allow microphone access

3. **"Dialogflow error"**:
   - Verify your API credentials in `.env`
   - Check that Dialogflow API is enabled
   - Ensure your service account has proper permissions

4. **No voice response**:
   - Check if your browser supports Speech Synthesis
   - Verify audio is not muted

## Development

To run in development mode:
```bash
npm run dev
```

## License

ISC License - feel free to use this project for learning and development purposes.
