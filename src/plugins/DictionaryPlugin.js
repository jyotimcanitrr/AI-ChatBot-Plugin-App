import axios from 'axios';

const DictionaryPlugin = {
  name: 'define',
  pattern: /^\/define\s+(.+)$/,
  
  async execute(word) {
    console.log('Dictionary Plugin - Executing for word:', word);
    try {
      if (!word) {
        console.error('Dictionary Plugin Error: No word provided');
        throw new Error('Please provide a word to define');
      }

      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
      );
      
      console.log('Dictionary Plugin - API Response Status:', response.status);
      
      if (!response.ok) {
        console.error('Dictionary Plugin Error: API returned non-OK status', response.status);
        throw new Error('Word not found');
      }

      const data = await response.json();
      console.log('Dictionary Plugin - API Data received:', data);

      if (!data || !Array.isArray(data) || data.length === 0) {
         console.error('Dictionary Plugin Error: API data is empty or invalid', data);
         throw new Error('Definition not found');
      }

      const firstMeaning = data[0];
      if (!firstMeaning.meanings || firstMeaning.meanings.length === 0 || !firstMeaning.meanings[0].definitions || firstMeaning.meanings[0].definitions.length === 0) {
           console.error('Dictionary Plugin Error: No meanings or definitions found in data', firstMeaning);
           throw new Error('Definition not found');
      }

      const firstDefinition = firstMeaning.meanings[0].definitions[0];
      
      const responseData = {
        word: firstMeaning.word,
        phonetic: firstMeaning.phonetic,
        partOfSpeech: firstMeaning.meanings[0].partOfSpeech,
        definition: firstDefinition.definition
      };

      console.log('Dictionary Plugin returning:', { pluginName: 'define', pluginData: responseData });

      return {
        pluginName: 'define',
        pluginData: responseData
      };
    } catch (error) {
      console.error('Dictionary Plugin execution error:', error);
      throw new Error(`Dictionary error: ${error.message}`);
    }
  }
};

export default DictionaryPlugin; 