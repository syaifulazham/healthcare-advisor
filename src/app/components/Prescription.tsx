// app/components/Prescription.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Result from './Result';

interface PrescriptionProps {
  type: 0 |1 | 2;
}

const Prescription: React.FC<PrescriptionProps> = ({ type }) => {
  const [stillUnwell, setStillUnwell] = useState<boolean | null>(null);

  const prescriptionText =
    type === 1
      ? 'Take fluids, glucose electrolyte solution, and antibiotics (Norfloxacin or Ciprofloxacin).'
      : 'Take fluids and either Imodium or Lomotil.';

  if (stillUnwell !== null) {
    if (stillUnwell) {
      return type === 1 ? (
        <Result message="Seek medical advice and conduct further tests for amoebae, giardiasis, salmonella, drug-resistant organisms, or other causes." />
      ) : (
        <Prescription type={1} />
      );
    } else {
      return <Result message="Continue your trip." />;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Prescription {type}</h2>
      <p className="text-gray-700 mb-6">{prescriptionText}</p>
      <p className="text-gray-800 mb-4">Are you still unwell after 48 hours?</p>
      <div className="flex gap-4">
        <button
          onClick={() => setStillUnwell(true)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Yes
        </button>
        <button
          onClick={() => setStillUnwell(false)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          No
        </button>
      </div>
    </motion.div>
  );
};

export default Prescription;
