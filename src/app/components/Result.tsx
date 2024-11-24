// app/components/Result.tsx

import { FC } from 'react';
import { motion } from 'framer-motion';

interface ResultProps {
  message: string;
}

const Result: FC<ResultProps> = ({ message }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center p-6 bg-green-100 text-green-800 rounded-lg shadow-md"
  >
    <h2 className="text-xl font-semibold">{message}</h2>
  </motion.div>
);

export default Result;
