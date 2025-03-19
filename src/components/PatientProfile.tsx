
import React from 'react';
import { Calendar, Clock, Activity, Heart, User } from 'lucide-react';

const PatientProfile: React.FC = () => {
  return (
    <div className="clinical-card p-6 mb-8 animate-scale-in">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="md:w-1/4 flex justify-center md:justify-start">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-clinical-gray flex items-center justify-center shadow-sm border border-gray-200">
            <User className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
          </div>
        </div>
        
        <div className="md:w-3/4">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-clinical-blue/10 text-clinical-blue text-xs rounded-full font-medium mb-2">
              Scheduled Call
            </span>
            <h2 className="text-2xl font-medium text-clinical-dark">Sarah Johnson</h2>
            <p className="text-gray-500 mt-1">Patient ID: #24601</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-clinical-blue mr-2" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">May 12, 1975 (48y)</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-clinical-blue mr-2" />
              <div>
                <p className="text-sm text-gray-500">Last Visit</p>
                <p className="font-medium">October 2, 2023</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-clinical-blue mr-2" />
              <div>
                <p className="text-sm text-gray-500">Primary Condition</p>
                <p className="font-medium">Type 2 Diabetes</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Heart className="w-5 h-5 text-clinical-blue mr-2" />
              <div>
                <p className="text-sm text-gray-500">Current Status</p>
                <p className="font-medium">Stable - Monitoring</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-sm font-medium mb-2">Current Medications</h3>
            <ul className="text-sm space-y-1">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-clinical-blue rounded-full mr-2"></span>
                Metformin 1000mg twice daily
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-clinical-blue rounded-full mr-2"></span>
                Lisinopril 10mg once daily
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-clinical-blue rounded-full mr-2"></span>
                Simvastatin 20mg once daily
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
