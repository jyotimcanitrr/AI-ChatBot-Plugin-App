import React from 'react';

const PluginResponse = ({ pluginName, pluginData }) => {
  console.log('PluginResponse received pluginName:', pluginName);
  console.log('PluginResponse received pluginData:', pluginData);

  // Directly use pluginData for rendering
  const responseData = pluginData;

  if (!responseData) {
    console.log('No responseData in pluginData'); // Adjusted log
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
      if (!Array.isArray(responseData) || responseData.length === 0) {
        console.error('PluginResponse define case: Expected responseData to be a non-empty array', responseData);
        return <div className="text-red-500">Error: Could not display definition.</div>;
      }

      return (
        <div className="space-y-4 p-4 bg-white rounded shadow">
          {responseData.map((entry, entryIndex) => (
            <div key={entryIndex} className="space-y-2">
              <div className="text-xl font-bold text-blue-700">{entry.word}</div>
              {entry.phonetic && (
                <div className="text-sm text-gray-500">Phonetic: {entry.phonetic}</div>
              )}

              {entry.meanings && entry.meanings.length > 0 && (
                <div className="space-y-2 mt-2">
                  {entry.meanings.map((meaning, meaningIndex) => (
                    <div key={meaningIndex} className="space-y-1">
                      <div className="text-md font-semibold text-gray-700">Part of Speech: {meaning.partOfSpeech}</div>
                      {meaning.definitions && meaning.definitions.length > 0 && (
                        <ul className="list-disc list-inside text-sm ml-4 space-y-1">
                          {meaning.definitions.map((definition, defIndex) => (
                            <li key={defIndex}>
                              {definition.definition}
                              {definition.example && (
                                <em className="block text-gray-600">Example: {definition.example}</em>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );

    default:
      console.log('Unknown pluginName:', pluginName);
      return <div className="text-red-500">Unknown plugin type</div>;
  }
};

export default PluginResponse;
