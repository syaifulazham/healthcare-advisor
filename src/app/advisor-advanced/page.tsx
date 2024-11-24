import React from 'react';
import DoctorAssistant from '../components/DoctorAssistant';

const AdvisorAdvancedPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">
          Advanced Health Advisor
        </h1>
        <div className="text-center text-gray-600 mb-6 px-10">
          Enter your symptoms or health-related concerns, and get tailored advice on symptoms, diseases, prescriptions, and follow-ups.
        </div>
        <DoctorAssistant />
      </div>
    </div>
  );
};

export default AdvisorAdvancedPage;
