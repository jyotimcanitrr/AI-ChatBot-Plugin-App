import axios from 'axios';


const WeatherPlugin = {
 name: 'weather',
 pattern: /^\/weather\s+(.+)$/,
  async execute(location) {
   try {
     console.log('Weather Plugin - Location:', location);
     const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
     console.log('Weather Plugin - API Key:', apiKey ? 'Present' : 'Missing');
    
     if (!apiKey) {
       throw new Error('Weather API key not configured');
     }


     const response = await fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
     );
    
     console.log('Weather Plugin - API Response Status:', response.status);
    
     if (!response.ok) {
       const errorData = await response.json();
       console.error('Weather Plugin - API Error:', errorData);
       throw new Error(`Failed to fetch weather data: ${errorData.message || 'Unknown error'}`);
     }


     const data = await response.json();
     console.log('Weather Plugin - Weather Data:', data);


     return {
       pluginName: 'weather',
       pluginData: {
         location: data.name,
         temperature: Math.round(data.main.temp),
         description: data.weather[0].description,
         humidity: data.main.humidity,
         windSpeed: data.wind.speed
       }
     };
   } catch (error) {
     console.error('Weather Plugin - Error:', error);
     throw new Error(`Failed to fetch weather data: ${error.message}`);
   }
 }
};


export default WeatherPlugin;
