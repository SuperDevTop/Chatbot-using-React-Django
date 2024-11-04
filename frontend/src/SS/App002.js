import './App.css';

import React, { useState, useEffect, useRef } from 'react';
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


  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    // Set up EventSource for streaming
    const eventSource = new EventSource(`http://127.0.0.1:8000/api/chat/?message=${encodeURIComponent(input)}`);
    console.log('ok')

    let botMessage = '';
    eventSource.onmessage = (event) => {
      console.log("Message received:", event.data);
      botMessage += event.data;
      setMessages((prevMessages) =>
        prevMessages.map((msg, idx) =>
          idx === prevMessages.length - 1 && msg.sender === 'bot'
            ? { ...msg, text: botMessage }
            : msg
        )
      );
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Sorry, something went wrong.' },
      ]);
      setLoading(false);
      eventSource.close();
    };

    eventSource.onopen = () => {
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: '' }]);
    };

    eventSource.onend = () => {
      setLoading(false);
      eventSource.close();
    };
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
            {/* {msg.text} */}
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

