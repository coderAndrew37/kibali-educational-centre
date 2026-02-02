"use client";
import { MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";

export default function FloatingContacts() {
  const [isOpen, setIsOpen] = useState(false);

  // Prefilled WhatsApp Message
  const phoneNumber = "254700000000"; // Replace with actual school number
  const message = encodeURIComponent(
    "Hello Kibali Admissions! I would like to inquire about enrolling my child. Please share more details.",
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end gap-4">
      {/* Expanded Menu */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 transform ${
          isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-10 opacity-0 scale-50 pointer-events-none"
        }`}
      >
        {/* Call Button */}
        <a
          href="tel:+254700000000"
          className="flex items-center gap-3 bg-white text-primary-dark px-6 py-3 rounded-full shadow-2xl border border-slate-100 hover:bg-slate-50 transition-colors group"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">
            Call Office
          </span>
          <div className="bg-primary-dark p-2 rounded-full text-white group-hover:bg-accent group-hover:text-primary-dark transition-colors">
            <Phone size={16} />
          </div>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform group"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">
            Chat on WhatsApp
          </span>
          <div className="bg-white/20 p-2 rounded-full">
            <MessageCircle size={16} fill="white" />
          </div>
        </a>
      </div>

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 ${
          isOpen
            ? "bg-primary-dark text-white rotate-90"
            : "bg-accent text-primary-dark hover:scale-110"
        }`}
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}

        {/* Notification Ping (Only shows when closed) */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}
