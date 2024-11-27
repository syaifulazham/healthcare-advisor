// app/page.tsx
'use client';

import { useState } from 'react';
import HealthConcernsSelector from './components/HealthConcernsSelector';
import VitalSignsInput from './components/VitalSignsInput';
import { VitalSigns, HealthAdvice, Prescription } from './types';

export default function Home() {
    const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
    const [vitalSigns, setVitalSigns] = useState<VitalSigns>({});
    const [result, setResult] = useState<HealthAdvice | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/health-advice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    concerns: selectedConcerns,
                    vitalSigns,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get health advice');
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Failed to get health advice:', error);
            setError('Failed to get health advice. Please try again.');
        }
        setIsLoading(false);
    };

    const renderPrescription = (prescription: Prescription) => {
        const details = [
            prescription.dose && `${prescription.dose}`,
            prescription.frequency && `${prescription.frequency}`,
        ].filter(Boolean).join(', ');

        return (
            <div className="flex flex-col">
                <span className="font-medium">{prescription.medicine}</span>
                {details && <span className="text-sm text-gray-600">{details}</span>}
            </div>
        );
    };

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold">Health Advisor</h1>
                <VitalSignsInput onVitalSignsChange={setVitalSigns} />
                <HealthConcernsSelector onSelectionChange={setSelectedConcerns} />

                <button
                    onClick={handleSubmit}
                    disabled={selectedConcerns.length === 0 || isLoading}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Getting Advice...' : 'Get Health Advice'}
                </button>

                {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="space-y-4">
                        <div className="p-4 bg-white rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-2">Recommended Prescriptions</h2>
                            <ul className="space-y-2">
                                {result.prescriptions.map((prescription, index) => (
                                    <li key={index} className="p-2 bg-gray-50 rounded">
                                        {renderPrescription(prescription)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-4 bg-white rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-2">Follow-up Actions</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                {result.followUpActions.map((action, index) => (
                                    <li key={index}>{action}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}