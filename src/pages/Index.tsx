
import React from 'react';
import Layout from '../components/Layout';
import PatientProfile from '../components/PatientProfile';
import CallButton from '../components/CallButton';

const Index: React.FC = () => {
  return (
    <Layout title="Patient Dashboard">
      <div className="space-y-8">
        <section className="mb-8">
          <PatientProfile />
        </section>
        
        <section className="py-6 flex flex-col items-center justify-center">
          <h2 className="text-xl font-medium text-center mb-6">Ready to Connect with Patient</h2>
          <CallButton />
        </section>
        
        <section className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-100">
          <h3 className="text-lg font-medium mb-4">About this Clinical Call</h3>
          <p className="text-gray-700 mb-4">
            This simulation demonstrates an AI-powered clinical assistant that can:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Facilitate remote patient check-ins</li>
            <li>Record and analyze conversation for key clinical data</li>
            <li>Generate structured summaries with medical insights</li>
            <li>Identify follow-up needs and medication issues</li>
          </ul>
          <p className="text-sm text-gray-500 mt-4">
            This is a prototype for demonstration purposes. In a production environment, this would connect to Twilio for real call functionality.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
