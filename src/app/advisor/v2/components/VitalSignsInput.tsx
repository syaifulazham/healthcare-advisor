// app/components/VitalSignsInput.tsx
import { useState } from 'react';
import { VitalSigns } from '../types';

export default function VitalSignsInput({
  onVitalSignsChange,
}: {
  onVitalSignsChange: (vitalSigns: VitalSigns) => void;
}) {
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({});

  const handleChange = (field: keyof VitalSigns, value: string) => {
    const newVitalSigns = {
      ...vitalSigns,
      [field]: value === '' ? undefined : Number(value),
    };
    setVitalSigns(newVitalSigns);
    onVitalSignsChange(newVitalSigns);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Vital Signs (Optional)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Heart Rate (bpm)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => handleChange('heartRate', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Blood Pressure (mmHg)
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="120/80"
            onChange={(e) => handleChange('bloodPressure', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Oxygen Saturation (%)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => handleChange('oxygenSaturation', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Body Temperature (°F)
          </label>
          <input
            type="number"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => handleChange('bodyTemperature', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}