import React, { useState, useEffect, useRef } from 'react';
import { Mic, Volume2, VolumeX } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const VoiceDemoReal = () => {
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');
  const [sessionId] = useState(() => `session-${Date.now()}`);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          handleFinalTranscript(finalTranscript.trim());
        } else {
          setCurrentTranscript(interimTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError('Oops! I could not hear you. Try again!');
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handleFinalTranscript = async (transcript) => {
    setCurrentTranscript('');
    setIsListening(false);
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setConversation(prev => [...prev, { type: 'user', text: transcript }]);
    await getAIResponse(transcript);
  };

  const getAIResponse = async (question) => {
    setIsProcessing(true);
    setError('');

    try {
      const mockKidProfileId = 'demo-profile-' + sessionId;
      
      const response = await axios.post(
        `${API}/conversations/chat`,
        {
          question: question,
          kid_profile_id: mockKidProfileId,
          session_id: sessionId
        }
      );

      const aiAnswer = response.data.answer;
      setConversation(prev => [...prev, { type: 'assistant', text: aiAnswer }]);
      speakText(aiAnswer);
      
    } catch (err) {
      console.error('AI response error:', err);
      console.error('Error details:', err.response?.data || err.message);
      const mockResponse = getMockResponse(question);
      setConversation(prev => [...prev, { type: 'assistant', text: mockResponse }]);
      speakText(mockResponse);
    } finally {
      setIsProcessing(false);
    }
  };

  const getMockResponse = (question) => {
    const responses = [
      'That is a great question! I would love to help you learn about that.',
      'Wow, you are so curious! That is wonderful for learning.',
      'Great thinking! Let me explain that in a simple way.',
      'You are asking awesome questions! Keep being curious!'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      
      const voices = synthRef.current.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Female') || voice.name.includes('Google UK English Female')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setCurrentTranscript('');
    } else {
      if (!recognitionRef.current) {
        setError('Speech recognition is not available in your browser.');
        return;
      }
      
      setError('');
      setCurrentTranscript('');
      
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Failed to start recognition:', err);
        setError('Failed to start listening. Please try again.');
      }
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const tryQuickQuestion = async (question) => {
    setConversation(prev => [...prev, { type: 'user', text: question }]);
    await getAIResponse(question);
  };

  const quickQuestions = [
    'What is 5 + 3?',
    'Tell me a story!',
    'How do birds fly?',
    'Can we play a game?'
  ];

  return (
    <section id="demo" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-1 font-heading mb-4">See KidoTalk in Action</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Tap the microphone and start talking! KidoTalk will listen and respond.
          </p>
        </div>

        <div className="voice-card accent-pink p-8">
          <div className="mb-8 min-h-[300px] max-h-[400px] overflow-y-auto space-y-4">
            {conversation.length === 0 && !isListening && !isProcessing && (
              <div className="text-center py-12">
                <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
                  Tap the microphone and say something! I am listening...
                </p>
              </div>
            )}
            
            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`speech-bubble ${msg.type} max-w-[80%]`}>
                  <p className="body-medium">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {isListening && currentTranscript && (
              <div className="flex justify-end">
                <div className="speech-bubble user max-w-[80%] opacity-70">
                  <p className="body-medium">{currentTranscript}...</p>
                </div>
              </div>
            )}
            
            {isProcessing && (
              <div className="flex justify-start">
                <div className="speech-bubble assistant max-w-[80%]">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-center">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="flex justify-center mb-6 gap-4">
            <button 
              className={`mic-button ${isListening ? 'listening' : ''}`}
              onClick={handleMicClick}
              disabled={isProcessing || isSpeaking}
              aria-label="Tap to talk with KidoTalk"
            >
              {isListening ? <Volume2 size={48} /> : <Mic size={48} />}
            </button>
            
            {isSpeaking && (
              <button 
                onClick={stopSpeaking}
                className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all"
                aria-label="Stop speaking"
              >
                <VolumeX size={24} />
              </button>
            )}
          </div>

          <div className="text-center mb-6">
            <p className="font-mono text-sm uppercase tracking-wide">
              {isListening ? 'Listening...' : isProcessing ? 'Thinking...' : isSpeaking ? 'Speaking...' : 'Tap to Talk'}
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Or try asking:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => tryQuickQuestion(question)}
                  disabled={isListening || isProcessing || isSpeaking}
                  className="px-4 py-2 bg-white/70 hover:bg-white rounded-full text-sm font-medium transition-all disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceDemoReal;
