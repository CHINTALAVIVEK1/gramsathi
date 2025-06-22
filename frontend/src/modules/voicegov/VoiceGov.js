import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, MessageCircle, Search, FileText, Phone } from 'lucide-react';

const VoiceGov = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(null);

  const schemes = [
    {
      id: 'pm-kisan',
      name: 'PM-KISAN Samman Nidhi',
      category: 'Agriculture',
      description: 'Direct income support to farmers',
      benefits: '₹6,000 per year in three installments',
      eligibility: 'Small and marginal farmers with cultivable land',
      documents: ['Aadhaar Card', 'Bank Account Details', 'Land Records'],
      applicationProcess: 'Apply online through PM-KISAN portal or visit nearest CSC'
    },
    {
      id: 'ayushman-bharat',
      name: 'Ayushman Bharat - PMJAY',
      category: 'Health',
      description: 'Health insurance scheme for poor families',
      benefits: 'Health cover up to ₹5 lakh per family per year',
      eligibility: 'Families listed in SECC-2011 database',
      documents: ['Aadhaar Card', 'Ration Card', 'SECC-2011 verification'],
      applicationProcess: 'Visit nearest hospital or health center'
    },
    {
      id: 'mudra-yojana',
      name: 'Pradhan Mantri MUDRA Yojana',
      category: 'Business',
      description: 'Micro-finance scheme for small businesses',
      benefits: 'Loans up to ₹10 lakh without collateral',
      eligibility: 'Non-corporate, non-farm small/micro enterprises',
      documents: ['Business Plan', 'Identity Proof', 'Address Proof', 'Bank Statements'],
      applicationProcess: 'Apply through banks, NBFCs, or MFIs'
    }
  ];

  const categories = ['All', 'Agriculture', 'Health', 'Business', 'Education', 'Women'];

  // Mock speech recognition
  const startListening = () => {
    setIsListening(true);
    // Simulate speech recognition
    setTimeout(() => {
      setTranscript('मुझे किसान योजना के बारे में जानकारी चाहिए');
      setIsListening(false);
      handleVoiceQuery('मुझे किसान योजना के बारे में जानकारी चाहिए');
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const handleVoiceQuery = (query) => {
    const response = generateResponse(query);
    setChatMessages(prev => [
      ...prev,
      { type: 'user', message: query, isVoice: true },
      { type: 'bot', message: response.text, schemes: response.schemes }
    ]);
    
    // Text-to-speech simulation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(response.text);
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  const generateResponse = (query) => {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('किसान') || queryLower.includes('farmer') || queryLower.includes('agriculture')) {
      return {
        text: 'किसानों के लिए PM-KISAN योजना उपलब्ध है जो सालाना ₹6,000 की सहायता प्रदान करती है। क्या आप इसके बारे में और जानना चाहते हैं?',
        schemes: ['pm-kisan']
      };
    } else if (queryLower.includes('स्वास्थ्य') || queryLower.includes('health') || queryLower.includes('बीमा')) {
      return {
        text: 'स्वास्थ्य के लिए आयुष्मान भारत योजना है जो ₹5 लाख तक का मुफ्त इलाज प्रदान करती है। क्या आप पात्रता जानना चाहते हैं?',
        schemes: ['ayushman-bharat']
      };
    } else if (queryLower.includes('व्यापार') || queryLower.includes('business') || queryLower.includes('loan')) {
      return {
        text: 'व्यापार के लिए MUDRA योजना उपलब्ध है जो ₹10 लाख तक का लोन बिना गारंटी के देती है। क्या आप आवेदन प्रक्रिया जानना चाहते हैं?',
        schemes: ['mudra-yojana']
      };
    } else {
      return {
        text: 'मैं आपकी सरकारी योजनाओं के बारे में मदद कर सकता हूं। कृपया किसान योजना, स्वास्थ्य योजना, या व्यापार योजना के बारे में पूछें।',
        schemes: []
      };
    }
  };

  const sendTextMessage = () => {
    if (!currentMessage.trim()) return;

    const response = generateResponse(currentMessage);
    setChatMessages(prev => [
      ...prev,
      { type: 'user', message: currentMessage, isVoice: false },
      { type: 'bot', message: response.text, schemes: response.schemes }
    ]);
    setCurrentMessage('');
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
              <Mic className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            VoiceGov
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Government scheme awareness with voice and chat support
          </p>
          <p className="text-sm text-gray-500 mt-2">
            आवाज़ या टेक्स्ट में सरकारी योजनाओं की जानकारी पाएं
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Voice Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Mic className="mr-2 text-purple-600" size={20} />
                Voice Assistant
              </h2>
              
              {/* Voice Control */}
              <div className="text-center mb-6">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="text-white" size={32} />
                  ) : (
                    <Mic className="text-white" size={32} />
                  )}
                </button>
                <p className="mt-4 text-gray-600">
                  {isListening ? 'सुन रहा हूं... बोलिए' : 'माइक दबाकर बोलें'}
                </p>
                {transcript && (
                  <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-700">आपने कहा: "{transcript}"</p>
                  </div>
                )}
              </div>

              {/* Chat Interface */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MessageCircle className="mr-2 text-blue-600" size={18} />
                  Chat Assistant
                </h3>
                
                <div className="h-64 border border-gray-200 rounded-lg p-4 mb-4 overflow-y-auto">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                      <p>सरकारी योजनाओं के बारे में पूछें...</p>
                      <p className="text-sm mt-2">Ask about government schemes...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((msg, index) => (
                        <div key={index}>
                          <div className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                              msg.type === 'user'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-200 text-gray-800'
                            }`}>
                              <div className="flex items-center justify-between">
                                <span>{msg.message}</span>
                                {msg.type === 'user' && msg.isVoice && (
                                  <Mic className="ml-2" size={12} />
                                )}
                                {msg.type === 'bot' && (
                                  <button
                                    onClick={() => speakText(msg.message)}
                                    className="ml-2 text-gray-600 hover:text-gray-800"
                                  >
                                    <Volume2 size={12} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          {msg.schemes && msg.schemes.length > 0 && (
                            <div className="mt-2 flex justify-start">
                              <div className="max-w-xs">
                                {msg.schemes.map(schemeId => {
                                  const scheme = schemes.find(s => s.id === schemeId);
                                  return scheme ? (
                                    <button
                                      key={schemeId}
                                      onClick={() => setSelectedScheme(scheme)}
                                      className="block w-full text-left p-2 mt-1 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100"
                                    >
                                      {scheme.name} - विस्तार से देखें
                                    </button>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendTextMessage()}
                    placeholder="योजना के बारे में पूछें..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={sendTextMessage}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scheme Details Sidebar */}
          <div className="space-y-6">
            {selectedScheme ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FileText className="mr-2 text-green-600" size={18} />
                  योजना विवरण
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-purple-700">{selectedScheme.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{selectedScheme.description}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700">लाभ:</h5>
                    <p className="text-sm text-gray-600">{selectedScheme.benefits}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700">पात्रता:</h5>
                    <p className="text-sm text-gray-600">{selectedScheme.eligibility}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700">आवश्यक दस्तावेज:</h5>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {selectedScheme.documents.map((doc, index) => (
                        <li key={index}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700">आवेदन प्रक्रिया:</h5>
                    <p className="text-sm text-gray-600">{selectedScheme.applicationProcess}</p>
                  </div>
                  
                  <button
                    onClick={() => speakText(`${selectedScheme.name} योजना के बारे में: ${selectedScheme.description}. लाभ: ${selectedScheme.benefits}`)}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                  >
                    <Volume2 className="mr-2" size={16} />
                    सुनें
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">लोकप्रिय योजनाएं</h3>
                <div className="space-y-3">
                  {schemes.map(scheme => (
                    <button
                      key={scheme.id}
                      onClick={() => setSelectedScheme(scheme)}
                      className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-sm">{scheme.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{scheme.category}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Help Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Phone className="mr-2 text-green-600" size={18} />
                सहायता
              </h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <strong>हेल्पलाइन:</strong>
                  <br />
                  <a href="tel:1800-123-4567" className="text-blue-600">1800-123-4567</a>
                </div>
                <div className="text-sm">
                  <strong>समय:</strong>
                  <br />
                  सुबह 9 बजे से शाम 6 बजे तक
                </div>
                <div className="text-sm">
                  <strong>भाषाएं:</strong>
                  <br />
                  हिंदी, अंग्रेजी, स्थानीय भाषाएं
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceGov;
