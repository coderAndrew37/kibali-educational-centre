// components/Footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Send,
  Download,
  Calendar,
  Users,
  BookOpen,
  Trophy,
  MessageSquare,
  Globe,
  Award,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate subscription
      console.log("Subscribed with email:", email);
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      label: "Facebook",
      url: "https://facebook.com/kibali",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
      url: "https://twitter.com/kibali",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      url: "https://instagram.com/kibali",
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      label: "YouTube",
      url: "https://youtube.com/kibali",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      url: "https://linkedin.com/kibali",
    },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about/who-we-are" },
    { name: "Admissions", path: "/admission" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
    { name: "School Calendar", path: "/calendar" },
    { name: "Careers", path: "/careers" },
    { name: "Gallery", path: "/gallery" },
  ];

  const academicLinks = [
    { name: "Kindergarten", path: "/academics/kindergarten" },
    { name: "Primary School", path: "/academics/primary" },
    { name: "Junior Secondary", path: "/academics/junior-secondary" },
    { name: "CBC Curriculum", path: "/academics/cbc" },
    { name: "Extracurricular", path: "/academics/extracurricular" },
    { name: "Digital Learning", path: "/academics/digital" },
  ];

  const resourceLinks = [
    {
      name: "School Prospectus",
      icon: <Download className="w-4 h-4" />,
      path: "/resources/prospectus",
    },
    {
      name: "Academic Calendar",
      icon: <Calendar className="w-4 h-4" />,
      path: "/calendar",
    },
    {
      name: "Parent Portal",
      icon: <Users className="w-4 h-4" />,
      path: "/parents",
    },
    {
      name: "E-Learning Portal",
      icon: <BookOpen className="w-4 h-4" />,
      path: "/e-learning",
    },
    {
      name: "Sports Results",
      icon: <Trophy className="w-4 h-4" />,
      path: "/sports",
    },
    {
      name: "School Blog",
      icon: <MessageSquare className="w-4 h-4" />,
      path: "/blog",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-primary-dark via-primary to-primary-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Top Section - Newsletter & Quick Info */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Newsletter Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-sm rounded-3xl p-8 border border-accent/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Stay Updated
                  </h3>
                  <p className="text-white/70">
                    Subscribe to our newsletter for the latest news
                  </p>
                </div>
              </div>

              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl border border-emerald-400/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Send className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">
                        Subscribed Successfully!
                      </h4>
                      <p className="text-white/80 text-sm">
                        Check your email for confirmation.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="flex-grow px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                    <button
                      type="submit"
                      className="px-8 py-4 bg-gradient-to-r from-accent to-accent-dark text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-accent/25 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <Send className="w-5 h-5" />
                      Subscribe
                    </button>
                  </div>
                  <p className="text-white/50 text-sm">
                    By subscribing, you agree to our Privacy Policy and consent
                    to receive updates.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                {
                  icon: <Users className="w-8 h-8" />,
                  value: "500+",
                  label: "Happy Students",
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  value: "50+",
                  label: "Qualified Staff",
                },
                {
                  icon: <Trophy className="w-8 h-8" />,
                  value: "25+",
                  label: "National Awards",
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  value: "14+",
                  label: "Years of Excellence",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent/30 transition-colors"
                >
                  <div className="text-accent mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-accent tracking-tight">
                    KIBALI
                  </div>
                  <div className="text-white/60 text-sm -mt-1">
                    Educational Centre
                  </div>
                </div>
              </div>

              <p className="text-white/70 leading-relaxed">
                Where every child discovers their brilliance. Leading the way in
                CBC excellence and holistic development since 2010.
              </p>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -3 }}
                      className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-accent" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="group flex items-center gap-3 text-white/70 hover:text-accent transition-colors py-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent/0 group-hover:bg-accent transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Academics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Academics
              </h3>
              <ul className="space-y-3">
                {academicLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="group flex items-center gap-3 text-white/70 hover:text-accent transition-colors py-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent/0 group-hover:bg-accent transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  Contact Us
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-medium">Main Campus</p>
                      <p className="text-white/70">Kibali Road, Nairobi</p>
                      <p className="text-white/60 text-sm">
                        P.O. Box 12345-00100
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                    <a
                      href="tel:+254712345678"
                      className="text-white/70 hover:text-accent transition-colors"
                    >
                      +254 712 345 678
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                    <a
                      href="mailto:info@kibalieducentre.ac.ke"
                      className="text-white/70 hover:text-accent transition-colors"
                    >
                      info@kibalieducentre.ac.ke
                    </a>
                  </div>
                </div>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Download className="w-5 h-5 text-accent" />
                  Resources
                </h3>
                <div className="space-y-3">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.path}
                      className="group flex items-center gap-3 text-white/70 hover:text-accent transition-colors py-2"
                    >
                      <div className="text-accent/70 group-hover:text-accent">
                        {link.icon}
                      </div>
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Kibali Educational Centre. All rights
              reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/privacy-policy"
                className="text-white/60 hover:text-accent text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/60 hover:text-accent text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-white/60 hover:text-accent text-sm transition-colors"
              >
                Sitemap
              </Link>
              <Link
                href="/accessibility"
                className="text-white/60 hover:text-accent text-sm transition-colors"
              >
                Accessibility
              </Link>
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 text-white/60 hover:text-accent text-sm transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-accent"
              >
                ↑
              </motion.div>
            </button>
          </div>

          {/* Accreditation Badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 pt-8 border-t border-white/10">
            {[
              { name: "Ministry of Education", logo: "🇰🇪" },
              { name: "TSC Registered", logo: "🏫" },
              { name: "CBC Accredited", logo: "📚" },
              { name: "ISO 9001:2015", logo: "⭐" },
            ].map((badge) => (
              <div
                key={badge.name}
                className="flex items-center gap-2 text-white/50 text-sm"
              >
                <span className="text-lg">{badge.logo}</span>
                <span>{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 right-10 opacity-10">
        <div className="text-8xl">🏫</div>
      </div>
      <div className="absolute top-10 left-10 opacity-10">
        <div className="text-8xl">📚</div>
      </div>

      {/* Live Chat Button */}
      <button
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Open live chat"
      >
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-accent/30 rounded-full blur-md"
          />
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 border-2 border-primary-dark animate-pulse" />
        </div>
      </button>
    </footer>
  );
}
