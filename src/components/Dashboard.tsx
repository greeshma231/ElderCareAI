import React from 'react';
import { Activity, Heart, Calendar, Bell, MessageSquare, AlertTriangle, Clock, ThermometerSun } from 'lucide-react';

interface StatusCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  status: 'good' | 'warning' | 'normal';
}

interface ScheduleItemProps {
  time: string;
  activity: string;
  completed: boolean;
}

interface AlertItemProps {
  type: 'warning' | 'info';
  message: string;
  time: string;
}

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          icon={<Heart className="text-red-500 transition-transform duration-300 transform hover:scale-110" />}
          title="Heart Rate"
          value="72 BPM"
          status="normal"
        />
        <StatusCard
          icon={<Activity className="text-blue-500 transition-transform duration-300 transform hover:scale-110" />}
          title="Activity Level"
          value="Moderate"
          status="good"
        />
        <StatusCard
          icon={<ThermometerSun className="text-orange-500 transition-transform duration-300 transform hover:scale-110" />}
          title="Room Temperature"
          value="23°C"
          status="normal"
        />
        <StatusCard
          icon={<Clock className="text-purple-500 transition-transform duration-300 transform hover:scale-110" />}
          title="Last Check-in"
          value="10 mins ago"
          status="good"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 lg:p-6 transition-all duration-300 hover:shadow-lg animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 transition-colors duration-300 hover:text-blue-600">Daily Schedule</h2>
            <div className="space-y-3">
              {scheduleItems.map((item, index) => (
                <ScheduleItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-4 lg:p-6 transition-all duration-300 hover:shadow-lg animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 transition-colors duration-300 hover:text-blue-600">Recent Alerts</h2>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <AlertItem key={index} {...alert} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusCard = ({ icon, title, value, status }: StatusCardProps) => (
  <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 animate-fade-in">
    <div className="flex items-center justify-between mb-2">
      <div className="relative">
        {icon}
        <div className="absolute inset-0 rounded-full animate-pulse-ring opacity-20" />
      </div>
      <span className={`px-2 py-1 rounded-full text-xs transition-colors ${
        status === 'good' ? 'bg-green-100 text-green-800' :
        status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
        'bg-blue-100 text-blue-800'
      }`}>
        {status}
      </span>
    </div>
    <h3 className="text-gray-600 text-sm">{title}</h3>
    <p className="text-2xl font-semibold mt-1 transition-all duration-300 hover:text-blue-600">{value}</p>
  </div>
);

const ScheduleItem = ({ time, activity, completed }: ScheduleItemProps) => (
  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-blue-50 animate-fade-in">
    <Calendar className="text-gray-500 transition-transform duration-300 transform group-hover:scale-110" />
    <div className="flex-1">
      <p className="font-medium transition-colors duration-300 hover:text-blue-600">{activity}</p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
    <div className="relative">
      <input
        type="checkbox"
        checked={completed}
        className="h-5 w-5 text-blue-600 rounded transition-all duration-300 checked:animate-bounce-soft"
        readOnly
      />
      {completed && (
        <div className="absolute inset-0 bg-blue-500 rounded opacity-20 animate-pulse-ring" />
      )}
    </div>
  </div>
);

const AlertItem = ({ type, message, time }: AlertItemProps) => (
  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-yellow-50 animate-fade-in">
    <AlertTriangle className="text-yellow-500 transition-transform duration-300 transform hover:scale-110" />
    <div className="flex-1">
      <p className="font-medium transition-colors duration-300 hover:text-yellow-700">{message}</p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
  </div>
);

const scheduleItems: ScheduleItemProps[] = [
  { time: '8:00 AM', activity: 'Morning Medication', completed: true },
  { time: '9:00 AM', activity: 'Blood Pressure Check', completed: true },
  { time: '12:00 PM', activity: 'Lunch + Medication', completed: false },
  { time: '3:00 PM', activity: 'Light Exercise', completed: false },
];

const alerts: AlertItemProps[] = [
  { type: 'warning', message: 'Medication reminder: Evening dose', time: '5 mins ago' },
  { type: 'info', message: 'Activity level lower than usual', time: '1 hour ago' },
  { type: 'warning', message: 'Room temperature slightly high', time: '2 hours ago' },
];

export default Dashboard;