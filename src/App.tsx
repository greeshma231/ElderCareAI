import React, { useState } from 'react';
import { Layout, Home, MessageSquare, Settings, Menu, Pill, Mic, Heart } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import MedicationTracker from './components/MedicationTracker';
import VoiceAssistant from './components/VoiceAssistant';
import EmotionalState from './components/EmotionalState';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <div className="animate-fade-in"><Dashboard /></div>;
      case 'chat':
        return <div className="animate-fade-in"><ChatBot /></div>;
      case 'medications':
        return <div className="animate-fade-in"><MedicationTracker /></div>;
      case 'voice':
        return <div className="animate-fade-in"><VoiceAssistant /></div>;
      case 'emotional':
        return <div className="animate-fade-in"><EmotionalState /></div>;
      case 'settings':
        return (
          <div className="animate-fade-in bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p>Settings panel coming soon...</p>
          </div>
        );
      default:
        return <div className="animate-fade-in"><Dashboard /></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-10 animate-slide-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Layout className="h-8 w-8 text-blue-500 animate-bounce-soft" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900 transition-colors duration-300 hover:text-blue-600">
                ElderCare AI
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse-ring opacity-50"></div>
                </div>
                <span className="text-sm text-gray-600">System Active</span>
              </div>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-300"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-sm
          transform transition-transform duration-300 ease-in-out z-30
          border-r border-gray-200
        `}>
          <nav className="h-full overflow-y-auto">
            <div className="px-4 py-8 space-y-6">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                  Main
                </p>
                <div className="space-y-1">
                  {[
                    { id: 'dashboard', icon: <Home />, label: 'Dashboard' },
                    { id: 'chat', icon: <MessageSquare />, label: 'Chat Assistant' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`
                        flex items-center w-full p-3 rounded-lg text-sm
                        transition-all duration-300 ease-in-out
                        ${activeTab === item.id 
                          ? 'bg-blue-50 text-blue-600 shadow-sm transform scale-105'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <span className={`mr-3 transition-transform duration-300 ${
                        activeTab === item.id ? 'transform scale-110' : ''
                      }`}>
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                  Health & Wellbeing
                </p>
                <div className="space-y-1">
                  {[
                    { id: 'medications', icon: <Pill />, label: 'Medication Tracker' },
                    { id: 'emotional', icon: <Heart />, label: 'Emotional Wellbeing' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`
                        flex items-center w-full p-3 rounded-lg text-sm
                        transition-all duration-300 ease-in-out
                        ${activeTab === item.id 
                          ? 'bg-blue-50 text-blue-600 shadow-sm transform scale-105'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <span className={`mr-3 transition-transform duration-300 ${
                        activeTab === item.id ? 'transform scale-110' : ''
                      }`}>
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                  System
                </p>
                <div className="space-y-1">
                  {[
                    { id: 'voice', icon: <Mic />, label: 'Voice Assistant' },
                    { id: 'settings', icon: <Settings />, label: 'Settings' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`
                        flex items-center w-full p-3 rounded-lg text-sm
                        transition-all duration-300 ease-in-out
                        ${activeTab === item.id 
                          ? 'bg-blue-50 text-blue-600 shadow-sm transform scale-105'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <span className={`mr-3 transition-transform duration-300 ${
                        activeTab === item.id ? 'transform scale-110' : ''
                      }`}>
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 mt-auto border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-4 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                <h3 className="font-medium text-blue-700 mb-2">Need Help?</h3>
                <p className="text-sm text-blue-600 mb-3">If you need assistance with the system, you can ask the AI assistant or contact support.</p>
                <button 
                  onClick={() => setActiveTab('chat')}
                  className="w-full py-2 px-3 bg-blue-600 text-white text-sm rounded-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Ask Assistant
                </button>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-0 p-4 lg:p-6 min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;