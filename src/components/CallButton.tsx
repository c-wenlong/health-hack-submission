
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, PhoneCall, PhoneOff } from 'lucide-react';

type CallStatus = 'idle' | 'connecting' | 'connected' | 'completed';

interface CallButtonProps {
  onCallComplete?: () => void;
}

const CallButton: React.FC<CallButtonProps> = ({ onCallComplete }) => {
  const [status, setStatus] = useState<CallStatus>('idle');
  const navigate = useNavigate();

  const handleCall = () => {
    // Simulate call flow
    setStatus('connecting');
    
    setTimeout(() => {
      setStatus('connected');
      
      // Simulate call duration
      setTimeout(() => {
        setStatus('completed');
        
        // Navigate to summary page after call completion
        setTimeout(() => {
          if (onCallComplete) {
            onCallComplete();
          } else {
            navigate('/summary');
          }
        }, 1000);
      }, 3000);
    }, 2000);
  };

  // Define styles and content based on status
  const getButtonContent = () => {
    switch (status) {
      case 'connecting':
        return (
          <>
            <Phone className="animate-pulse mr-2" />
            Connecting...
          </>
        );
      case 'connected':
        return (
          <>
            <PhoneCall className="mr-2 text-green-500" />
            Call in Progress
          </>
        );
      case 'completed':
        return (
          <>
            <PhoneOff className="mr-2" />
            Call Ended
          </>
        );
      default:
        return (
          <>
            <Phone className="mr-2" />
            Start Call
          </>
        );
    }
  };

  const getButtonClass = () => {
    const baseClass = "flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 text-lg";
    
    switch (status) {
      case 'connecting':
        return `${baseClass} bg-blue-100 text-clinical-blue`;
      case 'connected':
        return `${baseClass} bg-green-100 text-green-700 border border-green-200`;
      case 'completed':
        return `${baseClass} bg-gray-100 text-gray-600`;
      default:
        return `${baseClass} bg-clinical-blue text-white hover:bg-blue-600 shadow-lg hover:shadow-xl`;
    }
  };

  return (
    <div className="flex flex-col items-center animate-slide-in">
      <button
        className={getButtonClass()}
        onClick={handleCall}
        disabled={status !== 'idle'}
      >
        {getButtonContent()}
      </button>
      
      {status !== 'idle' && (
        <div className="mt-4 text-sm text-gray-600 animate-fade-in">
          {status === 'connecting' && 'Initiating secure connection...'}
          {status === 'connected' && 'Recording call for AI analysis...'}
          {status === 'completed' && 'Generating AI summary...'}
        </div>
      )}
    </div>
  );
};

export default CallButton;
