"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ConfirmFundingModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: string;
  amount: string;
  method: string;
  onConfirm: () => void;
}

export default function ConfirmFundingModal({
  isOpen,
  onClose,
  project,
  amount,
  method,
  onConfirm,
}: ConfirmFundingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
        
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />

          {/* Modal */}
          <motion.div
            className="relative z-50 w-[90%] max-w-md rounded-xl bg-white p-6 shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-lg font-semibold mb-4 text-center">
              Confirm Your Funding
            </h2>

            <div className="space-y-2 mb-6">
              <p>
                <strong>Project:</strong>{" "}
                <span className="text-blue-700 underline">{project}</span>
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                <span className="text-blue-700">${amount}</span>
              </p>
              <p>
                <strong>Payment Method:</strong>{" "}
                <span className="text-blue-700 underline">{method}</span>
              </p>
            </div>

            <button
              onClick={onConfirm} 
              className="w-full rounded-md bg-emerald-500 py-2 text-white font-semibold hover:bg-emerald-600 transition-colors"
            >
              Confirm & Pay
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
