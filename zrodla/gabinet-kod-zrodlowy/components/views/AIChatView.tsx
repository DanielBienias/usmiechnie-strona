import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../Icon';
import { sendMessageToGemini } from '../../services/geminiService';
import { ChatMessage } from '../../types';

export const AIChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Dzień dobry! Jestem wirtualnym asystentem Luminous Dent. Chętnie odpowiem na pytania dotyczące cennika, zabiegów lub godzin otwarcia.',
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    if (!process.env.API_KEY) {
       setTimeout(() => {
         const errorMsg: ChatMessage = {
           id: (Date.now() + 1).toString(),
           role: 'model',
           text: "Przepraszam, klucz API nie został skonfigurowany.",
           timestamp: Date.now()
         };
         setMessages(prev => [...prev, errorMsg]);
         setIsLoading(false);
       }, 1000);
       return;
    }

    try {
      const responseText = await sendMessageToGemini(inputText);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
           id: (Date.now() + 1).toString(),
           role: 'model',
           text: "Wystąpił błąd komunikacji.",
           timestamp: Date.now()
         };
         setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-clinic-bg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[85%] p-3 rounded-lg text-sm leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-clinic-accent text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}
              `}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-lg rounded-bl-none shadow-sm border border-gray-200 flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Wpisz wiadomość..."
            className="flex-1 bg-gray-100 text-gray-800 rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-clinic-accent border border-transparent focus:border-clinic-accent"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-clinic-accent text-white p-3 rounded-full hover:bg-clinic-accentHover disabled:opacity-50 transition-colors shadow-sm"
          >
            <Icon name="Send" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};