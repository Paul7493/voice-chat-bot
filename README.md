# Voice Chat Bot

A modern web application that integrates Web Speech API with Dialogflow for voice-enabled conversations using Socket.IO for real-time communication.

## Features

-  **Voice Recognition**: Uses Web Speech API to convert speech to text
-  **AI Responses**: Integrates with Dialogflow for intelligent conversation
-  **Text-to-Speech**: Converts AI responses back to speech
-  **Real-time Chat**: Socket.IO enables instant bidirectional communication
-  **Responsive Design**: Modern UI that works on all devices
-  **Beautiful Interface**: Gradient backgrounds and smooth animations

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

## Usage

1. **Open the Application**: Navigate to localhost in your browser
2. **Grant Microphone Permission**: Allow microphone access when prompted
3. **Start Talking**: Click the "Talk" button and speak your message
4. **Listen to Response**: The AI will respond both in text and speech

## Technologies Used

- **Node.js & Express**: Server framework
- **Socket.IO**: Real-time communication
- **Dialogflow**: Natural language processing
- **Web Speech API**: Speech recognition and synthesis
- **Modern CSS**: Gradients, animations, and responsive design

## Development

To run in development mode:
```bash
npm run dev
```

## License

ISC License - feel free to use this project for learning and development purposes.
