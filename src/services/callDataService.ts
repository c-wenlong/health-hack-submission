
import { CallRecord, FollowUpAction } from "../types/callTypes";

// Mock call history data
const mockCallHistory: CallRecord[] = [
  {
    id: "call-1",
    date: "2023-10-15T14:30:00Z",
    duration: "12:45",
    status: "completed",
    patient: {
      name: "Sarah Johnson",
      id: "pt-001"
    },
    summary: {
      medicationAdherence: "Patient reports taking all medications as prescribed",
      symptomsReported: "Mild foot numbness and occasional fatigue",
      followUpRequired: "Recommended within 30 days"
    }
  },
  {
    id: "call-2",
    date: "2023-09-28T10:15:00Z",
    duration: "08:20",
    status: "completed",
    patient: {
      name: "Sarah Johnson",
      id: "pt-001"
    },
    summary: {
      medicationAdherence: "Missed evening doses twice this week",
      symptomsReported: "Increased thirst and mild headaches",
      followUpRequired: "Recommended within 14 days"
    }
  },
  {
    id: "call-3",
    date: "2023-09-10T16:45:00Z",
    duration: "04:50",
    status: "completed",
    patient: {
      name: "Sarah Johnson",
      id: "pt-001"
    },
    summary: {
      medicationAdherence: "Following medication schedule with occasional missed doses",
      symptomsReported: "Reported improved energy levels, no significant issues",
      followUpRequired: "Routine follow-up in 45 days"
    }
  },
  {
    id: "call-4",
    date: "2023-08-22T09:30:00Z",
    duration: "00:00",
    status: "missed",
    patient: {
      name: "Sarah Johnson",
      id: "pt-001"
    }
  },
  {
    id: "call-5",
    date: "2023-08-15T14:00:00Z",
    duration: "15:10",
    status: "completed",
    patient: {
      name: "Sarah Johnson",
      id: "pt-001"
    },
    summary: {
      medicationAdherence: "Following medication schedule with no missed doses",
      symptomsReported: "Experiencing increased fatigue in the afternoons",
      followUpRequired: "Scheduled for 30 day check-in"
    }
  }
];

// Mock follow-up actions data
const mockFollowUpActions: Record<string, FollowUpAction[]> = {
  "call-1": [
    {
      id: "action-1-1",
      description: "Schedule follow-up appointment with endocrinologist",
      dueDate: "2023-11-15",
      completed: false,
      priority: "high"
    },
    {
      id: "action-1-2",
      description: "Order HbA1c test before next appointment",
      dueDate: "2023-11-01",
      completed: true,
      priority: "medium"
    },
    {
      id: "action-1-3",
      description: "Review foot care practices at next appointment",
      dueDate: "2023-11-15",
      completed: false,
      priority: "medium"
    }
  ],
  "call-2": [
    {
      id: "action-2-1",
      description: "Adjust evening medication schedule",
      dueDate: "2023-10-05",
      completed: true,
      priority: "high"
    },
    {
      id: "action-2-2",
      description: "Monitor headache frequency and severity",
      dueDate: "2023-10-12",
      completed: true,
      priority: "medium"
    }
  ],
  "call-3": [
    {
      id: "action-3-1",
      description: "Continue current medication regimen",
      dueDate: "2023-10-25",
      completed: false,
      priority: "medium"
    }
  ],
  "call-5": [
    {
      id: "action-5-1",
      description: "Discuss fatigue patterns with primary physician",
      dueDate: "2023-09-15",
      completed: true,
      priority: "medium"
    },
    {
      id: "action-5-2",
      description: "Review daily activity schedule",
      dueDate: "2023-09-01",
      completed: true,
      priority: "low"
    }
  ]
};

export const getCallHistory = (): CallRecord[] => {
  return [...mockCallHistory].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

export const getCallById = (callId: string): CallRecord | undefined => {
  return mockCallHistory.find(call => call.id === callId);
};

export const getFollowUpActions = (callId: string): FollowUpAction[] => {
  return mockFollowUpActions[callId] || [];
};
