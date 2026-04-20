import { useState, useRef, useEffect } from 'react';
import { Send, BrainCircuit, Sparkles } from 'lucide-react';
import './index.css';

function App() {
  const [messages, setMessages] = useState([]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Fetch chat history from the backend on page load
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Failed to load chat history:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const textToSubmit = inputText;
    setInputText('');
    setIsTyping(true);

    // 1. Instantly show user message
    const userMessage = { role: "user", content: textToSubmit, _id: Date.now() };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Send user message to the local backend
      const response = await fetch(`${BACKEND_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: textToSubmit }),
      });

      if (!response.ok) throw new Error("Server error");
      const data = await response.json();

      setMessages((prev) => [...prev, data.aiMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage = {
        role: "ai",
        content: "Sorry, I ran into an error generating a response: " + error.message,
        _id: Date.now() + 1
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat-header" style={{ position: 'relative', justifyContent: 'center' }}>
          <BrainCircuit size={40} color="#a78bfa" style={{ position: 'absolute', left: '1.5rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.75rem', margin: '0 0 4px 0', textAlign: 'center' }}>EchoVault AI</h1>
          </div>
        </div>

        <div className="message-list">
          {messages?.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Sparkles size={40} />
              </div>
              <h2>Start a conversation</h2>
              <p>Your messages are saved in the backend and persist on refresh.</p>
            </div>
          )}

          {messages?.map((msg, index) => (
            <div key={msg._id || index} className={`message-wrapper ${msg.role}`}>
              <div className="message-bubble">
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message-wrapper ai">
              <div className="message-bubble typing-indicator">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <form className="input-form" onSubmit={handleSubmit}>
            <div className="textarea-container">
              <textarea
                className="chat-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
              />
            </div>
            <button
              type="submit"
              className="send-button"
              disabled={!inputText.trim() || isTyping}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
      <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
        Built by <a href="https://github.com/lingrajmalipatil" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>lingraj malipatil</a>
        <br />
        If you like the project, please give it a star on GitHub! ⭐
      </div>
    </>
  );
}

export default App;
