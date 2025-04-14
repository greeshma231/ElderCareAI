import React, { useState, KeyboardEvent, useEffect, useRef } from 'react';
import { Send, Bot, User, Mic, MicOff, Smile, Frown, Meh, Clock, AlertCircle } from 'lucide-react';

interface Message {
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
  emotion?: 'happy' | 'sad' | 'neutral' | 'anxious' | 'confused';
}

interface SuggestionProps {
  text: string;
  onClick: () => void;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'bot', 
      text: "Hello Martha! I'm your care assistant. How are you feeling today?", 
      timestamp: new Date(),
      emotion: 'happy'
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<Message['emotion']>('neutral');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { 
      type: 'user' as const, 
      text: input, 
      timestamp: new Date(),
      emotion: detectEmotion(input)
    };
    
    setMessages([...messages, userMessage]);
    setCurrentEmotion(userMessage.emotion);
    
    // Simulate bot response
    setTimeout(() => {
      const { text, emotion } = getBotResponse(input, userMessage.emotion);
      const botMessage = { 
        type: 'bot' as const, 
        text, 
        timestamp: new Date(),
        emotion
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    
    // Simulate voice recognition
    if (!isListening) {
      setTimeout(() => {
        setInput("I'm feeling a bit lonely today, but my arthritis isn't bothering me as much.");
        setIsListening(false);
      }, 3000);
    }
  };

  const detectEmotion = (text: string): Message['emotion'] => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('happy') || lowerText.includes('glad') || lowerText.includes('good') || 
        lowerText.includes('great') || lowerText.includes('wonderful')) {
      return 'happy';
    } else if (lowerText.includes('sad') || lowerText.includes('depressed') || 
               lowerText.includes('unhappy') || lowerText.includes('lonely')) {
      return 'sad';
    } else if (lowerText.includes('worry') || lowerText.includes('anxious') || 
               lowerText.includes('afraid') || lowerText.includes('scared')) {
      return 'anxious';
    } else if (lowerText.includes('confused') || lowerText.includes('don\'t understand') || 
               lowerText.includes('what do you mean')) {
      return 'confused';
    }
    
    return 'neutral';
  };

  const getBotResponse = (userInput: string, emotion: Message['emotion']): { text: string, emotion: Message['emotion'] } => {
    const input = userInput.toLowerCase();
    
    // Respond based on detected emotion first
    if (emotion === 'sad') {
      return {
        text: "I'm sorry you're feeling down. Would you like me to play some of your favorite music or call a family member?",
        emotion: 'sad'
      };
    } else if (emotion === 'anxious') {
      return {
        text: "I can see you're feeling anxious. Remember the breathing exercises Dr. Johnson recommended? Let's try those together.",
        emotion: 'neutral'
      };
    } else if (emotion === 'happy') {
      return {
        text: "It's wonderful to hear you're in good spirits! Would you like to share what's made your day better?",
        emotion: 'happy'
      };
    } else if (emotion === 'confused') {
      return {
        text: "I might not have explained that clearly. Let me try again. What specifically is confusing you?",
        emotion: 'neutral'
      };
    }
    
    // If no emotion detected, respond based on content
    if (input.includes('tired') || input.includes('sleepy')) {
      return {
        text: "I understand you're feeling tired. Have you been getting enough rest? Your sleep tracker shows you were restless last night. Would you like me to adjust the room temperature?",
        emotion: 'neutral'
      };
    } else if (input.includes('pain') || input.includes('hurt')) {
      return {
        text: "I'm sorry you're in pain. Is it your arthritis again? I've noted this in your health log. Should I schedule a check-in with Dr. Johnson or remind you to take your anti-inflammatory medication?",
        emotion: 'sad'
      };
    } else if (input.includes('lonely') || input.includes('alone')) {
      return {
        text: "I understand feeling lonely can be difficult. Your daughter Sarah is available for a video call today. Would you like me to connect you? Or we could look at some of your family photos together.",
        emotion: 'sad'
      };
    } else if (input.includes('medicine') || input.includes('medication') || input.includes('pill')) {
      return {
        text: "Your next medication is due at 2:00 PM. That's your blood pressure pill and vitamin D supplement. Would you like me to remind you when it's time?",
        emotion: 'neutral'
      };
    } else {
      return {
        text: "I'm here to help and keep you company, Martha. Would you like to talk about your plans for today? Your calendar shows your granddaughter Emma is visiting this weekend.",
        emotion: 'happy'
      };
    }
  };

