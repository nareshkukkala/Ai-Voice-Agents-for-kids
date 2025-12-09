import React, { useState, useEffect } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { mockConversations } from '../mock';

const VoiceDemo = () => {
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMicClick = () => {
    if (isListening) {
      // Stop listening
      setIsListening(false);
      setIsProcessing(true);
      
      // Simulate processing and get random response
      setTimeout(() => {
        const randomConvo = mockConversations[Math.floor(Math.random() * mockConversations.length)];
        setConversation(prev => [
          ...prev,
          { type: 'user', text: randomConvo.question },
          { type: 'assistant', text: randomConvo.answer }
        ]);
        setIsProcessing(false);
      }, 1500);
    } else {
      // Start listening
      setIsListening(true);
      setCurrentQuestion('');
      
      // Simulate voice recognition
      const questions = mockConversations.map(c => c.question);
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      
      let index = 0;
      const interval = setInterval(() => {
        if (index < randomQuestion.length) {
          setCurrentQuestion(randomQuestion.substring(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
    }
  };

  const tryQuickQuestion = (question) => {
    const convo = mockConversations.find(c => c.question === question);
    if (convo) {
      setIsProcessing(true);
      setTimeout(() => {
        setConversation(prev => [
          ...prev,
          { type: 'user', text: convo.question },
          { type: 'assistant', text: convo.answer }
        ]);
        setIsProcessing(false);
      }, 800);
    }
  };

  return (
    <section id="demo" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-1 font-heading mb-4">See KidoTalk in Action</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Try the voice demo! Tap the microphone and see how KidoTalk responds.
          </p>
        </div>

        {/* Demo Interface */}
        <div className="voice-card accent-pink p-8">
          {/* Conversation Display */}
          <div className="mb-8 min-h-[300px] max-h-[400px] overflow-y-auto space-y-4">
            {conversation.length === 0 && !isListening && !isProcessing && (
              <div className="text-center py-12">
                <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
                  Tap the microphone to start talking with KidoTalk!
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
            
            {isListening && currentQuestion && (
              <div className="flex justify-end">
                <div className="speech-bubble user max-w-[80%]">
                  <p className="body-medium">{currentQuestion}</p>
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

          {/* Microphone Button */}
          <div className="flex justify-center mb-8">
            <button 
              className={`mic-button ${isListening ? 'listening' : ''}`}
              onClick={handleMicClick}
              disabled={isProcessing}
              aria-label="Tap to talk with KidoTalk"
            >
              {isListening ? <Volume2 size={48} /> : <Mic size={48} />}
            </button>
          </div>

          {/* Status Text */}
          <div className="text-center mb-6">
            <p className="font-mono text-sm uppercase tracking-wide">
              {isListening ? 'Listening...' : isProcessing ? 'Thinking...' : 'Tap to Talk'}
            </p>
          </div>

          {/* Quick Questions */}
          <div className="text-center">
            <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Or try these questions:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {mockConversations.slice(0, 4).map((convo, index) => (
                <button
                  key={index}
                  onClick={() => tryQuickQuestion(convo.question)}
                  disabled={isListening || isProcessing}
                  className="px-4 py-2 bg-white/70 hover:bg-white rounded-full text-sm font-medium transition-all disabled:opacity-50"
                >
                  {convo.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceDemo;