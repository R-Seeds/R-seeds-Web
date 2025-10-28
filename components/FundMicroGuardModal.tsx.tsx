'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FundMicroGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: { amount: string; method: string }) => void;
}

export default function FundMicroGuardModal({ isOpen, onClose, onConfirm }: FundMicroGuardModalProps) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
        
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-50 w-[90%] max-w-md rounded-xl bg-white p-6 shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-lg font-semibold mb-4 text-center">Fund MicroGuard</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Enter Amount (RWF)
              </label>
              <input
                type="number"
                placeholder="e.g 1,000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Payment Method
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="">Select</option>
                <option value="Mobile Money">Mobile Money</option>
                <option value="Credit/Debit Card">Credit/Debit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            <button
              onClick={() => {
                if (amount && method) {
                  onConfirm({ amount, method });
                }
              }}
              className="w-full rounded-md bg-emerald-500 py-2 text-white font-semibold hover:bg-emerald-600 transition-colors"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
