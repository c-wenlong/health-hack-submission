
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SummaryReport from '../components/SummaryReport';
import { ListIcon } from 'lucide-react';

const Summary: React.FC = () => {
  return (
    <Layout title="Call Summary" showBackButton={true}>
      <div className="space-y-8">
        <section className="mb-8">
          <SummaryReport />
        </section>
        
        <section className="flex flex-col md:flex-row items-center justify-center gap-4 py-6">
          <Link 
            to="/call-history" 
            className="px-6 py-3 bg-white border border-clinical-blue text-clinical-blue rounded-full hover:bg-blue-50 transition-colors duration-200"
          >
            <ListIcon className="w-5 h-5 mr-2 inline" />
            View Call History
          </Link>
          
          <Link 
            to="/" 
            className="px-6 py-3 bg-clinical-blue text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            Start New Call
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default Summary;