  const handleSuggestionClick = (suggestionText: string) => {
    setInput(suggestionText);
    // Automatically send after a brief delay to simulate typing
    setTimeout(() => {
      const userMessage = { 
        type: 'user' as const, 
        text: suggestionText, 
        timestamp: new Date(),
        emotion: detectEmotion(suggestionText)
      };
      
      setMessages([...messages, userMessage]);
      setCurrentEmotion(userMessage.emotion);
      
      // Simulate bot response
      setTimeout(() => {
        const { text, emotion } = getBotResponse(suggestionText, userMessage.emotion);
        const botMessage = { 
          type: 'bot' as const, 
          text, 
          timestamp: new Date(),
          emotion
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }, 500);
    
    setInput('');
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getEmotionIcon = (emotion: Message['emotion']) => {
    switch(emotion) {
      case 'happy': return <Smile size={16} className="text-yellow-500" />;
      case 'sad': return <Frown size={16} className="text-blue-500" />;
      case 'anxious': return <AlertCircle size={16} className="text-red-500" />;
      case 'confused': return <Meh size={16} className="text-orange-500" />;
      default: return <Meh size={16} className="text-gray-500" />;
    }
  };

  // Quick response suggestions
  const suggestions = [
    "I'm feeling a bit lonely today",
    "My arthritis is bothering me",
    "I forgot to take my medication",
    "What activities do I have today?",
    "Could you call my daughter?"
  ];

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bot className="text-blue-500 transition-transform duration-300 hover:scale-110 animate-bounce-soft" />
          Care Assistant
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">AI Mode: Empathetic</span>
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="absolute inset-0 rounded-full animate-pulse-ring bg-green-500 opacity-50"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`
                max-w-[80%] p-3 rounded-lg transform transition-all duration-300 hover:scale-[1.02]
                ${message.type === 'user'
                  ? 'bg-blue-500 text-white shadow-blue-100'
                  : 'bg-gray-100 text-gray-800 shadow-gray-50'
                } shadow-md hover:shadow-lg
              `}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="transition-transform duration-300 hover:scale-110">
                  {message.type === 'user' ? (
                    <User size={16} />
                  ) : (
                    <Bot size={16} />
                  )}
                </div>
                <span className="font-medium">
                  {message.type === 'user' ? 'You' : 'Care Assistant'}
                </span>
                <div className="flex items-center transition-transform duration-300 hover:scale-110">
                  {getEmotionIcon(message.emotion)}
                </div>
                <span className="text-xs opacity-70">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-b bg-gray-50">
        <div className="flex flex-wrap gap-2 animate-fade-in">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs py-1 px-3 bg-white border border-gray-300 rounded-full transition-all duration-300 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transform hover:-translate-y-0.5"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex gap-2">
          <button
            onClick={toggleListening}
            className={`
              p-2 rounded-lg transition-all duration-300 transform hover:scale-105
              ${isListening 
                ? 'bg-red-500 text-white shadow-red-100' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }
              shadow-md hover:shadow-lg
            `}
          >
            <div className="relative">
              {isListening ? <Mic size={20} /> : <MicOff size={20} />}
              {isListening && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-200"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`
              p-2 rounded-lg transition-all duration-300 transform hover:scale-105
              ${input.trim()
                ? 'bg-blue-500 text-white shadow-blue-100 hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
              shadow-md hover:shadow-lg
            `}
          >
            <Send size={20} className={input.trim() ? 'animate-bounce-soft' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Suggestion = ({ text, onClick }: SuggestionProps) => (
  <button
    onClick={onClick}
    className="text-xs py-1 px-3 bg-white border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors"
  >
    {text}
  </button>
);

export default ChatBot;