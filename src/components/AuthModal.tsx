import React from 'react';
import { X, Lock } from 'lucide-react'; // 👈 Import the clean icons here

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 1. Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* 2. Modal Content Container */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl transition-all dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modern Lock/Shield Icon */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 shadow-sm">
          <Lock className="h-6 w-6" />
        </div>

        {/* Typography */}
        <h3 className="mt-4 text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Authentication Required
        </h3>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          You need an active account to purchase assets, manage transactions, or
          access premium creator flows.
        </p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row-reverse">
          <a
            href="/auth/login"
            className="flex w-full justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors sm:w-auto flex-1"
          >
            Sign In
          </a>
          <button
            onClick={onClose}
            className="flex w-full justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-4 py-2.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors sm:w-auto flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
