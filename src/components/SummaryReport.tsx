import React, { useState, useEffect } from 'react';
import { Check, X, AlertCircle, Clock, Calendar } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';
import { Button } from '@/components/ui/button';
import { getCallById } from '../services/callDataService';

const SummaryReport: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    // Use a sample call for the PDF generation in this component
    const sampleCall = getCallById('call-1');
    if (sampleCall) {
      generatePDF(sampleCall);
    }
  };

  if (loading) {
    return (
      <div className="clinical-card p-8 flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-12 h-12 border-4 border-clinical-blue border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Generating AI summary...</p>
      </div>
    );
  }

  return (
    <div className="clinical-card p-6 md:p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="md:w-full">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-50 text-clinical-blue text-xs rounded-full font-medium mb-2">
                AI-Generated Report
              </span>
              <h2 className="text-2xl font-medium text-clinical-dark">Call Summary</h2>
              <p className="text-gray-500 mt-1">Patient: Sarah Johnson | October 15, 2023</p>
            </div>
            
            <Button 
              onClick={handleDownload}
              variant="default"
              className="mt-4 md:mt-0 bg-clinical-blue hover:bg-blue-600"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-green-800">Medication Adherence</h3>
                  <p className="text-sm text-green-700 mt-1">Patient reports taking all medications as prescribed</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Symptoms Reported</h3>
                  <p className="text-sm text-yellow-700 mt-1">Mild foot numbness and occasional fatigue</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Follow-up Required</h3>
                  <p className="text-sm text-blue-700 mt-1">Recommended within 30 days</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Key Discussion Points</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Blood Sugar Monitoring</h4>
                <p className="text-sm text-gray-700">
                  Patient reports average morning readings of 130-150 mg/dL, slightly higher than target range. 
                  Evening readings remain within normal limits (100-120 mg/dL). Discussed potential adjustment to morning medication timing.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Diet and Exercise</h4>
                <p className="text-sm text-gray-700">
                  Patient has maintained consistent walking routine (30 minutes daily) but reports challenges with dietary restrictions during recent family gatherings. 
                  Provided strategies for managing carbohydrate intake during social events.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Medication Side Effects</h4>
                <p className="text-sm text-gray-700">
                  Patient reports occasional mild nausea with Metformin when taken before meals. 
                  Advised to take medication with food and monitor for improvement. No other side effects reported.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">AI Recommendations</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="bg-clinical-blue/10 p-1 rounded-full mr-2 mt-0.5">
                  <Check className="w-4 h-4 text-clinical-blue" />
                </div>
                <p className="text-sm">Schedule follow-up appointment with endocrinologist within 30 days</p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-clinical-blue/10 p-1 rounded-full mr-2 mt-0.5">
                  <Check className="w-4 h-4 text-clinical-blue" />
                </div>
                <p className="text-sm">Consider HbA1c testing at next visit to evaluate overall glucose control</p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-clinical-blue/10 p-1 rounded-full mr-2 mt-0.5">
                  <Check className="w-4 h-4 text-clinical-blue" />
                </div>
                <p className="text-sm">Review foot care practices and schedule podiatry referral if numbness persists or worsens</p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-clinical-blue/10 p-1 rounded-full mr-2 mt-0.5">
                  <Check className="w-4 h-4 text-clinical-blue" />
                </div>
                <p className="text-sm">Maintain current medication regimen but consider taking Metformin with meals to reduce nausea</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium mb-2">AI Analysis Confidence</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-clinical-blue h-2.5 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              This summary was generated with 92% confidence based on call audio analysis. Always verify medical information with healthcare professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryReport;
