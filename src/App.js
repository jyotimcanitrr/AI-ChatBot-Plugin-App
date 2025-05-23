import React from 'react';
import Chat from './components/Chat';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-900">AI Chatbot with Plugin System</h1>
          <p className="mt-2 text-sm text-gray-600">
            Available commands: /calc, /weather, /define
          </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-[calc(100vh-12rem)]">
            <Chat />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
