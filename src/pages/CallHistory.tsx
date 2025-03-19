
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getCallHistory } from '../services/callDataService';
import { formatDateTime } from '../utils/dateUtils';
import { Phone, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

const CallHistory: React.FC = () => {
  const callHistory = getCallHistory();

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="Call History" showBackButton={true}>
      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {callHistory.map((call) => (
                  <TableRow key={call.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span>{formatDateTime(call.date)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span>
                          {call.status === 'completed' ? call.duration : '-'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(call.status)}`}>
                        {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {call.status === 'completed' ? (
                        <Link
                          to={`/call-detail/${call.id}`}
                          className="inline-flex items-center text-clinical-blue hover:text-clinical-dark transition-colors"
                        >
                          <span className="mr-1">View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <span className="text-gray-400">No summary</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link 
            to="/" 
            className="px-6 py-3 bg-clinical-blue text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            <Phone className="w-5 h-5 mr-2 inline" />
            Start New Call
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CallHistory;
