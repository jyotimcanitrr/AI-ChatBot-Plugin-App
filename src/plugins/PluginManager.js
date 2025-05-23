class PluginManager {
  constructor() {
    this.plugins = new Map();
  }

  registerPlugin(plugin) {
    console.log('Registering plugin:', plugin.name);
    if (!plugin.name || !plugin.execute || !plugin.pattern) {
      throw new Error('Plugin must have name, execute function, and pattern');
    }
    this.plugins.set(plugin.name, plugin);
  }

  async processMessage(message) {
    console.log('Processing message:', message);
    
    // Check if message starts with a slash command
    if (!message.startsWith('/')) {
      // For messages not starting with /, you might want to add natural language processing here later
      return null; // Return null for now if not a slash command
    }

    // Split the message into command and arguments
    const [command, ...args] = message.slice(1).split(' ');
    const commandName = command.toLowerCase(); // Convert command to lowercase for consistent matching
    const plugin = this.plugins.get(commandName);
    console.log('Command:', commandName, 'Args:', args.join(' '));
    console.log('Found plugin:', plugin?.name);

    if (!plugin) {
      return {
        type: 'text',
        content: `Unknown command: /${commandName}. Available commands: ${Array.from(this.plugins.keys()).map(cmd => `/${cmd}`).join(', ')}`
      };
    }

    try {
      // Execute the plugin with the arguments
      const result = await plugin.execute(args.join(' ').trim());
      console.log('Plugin execution successful. Result:', result);
      
      // Return the response in the specified format
      return {
        type: 'plugin',
        pluginName: plugin.name,
        pluginData: result // Store the plugin result in pluginData
      };
    } catch (error) {
      console.error('Plugin error during execution:', error);
      return {
        type: 'text',
        content: `Error executing ${commandName}: ${error.message}`
      };
    }
  }

  getAvailableCommands() {
    return Array.from(this.plugins.keys());
  }
}

export default new PluginManager(); 