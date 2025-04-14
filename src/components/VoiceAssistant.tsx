import React, { useState } from 'react';
import { Mic, Volume2, VolumeX, PhoneCall, AlertOctagon, Calendar, Clock, Pill } from 'lucide-react';

interface CommandLogProps {
  time: string;
  command: string;
  status: 'success' | 'failed' | 'pending';
}

interface AlertProps {
  id: number;
  type: 'medication' | 'appointment' | 'emergency' | 'reminder';
  message: string;
  time: string;
  isRead: boolean;
}

const VoiceAssistant = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recentCommands, setRecentCommands] = useState<CommandLogProps[]>([
    { time: '10:30 AM', command: 'Call my daughter', status: 'success' },
    { time: '09:15 AM', command: 'What time is my doctor appointment?', status: 'success' },
    { time: '08:45 AM', command: 'Turn on the kitchen lights', status: 'failed' },
  ]);
  
  const [alerts, setAlerts] = useState<AlertProps[]>([
    { 
      id: 1, 
      type: 'medication', 
      message: 'Time to take your blood pressure medication', 
      time: '11:00 AM', 
      isRead: false 
    },
    { 
      id: 2, 
      type: 'appointment', 
      message: 'Doctor Johnson appointment tomorrow at 2:00 PM', 
      time: 'Tomorrow', 
      isRead: true 
    },
    { 
      id: 3, 
      type: 'reminder', 
      message: 'Your daughter Sarah will call this evening', 
      time: '7:00 PM', 
      isRead: false 
    },
    { 
      id: 4, 
      type: 'emergency', 
      message: 'Fall detected - assistance contacted', 
      time: 'Yesterday', 
      isRead: true 
    },
  ]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    
    // Simulate voice command
    if (!isListening) {
      setTimeout(() => {
        setRecentCommands([
          { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
            command: 'Remind me about my medication', 
            status: 'pending' },
          ...recentCommands
        ]);
        
        // Simulate processing
        setTimeout(() => {
          setRecentCommands(prev => [
            { ...prev[0], status: 'success' },
            ...prev.slice(1)
          ]);
          
          // Add a new alert
          setAlerts(prev => [
            { 
              id: prev.length + 1, 
              type: 'medication', 
              message: 'Reminder set for your evening medication', 
              time: '8:00 PM', 
              isRead: false 
            },
            ...prev
          ]);
          
          setIsListening(false);
        }, 2000);
      }, 3000);
    }
  };

  const markAsRead = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const getAlertIcon = (type: AlertProps['type']) => {
    switch(type) {
      case 'medication': return <Pill className="text-blue-500" size={20} />;
      case 'appointment': return <Calendar className="text-purple-500" size={20} />;
      case 'emergency': return <AlertOctagon className="text-red-500" size={20} />;
      case 'reminder': return <Clock className="text-green-500" size={20} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="p-5 border-b">
        <h2 className="text-xl font-semibold mb-4 animate-fade-in">Voice Assistant</h2>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="flex-1 flex items-center gap-3 p-4 bg-blue-50 rounded-lg transition-all duration-300 hover:shadow-md animate-fade-in">
            <div className={`relative ${isListening ? 'animate-pulse' : ''}`}>
              <Mic 
                size={28} 
                className={`transition-all duration-300 hover:scale-110 ${isListening ? 'text-red-500' : 'text-blue-500'}`} 
              />
              {isListening && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Voice Recognition</h3>
              <p className="text-sm text-gray-600">
                {isListening ? 'Listening...' : 'Ready for commands'}
              </p>
            </div>
            <button 
              onClick={toggleListening}
              className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isListening 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              {isListening ? 'Stop' : 'Start'}
            </button>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-md animate-fade-in">
            <button 
              onClick={toggleMute}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:scale-110"
            >
              {isMuted ? (
                <VolumeX size={24} className="text-red-500" />
              ) : (
                <Volume2 size={24} className="text-green-500" />
              )}
            </button>
            <div>
              <h3 className="font-medium">System Voice</h3>
              <p className="text-sm text-gray-600">{isMuted ? 'Muted' : 'Active'}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-2 animate-fade-in">
          <PhoneCall size={18} className="text-red-500 animate-pulse" />
          <h3 className="font-medium">Emergency Voice Command</h3>
        </div>
        <div className="p-3 bg-red-50 rounded-lg border border-red-100 mb-5 transition-all duration-300 hover:bg-red-100 animate-fade-in">
          <p className="text-sm">Say <span className="font-bold">"Help Emergency"</span> to immediately contact assistance</p>
        </div>
      </div>
      
      <div className="p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-in">
            <h3 className="font-medium text-gray-700 mb-3">Recent Commands</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {recentCommands.map((command, index) => (
                <CommandLog key={index} {...command} />
              ))}
            </div>
          </div>
          
          <div className="animate-fade-in">
            <h3 className="font-medium text-gray-700 mb-3">Active Alerts</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {alerts.map((alert, index) => (
                <Alert 
                  key={alert.id} 
                  alert={alert} 
                  onMarkAsRead={() => markAsRead(alert.id)} 
                  icon={getAlertIcon(alert.type)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommandLog = ({ time, command, status }: CommandLogProps) => (
  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 transition-all duration-300 hover:bg-blue-50 hover:border-blue-200 animate-fade-in">
    <div className="flex justify-between items-start mb-1">
      <span className="font-medium text-sm transition-colors duration-300 hover:text-blue-600">{command}</span>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
    <div className="flex items-center">
      <span 
        className={`text-xs px-2 py-0.5 rounded-full transition-all duration-300 transform hover:scale-105 ${
          status === 'success' ? 'bg-green-100 text-green-700' :
          status === 'failed' ? 'bg-red-100 text-red-700' :
          'bg-yellow-100 text-yellow-700 animate-pulse'
        }`}
      >
        {status === 'success' ? 'Completed' : status === 'failed' ? 'Failed' : 'Processing...'}
      </span>
    </div>
  </div>
);

interface AlertComponentProps {
  alert: AlertProps;
  icon: React.ReactNode;
  onMarkAsRead: () => void;
}

const Alert = ({ alert, icon, onMarkAsRead }: AlertComponentProps) => (
  <div 
    className={`p-3 rounded-lg border transition-all duration-300 hover:shadow-md animate-fade-in ${
      alert.type === 'emergency' ? 'bg-red-50 border-red-100 hover:bg-red-100' :
      alert.type === 'medication' ? 'bg-blue-50 border-blue-100 hover:bg-blue-100' :
      alert.type === 'appointment' ? 'bg-purple-50 border-purple-100 hover:bg-purple-100' :
      'bg-green-50 border-green-100 hover:bg-green-100'
    } ${!alert.isRead ? 'relative after:absolute after:w-2 after:h-2 after:rounded-full after:bg-blue-500 after:-top-1 after:-right-1' : ''}`}
  >
    <div className="flex items-start gap-3">
      <div className="mt-0.5 transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p className="font-medium transition-colors duration-300 hover:text-blue-600">{alert.message}</p>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{alert.time}</span>
        </div>
        {!alert.isRead && (
          <button 
            onClick={onMarkAsRead}
            className="text-xs text-blue-600 hover:text-blue-800 mt-1 transition-colors duration-300"
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  </div>
);

export default VoiceAssistant;