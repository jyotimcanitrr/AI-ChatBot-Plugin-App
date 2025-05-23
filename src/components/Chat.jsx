import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PluginManager from '../plugins/PluginManager';
import CalculatorPlugin from '../plugins/CalculatorPlugin';
import WeatherPlugin from '../plugins/WeatherPlugin';
import DictionaryPlugin from '../plugins/DictionaryPlugin';
import PluginResponse from './PluginResponse';

// Register plugins
PluginManager.registerPlugin(CalculatorPlugin);
PluginManager.registerPlugin(WeatherPlugin);
PluginManager.registerPlugin(DictionaryPlugin);

const Chat = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage = {
      id: uuidv4(),
      sender: 'user',
      content: input,
      type: 'text',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      const pluginResponse = await PluginManager.processMessage(input);
      
      if (pluginResponse && pluginResponse.pluginName && pluginResponse.pluginData) {
        const assistantMessage = {
          id: uuidv4(),
          sender: 'assistant',
          type: 'plugin',
          pluginName: pluginResponse.pluginName,
          pluginData: pluginResponse.pluginData,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else if (pluginResponse && typeof pluginResponse.content === 'string') {
        const assistantMessage = {
          id: uuidv4(),
          sender: 'assistant',
          type: 'text',
          content: pluginResponse.content,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const assistantMessage = {
          id: uuidv4(),
          sender: 'assistant',
          type: 'text',
          content: 'I can help you with calculations (/calc), weather (/weather), and word definitions (/define). Try using one of these commands!',
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      const errorMessage = {
        id: uuidv4(),
        sender: 'assistant',
        type: 'text',
        content: `Error: ${error.message}`,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderMessageContent = (message) => {
    if (message.type === 'plugin' && message.pluginName && message.pluginData) {
      return <PluginResponse pluginName={message.pluginName} pluginData={message.pluginData} />;
    } else if (message.type === 'text' && typeof message.content === 'string') {
      return <div className="prose prose-sm max-w-none">{message.content}</div>;
    }
    console.error('Invalid message structure for rendering:', message);
    return <div className="prose prose-sm max-w-none text-red-500">Error: Could not display message due to invalid structure.</div>;
  };

  return (
    <div className="flex flex-col flex-grow h-full w-full bg-gray-100 rounded-xl shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">👋</div>
              <p className="text-lg font-medium">Welcome to AI Chatbot!</p>
              <p className="mt-2">Try using one of these commands:</p>
              <div className="mt-4 space-y-2">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">/calc 2 + 2</div>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm ml-2">/weather London</div>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm ml-2">/define hello</div>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800'
                }`}
              >
                {renderMessageContent(message)}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message or use / commands..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing}
          />
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
