'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaPrint } from 'react-icons/fa';
import { BiAnalyse } from "react-icons/bi";

const DoctorAssistant = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [markdown, setMarkdown] = useState<string>('');
  const [language, setLanguage] = useState('English');
  const [error, setError] = useState<string | null>(null);

  const languages = ['Bahasa Malaysia', 'Bahasa Indonesia', 'English', 'Mandarin', 'Tamil'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMarkdown('');
    setError(null);

    try {
      const response = await fetch('/api/analyzeSymptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statement: inputText, language }),
      });
    
      if (!response.body) {
        throw new Error('No response body from the server.');
      }
    
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
    
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
    
        const chunk = decoder.decode(value, { stream: true });
        setMarkdown((prev) => prev + chunk);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error during streaming:', err.message);
        setError('A network error occurred. Please try again.');
      } else {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Doctor Assistant</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="language" className="mr-2">Language:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your statement..."
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          rows={4}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!inputText || loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin inline-block mr-2" />
          ) : (
            <BiAnalyse className="inline-block mr-2" />
          )}
          Analyze
        </button>
      </form>

      {loading && (
        <div className="mt-6 text-center text-gray-500">
          <AiOutlineLoading3Quarters className="animate-spin inline-block" />
          <p>Processing...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 text-red-500 text-center">
          <p>{error}</p>
        </div>
      )}

      {markdown && (
        <div className="result mt-6 p-4 bg-white border rounded-lg shadow-sm prose prose-blue">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      )}

      {markdown && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="mt-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition ml-auto"
          >
            <FaPrint className="inline-block mr-2" />
            Print
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorAssistant;
