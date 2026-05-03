import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const FEATURES = [
  {
    title: "Service Tracking",
    desc: "End-to-end visibility of postal items — from dispatch to delivery — with real-time status updates and geo-location markers.",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-500/50",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    title: "Real-time Dashboard",
    desc: "Live analytics panels consolidating KPIs, service volumes, and performance metrics across all connected postal offices.",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-500/50",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
      </svg>
    ),
  },
  {
    title: "Smart Notifications",
    desc: "Configurable alerts for service delays, SLA breaches, and delivery confirmations via SMS, email, and in-app channels.",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    borderHover: "hover:border-amber-500/50",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
      </svg>
    ),
  },
  {
    title: "Data Analytics",
    desc: "Drill into historical trends, regional comparisons, and predictive reports to guide strategic postal decisions.",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    borderHover: "hover:border-violet-500/50",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
      </svg>
    ),
  },
];

const STATS = [
  { num: "1.5L+", label: "Services tracked daily" },
  { num: "99.2%", label: "On-time delivery rate" },
  { num: "24/7", label: "Live monitoring" },
  { num: "400+", label: "Post offices connected" },
];

const ABOUT_POINTS = [
  "Standardised KPIs for delivery speed, accuracy, and citizen satisfaction across all postal circles",
  "Centralised data pipelines connecting field offices, sorting hubs, and last-mile delivery units",
  "Public-facing transparency reports that build accountability and citizen trust",
];

const REGIONS = [
  { name: "North Circle", pct: 94, color: "bg-blue-500" },
  { name: "South Circle", pct: 88, color: "bg-emerald-500" },
  { name: "West Circle", pct: 79, color: "bg-amber-500" },
  { name: "East Circle", pct: 91, color: "bg-violet-500" },
];

const DASH_METRICS = [
  { val: "8,412", label: "Deliveries today" },
  { val: "97.3%", label: "SLA compliance" },
  { val: "1.4d", label: "Avg. transit time" },
  { val: "124", label: "Active offices" },
];



// ── Icons ──────────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative bg-gray-950 pt-15 pb-16 text-center overflow-hidden h-[91vh]">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-24 left-1/4 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute top-24 right-1/4 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium px-3 py-1.5 rounded-full mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Department of Posts — Digital Initiative
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mx-auto mb-5 tracking-tight">
          Smart Monitoring for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Postal Services
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Bridging the measurability gap with real-time tracking, transparent
          analytics, and data-driven insights for modern postal operations.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={"/login"}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-500 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 no-underline"
          >
            Track Service
          </Link>
          <Link 
            to={"/login"}
            className="px-6 py-2.5 bg-white/5 text-gray-200 text-sm font-medium rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-150 hover:-translate-y-0.5 no-underline"
          >
            Get Started
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ num, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">{num}</div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features ───────────────────────────────────────────────────────────────
function Features() {
  return (
    <section className="bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-2">
            Features
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">
            Everything you need to manage postal services
          </h2>
          <p className="text-gray-400 max-w-lg leading-relaxed">
            Purpose-built tools that bring transparency, speed, and
            accountability to every layer of the postal network.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ title, desc, iconBg, iconColor, borderHover, icon }) => (
            <div
              key={title}
              className={`bg-gray-800/50 border border-white/5 rounded-xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 cursor-default ${borderHover}`}
            >
              <div
                className={`w-10 h-10 ${iconBg} ${iconColor} rounded-lg flex items-center justify-center mb-4`}
              >
                {icon}
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Dashboard Preview Card ─────────────────────────────────────────────────
function DashboardPreview() {
  return (
    <div className="bg-gray-800/60 border border-white/5 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm font-semibold text-white">Operations overview</span>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {DASH_METRICS.map(({ val, label }) => (
          <div key={label} className="bg-gray-900/70 border border-white/5 rounded-lg p-3">
            <div className="text-xl font-bold text-white">{val}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">
        Regional performance
      </p>
      <div className="flex flex-col gap-3">
        {REGIONS.map(({ name, pct, color }) => (
          <div key={name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">{name}</span>
              <span className="text-gray-300 font-medium">{pct}%</span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${color} rounded-full`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── About ──────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="bg-gray-950 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-2">
              About the system
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Bridging the measurability gap
            </h2>
            <p className="text-gray-400 leading-relaxed mb-7">
              This digital platform addresses a long-standing challenge in
              India's Department of Posts — the inability to measure service
              quality in a consistent, real-time, and transparent manner.
            </p>
            <ul className="flex flex-col gap-4">
              {ABOUT_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <p className="text-sm text-gray-400 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboard preview */}
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

// ── CTA Banner ─────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="relative bg-gray-900 py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Ready to bring transparency to postal operations?
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
          Join hundreds of post offices already using the DoP System to improve
          accountability and service quality.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#"
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/25 no-underline"
          >
            Get Started Free
          </a>
          <a
            href="#"
            className="px-6 py-2.5 bg-white/5 text-gray-300 text-sm font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-colors no-underline"
          >
            Schedule a Demo
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────


// ── Page ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 font-sans antialiased">
      <main>
        <Hero />
        <Features />
        <About />
        <CTABanner />
      </main>
    </div>
  );
}