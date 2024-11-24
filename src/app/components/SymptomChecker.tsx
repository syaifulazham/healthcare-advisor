// app/components/SymptomChecker.tsx
'use client';
import { useState } from 'react';
import Question from './Question';
import Prescription from './Prescription';

const SymptomChecker = ({ onReset }: { onReset: () => void }) => {
  const [step, setStep] = useState(0);
  const [prescription, setPrescription] = useState<0 |1 | 2 | null>(0);

  const handleAnswer = (answer: boolean) => {
    if (step === 0 && !answer) return setPrescription(0); // No symptoms, continue trip
    if (step === 1 && answer) return setPrescription(1); // Fever present, go to Prescription 1
    if (step === 2 && answer) return setPrescription(1); // Bloody stool present, go to Prescription 1
    if (step === 2 && !answer) return setPrescription(2); // No bloody stool, go to Prescription 2

    setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setPrescription(null);
    onReset();
  };

  if (prescription) {
    return (
      <div className="flex flex-col w-full">
        <Prescription type={prescription} />
        <button onClick={reset} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-auto">
          Reset
        </button>
      </div>
    );
  } else if (step === 0 && prescription === null) {
    return (
      <div className="flex flex-col w-full">
        <p>You&#39;re good to go! Continue your trip.</p>
        <button onClick={reset} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-auto">
          Reset
        </button>
      </div>
    );
  }

  const questions = [
    'Do you have symptoms like nausea, watery diarrhea, or abdominal cramps?',
    'Do you have a fever?',
    'Do you have bloody stool?',
  ];

  return (
    <div className="flex flex-col w-full">
      <Question question={questions[step]} onAnswer={handleAnswer} />
      <button onClick={reset} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-auto">
        Reset
      </button>
    </div>
  );
};

export default SymptomChecker;
