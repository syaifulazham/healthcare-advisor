// app/components/Question.tsx

import { motion } from 'framer-motion';
import { FC } from 'react';

interface QuestionProps {
  question: string;
  onAnswer: (answer: boolean) => void;
}

const Question: FC<QuestionProps> = ({ question, onAnswer }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{question}</h2>
      <div className="flex gap-4">
        <button
          onClick={() => onAnswer(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Yes
        </button>
        <button
          onClick={() => onAnswer(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          No
        </button>
      </div>
    </motion.div>
  );
};

export default Question;
