<<<<<<< HEAD
# AI-ChatBot-Plugin-App
=======
# AI Chatbot with Plugin System

A modern React-based chatbot interface that supports a plugin system for enhanced functionality. Users can interact with the chatbot using natural language or specific slash commands to access different features.

## Features

- 💬 Modern chat interface with message history
- 🔌 Plugin system for extensible functionality
- 📱 Responsive design with Tailwind CSS
- 💾 Persistent chat history using localStorage
- ⚡ Real-time plugin responses

## Available Plugins

1. **Calculator** (`/calc`)
   - Usage: `/calc 2 + 2`
   - Safely evaluates mathematical expressions

2. **Weather** (`/weather`)
   - Usage: `/weather London`
   - Fetches current weather data for any city
   - Requires OpenWeatherMap API key

3. **Dictionary** (`/define`)
   - Usage: `/define hello`
   - Fetches word definitions and pronunciations
   - Uses Free Dictionary API

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-chatbot-plugin-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Plugin Architecture

The plugin system is designed to be extensible and easy to use. Each plugin follows this structure:

```javascript
{
  name: string;        // Plugin identifier
  pattern: RegExp;     // Command pattern to match
  execute: Function;   // Async function to handle the command
}
```

To add a new plugin:

1. Create a new plugin file in `src/plugins/`
2. Implement the plugin interface
3. Register the plugin in `src/components/Chat.jsx`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
>>>>>>> 74350ea (Fix: Corrected plugin response structure and rendering in Chat and PluginManager)
