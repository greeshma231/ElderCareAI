import React, { useState } from 'react';
import { Pill, Clock, Check, X, ChevronRight, Calendar, Bell } from 'lucide-react';

interface MedicationProps {
  id: number;
  name: string;
  dosage: string;
  schedule: string;
  nextDose: string;
  taken: boolean;
  description?: string;
}

const MedicationTracker = () => {
  const [medications, setMedications] = useState<MedicationProps[]>([
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      schedule: "Once daily",
      nextDose: "8:00 AM",
      taken: true,
      description: "Blood pressure medication"
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      schedule: "Twice daily",
      nextDose: "1:00 PM",
      taken: false,
      description: "Diabetes medication"
    },
    {
      id: 3,
      name: "Vitamin D",
      dosage: "1000 IU",
      schedule: "Once daily",
      nextDose: "8:00 AM",
      taken: true,
      description: "Supplement"
    },
    {
      id: 4,
      name: "Simvastatin",
      dosage: "20mg",
      schedule: "Evening",
      nextDose: "8:00 PM",
      taken: false,
      description: "Cholesterol medication"
    }
  ]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentMed, setCurrentMed] = useState<MedicationProps | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'taken'>('all');

  const markAsTaken = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: true } : med
    ));
  };

  const handleMedicationAction = (med: MedicationProps) => {
    setCurrentMed(med);
    setShowConfirmation(true);
  };

  const confirmMedicationTaken = () => {
    if (currentMed) {
      markAsTaken(currentMed.id);
      setShowConfirmation(false);
    }
  };

  const filteredMedications = medications
    .filter(med => {
      if (filter === 'upcoming') return !med.taken;
      if (filter === 'taken') return med.taken;
      return true;
    })
    .filter(med => 
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="p-5 border-b">
        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <Pill className="text-blue-500 transition-transform duration-300 hover:scale-110" />
            Medication Tracker
          </h2>
          <p className="text-sm text-gray-500 mt-1">Keep track of your daily medications</p>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
          <div className="flex items-center gap-2 animate-fade-in">
            <span className="text-sm font-medium">Next dose:</span>
            <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full transition-all duration-300 hover:bg-blue-100">
              <Clock size={14} className="animate-pulse" />
              <span className="text-sm font-medium">1:00 PM - Metformin</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-col md:flex-row gap-4 mb-5 animate-fade-in">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute left-2.5 top-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex">
            {['all', 'upcoming', 'taken'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType as 'all' | 'upcoming' | 'taken')}
                className={`
                  px-4 py-2 text-sm font-medium border transition-all duration-300
                  ${filter === filterType
                    ? 'bg-blue-50 text-blue-600 border-blue-200 transform scale-105'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }
                  ${filterType === 'all' ? 'rounded-l-lg' : ''}
                  ${filterType === 'taken' ? 'rounded-r-lg' : ''}
                `}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto animate-fade-in">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Medication', 'Dosage', 'Schedule', 'Next Dose', 'Status', 'Action'].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedications.length > 0 ? (
                filteredMedications.map((med) => (
                  <tr key={med.id} className="transition-colors duration-300 hover:bg-blue-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center group">
                        <Pill className="flex-shrink-0 h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:scale-110 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                            {med.name}
                          </div>
                          <div className="text-xs text-gray-500">{med.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {med.dosage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {med.schedule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="flex-shrink-0 h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-900">{med.nextDose}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`
                          px-2.5 py-0.5 rounded-full text-xs font-medium
                          transition-all duration-300 transform hover:scale-105
                          ${med.taken
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                          }
                        `}
                      >
                        {med.taken ? 'Taken' : 'Due'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {!med.taken ? (
                        <button
                          onClick={() => handleMedicationAction(med)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 transition-all duration-300 hover:bg-blue-700 hover:shadow-md transform hover:-translate-y-0.5"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Take Now
                        </button>
                      ) : (
                        <span className="text-green-600 flex items-center">
                          <Check className="h-4 w-4 mr-1 animate-bounce-soft" />
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No medications found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 transition-all duration-300 hover:shadow-md animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium flex items-center">
                <Calendar size={16} className="text-blue-500 mr-2" />
                Schedule Overview
              </h3>
              <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-300">
                View Full Schedule
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-2">
              {['Morning', 'Afternoon', 'Evening'].map((time, index) => (
                <div key={time} className="flex justify-between items-center p-2 bg-white rounded border border-gray-100 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50">
                  <span className="text-sm">{time} Medications</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    index === 0 ? 'bg-green-100 text-green-800' :
                    index === 1 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {index === 0 ? 'Completed' :
                     index === 1 ? 'Due at 1:00 PM' :
                     '8:00 PM'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md animate-fade-in">
            <div className="flex items-center mb-2">
              <Bell size={16} className="text-orange-500 mr-2" />
              <h3 className="font-medium">Medication Reminders</h3>
            </div>
            <div className="space-y-2">
              {['Voice Reminders', 'Mobile Notifications', 'Caregiver Alerts'].map((reminder) => (
                <div key={reminder} className="flex items-center justify-between group">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 h-4 w-4 transition-all duration-300"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-700 transition-colors duration-300 group-hover:text-blue-600">
                      {reminder}
                    </span>
                  </label>
                  <span className="text-xs text-gray-500">Active</span>
                </div>
              ))}
              <button className="mt-2 w-full text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5">
                Customize Reminders
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full transform transition-all duration-300 scale-100">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Pill className="h-6 w-6 text-blue-600 animate-bounce-soft" />
              </div>
              <h3 className="text-lg font-medium ml-3">Confirm Medication</h3>
            </div>
            <p className="mb-4">
              Are you about to take <span className="font-medium">{currentMed?.name} {currentMed?.dosage}</span>?
            </p>
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Scheduled time: <span className="font-medium">{currentMed?.nextDose}</span>
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Current time: <span className="font-medium">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmMedicationTaken}
                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-md transform hover:-translate-y-0.5"
              >
                Confirm Taken
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicationTracker;