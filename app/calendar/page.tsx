"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Bell,
  MapPin,
  Users,
  Trophy,
  BookOpen,
  Music,
  Palette,
  Download,
  Share2,
  Filter,
  Clock,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import PageHero from "../_components/PageHero";

// ─── Data ─────────────────────────────────────────────────────────────────────

const events = [
  {
    id: 1,
    title: "First Term Begins",
    date: "2024-01-08",
    time: "7:30 AM",
    duration: "Full day",
    type: "academic",
    location: "Main Campus",
    description:
      "Welcome back students! Orientation and distribution of books.",
    color: "bg-blue-100 border-blue-300 text-blue-800",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    date: "2024-01-15",
    time: "2:00 PM - 5:00 PM",
    duration: "3 hours",
    type: "parent",
    location: "School Hall",
    description: "Meet your child's teachers and discuss academic progress.",
    color: "bg-emerald-100 border-emerald-300 text-emerald-800",
    icon: Users,
  },
  {
    id: 3,
    title: "Inter-School Sports Tournament",
    date: "2024-01-20",
    time: "8:00 AM - 4:00 PM",
    duration: "Full day",
    type: "sports",
    location: "School Field",
    description: "Annual sports competition with neighboring schools.",
    color: "bg-amber-100 border-amber-300 text-amber-800",
    icon: Trophy,
  },
  {
    id: 4,
    title: "Science Fair",
    date: "2024-02-10",
    time: "9:00 AM - 3:00 PM",
    duration: "6 hours",
    type: "academic",
    location: "Science Labs",
    description: "Students showcase their scientific projects and innovations.",
    color: "bg-purple-100 border-purple-300 text-purple-800",
    icon: BookOpen,
  },
  {
    id: 5,
    title: "Music Festival",
    date: "2024-02-15",
    time: "10:00 AM - 2:00 PM",
    duration: "4 hours",
    type: "arts",
    location: "Auditorium",
    description: "Annual music competition and performances.",
    color: "bg-pink-100 border-pink-300 text-pink-800",
    icon: Music,
  },
  {
    id: 6,
    title: "Mid-Term Break",
    date: "2024-02-26",
    time: "All day",
    duration: "1 week",
    type: "holiday",
    location: "N/A",
    description: "School closed for mid-term break.",
    color: "bg-slate-100 border-slate-300 text-slate-700",
    icon: CalendarIcon,
  },
  {
    id: 7,
    title: "Art Exhibition",
    date: "2024-03-05",
    time: "11:00 AM - 4:00 PM",
    duration: "5 hours",
    type: "arts",
    location: "Art Room",
    description: "Display of student artwork from throughout the term.",
    color: "bg-pink-100 border-pink-300 text-pink-800",
    icon: Palette,
  },
  {
    id: 8,
    title: "End of Term Exams",
    date: "2024-03-15",
    time: "8:00 AM - 1:00 PM",
    duration: "All week",
    type: "academic",
    location: "Classrooms",
    description: "Terminal examinations for all grades.",
    color: "bg-blue-100 border-blue-300 text-blue-800",
    icon: BookOpen,
  },
  {
    id: 9,
    title: "Prize Giving Day",
    date: "2024-03-22",
    time: "10:00 AM - 1:00 PM",
    duration: "3 hours",
    type: "ceremony",
    location: "School Hall",
    description: "Award ceremony for outstanding students.",
    color: "bg-red-100 border-red-300 text-red-800",
    icon: Trophy,
  },
  {
    id: 10,
    title: "First Term Ends",
    date: "2024-03-29",
    time: "12:00 PM",
    duration: "Half day",
    type: "academic",
    location: "School",
    description: "School closes for April holidays.",
    color: "bg-blue-100 border-blue-300 text-blue-800",
    icon: CalendarIcon,
  },
];

const eventTypes = [
  { id: "all", label: "All Events", dot: "bg-primary-dark" },
  { id: "academic", label: "Academic", dot: "bg-blue-400" },
  { id: "sports", label: "Sports", dot: "bg-amber-400" },
  { id: "arts", label: "Arts & Culture", dot: "bg-pink-400" },
  { id: "parent", label: "Parent Events", dot: "bg-emerald-400" },
  { id: "holiday", label: "Holidays", dot: "bg-slate-400" },
  { id: "ceremony", label: "Ceremonies", dot: "bg-red-400" },
];

const termDates = [
  {
    term: "Term 1",
    start: "January 8, 2024",
    end: "March 29, 2024",
    weeks: "12 weeks",
  },
  {
    term: "Term 2",
    start: "May 6, 2024",
    end: "July 26, 2024",
    weeks: "12 weeks",
  },
  {
    term: "Term 3",
    start: "September 9, 2024",
    end: "November 29, 2024",
    weeks: "12 weeks",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SchoolCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredEvents = events.filter(
    (e) => selectedFilter === "all" || e.type === selectedFilter,
  );

  const upcomingEvents = filteredEvents
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const navigateMonth = (dir: "prev" | "next") => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + (dir === "next" ? 1 : -1));
    setCurrentDate(d);
  };

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        image="/campus-1.jpg"
        eyebrow="Academic Year 2024"
        title="School Calendar"
        accentWord="Calendar"
        tagline="Stay updated with all academic, sports, and cultural events throughout the year."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Calendar", href: "#" },
        ]}
        overlayOpacity={0.68}
        minHeight="52vh"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* ── Top controls bar ───────────────────────────────────────────── */}
        <div className="mb-10 md:mb-12 space-y-5">
          {/* Title + action buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-primary-dark uppercase tracking-tight">
                Academic Calendar 2024
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Term 1: January – March
              </p>
            </div>

            {/* Action buttons — scroll on mobile */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
              {/* Filter select */}
              <div className="flex items-center gap-2 shrink-0 bg-surface border border-slate-200 px-4 py-2.5">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  aria-label="Filter events"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-primary-dark text-sm font-bold"
                >
                  {eventTypes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() =>
                  alert("Calendar download would be implemented here")
                }
                className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-surface border border-slate-200 hover:border-accent hover:bg-accent/5 transition-colors text-sm font-bold text-primary-dark"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>

              <button className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-surface border border-slate-200 hover:border-accent hover:bg-accent/5 transition-colors text-sm font-bold text-primary-dark">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>

          {/* Month navigator */}
          <div className="flex items-center justify-between bg-surface border border-slate-100 px-5 py-4">
            <button
              onClick={() => navigateMonth("prev")}
              className="flex items-center gap-1.5 text-sm font-black uppercase tracking-wider text-primary-dark hover:text-accent transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <div className="text-center">
              <p className="text-lg md:text-xl font-black text-primary-dark uppercase tracking-tighter">
                {monthName}
              </p>
            </div>

            <button
              onClick={() => navigateMonth("next")}
              className="flex items-center gap-1.5 text-sm font-black uppercase tracking-wider text-primary-dark hover:text-accent transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Main layout ────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Event type filters */}
              <div className="bg-surface border border-slate-100 p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary-dark mb-5 flex items-center gap-3">
                  <Filter className="w-4 h-4 text-accent" />
                  Event Types
                </h3>
                <div className="space-y-1">
                  {eventTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedFilter(type.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                        selectedFilter === type.id
                          ? "bg-accent/10 border-l-2 border-accent"
                          : "hover:bg-slate-50 border-l-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${type.dot}`} />
                        <span className="text-sm font-bold text-primary-dark">
                          {type.label}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-bold">
                        {
                          events.filter(
                            (e) => type.id === "all" || e.type === type.id,
                          ).length
                        }
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upcoming events */}
              <div className="bg-surface border border-slate-100 p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary-dark mb-5 flex items-center gap-3">
                  <Bell className="w-4 h-4 text-accent" />
                  Upcoming
                </h3>
                <div className="space-y-3">
                  {upcomingEvents.length === 0 && (
                    <p className="text-sm text-slate-400">
                      No upcoming events.
                    </p>
                  )}
                  {upcomingEvents.map((event) => {
                    const Icon = event.icon;
                    return (
                      <button
                        key={event.id}
                        onClick={() =>
                          setSelectedEvent(
                            selectedEvent === event.id ? null : event.id,
                          )
                        }
                        className="w-full text-left p-4 border border-slate-100 hover:border-accent/30 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-9 h-9 shrink-0 flex items-center justify-center ${event.color.split(" ")[0]}`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-black text-primary-dark text-sm truncate">
                              {event.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                              <CalendarIcon className="w-3 h-3 shrink-0" />
                              <span>
                                {new Date(event.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Main column */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-8">
            {/* Mini calendar grid */}
            <div className="bg-surface border border-slate-100 p-5 md:p-7">
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <div
                    key={i}
                    className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 py-2"
                  >
                    {d}
                  </div>
                ))}
              </div>
              {/* Day cells */}
              <div className="grid grid-cols-7 gap-px bg-slate-100">
                {Array.from({ length: 35 }).map((_, index) => {
                  const day = index + 1;
                  const dayEvents = events.filter(
                    (e) =>
                      new Date(e.date).getDate() === day &&
                      new Date(e.date).getMonth() === currentDate.getMonth() &&
                      (selectedFilter === "all" || e.type === selectedFilter),
                  );
                  const isToday =
                    day === new Date().getDate() &&
                    currentDate.getMonth() === new Date().getMonth();

                  return (
                    <div
                      key={index}
                      className={`bg-surface min-h-[60px] md:min-h-[80px] p-1.5 md:p-2 ${dayEvents.length ? "bg-slate-50" : ""}`}
                    >
                      <div className="flex justify-end mb-1">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold ${
                            isToday
                              ? "bg-accent text-primary-dark rounded-full"
                              : "text-slate-500"
                          }`}
                        >
                          {day}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map((e) => (
                          <div
                            key={e.id}
                            onClick={() =>
                              setSelectedEvent(
                                selectedEvent === e.id ? null : e.id,
                              )
                            }
                            className={`text-[9px] md:text-[10px] px-1 py-0.5 truncate cursor-pointer leading-tight font-bold ${e.color}`}
                          >
                            <span className="hidden md:inline">{e.title}</span>
                            <span className="md:hidden">•</span>
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-[9px] text-slate-400 text-center font-bold">
                            +{dayEvents.length - 2}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Events list */}
            <div className="bg-surface border border-slate-100">
              <div className="px-6 md:px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-black text-primary-dark uppercase tracking-tight text-sm">
                  All Events
                  <span className="ml-2 text-accent">
                    ({filteredEvents.length})
                  </span>
                </h3>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Term 1 · 2024
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {filteredEvents.map((event) => {
                  const Icon = event.icon;
                  const isOpen = selectedEvent === event.id;
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div
                        onClick={() =>
                          setSelectedEvent(isOpen ? null : event.id)
                        }
                        className={`flex flex-col sm:flex-row gap-4 sm:gap-6 px-6 md:px-8 py-5 cursor-pointer transition-colors ${isOpen ? "bg-slate-50" : "hover:bg-slate-50"}`}
                      >
                        {/* Date badge */}
                        <div className="shrink-0 flex sm:flex-col items-center sm:items-center gap-4 sm:gap-0 sm:text-center sm:w-14">
                          <div className="text-2xl sm:text-3xl font-black text-primary-dark leading-none">
                            {new Date(event.date).getDate()}
                          </div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 sm:mt-1">
                            {new Date(event.date).toLocaleString("default", {
                              month: "short",
                            })}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold ${event.color}`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              {
                                eventTypes.find((t) => t.id === event.type)
                                  ?.label
                              }
                            </span>
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                              <Clock className="w-3 h-3" />
                              {event.duration}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </span>
                          </div>

                          <h4 className="font-black text-primary-dark text-base uppercase tracking-tight leading-tight mb-1">
                            {event.title}
                          </h4>
                          <p className="text-slate-500 text-sm leading-relaxed">
                            {event.description}
                          </p>

                          <div className="flex flex-wrap gap-4 mt-3">
                            {["Add to Calendar", "Set Reminder", "Share"].map(
                              (action) => (
                                <button
                                  key={action}
                                  className="text-xs font-black text-accent hover:text-accent-dark uppercase tracking-wider transition-colors"
                                >
                                  {action}
                                </button>
                              ),
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expanded panel */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 md:px-8 py-6 bg-white border-t border-slate-100">
                              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                                    What to Bring
                                  </p>
                                  <ul className="space-y-2">
                                    {[
                                      "Student ID card",
                                      "Appropriate attire",
                                      "Water bottle",
                                    ].map((item) => (
                                      <li
                                        key={item}
                                        className="flex items-center gap-2 text-sm text-slate-600"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                                    Important Notes
                                  </p>
                                  <ul className="space-y-2">
                                    {[
                                      "Parents welcome to attend",
                                      "Photography allowed",
                                      "Refreshments provided",
                                    ].map((item) => (
                                      <li
                                        key={item}
                                        className="flex items-center gap-2 text-sm text-slate-600"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="pt-5 border-t border-slate-100">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                                  Contact
                                </p>
                                <p className="text-sm text-slate-600">
                                  events@kibalieducentre.ac.ke · +254 712 345
                                  678
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Term dates */}
            <div className="bg-primary-dark overflow-hidden">
              <div className="px-6 md:px-8 py-5 border-b border-white/10">
                <div className="inline-block px-5 py-2 bg-accent/10 border-y border-accent/30 mb-3">
                  <span className="text-accent font-black tracking-[0.3em] text-[10px] uppercase">
                    2024 Academic Year
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-surface uppercase tracking-tighter">
                  Term Dates
                </h3>
              </div>

              <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                {termDates.map((term) => (
                  <div key={term.term} className="px-6 md:px-8 py-6 md:py-8">
                    <p className="text-accent font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                      {term.term}
                    </p>
                    <div className="space-y-3">
                      {[
                        { label: "Starts", value: term.start },
                        { label: "Ends", value: term.end },
                        { label: "Duration", value: term.weeks },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="flex justify-between items-baseline gap-4"
                        >
                          <span className="text-surface/40 text-xs font-bold uppercase tracking-wider shrink-0">
                            {row.label}
                          </span>
                          <span className="text-surface text-sm font-bold text-right">
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
