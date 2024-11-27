// app/components/HealthConcernsSelector.tsx
import { useState } from 'react';
import { HealthConcern } from '../types';

const healthConcerns: HealthConcern[] = [
  { id: 'fever', label: 'Fever' },
  { id: 'headache', label: 'Headache' },
  { id: 'stomachache', label: 'Stomach ache' },
  { id: 'runnyNose', label: 'Runny nose' },
  { id: 'cough', label: 'Cough' },
  { id: 'soreThroat', label: 'Sore throat' },
  { id: 'shortnessOfBreath', label: 'Shortness of breath' },
  { id: 'nausea', label: 'Nausea' },
  { id: 'diarrhea', label: 'Diarrhea' },
  { id: 'fatigue', label: 'Fatigue' },
  { id: 'jointPain', label: 'Joint pain' },
  { id: 'muscleAches', label: 'Muscle aches' },
  { id: 'sneezing', label: 'Sneezing' },
];

export default function HealthConcernsSelector({
  onSelectionChange,
}: {
  onSelectionChange: (concerns: string[]) => void;
}) {
  const [selectedConcerns, setSelectedConcerns] = useState<Set<string>>(new Set());

  const toggleConcern = (id: string) => {
    const newSelection = new Set(selectedConcerns);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedConcerns(newSelection);
    onSelectionChange(Array.from(newSelection));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">What is your health concern today?</h2>
      <div className="flex flex-wrap border bg-gray-100 items-center justify-center gap-1">
        {healthConcerns.map((concern) => (
          <button
            key={concern.id}
            onClick={() => toggleConcern(concern.id)}
            className={`px-4 py-2 transition-colors ${
              selectedConcerns.has(concern.id)
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
            }`}
          >
            {concern.label}
          </button>
        ))}
      </div>
    </div>
  );
}