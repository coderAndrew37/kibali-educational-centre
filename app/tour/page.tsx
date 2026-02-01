import { MapPin, Clock, Coffee, Car } from "lucide-react";
import VisitForm from "../_components/VisitForm";

export default function VisitUs() {
  const visitorInfo = [
    {
      icon: Clock,
      title: "Visiting Hours",
      details: "Mon — Fri: 9:00 AM - 4:00 PM",
      sub: "Saturday by appointment only.",
    },
    {
      icon: Car,
      title: "Parking & Access",
      details: "Designated Visitor Parking",
      sub: "Please check in at the Main Gate security desk.",
    },
    {
      icon: Coffee,
      title: "What to Expect",
      details: "60-Minute Guided Tour",
      sub: "Meet the Dean and view our labs and creative centers.",
    },
  ];

  return (
    <main className="bg-[var(--kibali-bg)] pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* 1. Split Header: Text + Map/Image */}
        <section className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-[var(--kibali-amber)] font-bold">
              Experience Kibali
            </h2>
            <h1 className="text-5xl md:text-6xl font-serif text-[var(--kibali-navy)] leading-tight">
              See our legacy <br />
              <span className="italic text-slate-400">in action.</span>
            </h1>
            <p className="text-slate-600 text-lg font-light leading-relaxed">
              The best way to understand our culture is to walk our halls. Join
              us for a personalized tour to explore our facilities, meet our
              faculty, and see how we nurture the leaders of tomorrow.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              {visitorInfo.map((info, i) => (
                <div key={i} className="space-y-2">
                  <info.icon className="w-5 h-5 text-[var(--kibali-amber)]" />
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-[var(--kibali-navy)]">
                    {info.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-tight">
                    {info.details}
                    <br />
                    {info.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[500px] w-full bg-slate-200">
            {/* Replace with an actual Google Maps Embed or a High-Res Photo of the Gate */}
            <div className="absolute inset-0 bg-slate-300 flex items-center justify-center text-slate-500 font-serif italic">
              Campus Map / Photography
            </div>
            <div className="absolute bottom-6 left-6 bg-[var(--kibali-navy)]  p-6 shadow-xl max-w-xs">
              <MapPin className="w-5 h-5 text-[var(--kibali-amber)] mb-2" />
              <p className="text-sm font-light">
                Lang'ata Road, Karen South. Look for the Kibali signage 200m
                after the bypass junction.
              </p>
            </div>
          </div>
        </section>

        {/* 2. The Booking Form Section */}
        <section className="bg-white border border-slate-100 shadow-sm grid lg:grid-cols-3">
          <div className="p-12 lg:p-16 lg:col-span-1 bg-[var(--kibali-navy)] text-white">
            <h3 className="text-3xl font-serif mb-6">Schedule Your Visit</h3>
            <p className="text-white/60 font-light mb-8 text-sm leading-relaxed">
              Please select your preferred date. Our admissions officer will
              contact you to confirm the time slot.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[var(--kibali-amber)] font-bold">
                  1
                </div>
                <span className="text-xs uppercase tracking-widest">
                  Select Date
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[var(--kibali-amber)] font-bold">
                  2
                </div>
                <span className="text-xs uppercase tracking-widest">
                  Receive Confirmation
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[var(--kibali-amber)] font-bold">
                  3
                </div>
                <span className="text-xs uppercase tracking-widest">
                  Campus Tour
                </span>
              </div>
            </div>
          </div>

          <div className="p-12 lg:p-16 lg:col-span-2">
            <VisitForm />
          </div>
        </section>
      </div>
    </main>
  );
}
