import React from 'react';
import { HeartPulse, Smile, Frown, Meh, ThumbsUp, Activity, Clock } from 'lucide-react';

const EmotionalState = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <HeartPulse className="text-red-500 transition-transform duration-300 hover:scale-110" />
          Emotional Wellbeing
        </h2>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">Last updated: Today, 2:30 PM</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Happiness', value: 75, description: 'Generally positive mood', icon: <Smile className="text-yellow-500" />, color: 'yellow' },
          { title: 'Stress Level', value: 35, description: 'Lower than last week', icon: <Activity className="text-blue-500" />, color: 'blue' },
          { title: 'Social Engagement', value: 60, description: 'Moderate interactions', icon: <ThumbsUp className="text-green-500" />, color: 'green' },
          { title: 'Anxiety', value: 40, description: 'Slightly elevated', icon: <Frown className="text-orange-500" />, color: 'orange' },
          { title: 'Loneliness', value: 25, description: 'Improved from last week', icon: <Meh className="text-purple-500" />, color: 'purple' },
          { title: 'Overall Wellbeing', value: 82, description: 'Good emotional health', icon: <HeartPulse className="text-red-500" />, color: 'red' }
        ].map((emotion, index) => (
          <EmotionCard
            key={emotion.title}
            {...emotion}
            className={`animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg transition-all duration-300 hover:shadow-md animate-fade-in">
        <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Emotional Insights
        </h3>
        <p className="text-sm text-blue-700 leading-relaxed">
          Based on conversation patterns and daily activity, Martha is showing improved emotional wellbeing this week. 
          Social engagement has increased 15% after family video calls. 
          <span className="inline-block mt-2">
            Recommendation: <span className="font-medium">continue daily check-ins and schedule another group call this weekend.</span>
          </span>
        </p>
      </div>
    </div>
  );
};

interface EmotionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const EmotionCard = ({ title, value, description, icon, color, className, ...props }: EmotionCardProps) => {
  const getColorClass = (color: string, value: number) => {
    const baseClasses = "h-2 rounded-full transition-all duration-1000 ease-out";
    let colorClass = "";
    
    switch(color) {
      case "red": colorClass = "bg-red-500"; break;
      case "green": colorClass = "bg-green-500"; break;
      case "blue": colorClass = "bg-blue-500"; break;
      case "yellow": colorClass = "bg-yellow-500"; break;
      case "purple": colorClass = "bg-purple-500"; break;
      case "orange": colorClass = "bg-orange-500"; break;
      default: colorClass = "bg-gray-500";
    }
    
    return `${baseClasses} ${colorClass}`;
  };

  return (
    <div
      className={`bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-blue-200 group ${className}`}
      {...props}
    >
      <div className="flex items-center mb-3">
        <div className="transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="ml-2 font-medium transition-colors duration-300 group-hover:text-blue-600">{title}</h3>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
        <div 
          className={getColorClass(color, value)}
          style={{ 
            width: '0%',
            animation: `growWidth-${value} 1.5s ease-out forwards`
          }}
        ></div>
        <style>
          {`
            @keyframes growWidth-${value} {
              from { width: 0%; }
              to { width: ${value}%; }
            }
          `}
        </style>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500 transition-colors duration-300 group-hover:text-gray-700">{description}</span>
        <span className="font-bold transition-all duration-300 group-hover:scale-110">{value}%</span>
      </div>
    </div>
  );
};

export default EmotionalState;