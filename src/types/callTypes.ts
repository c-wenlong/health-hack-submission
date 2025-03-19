
export interface CallRecord {
  id: string;
  date: string;
  duration: string;
  status: 'completed' | 'missed' | 'cancelled';
  patient: {
    name: string;
    id: string;
  };
  summary?: {
    medicationAdherence: string;
    symptomsReported: string;
    followUpRequired: string;
  };
  notes?: string;
}

export interface FollowUpAction {
  id: string;
  description: string;
  dueDate: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}
