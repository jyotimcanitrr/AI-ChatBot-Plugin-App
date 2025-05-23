# AI Chatbot Plugin App

## Project Description

This is a simple AI chatbot application built with React that supports a plugin system. It allows users to interact with different functionalities like calculations, weather information, and word definitions through chat commands and natural language input.

## Features

-   **Plugin System:** Easily add new functionalities as plugins.
-   **Calculator Plugin:** Perform basic mathematical calculations.
-   **Weather Plugin:** Get current weather information for a specified city (requires API key).
-   **Dictionary Plugin:** Get definitions for words.
-   **Natural Language Parsing:** Understands commands phrased in natural language (e.g., "What's the weather in London?").
-   **Responsive UI:** Built with Tailwind CSS for a modern and responsive look.

## Technologies Used

-   React
-   Tailwind CSS
-   Node.js / npm
-   axios / fetch (for API calls)
-   uuid

## Setup Instructions

### Prerequisites

-   Node.js and npm (or yarn) installed on your machine.

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url> 
    cd ai-chatbot-plugin-app
    ```
    *(Replace `<repository-url>` with the actual URL of your repository, e.g., `https://github.com/your-username/AI-ChatBot-Plugin-App.git`)*

2.  Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

The Weather Plugin requires an API key from OpenWeatherMap.

1.  Go to [OpenWeatherMap](https://openweathermap.org/) and sign up for a free account.
2.  Generate an API key.
3.  Create a file named `.env` in the root directory of your project.
4.  Add your API key to the `.env` file in the following format:

    ```env
    REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
    ```
    *(Replace `your_api_key_here` with your actual API key).* 

    **Note:** Ensure there are no quotes around your API key in the `.env` file.

## Running the Application

To start the development server:

```bash
npm start
# or
yarn start
```

The application should open in your browser at `http://localhost:3000/` (or another port if 3000 is busy).

## How to Use the Chatbot

You can interact with the chatbot using either slash commands or natural language:

### Slash Commands

-   **Calculator:** `/calc [mathematical expression]`
    Example: `/calc 10 * (5 + 2)`
-   **Weather:** `/weather [city name]`
    Example: `/weather London`
-   **Dictionary:** `/define [word]`
    Example: `/define programming`

### Natural Language

-   **Calculator:** Ask a question involving calculation.
    Example: `What is 25 * 4?`
-   **Weather:** Ask about the weather in a city.
    Example: `How is the weather in Tokyo?`
-   **Dictionary:** Ask for the meaning of a word.
    Example: `Define recursion.`

## Included Plugins

-   CalculatorPlugin
-   WeatherPlugin
-   DictionaryPlugin
