import axios from 'axios';

const DictionaryPlugin = {
  name: 'define',
  pattern: /^\/define\s+(.+)$/,
  
  async execute(word) {
    try {
      console.log('Dictionary Input:', word); // Debug log
      
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;
      console.log('Dictionary API URL:', url); // Debug log

      const response = await axios.get(url);
      console.log('Dictionary API Response:', response.data); // Debug log

      const data = response.data; 
      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('Word not found or invalid response'); 
      }

      
      const responseData = data;

      console.log('Dictionary Plugin returning:', { pluginName: 'define', pluginData: responseData }); // Debug log

      return {
        pluginName: 'define',
        pluginData: responseData
      };
    } catch (error) {
      console.error('Dictionary API Error:', error.response || error); // Debug log
      if (error.response?.status === 404) {
        throw new Error('Word not found');
      }
      throw new Error(`Failed to fetch definition: ${error.message}`);
    }
  }
};

export default DictionaryPlugin; 