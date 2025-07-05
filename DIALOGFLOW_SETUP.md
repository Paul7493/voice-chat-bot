# Dialogflow API Setup Guide

This guide will walk you through setting up Dialogflow (formerly API.AI) credentials for your voice chat bot.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" at the top
3. Click "New Project"
4. Enter a project name (e.g., "voice-chat-bot")
5. Click "Create"

## Step 2: Enable Dialogflow API

1. In your Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Dialogflow API"
3. Click on "Dialogflow API"
4. Click "Enable"

## Step 3: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Enter a service account name (e.g., "dialogflow-service")
4. Click "Create and Continue"
5. For role, select "Dialogflow API Client"
6. Click "Continue" then "Done"

## Step 4: Generate API Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON" format
5. Click "Create"
6. A JSON file will be downloaded - keep this safe!

## Step 5: Set up Dialogflow Console

1. Go to [Dialogflow Console](https://dialogflow.cloud.google.com/)
2. Sign in with your Google account
3. Click "Create Agent"
4. Enter agent name (e.g., "voice-chat-agent")
5. Select your Google Cloud project from the dropdown
6. Click "Create"

## Step 6: Enable Small Talk (Optional but Recommended)

1. In your Dialogflow agent, click "Small Talk" in the left menu
2. Toggle the switch to "Enable"
3. This provides basic conversational responses

## Step 7: Get Your Credentials

### Method 1: Using the downloaded JSON file
1. Open the JSON file you downloaded in Step 4
2. Look for the `private_key` field - this is your API token
3. Copy the entire private key (including the quotes and newlines)

### Method 2: Using Client Access Token (Easier)
1. In Dialogflow Console, click the gear icon next to your agent name
2. Go to "General" tab
3. Copy the "Project ID" 
4. For the legacy API.AI SDK we're using, you'll need to:
   - Go to "Export and Import" tab
   - Click "Export as ZIP"
   - This method is deprecated, so Method 3 is recommended

### Method 3: Using Google Cloud Console (Recommended)
1. Go back to Google Cloud Console
2. Go to "APIs & Services" > "Credentials"
3. Click "Create Credentials" > "API Key"
4. Copy the generated API key
5. Click "Restrict Key" and select "Dialogflow API"

## Step 8: Update Your .env File

Open your `.env` file and update it with your credentials:

```env
# For API Key method:
APIAI_TOKEN=your_api_key_here

# For Service Account JSON method:
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/service-account-file.json
GOOGLE_PROJECT_ID=your-project-id

# Session ID (can be any unique string)
APIAI_SESSION_ID=unique_session_id_12345

# Server port
PORT=5000
```

## Step 9: Test Your Setup

1. Start your application: `npm start`
2. Open http://localhost:5000
3. Click "Talk" and say something like "Hello"
4. If configured correctly, you should get a response from Dialogflow

## Troubleshooting

### Common Issues:

1. **"Invalid API Key" error**:
   - Double-check your API key is correct
   - Ensure Dialogflow API is enabled for your project
   - Make sure the API key has proper restrictions

2. **"Permission denied" error**:
   - Verify your service account has the correct role
   - Check that the JSON file path is correct

3. **"Project not found" error**:
   - Ensure your project ID is correct
   - Verify the project exists in Google Cloud Console

### Alternative: Using Dialogflow ES (Essentials)

If you're having trouble with the above method, you can use Dialogflow ES:

1. Go to [Dialogflow ES Console](https://dialogflow.cloud.google.com/)
2. Create a new agent
3. In agent settings, find "Service Account"
4. Download the JSON key file
5. Use the project ID from the JSON file

## Security Notes

- Never commit your API keys or JSON files to version control
- Add `.env` and `*.json` to your `.gitignore` file
- Use environment variables in production
- Regularly rotate your API keys

## Need Help?

If you're still having trouble:
1. Check the [Dialogflow Documentation](https://cloud.google.com/dialogflow/docs)
2. Verify your Google Cloud billing is set up (required for API usage)
3. Make sure you're using the correct project in both Google Cloud and Dialogflow consoles
