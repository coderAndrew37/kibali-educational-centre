"use client";

import { useState, useEffect } from "react";
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

export default function SchoolCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<"month" | "week" | "day">(
    "month",
  );
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

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
      icon: <BookOpen className="w-5 h-5" />,
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
      icon: <Users className="w-5 h-5" />,
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
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Science Fair",
      date: "2024-02-10",
      time: "9:00 AM - 3:00 PM",
      duration: "6 hours",
      type: "academic",
      location: "Science Labs",
      description:
        "Students showcase their scientific projects and innovations.",
      color: "bg-purple-100 border-purple-300 text-purple-800",
      icon: <BookOpen className="w-5 h-5" />,
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
      icon: <Music className="w-5 h-5" />,
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
      color: "bg-gray-100 border-gray-300 text-gray-800",
      icon: <CalendarIcon className="w-5 h-5" />,
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
      icon: <Palette className="w-5 h-5" />,
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
      icon: <BookOpen className="w-5 h-5" />,
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
      icon: <Trophy className="w-5 h-5" />,
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
      icon: <CalendarIcon className="w-5 h-5" />,
    },
  ];

  const eventTypes = [
    { id: "all", label: "All Events", color: "bg-primary/20" },
    { id: "academic", label: "Academic", color: "bg-blue-100 text-blue-800" },
    { id: "sports", label: "Sports", color: "bg-amber-100 text-amber-800" },
    { id: "arts", label: "Arts & Culture", color: "bg-pink-100 text-pink-800" },
    {
      id: "parent",
      label: "Parent Events",
      color: "bg-emerald-100 text-emerald-800",
    },
    { id: "holiday", label: "Holidays", color: "bg-gray-100 text-gray-800" },
    { id: "ceremony", label: "Ceremonies", color: "bg-red-100 text-red-800" },
  ];

  const filteredEvents = events.filter(
    (event) => selectedFilter === "all" || event.type === selectedFilter,
  );

  const upcomingEvents = filteredEvents
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const getMonthName = (date: Date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleEventClick = (eventId: number) => {
    setSelectedEvent(selectedEvent === eventId ? null : eventId);
  };

  const downloadCalendar = () => {
    // In a real app, this would generate an ICS file
    alert("Calendar download feature would be implemented here");
  };

  return (
    <main className="min-h-screen pt-20 bg-gradient-to-b from-white via-primary/5 to-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-dark via-primary to-accent overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary/80 to-accent/70" />
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-accent/20 to-white/10 blur-3xl"
            animate={{
              y: [0, 50, 0],
              x: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6"
            >
              School <span className="text-accent">Calendar</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 max-w-3xl mx-auto mb-8"
            >
              Stay updated with all academic, sports, and cultural events
              throughout the year.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Calendar Controls */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-primary-dark mb-2">
                Academic Calendar 2024
              </h2>
              <p className="text-primary-dark/70">Term 1: January - March</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white rounded-2xl border border-primary/20 px-4 py-2">
                <Filter className="w-5 h-5 text-primary-dark/60" />
                <span className="font-medium text-primary-dark">
                  Filter by:
                </span>
                <select
                  aria-label="Filter events by type"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-primary-dark font-medium"
                >
                  {eventTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-white rounded-2xl border border-primary/20 px-4 py-2">
                <span className="font-medium text-primary-dark">View:</span>
                <div className="flex gap-2">
                  {(["month", "week", "day"] as const).map((view) => (
                    <button
                      key={view}
                      onClick={() => setSelectedView(view)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium capitalize ${
                        selectedView === view
                          ? "bg-accent text-white"
                          : "text-primary-dark hover:bg-primary/10"
                      }`}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={downloadCalendar}
                className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl border border-primary/20 hover:border-accent hover:bg-accent/5 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span className="font-medium text-primary-dark">Download</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl border border-primary/20 hover:border-accent hover:bg-accent/5 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="font-medium text-primary-dark">Share</span>
              </button>
            </div>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between bg-white rounded-2xl border border-primary/20 p-6 mb-8">
            <button
              onClick={() => navigateMonth("prev")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/20 hover:border-accent hover:bg-accent/5 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium text-primary-dark">Previous</span>
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary-dark">
                {getMonthName(currentDate)}
              </h3>
              <p className="text-primary-dark/60">
                Currently viewing {selectedView} view
              </p>
            </div>

            <button
              onClick={() => navigateMonth("next")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/20 hover:border-accent hover:bg-accent/5 transition-colors"
            >
              <span className="font-medium text-primary-dark">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Event Types & Upcoming */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Event Type Filters */}
              <div className="bg-white rounded-3xl border border-primary/10 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-primary-dark mb-6 flex items-center gap-3">
                  <Filter className="w-6 h-6 text-accent" />
                  Event Types
                </h3>
                <div className="space-y-3">
                  {eventTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedFilter(type.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                        selectedFilter === type.id
                          ? "ring-2 ring-accent/20 bg-accent/5"
                          : "hover:bg-primary/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${type.color.split(" ")[0]}`}
                        />
                        <span className="font-medium text-primary-dark">
                          {type.label}
                        </span>
                      </div>
                      <span className="text-sm text-primary-dark/60">
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

              {/* Upcoming Events */}
              <div className="bg-white rounded-3xl border border-primary/10 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-primary-dark mb-6 flex items-center gap-3">
                  <Bell className="w-6 h-6 text-accent" />
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => handleEventClick(event.id)}
                      className="p-4 rounded-xl border border-primary/10 hover:border-accent/30 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <div
                          className={`w-10 h-10 rounded-lg ${event.color.split(" ")[0]} flex items-center justify-center`}
                        >
                          {event.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-primary-dark">
                            {event.title}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-primary-dark/60 mt-1">
                            <CalendarIcon className="w-4 h-4" />
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
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-primary-dark/70">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Calendar & Events */}
          <div className="lg:col-span-2">
            {/* Calendar View */}
            {selectedView === "month" && (
              <div className="bg-white rounded-3xl border border-primary/10 p-8 shadow-lg mb-12">
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center font-bold text-primary-dark py-3"
                      >
                        {day}
                      </div>
                    ),
                  )}

                  {/* Generate calendar days */}
                  {Array.from({ length: 35 }).map((_, index) => {
                    const day = index + 1;
                    const dayEvents = events.filter(
                      (event) =>
                        new Date(event.date).getDate() === day &&
                        new Date(event.date).getMonth() ===
                          currentDate.getMonth(),
                    );

                    return (
                      <div
                        key={index}
                        className={`min-h-32 border border-primary/10 rounded-xl p-3 ${
                          dayEvents.length > 0 ? "bg-primary/5" : ""
                        }`}
                      >
                        <div className="text-right mb-2">
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                              day === new Date().getDate() &&
                              currentDate.getMonth() === new Date().getMonth()
                                ? "bg-accent text-white"
                                : "text-primary-dark"
                            }`}
                          >
                            {day}
                          </span>
                        </div>

                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs p-2 rounded ${event.color} truncate cursor-pointer hover:opacity-90`}
                              onClick={() => handleEventClick(event.id)}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-primary-dark/60 text-center">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Events List */}
            <div className="bg-white rounded-3xl border border-primary/10 p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-primary-dark mb-8">
                All Events ({filteredEvents.length})
                <span className="text-primary-dark/60 text-lg font-normal ml-2">
                  • Term 1, 2024
                </span>
              </h3>

              <div className="space-y-6">
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl border overflow-hidden ${
                      selectedEvent === event.id ? "ring-2 ring-accent/30" : ""
                    }`}
                  >
                    <div
                      className={`p-6 cursor-pointer transition-all ${
                        selectedEvent === event.id
                          ? "bg-primary/5"
                          : "hover:bg-primary/5"
                      }`}
                      onClick={() => handleEventClick(event.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Event Date */}
                        <div className="flex-shrink-0">
                          <div className="text-center bg-white border border-primary/20 rounded-xl p-4 w-32">
                            <div className="text-3xl font-black text-primary-dark mb-1">
                              {new Date(event.date).getDate()}
                            </div>
                            <div className="text-sm font-semibold text-primary-dark/70 uppercase">
                              {new Date(event.date).toLocaleString("default", {
                                month: "short",
                              })}
                            </div>
                            <div className="text-xs text-primary-dark/60 mt-2">
                              {event.time}
                            </div>
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${event.color}`}
                            >
                              {event.icon}
                              {
                                eventTypes.find((t) => t.id === event.type)
                                  ?.label
                              }
                            </span>
                            <span className="text-sm text-primary-dark/60">
                              •
                            </span>
                            <div className="flex items-center gap-1 text-sm text-primary-dark/60">
                              <Clock className="w-4 h-4" />
                              <span>{event.duration}</span>
                            </div>
                            <span className="text-sm text-primary-dark/60">
                              •
                            </span>
                            <div className="flex items-center gap-1 text-sm text-primary-dark/60">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>

                          <h4 className="text-xl font-bold text-primary-dark mb-3">
                            {event.title}
                          </h4>
                          <p className="text-primary-dark/70 mb-4">
                            {event.description}
                          </p>

                          <div className="flex flex-wrap gap-3">
                            <button className="text-sm font-medium text-accent hover:text-accent-dark">
                              Add to Calendar
                            </button>
                            <button className="text-sm font-medium text-accent hover:text-accent-dark">
                              Set Reminder
                            </button>
                            <button className="text-sm font-medium text-accent hover:text-accent-dark">
                              Share Event
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {selectedEvent === event.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-primary/10 p-6 bg-white">
                            <h5 className="font-bold text-primary-dark mb-4">
                              Additional Information
                            </h5>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h6 className="text-sm font-semibold text-primary-dark/70 mb-2">
                                  What to Bring:
                                </h6>
                                <ul className="text-primary-dark/80 space-y-1">
                                  <li className="flex items-start gap-2">
                                    <span className="text-accent mt-1">•</span>
                                    <span>Student ID card</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-accent mt-1">•</span>
                                    <span>Appropriate attire</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-accent mt-1">•</span>
                                    <span>Water bottle</span>
                                  </li>
                                </ul>
                              </div>
                              <div>
                                <h6 className="text-sm font-semibold text-primary-dark/70 mb-2">
                                  Important Notes:
                                </h6>
                                <ul className="text-primary-dark/80 space-y-1">
                                  <li className="flex items-start gap-2">
                                    <span className="text-accent mt-1">•</span>
                                    <span>Parents welcome to attend</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-accent mt-1">•</span>
                                    <span>Photography allowed</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-accent mt-1">•</span>
                                    <span>Refreshments provided</span>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-primary/10">
                              <h6 className="text-sm font-semibold text-primary-dark/70 mb-2">
                                Contact Information:
                              </h6>
                              <p className="text-primary-dark/80">
                                For questions, contact the event coordinator at
                                events@kibalieducentre.ac.ke or call +254 712
                                345 678.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Term Information */}
            <div className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl border border-primary/20 p-8">
              <h3 className="text-2xl font-bold text-primary-dark mb-6">
                Term Dates 2024
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-6 border border-primary/20">
                  <h4 className="font-bold text-primary-dark mb-4">Term 1</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-primary-dark/70">Starts:</span>
                      <span className="font-medium">January 8, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-dark/70">Ends:</span>
                      <span className="font-medium">March 29, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-dark/70">Duration:</span>
                      <span className="font-medium">12 weeks</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-primary/20">
                  <h4 className="font-bold text-primary-dark mb-4">Term 2</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-primary-dark/70">Starts:</span>
                      <span className="font-medium">May 6, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-dark/70">Ends:</span>
                      <span className="font-medium">July 26, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-dark/70">Duration:</span>
                      <span className="font-medium">12 weeks</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-primary/20">
                  <h4 className="font-bold text-primary-dark mb-4">Term 3</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-primary-dark/70">Starts:</span>
                      <span className="font-medium">September 9, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-dark/70">Ends:</span>
                      <span className="font-medium">November 29, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-dark/70">Duration:</span>
                      <span className="font-medium">12 weeks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
