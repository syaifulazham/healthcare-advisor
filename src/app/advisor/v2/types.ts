// app/types.ts
export interface HealthConcern {
    id: string;
    label: string;
  }
  
  export interface VitalSigns {
    heartRate?: number;
    bloodPressure?: string;
    oxygenSaturation?: number;
    bodyTemperature?: number;
  }
  
  export interface Prescription {
    medicine: string;
    dose?: string;
    frequency?: string;
  }
  
  export interface HealthAdvice {
    prescriptions: Prescription[];
    followUpActions: string[];
  }
  