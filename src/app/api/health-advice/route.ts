// app/api/health-advice/route.ts
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { concerns, vitalSigns, followUpAnswers } = await request.json();

    const prompt = `Based on the following health information:
    Health concerns: ${concerns.join(', ')}
    Vital signs: ${JSON.stringify(vitalSigns)}
    Additional information: ${JSON.stringify(followUpAnswers)}
    
    Please provide:
    1. Potential medical prescriptions with medicine names, dosages, and frequencies
    2. Recommended follow-up actions
    
    Format the response as JSON with this exact structure:
    {
      "prescriptions": [
        {
          "medicine": "Medicine Name",
          "dose": "Dosage (if applicable)",
          "frequency": "How often to take (if applicable)"
        }
      ],
      "followUpActions": [
        "Action 1",
        "Action 2"
      ]
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json(response);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' }, 
      { status: 500 }
    );
  }
}