// app/advisor/page.tsx
'use client';
import { useState } from 'react';
import SymptomChecker from '../components/SymptomChecker';

const AdvisorPage = () => {
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setKey((prevKey) => prevKey + 1); // Changing the key forces the component to re-render
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Traveler Health Advisor</h1>
      <div className="w-full max-w-md">
        <SymptomChecker key={key} onReset={handleReset} />
      </div>
    </div>
  );
};

export default AdvisorPage;
