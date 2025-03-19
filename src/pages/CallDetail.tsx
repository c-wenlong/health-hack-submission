
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getCallById, getFollowUpActions } from '../services/callDataService';
import { formatDateTime } from '../utils/dateUtils';
import { Phone, Check, X, AlertCircle, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { generatePDF } from '../utils/pdfGenerator';

const CallDetail: React.FC = () => {
  const { callId } = useParams<{ callId: string }>();
  const call = callId ? getCallById(callId) : undefined;
  const followUpActions = callId ? getFollowUpActions(callId) : [];

  const handleDownload = () => {
    if (call) {
      generatePDF(call);
    }
  };

  if (!call) {
    return (
      <Layout title="Call Not Found" showBackButton={true}>
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-medium mb-2">Call Not Found</h2>
          <p className="text-gray-600 mb-6">The call you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/call-history" 
            className="px-6 py-2 bg-clinical-blue text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Return to Call History
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Call Detail" showBackButton={true}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-clinical-blue" />
              <h2 className="text-2xl font-medium">Call Detail</h2>
            </div>
            <p className="text-gray-500 mt-1">
              {formatDateTime(call.date)}
            </p>
          </div>
          
          {call.status === 'completed' && (
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
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium">Date & Time</p>
                  <p className="text-sm text-gray-600">{formatDateTime(call.date)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm text-gray-600">
                    {call.status === 'completed' ? call.duration : 'No duration'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center 
                  ${call.status === 'completed' ? 'bg-green-100 text-green-600' : 
                    call.status === 'missed' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  {call.status === 'completed' ? <Check className="w-3 h-3" /> : 
                    call.status === 'missed' ? <X className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm text-gray-600">
                    {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {call.status === 'completed' && call.summary && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Call Summary</CardTitle>
                <CardDescription>AI-Generated summary of the call</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-700">Medication Adherence</dt>
                    <dd className="mt-1 text-sm text-gray-900">{call.summary.medicationAdherence}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-700">Symptoms Reported</dt>
                    <dd className="mt-1 text-sm text-gray-900">{call.summary.symptomsReported}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-700">Follow-up Required</dt>
                    <dd className="mt-1 text-sm text-gray-900">{call.summary.followUpRequired}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {followUpActions.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Follow-up Actions</CardTitle>
                  <CardDescription>Tasks to complete based on the call</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Action</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {followUpActions.map((action) => (
                        <TableRow key={action.id}>
                          <TableCell>{action.description}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${action.priority === 'high' ? 'bg-red-100 text-red-800' : 
                                action.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-green-100 text-green-800'}`}>
                              {action.priority.charAt(0).toUpperCase() + action.priority.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>{action.dueDate}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${action.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {action.completed ? 'Completed' : 'Pending'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-6">
          <Link 
            to="/call-history" 
            className="w-full sm:w-auto px-6 py-3 bg-white border border-clinical-blue text-clinical-blue rounded-full hover:bg-blue-50 transition-colors duration-200 text-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2 inline" />
            Back to Call History
          </Link>
          
          <Link 
            to="/" 
            className="w-full sm:w-auto px-6 py-3 bg-clinical-blue text-white rounded-full hover:bg-blue-600 transition-colors duration-200 text-center"
          >
            <Phone className="w-5 h-5 mr-2 inline" />
            Start New Call
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CallDetail;
