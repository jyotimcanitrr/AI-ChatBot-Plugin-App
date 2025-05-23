import axios from 'axios';

const DictionaryPlugin = {
  name: 'define',
  pattern: /^\/define\s+(.+)$/,
  
  async execute(word) {
    try {
      console.log('Dictionary Plugin - Word:', word);
      
      if (!word) {
        throw new Error('Please provide a word to define');
      }

      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
      );
      
      console.log('Dictionary Plugin - API Response Status:', response.status);
      
      if (!response.ok) {
        throw new Error('Word not found');
      }

      const data = await response.json();
      console.log('Dictionary Plugin - API Data:', data);

      const firstMeaning = data[0];
      const firstDefinition = firstMeaning.meanings[0].definitions[0];

      return {
        pluginName: 'define',
        pluginData: {
          word: firstMeaning.word,
          phonetic: firstMeaning.phonetic,
          partOfSpeech: firstMeaning.meanings[0].partOfSpeech,
          definition: firstDefinition.definition
        }
      };
    } catch (error) {
      console.error('Dictionary Plugin - Error:', error);
      throw new Error(`Failed to fetch definition: ${error.message}`);
    }
  }
};

export default DictionaryPlugin; 