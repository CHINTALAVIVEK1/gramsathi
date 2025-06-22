import React, { useState } from 'react';
import { Heart, MessageCircle, Phone, AlertTriangle, Calendar, User } from 'lucide-react';

const ArogyaSetu = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [diagnosis, setDiagnosis] = useState(null);

  const commonSymptoms = [
    'Fever', 'Headache', 'Cough', 'Sore Throat', 'Body Ache', 
    'Nausea', 'Diarrhea', 'Chest Pain', 'Difficulty Breathing', 'Fatigue'
  ];

  const healthTips = [
    {
      title: 'Fever Management',
      description: 'Keep hydrated, rest well, use cold compress. Seek help if fever exceeds 102°F.',
      urgency: 'Medium'
    },
    {
      title: 'Wound Care',
      description: 'Clean with water, apply antiseptic, cover with bandage. Watch for infection signs.',
      urgency: 'Medium'
    },
    {
      title: 'Chest Pain',
      description: 'Seek immediate medical attention. Do not ignore chest pain.',
      urgency: 'High'
    }
  ];

  const emergencyContacts = [
    { service: 'Ambulance', number: '108' },
    { service: 'Police', number: '100' },
    { service: 'Fire', number: '101' },
    { service: 'Women Helpline', number: '1091' }
  ];

  const handleSymptomToggle = (symptom) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const analyzeSymptoms = () => {
    if (symptoms.length === 0) return;

    let result = {
      condition: 'General Health Concern',
      severity: 'Low',
      recommendations: ['Monitor symptoms', 'Rest well', 'Stay hydrated'],
      emergency: false
    };

    if (symptoms.includes('Chest Pain') || symptoms.includes('Difficulty Breathing')) {
      result = {
        condition: 'Possible Cardiac/Respiratory Issue',
        severity: 'High',
        recommendations: ['Seek immediate medical attention', 'Call emergency services'],
        emergency: true
      };
    } else if (symptoms.includes('Fever') && symptoms.includes('Headache')) {
      result = {
        condition: 'Possible Viral Infection',
        severity: 'Medium',
        recommendations: ['Rest and hydration', 'Monitor temperature', 'Consult doctor if persists'],
        emergency: false
      };
    }

    setDiagnosis(result);
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessages = [
      ...chatMessages,
      { type: 'user', message: currentMessage },
      { 
        type: 'bot', 
        message: 'Thank you for your query. Based on your symptoms, I recommend consulting with a healthcare provider. For immediate assistance, please call our helpline at 1800-123-4567.' 
      }
    ];

    setChatMessages(newMessages);
    setCurrentMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <Heart className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ArogyaSetu Rural
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Basic telemedicine and health information for rural communities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Symptom Checker */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MessageCircle className="mr-2 text-blue-600" size={20} />
              Symptom Checker
            </h2>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">Select your symptoms:</p>
              <div className="grid grid-cols-2 gap-2">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`p-2 text-sm rounded border transition-colors ${
                      symptoms.includes(symptom)
                        ? 'bg-red-100 border-red-300 text-red-800'
                        : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={analyzeSymptoms}
              disabled={symptoms.length === 0}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Analyze Symptoms
            </button>

            {diagnosis && (
              <div className={`mt-4 p-4 rounded-lg border ${
                diagnosis.emergency 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <h3 className="font-semibold mb-2">{diagnosis.condition}</h3>
                <p className="text-sm mb-2">Severity: {diagnosis.severity}</p>
                <div className="text-sm">
                  <strong>Recommendations:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {diagnosis.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
                {diagnosis.emergency && (
                  <div className="mt-2 p-2 bg-red-100 rounded flex items-center">
                    <AlertTriangle className="text-red-600 mr-2" size={16} />
                    <span className="text-sm text-red-800">This requires immediate medical attention!</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Health Chat */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MessageCircle className="mr-2 text-green-600" size={20} />
              Health Assistant
            </h2>
            
            <div className="h-64 border border-gray-200 rounded-lg p-4 mb-4 overflow-y-auto">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  Ask me about your health concerns...
                </div>
              ) : (
                <div className="space-y-3">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          msg.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {msg.message}
                      </div>
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
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your health question..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Health Tips */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Emergency Health Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {healthTips.map((tip, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{tip.title}</h3>
                  <span className={`px-2 py-1 rounded text-sm ${
                    tip.urgency === 'High' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {tip.urgency}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts & Doctor Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Emergency Contacts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Phone className="mr-2 text-red-600" size={20} />
              Emergency Contacts
            </h2>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{contact.service}</span>
                  <a
                    href={`tel:${contact.number}`}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Consultation Booking */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="mr-2 text-green-600" size={20} />
              Book Consultation
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Morning (9 AM - 12 PM)</option>
                  <option>Afternoon (12 PM - 4 PM)</option>
                  <option>Evening (4 PM - 8 PM)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Book Consultation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArogyaSetu;
