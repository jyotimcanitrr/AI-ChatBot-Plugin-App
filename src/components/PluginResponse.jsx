import React from 'react';

const PluginResponse = ({ pluginName, pluginData }) => {
  console.log('PluginResponse props:', { pluginName, pluginData });

  if (!pluginData) {
    console.log('No pluginData provided to PluginResponse');
    return null;
  }

  switch (pluginName) {
    case 'calc':
      return (
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Expression: {pluginData.expression}</div>
          <div className="text-2xl font-bold">Result: {pluginData.result}</div>
        </div>
      );

    case 'weather':
      if (!pluginData.location || !pluginData.temperature || !pluginData.description) {
         console.log('Incomplete weather data:', pluginData);
         return <div className="text-red-500">Error: Incomplete weather data.</div>;
      }
      return (
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Location: {pluginData.location}</div>
          <div className="text-2xl font-bold">{pluginData.temperature}°C</div>
          <div className="text-sm">{pluginData.description}</div>
          {pluginData.humidity && <div className="text-sm">Humidity: {pluginData.humidity}%</div>}
          {pluginData.windSpeed && <div className="text-sm">Wind: {pluginData.windSpeed} m/s</div>}
        </div>
      );

    case 'define':
      if (!pluginData.word || !pluginData.definition) {
          console.log('Incomplete dictionary data:', pluginData);
          return <div className="text-red-500">Error: Incomplete dictionary data.</div>;
      }
      return (
        <div className="space-y-2">
          <div className="text-xl font-bold">{pluginData.word}</div>
          {pluginData.phonetic && (
            <div className="text-sm text-gray-500">Phonetic: {pluginData.phonetic}</div>
          )}
          {pluginData.partOfSpeech && (
            <div className="text-sm text-gray-500">Part of Speech: {pluginData.partOfSpeech}</div>
          )}
          <div className="text-sm">{pluginData.definition}</div>
        </div>
      );

    default:
      console.log('Unknown pluginName in PluginResponse:', pluginName);
      return <div className="prose prose-sm max-w-none">Unknown plugin type. Data: {JSON.stringify(pluginData)}</div>;
  }
};

export default PluginResponse;