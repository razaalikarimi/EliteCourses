import React, { useState } from 'react'
import ai from "../assets/ai.png"
import ai1 from "../assets/SearchAi.png"
import { RiMicAiFill } from "react-icons/ri";
import axios from 'axios';
import { serverUrl } from '../App';
import { useNavigate } from 'react-router-dom';
import start from "../assets/start.mp3"
import { FaArrowLeftLong } from "react-icons/fa6";
import Nav from '../components/Nav';

function SearchWithAi() {
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [listening, setListening] = useState(false)
  const navigate = useNavigate();
  const startSound = new Audio(start)

  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handleSearch = async () => {
    if (!recognition) return;
    setListening(true)
    startSound.play()
    recognition.start();
    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setInput(transcript);
      await handleRecommendation(transcript);
    };
  };

  const handleRecommendation = async (query) => {
    if (!query) return;
    try {
      const result = await axios.post(`${serverUrl}/api/ai/search`, { input: query }, { withCredentials: true });
      setRecommendations(result.data);
      if(result.data.length > 0){
        speak("These are the top courses I found for you")
      } else {
        speak("No courses found")
      }
      setListening(false)
    } catch (error) {
      console.error(error);
      setListening(false)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      
      <main className="flex-1 max-w-4xl mx-auto w-full pt-32 pb-20 px-6">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <button 
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm mb-4"
            >
              <FaArrowLeftLong /> Back to home
            </button>
            <div className="flex items-center justify-center gap-4">
              <div className="p-3 bg-blue-50 rounded-2xl shadow-sm">
                <img src={ai} className="w-8 h-8" alt="AI" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                Search with <span className="text-blue-600">AI</span>
              </h1>
            </div>
            <p className="text-gray-500 font-medium max-w-lg mx-auto">
              Our intelligent assistant helps you find exactly what you need. Just type or use your voice to search our catalog.
            </p>
          </div>

          <div className="bg-white p-2 rounded-3xl border border-gray-100 shadow-xl shadow-blue-50/50 flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                className="w-full pl-6 pr-4 py-5 bg-transparent border-0 focus:ring-0 text-gray-900 font-medium placeholder-gray-400"
                placeholder="What do you want to learn? (e.g. AI, MERN, Cloud...)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleRecommendation(input)}
              />
            </div>
            <div className="flex items-center gap-2 pr-2">
              <button
                onClick={handleSearch}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  listening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <RiMicAiFill size={24} />
              </button>
              <button
                disabled={!input}
                onClick={() => handleRecommendation(input)}
                className="px-8 h-14 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50 disabled:shadow-none"
              >
                Search
              </button>
            </div>
          </div>

          {listening && (
            <div className="text-center animate-bounce">
              <p className="text-blue-600 font-bold">Listening...</p>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="space-y-8 pt-8">
              <div className="flex items-center gap-3">
                <img src={ai1} className="w-10 h-10 rounded-full" alt="AI" />
                <h2 className="text-xl font-bold text-gray-900">AI Recommendations</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((course, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all cursor-pointer group"
                    onClick={() => navigate(`/viewcourse/${course._id}`)}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{course.category}</span>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium line-clamp-2">
                        {course.subTitle || "A comprehensive course designed by experts to help you master this field."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SearchWithAi;
