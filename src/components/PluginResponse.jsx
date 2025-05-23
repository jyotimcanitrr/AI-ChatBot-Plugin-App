import React, { useState, useEffect } from 'react';

const PluginResponse = ({ pluginName, pluginData }) => {
  console.log('PluginResponse received props:', { pluginName, pluginData });

  const [responseData, setResponseData] = useState(pluginData);

  useEffect(() => {
    console.log('PluginData prop changed, updating state:', pluginData);
    setResponseData(pluginData);
  }, [pluginData]);

  if (!responseData) {
    console.log('No responseData in state');
    return null;
  }

  switch (pluginName) {
    case 'calc':
      console.log('PluginResponse calc data:', responseData);
      return (
        <div className="space-y-2 p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">
            Expression: {String(responseData.expression ?? '')}
          </div>
          <div className="text-2xl font-bold text-green-700">
            Result: {String(responseData.result ?? '')}
          </div>
        </div>
      );

    case 'weather':
      console.log('PluginResponse weather data:', responseData);
      return (
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Location: {responseData.location}</div>
          <div className="text-2xl font-bold">{responseData.temperature}°C</div>
          <div className="text-sm">{responseData.description}</div>
          {responseData.humidity && <div className="text-sm">Humidity: {responseData.humidity}%</div>}
          {responseData.windSpeed && <div className="text-sm">Wind: {responseData.windSpeed} m/s</div>}
        </div>
      );

    case 'define':
      console.log('PluginResponse define data:', responseData);
      return (
        <div className="space-y-2 p-4 bg-white rounded shadow">
          <div className="text-xl font-bold text-blue-700">{responseData.word}</div>
          {responseData.phonetic && (
            <div className="text-sm text-gray-500">Phonetic: {responseData.phonetic}</div>
          )}
          {responseData.partOfSpeech && (
            <div className="text-sm text-gray-500">Part of Speech: {responseData.partOfSpeech}</div>
          )}
          <div className="text-sm mt-2">{responseData.definition}</div>
        </div>
      );

    default:
      console.log('Unknown pluginName:', pluginName);
      return <div className="text-red-500">Unknown plugin type</div>;
  }
};

export default PluginResponse;
