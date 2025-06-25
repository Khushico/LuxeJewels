'use client'
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Diamond, Gem, Crown, Star, Sparkles } from 'lucide-react';

const JewelryChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "✨ Welcome to LuxeJewels! I'm your personal jewelry consultant. How can I help you create something extraordinary today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const jewelryOptions = {
    rings: {
      price: "$500 - $5,000+",
      customization: "Metal type, gemstone, setting style, engraving",
      timeframe: "2-4 weeks"
    },
    necklaces: {
      price: "$300 - $8,000+",
      customization: "Chain length, pendant design, metal, gemstones",
      timeframe: "3-5 weeks"
    },
    earrings: {
      price: "$200 - $3,000+",
      customization: "Style (studs/hoops/drops), metal, gemstones",
      timeframe: "2-3 weeks"
    },
    bracelets: {
      price: "$250 - $4,000+",
      customization: "Size, charm selection, metal type, engraving",
      timeframe: "2-4 weeks"
    }
  };

  const botResponses = {
    greeting: [
      "Hello! I'd love to help you create the perfect piece of jewelry. What type of piece are you interested in?",
      "Hi there! Looking for something special? I can help you design custom jewelry that's uniquely yours.",
      "Welcome! I'm here to help you bring your jewelry dreams to life. What can I create for you today?"
    ],
    pricing: [
      "Great choice! Here are our pricing ranges:",
      "I'd be happy to share pricing information:",
      "Let me give you an idea of our investment levels:"
    ],
    customization: [
      "We offer extensive customization options:",
      "You can personalize every detail:",
      "Here's what we can customize for you:"
    ],
    contact: [
      "I'd love to connect you with our master craftspeople! You can:",
      "Let's get you in touch with our design team:",
      "Here are the best ways to continue your custom jewelry journey:"
    ]
  };

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      const jewelryType = Object.keys(jewelryOptions).find(type => message.includes(type.slice(0, -1)));
      if (jewelryType) {
        const option = jewelryOptions[jewelryType];
        return `${botResponses.pricing[Math.floor(Math.random() * botResponses.pricing.length)]}\n\n💎 ${jewelryType.charAt(0).toUpperCase() + jewelryType.slice(1)}: ${option.price}\n⚡ Customization: ${option.customization}\n⏱️ Timeframe: ${option.timeframe}\n\nWould you like to explore specific customization options?`;
      }
      return "Our custom jewelry ranges from $200 to $10,000+ depending on materials and complexity. What type of piece interests you? (rings, necklaces, earrings, or bracelets)";
    }
    
    if (message.includes('custom') || message.includes('personalize') || message.includes('design')) {
      return `${botResponses.customization[Math.floor(Math.random() * botResponses.customization.length)]}\n\n✨ Metal Selection: Gold (14k, 18k), Platinum, Silver\n💎 Gemstone Choice: Diamonds, Sapphires, Emeralds, Rubies, and more\n🎨 Design Elements: Engravings, filigree, vintage or modern styles\n📏 Perfect Sizing: Custom measurements for ideal fit\n\nWhich aspect would you like to explore first?`;
    }
    
    if (message.includes('ring')) {
      const option = jewelryOptions.rings;
      return `💍 Custom Rings - Our Specialty!\n\nPrice Range: ${option.price}\nCustomization: ${option.customization}\nDelivery: ${option.timeframe}\n\nPopular styles:\n• Engagement rings with unique settings\n• Wedding bands with personal engravings\n• Statement cocktail rings\n• Vintage-inspired designs\n\nWhat style speaks to you?`;
    }
    
    if (message.includes('necklace')) {
      const option = jewelryOptions.necklaces;
      return `📿 Custom Necklaces - Elegant & Personal!\n\nPrice Range: ${option.price}\nCustomization: ${option.customization}\nDelivery: ${option.timeframe}\n\nPopular options:\n• Pendant necklaces with birthstones\n• Layering chains in mixed metals\n• Charm necklaces with meaningful symbols\n• Statement pieces for special occasions\n\nWhat length and style do you prefer?`;
    }
    
    if (message.includes('earring')) {
      const option = jewelryOptions.earrings;
      return `👂 Custom Earrings - From Subtle to Statement!\n\nPrice Range: ${option.price}\nCustomization: ${option.customization}\nDelivery: ${option.timeframe}\n\nPopular styles:\n• Diamond studs in various sizes\n• Hoop earrings with gemstone accents\n• Drop earrings for special occasions\n• Mismatched pairs for modern looks\n\nDo you prefer studs, hoops, or drops?`;
    }
    
    if (message.includes('bracelet')) {
      const option = jewelryOptions.bracelets;
      return `💫 Custom Bracelets - Wear Your Story!\n\nPrice Range: ${option.price}\nCustomization: ${option.customization}\nDelivery: ${option.timeframe}\n\nPopular choices:\n• Charm bracelets with personal meaning\n• Tennis bracelets with diamonds\n• Cuff bracelets with engravings\n• Beaded bracelets with gemstones\n\nWhat style reflects your personality?`;
    }
    
    if (message.includes('contact') || message.includes('speak') || message.includes('human') || message.includes('appointment')) {
      return `${botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)]}\n\n📞 Call us: (555) 123-LUXE\n💌 Email: custom@luxejewels.com\n📅 Book consultation: luxejewels.com/book\n🏪 Visit our atelier: 123 Diamond District\n\nOur master jewelers are available Mon-Sat, 10am-7pm. Would you like me to schedule a consultation for you?`;
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    }
    
    return "I'd love to help you create something beautiful! Feel free to ask about:\n\n💎 Custom jewelry pricing\n🎨 Design and customization options\n⏱️ Timeline and process\n📞 Speaking with our master jewelers\n\nWhat interests you most?";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, Math.random() * 1000 + 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { text: "💍 Custom Rings", action: "I'm interested in custom rings" },
    { text: "💎 Pricing Info", action: "What are your price ranges?" },
    { text: "🎨 Design Process", action: "How does customization work?" },
    { text: "📞 Speak to Expert", action: "I'd like to contact a human jeweler" }
  ];

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600 hover:from-orange-600 hover:via-orange-500 hover:to-orange-700 text-white rounded-full p-4 shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-pink-300 to-purple-400 rounded-full opacity-20 animate-ping"></div>
            <Diamond size={28} className="relative z-10" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <Sparkles size={14} className="text-white animate-spin" />
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Chat container */}
          <div className="fixed z-50 
                          bottom-4 right-4 left-4 top-4
                          sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto 
                          sm:w-96 sm:h-[520px]">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 h-full flex flex-col overflow-hidden backdrop-blur-sm">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white p-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Crown size={24} className="text-yellow-200" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Jewelry Consultant</h3>
                    <p className="text-orange-100 text-xs">Custom Design Expert</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white'
                          : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Gem size={16} className="text-orange-500" />
                          <span className="text-xs font-medium text-orange-600">LuxeJewels Assistant</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Gem size={16} className="text-orange-500" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 2 && (
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
                  <p className="text-xs text-gray-600 mb-3 font-medium">Quick Actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputValue(action.action);
                          setTimeout(() => handleSend(), 100);
                        }}
                        className="text-xs p-2 bg-white border border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-200 transition-colors text-left"
                      >
                        {action.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about custom jewelry..."
                    className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-2xl p-3 hover:from-orange-600 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex-shrink-0"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JewelryChatWidget;