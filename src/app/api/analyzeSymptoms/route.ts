import { NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: Request) {
  const body = await request.json();
  const { statement, language } = body;

  if (!statement) {
    return NextResponse.json(
      { error: 'Statement is required' },
      { status: 400 }
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [
              {
                role: 'system',
                content: `You are a doctor. Accept only healthcare-related queries. Analyze symptoms from my statement and give diagnosis in a simple possible points and suggest the prescriptions (doses and time to take) in a markdown format. Include tables if possible. Respond in ${language}.`,
              },
              { role: 'user', content: statement },
            ],
            stream: true,
          }),
        });

        if (!response.body) {
          throw new Error('Failed to get response body from OpenAI.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter((line) => line.trim() !== '');
          for (const line of lines) {
            if (line.startsWith('data:')) {
              const json = JSON.parse(line.slice(5));
              const content = json.choices[0]?.delta?.content;
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            }
          }
        }

        // Ensure the stream closes cleanly
        controller.enqueue(encoder.encode("\n\n")); // Signal stream end
        controller.close();
      } catch (error) {
        console.error('Error in SSE:', error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
