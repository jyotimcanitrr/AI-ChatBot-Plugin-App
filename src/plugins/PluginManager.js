import CalculatorPlugin from './CalculatorPlugin';
import WeatherPlugin from './WeatherPlugin';
import DictionaryPlugin from './DictionaryPlugin';

class PluginManager {
  static plugins = {};

  static registerPlugin(pluginInstance) {
    if (pluginInstance.name) {
      PluginManager.plugins[pluginInstance.name] = pluginInstance;
      console.log(`Plugin registered: ${pluginInstance.name}`);
    } else {
      console.error(`Error registering plugin: Plugin does not have a 'name' property.`, pluginInstance);
    }
  }

  static async processMessage(message) {
    console.log('Processing message:', message);

    let processedMessage = message.trim();
    let commandFound = false;

    // --- Check for standard slash commands first ---
    if (processedMessage.startsWith('/')) {
      commandFound = true;
    } else {
      // --- Natural Language Parsing ---
      const lowerCaseMessage = processedMessage.toLowerCase();

      // Check for Weather command
      if (lowerCaseMessage.includes('weather in')) {
        const cityMatch = lowerCaseMessage.match(/weather in\s+(.+)/);
        if (cityMatch && cityMatch[1]) {
          const city = cityMatch[1].trim();
           // Simple check to exclude short strings that might not be cities
          if (city.length > 0) {
            processedMessage = `/weather ${city}`;
            console.log('Converted to command:', processedMessage);
            commandFound = true;
          }
        }
      } 
      // Check for Define command
      else if (lowerCaseMessage.includes('define ') || lowerCaseMessage.includes('meaning of ')) {
           const wordMatch = lowerCaseMessage.match(/define\s+([^\s]+)|meaning of\s+([^\s]+)/);
          if (wordMatch && (wordMatch[1] || wordMatch[2])) {
              const word = (wordMatch[1] || wordMatch[2]).trim();
               // Simple check for a single word
              if (word && word.split(' ').length === 1) { 
                  processedMessage = `/define ${word}`;
                  console.log('Converted to command:', processedMessage);
                  commandFound = true;
              }
          }
      }
       // Check for Calculator command (checked last to minimize false positives)
      else if (lowerCaseMessage.includes('calculate') || lowerCaseMessage.includes('what is ')) {
         const expressionMatch = lowerCaseMessage.match(/calculate\s+(.+)|what is\s+(.+)/);
        // Basic check to see if it looks like an expression
        if (expressionMatch && (expressionMatch[1] || expressionMatch[2])) {
            const expression = (expressionMatch[1] || expressionMatch[2]).trim();
            if (expression && /[0-9+\-*/()]/.test(expression)) {
               processedMessage = `/calc ${expression}`;
               console.log('Converted to command:', processedMessage);
               commandFound = true;
            }
        }
      }
      // --- End Natural Language Parsing ---
    }

    // --- Process the message if a command (standard or parsed) was found ---
    if (commandFound && processedMessage.startsWith('/')) {
      const [command, ...args] = processedMessage.substring(1).split(' ');
      const pluginName = command.toLowerCase();
      const plugin = PluginManager.plugins[pluginName];

      if (plugin) {
        console.log(`Executing plugin: ${pluginName}`);
        try {
          const result = await plugin.execute(args.join(' '));
          console.log(`Plugin ${pluginName} executed, result:`, result);
          // Ensure result has the correct structure for Chat.jsx and PluginResponse.jsx
           if (result && result.pluginName && result.pluginData) {
               return result;
           } else {
               // Fallback or re-structure if plugin returned unexpected format
               console.warn(`Plugin ${pluginName} returned unexpected format, attempting to structure.`, result);
                // Simple fallback: if result is a string, return it as text
               if (typeof result === 'string'){
                  return { content: result };
               } else {
                 return { pluginName: pluginName, pluginData: result };
               }

           }

        } catch (error) {
          console.error(`Error executing plugin ${pluginName}:`, error);
          return { content: `Error executing ${pluginName}: ${error.message}` };
        }
      } else {
        console.warn(`Plugin not found for command: ${pluginName}`);
        return { content: `Unknown command: /${pluginName}. Try /calc, /weather, or /define.` };
      }
    } else {
      console.log('No command detected, returning generic response.');
      // Generic response for non-command messages that were not recognized as natural language commands
      return { content: 'I can help you with calculations (/calc), weather (/weather), and word definitions (/define). Try using one of these commands!' };
    }
  }
}

// Auto-register default plugins (can be done elsewhere if preferred)
PluginManager.registerPlugin(CalculatorPlugin);
PluginManager.registerPlugin(WeatherPlugin);
PluginManager.registerPlugin(DictionaryPlugin);

export default PluginManager; 