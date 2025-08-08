// Updated ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaPaperPlane, FaTimes, FaComments } from 'react-icons/fa';

const responses = {
  police: `📞 Police Contacts:
- Dispol Chief Supt Chitombi – 0712879953
- ZRP WhatsApp – +263774979090
- Chief Inspector Moyo – 0772363565
- Insp Mugoni – 0772621746
- Insp Mutami – 0775374867
- OIC CID Muchapa – 0772387559
- CID Asst Insp Ncube – 0778139337`,
  watch: `👮‍♂️ Neighborhood Watch:
- Ass Insp Chikutwe – 0773461683
- Sgt Ncube – 0772987616
- Sgt Maphosa – 0773609658`,
  medical: `🚑 Medical Emergencies:
- ACE Ambulance – 0832847333 / +263784810026
- Mars Ambulance – +263787135945 / +263772235621
- HAC Call Centre – +263789444000
- Health Bridge Hospital – +263832846634
- Vic Falls Hospital – +263832844262`,
  fire: `🔥 Fire Department:
- +2632132844400`,
  security: `🔐 Security Companies:
- Fawcetts Hotline – 0713255182
- Safeguard Security – 0782829978
- Panic Line – 0773925875
- Aspire Security – 0832842221 / 0712704344`
};

const ChatBotWrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

const ChatToggle = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.lg};
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    background: ${props => props.theme.colors.secondary};
  }
`;

const ChatBox = styled.div`
  width: 350px;
  max-height: 500px;
  background: white;
  border-radius: ${props => props.theme.radii.md};
  box-shadow: ${props => props.theme.shadows.lg};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: ${props => props.open ? 'translateY(0)' : 'translateY(20px)'};
  opacity: ${props => props.open ? '1' : '0'};
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  margin-bottom: 1rem;
`;

const ChatHeader = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Message = styled.div`
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: ${props => props.theme.radii.md};
  line-height: 1.4;
  font-size: 0.9rem;
  word-break: break-word;
  
  ${props => props.from === 'bot' ? `
    background: ${props.theme.colors.light};
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  ` : `
    background: ${props.theme.colors.primary};
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  `}
`;

const ChatInput = styled.div`
  display: flex;
  border-top: 1px solid #eee;
  padding: 0.75rem;
  
  input {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: ${props => props.theme.radii.sm};
    padding: 0.75rem;
    font-size: 0.9rem;
    
    &:focus {
      border-color: ${props => props.theme.colors.accent};
    }
  }
  
  button {
    background: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: ${props => props.theme.radii.sm};
    padding: 0 1rem;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background: ${props => props.theme.colors.secondary};
    }
  }
`;

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi 👋 I can help you with emergency contacts. Try typing: police, medical, fire, watch, or security.' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { from: 'user', text: input };
    const key = input.toLowerCase().trim();
    const botResponse = responses[key] 
      ? { from: 'bot', text: responses[key] } 
      : { from: 'bot', text: 'Sorry, I didn\'t understand. Try: police, medical, fire, watch, or security.' };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInput('');
  };

  return (
    <ChatBotWrapper>
      {open && (
        <ChatBox open={open}>
          <ChatHeader>
            <span>Emergency Assistant</span>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'white' }}>
              <FaTimes />
            </button>
          </ChatHeader>
          <ChatMessages>
            {messages.map((msg, i) => (
              <Message key={i} from={msg.from}>
                {msg.text.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>
          <ChatInput>
            <input
              type="text"
              value={input}
              placeholder="Ask about police, fire..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>
              <FaPaperPlane />
            </button>
          </ChatInput>
        </ChatBox>
      )}
      <ChatToggle onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaComments />}
      </ChatToggle>
    </ChatBotWrapper>
  );
};

export default ChatBot;