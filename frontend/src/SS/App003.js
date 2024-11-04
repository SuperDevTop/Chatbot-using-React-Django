import './App.css';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Ref to the chat container
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll down whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add the user's new message to the conversation history
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Format messages for API (matching role expected by Django backend)
      const formattedMessages = newMessages.map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text,
      }));

      // Send the full conversation history to the backend
      const response = await axios.post('/api/chat/', {
        messages: formattedMessages,
      });

      // Update messages with the new assistant response from the backend
      const updatedMessages = response.data.messages.map(msg => ({
        sender: msg.role === 'assistant' ? 'bot' : 'user',
        text: msg.content,
      }));
      
      setMessages(updatedMessages);
    } catch (error) {
      setMessages([...newMessages, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {msg.sender === 'bot' ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              <div>{msg.text}</div>
            )}
          </div>
        ))}
        {loading && <div className="loading">Loading...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
