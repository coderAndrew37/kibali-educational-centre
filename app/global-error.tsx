"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, ShieldAlert, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="bg-[#0A0A0A] min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Brand Icon */}
          <div className="relative inline-block">
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-[#C5A059] blur-2xl rounded-full"
            />
            <div className="relative bg-[#111111] p-6 rounded-full border border-white/10">
              <ShieldAlert
                className="w-10 h-10 text-[#C5A059]"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-serif text-white tracking-tight">
              Systems Encountered an Interruption
            </h1>
            <p className="text-sm text-white/50 leading-relaxed">
              We apologize for the inconvenience. A technical discrepancy has
              occurred. Our team has been notified.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#C5A059] hover:bg-[#B48F48] text-black text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              Attempt Recovery
            </button>

            <a
              href="/"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all border border-white/10"
            >
              <Home className="w-3.5 h-3.5" />
              Return Home
            </a>
          </div>

          <p className="text-[9px] text-white/20 uppercase tracking-[0.3em] pt-8">
            Kibali Educational Centre • Infrastructure Monitoring
          </p>
        </div>
      </body>
    </html>
  );
}
