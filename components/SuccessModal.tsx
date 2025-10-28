"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center"
      >
        <div className="flex flex-col items-center space-y-3">
          <CheckCircle className="text-green-500 w-10 h-10" />
          <h2 className="text-lg font-semibold text-gray-800">
            Payment Successful!
          </h2>
          <p className="text-gray-600">
            Thank you for supporting <span className="font-semibold text-gray-800">SkyScout</span>.
            <br />
            Your funding receipt has been sent to your email.
          </p>
          <button
            onClick={onClose}
            className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessModal;
