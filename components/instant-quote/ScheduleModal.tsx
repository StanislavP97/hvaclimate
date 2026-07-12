"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ScheduleModalProps {
  onClose: () => void;
}

export function ScheduleModal({ onClose }: ScheduleModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-[20px] border border-[#e6ebf1] bg-white p-8 shadow-xl"
      >
        <h2 className="text-xl font-semibold text-[#172345]">
          Ready to schedule your install?
        </h2>
        <p className="mt-2 text-[#374151]">We&apos;ll set up your free in-home visit</p>

        <Link
          href="/contact"
          className="mt-6 block w-full rounded-xl bg-[#F97316] px-6 py-3 text-center font-medium text-white transition-colors hover:bg-[#ea580c]"
        >
          Schedule my install →
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full text-center text-sm text-[#374151] underline underline-offset-2 hover:text-[#2563EB]"
        >
          Not ready yet
        </button>
      </motion.div>
    </div>
  );
}
