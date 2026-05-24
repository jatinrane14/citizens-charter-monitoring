import { useState, useMemo } from "react";
import {
  Package, Clock, TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  Users, Truck, BarChart2, RefreshCw, Download, Search, Filter,
  Calendar, ArrowUpRight, ArrowDownRight, Star, Award, Zap,
  Bell, ChevronDown, MapPin, Activity, Target, ShieldCheck
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

// ─── Static Data ─────────────────────────────────────────────────────────────

const DELIVERY_PERFORMANCE = [
  { day: "May 1", delivered: 1240, delayed: 88, target: 1300 },
  { day: "May 3", delivered: 1380, delayed: 72, target: 1300 },
  { day: "May 5", delivered: 1190, delayed: 114, target: 1300 },
  { day: "May 7", delivered: 1450, delayed: 60, target: 1300 },
  { day: "May 9", delivered: 1520, delayed: 55, target: 1300 },
  { day: "May 11", delivered: 1310, delayed: 90, target: 1300 },
  { day: "May 13", delivered: 1600, delayed: 40, target: 1300 },
  { day: "May 15", delivered: 1480, delayed: 68, target: 1300 },
  { day: "May 17", delivered: 1350, delayed: 82, target: 1300 },
  { day: "May 19", delivered: 1680, delayed: 30, target: 1300 },
  { day: "May 21", delivered: 1720, delayed: 28, target: 1300 },
  { day: "May 23", delivered: 1560, delayed: 45, target: 1300 },
];

const COMPLAINT_TRENDS = [
  { month: "Dec", raised: 420, resolved: 390, pending: 30 },
  { month: "Jan", raised: 510, resolved: 460, pending: 50 },
  { month: "Feb", raised: 380, resolved: 370, pending: 10 },
  { month: "Mar", raised: 640, resolved: 580, pending: 60 },
  { month: "Apr", raised: 720, resolved: 650, pending: 70 },
  { month: "May", raised: 480, resolved: 420, pending: 60 },
];

const BRANCH_PERFORMANCE = [
  { branch: "Delhi GPO", success: 94, processed: 4820 },
  { branch: "Mumbai", success: 91, processed: 4210 },
  { branch: "Chennai", success: 88, processed: 3680 },
  { branch: "Kolkata", success: 85, processed: 3420 },
  { branch: "Bengaluru", success: 96, processed: 5100 },
  { branch: "Hyderabad", success: 82, processed: 2980 },
  { branch: "Pune", success: 90, processed: 3150 },
  { branch: "Ahmedabad", success: 87, processed: 2740 },
  { branch: "Jaipur", success: 79, processed: 2100 },
  { branch: "Lucknow", success: 76, processed: 1950 },
];

const PARCEL_STATUS = [
  { name: "Delivered", value: 14820, color: "#22c55e" },
  { name: "In Transit", value: 4230, color: "#6366f1" },
  { name: "Out for Delivery", value: 2810, color: "#f59e0b" },
  { name: "Booked", value: 1640, color: "#3b82f6" },
  { name: "Delayed", value: 820, color: "#ef4444" },
];

const BRANCHES = [
  { name: "Bengaluru GPO", code: "BLR-001", processed: 5100, successRate: 96.2, avgTime: "2.1d", complaintsRaised: 34, complaintsResolved: 33, staff: 82, sla: 98.1, status: "EXCELLENT" },
  { name: "Delhi GPO", code: "DEL-001", processed: 4820, successRate: 94.1, avgTime: "2.3d", complaintsRaised: 51, complaintsResolved: 48, staff: 94, sla: 95.8, status: "EXCELLENT" },
  { name: "Mumbai Central", code: "MUM-001", processed: 4210, successRate: 91.4, avgTime: "2.6d", complaintsRaised: 68, complaintsResolved: 61, staff: 78, sla: 93.2, status: "GOOD" },
  { name: "Chennai GPO", code: "CHE-001", processed: 3680, successRate: 88.3, avgTime: "2.9d", complaintsRaised: 82, complaintsResolved: 71, staff: 65, sla: 89.7, status: "GOOD" },
  { name: "Kolkata GPO", code: "KOL-001", processed: 3420, successRate: 85.0, avgTime: "3.1d", complaintsRaised: 94, complaintsResolved: 77, staff: 60, sla: 87.4, status: "AVERAGE" },
  { name: "Pune Head PO", code: "PUN-001", processed: 3150, successRate: 90.2, avgTime: "2.7d", complaintsRaised: 56, complaintsResolved: 51, staff: 54, sla: 91.8, status: "GOOD" },
  { name: "Ahmedabad GPO", code: "AMD-001", processed: 2740, successRate: 87.1, avgTime: "3.0d", complaintsRaised: 71, complaintsResolved: 58, staff: 48, sla: 88.3, status: "AVERAGE" },
  { name: "Hyderabad GPO", code: "HYD-001", processed: 2980, successRate: 82.4, avgTime: "3.4d", complaintsRaised: 103, complaintsResolved: 78, staff: 52, sla: 82.9, status: "NEEDS_IMPROVEMENT" },
  { name: "Jaipur GPO", code: "JAI-001", processed: 2100, successRate: 79.3, avgTime: "3.8d", complaintsRaised: 118, complaintsResolved: 82, staff: 38, sla: 78.6, status: "NEEDS_IMPROVEMENT" },
  { name: "Lucknow GPO", code: "LKO-001", processed: 1950, successRate: 76.1, avgTime: "4.2d", complaintsRaised: 134, complaintsResolved: 88, staff: 35, sla: 74.2, status: "CRITICAL" },
  { name: "Bhopal GPO", code: "BHP-001", processed: 1680, successRate: 73.8, avgTime: "4.6d", complaintsRaised: 152, complaintsResolved: 94, staff: 30, sla: 71.5, status: "CRITICAL" },
  { name: "Indore PO", code: "IDR-001", processed: 1420, successRate: 80.5, avgTime: "3.5d", complaintsRaised: 89, complaintsResolved: 74, staff: 26, sla: 81.2, status: "NEEDS_IMPROVEMENT" },
];

const ALERTS = [
  { id: 1, type: "error", icon: TrendingDown, title: "Delivery delays spiked in Bhopal Branch", detail: "Delay rate up 34% vs last week — 152 complaints raised", time: "12 min ago" },
  { id: 2, type: "warning", icon: AlertTriangle, title: "Lucknow GPO SLA compliance below threshold", detail: "SLA at 74.2% — target is 85%. Escalation recommended.", time: "38 min ago" },
  { id: 3, type: "warning", icon: Activity, title: "High parcel traffic — Mumbai Central overloaded", detail: "Processing queue at 142% capacity. Staff reallocation required.", time: "1h 14min ago" },
  { id: 4, type: "info", icon: CheckCircle, title: "Bengaluru GPO hit 96%+ success rate milestone", detail: "Best performing branch for Q1 FY 2024–25.", time: "2h ago" },
  { id: 5, type: "info", icon: Zap, title: "Complaint resolution rate improved nationally", detail: "Average resolution rate up from 82% to 89% this month.", time: "3h ago" },
];

const TOP_AGENTS = [
  { name: "Anand Krishnamurthy", branch: "Bengaluru GPO", parcels: 312, efficiency: 98, rating: 4.9 },
  { name: "Priya Venkatesh", branch: "Delhi GPO", parcels: 294, efficiency: 96, rating: 4.8 },
  { name: "Suresh Patil", branch: "Mumbai Central", parcels: 278, efficiency: 94, rating: 4.7 },
  { name: "Meena Sundaram", branch: "Chennai GPO", parcels: 261, efficiency: 91, rating: 4.6 },
  { name: "Ravi Shankar Das", branch: "Pune Head PO", parcels: 248, efficiency: 90, rating: 4.5 },
];

// ─── Status Styles ────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  EXCELLENT:         { bg: "bg-emerald-50",  text: "text-emerald-700",  border: "border-emerald-200",  dot: "bg-emerald-500"  },
  GOOD:              { bg: "bg-blue-50",     text: "text-blue-700",     border: "border-blue-200",     dot: "bg-blue-500"     },
  AVERAGE:           { bg: "bg-amber-50",    text: "text-amber-700",    border: "border-amber-200",    dot: "bg-amber-500"    },
  NEEDS_IMPROVEMENT: { bg: "bg-orange-50",   text: "text-orange-700",   border: "border-orange-200",   dot: "bg-orange-500"   },
  CRITICAL:          { bg: "bg-red-50",      text: "text-red-700",      border: "border-red-200",      dot: "bg-red-500"      },
};

const ALERT_CONFIG = {
  error:   { bg: "bg-red-50",    border: "border-red-200",    icon: "text-red-500",    dot: "bg-red-500"    },
  warning: { bg: "bg-amber-50",  border: "border-amber-200",  icon: "text-amber-500",  dot: "bg-amber-500"  },
  info:    { bg: "bg-blue-50",   border: "border-blue-200",   icon: "text-blue-500",   dot: "bg-blue-500"   },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_CONFIG[status] || STATUS_CONFIG.AVERAGE;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status.replace("_", " ")}
    </span>
  );
};

// ─── KPI Card ─────────────────────────────────────────────────────────────────

const KPICard = ({ title, value, icon: Icon, color, bgColor, trend, trendUp, sub, progress }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default group">
    <div className="flex items-start justify-between mb-3">
      <div className={`p-2.5 rounded-xl ${bgColor}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
          {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      )}
    </div>
    <p className="text-2xl font-bold text-slate-800 tracking-tight">{value}</p>
    <p className="text-xs font-medium text-slate-500 mt-0.5">{title}</p>
    {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    {progress !== undefined && (
      <div className="mt-3">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Progress</span><span>{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all duration-700 ${progress >= 90 ? "bg-emerald-500" : progress >= 75 ? "bg-blue-500" : progress >= 60 ? "bg-amber-500" : "bg-red-500"}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    )}
  </div>
);

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-semibold text-slate-800">{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader = ({ icon: Icon, title, sub }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="p-2 bg-indigo-50 rounded-xl">
      <Icon className="w-4 h-4 text-indigo-600" />
    </div>
    <div>
      <h2 className="text-sm font-bold text-slate-800">{title}</h2>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  </div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function KPIDashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateRange, setDateRange] = useState("This Month");

  const filteredBranches = useMemo(() => {
    return BRANCHES.filter(b => {
      const matchSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.code.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "ALL" || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const topBranches = useMemo(() => [...BRANCHES].sort((a, b) => b.successRate - a.successRate).slice(0, 3), []);

  return (
    <div className="h-screen overflow-auto bg-slate-50 p-6">

      {/* ── Page Header ── */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full tracking-wide uppercase">Department of Posts</span>
            <span className="text-xs text-slate-400">FY 2024–25</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">KPI Monitoring Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Citizen Charter Compliance & Operational Performance Analytics</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Date Range */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm border border-slate-200 rounded-xl bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
            >
              {["Today", "This Week", "This Month", "Last Quarter", "FY 2024–25"].map(r => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
          <button className="flex items-center gap-2 px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors text-slate-600">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button className="flex items-center gap-2 px-3.5 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-xl font-medium">
            <Download className="w-3.5 h-3.5" /> Export Report
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
        <div className="col-span-2 md:col-span-2">
          <KPICard title="Total Parcels Processed" value="24,320" icon={Package} color="text-indigo-600" bgColor="bg-indigo-50" trend="+8.4%" trendUp sub="FY 2024–25 total" progress={82} />
        </div>
        <div className="col-span-2 md:col-span-2">
          <KPICard title="On-Time Delivery Rate" value="91.4%" icon={CheckCircle} color="text-emerald-600" bgColor="bg-emerald-50" trend="+2.1%" trendUp sub="Target: 90%" progress={91} />
        </div>
        <div className="col-span-2 md:col-span-2">
          <KPICard title="Avg. Delivery Time" value="2.8 days" icon={Clock} color="text-blue-600" bgColor="bg-blue-50" trend="-0.3d" trendUp sub="Target: ≤3 days" progress={87} />
        </div>
        <div className="col-span-2 md:col-span-2">
          <KPICard title="Complaint Resolution Rate" value="87.6%" icon={ShieldCheck} color="text-violet-600" bgColor="bg-violet-50" trend="+5.2%" trendUp sub="Out of 3,150 raised" progress={88} />
        </div>
        <div className="col-span-2 md:col-span-2">
          <KPICard title="Pending Complaints" value="392" icon={AlertTriangle} color="text-amber-600" bgColor="bg-amber-50" trend="+12" trendUp={false} sub="Requires immediate action" progress={38} />
        </div>
        <div className="col-span-2 md:col-span-2">
          <KPICard title="SLA Compliance" value="88.9%" icon={Target} color="text-sky-600" bgColor="bg-sky-50" trend="+1.8%" trendUp sub="National average" progress={89} />
        </div>
        <div className="col-span-2 md:col-span-2">
          <KPICard title="Active Delivery Agents" value="1,842" icon={Users} color="text-teal-600" bgColor="bg-teal-50" trend="+24" trendUp sub="Across all branches" progress={76} />
        </div>
        <div className="col-span-2 md:col-span-2">
          <KPICard title="Delayed Parcels" value="820" icon={Truck} color="text-rose-600" bgColor="bg-rose-50" trend="-6.3%" trendUp sub="3.4% of total" progress={28} />
        </div>
      </div>

      {/* ── Charts Row 1 ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
        {/* Delivery Performance Line Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <SectionHeader icon={TrendingUp} title="Parcel Delivery Performance" sub="Daily deliveries vs target — May 2025" />
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={DELIVERY_PERFORMANCE} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="delivered" name="Delivered" stroke="#6366f1" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="target" name="Target" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="6 3" dot={false} />
              <Line type="monotone" dataKey="delayed" name="Delayed" stroke="#f87171" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Parcel Status Pie Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <SectionHeader icon={BarChart2} title="Parcel Status Distribution" sub="Current snapshot" />
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={PARCEL_STATUS} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {PARCEL_STATUS.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip formatter={(v, n) => [v.toLocaleString(), n]} contentStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1.5">
            {PARCEL_STATUS.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-slate-600">{s.name}</span>
                </div>
                <span className="font-semibold text-slate-700">{s.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Charts Row 2 ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
        {/* Complaint Trends Area Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <SectionHeader icon={Activity} title="Complaint Resolution Trends" sub="Monthly complaint handling — Dec 2024 to May 2025" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={COMPLAINT_TRENDS} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="gradRaised" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="raised" name="Raised" stroke="#f87171" strokeWidth={2} fill="url(#gradRaised)" />
              <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#6366f1" strokeWidth={2} fill="url(#gradResolved)" />
              <Area type="monotone" dataKey="pending" name="Pending" stroke="#f59e0b" strokeWidth={2} fill="none" strokeDasharray="4 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Branch Performance Bar Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <SectionHeader icon={BarChart2} title="Branch Performance Comparison" sub="Delivery success % by branch" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={BRANCH_PERFORMANCE} margin={{ top: 4, right: 4, bottom: 20, left: -10 }} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="branch" tick={{ fontSize: 9.5, fill: "#94a3b8" }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="success" name="Success %" radius={[4, 4, 0, 0]}>
                {BRANCH_PERFORMANCE.map((entry, i) => (
                  <Cell key={i} fill={entry.success >= 90 ? "#6366f1" : entry.success >= 80 ? "#3b82f6" : "#f59e0b"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Alerts + Top Branches + Staff Productivity ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
        {/* Alerts */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <SectionHeader icon={Bell} title="Recent KPI Alerts" sub="Live system notifications" />
          <div className="space-y-3">
            {ALERTS.map(alert => {
              const ac = ALERT_CONFIG[alert.type];
              return (
                <div key={alert.id} className={`flex gap-3 p-3 rounded-xl border ${ac.bg} ${ac.border}`}>
                  <alert.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${ac.icon}`} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 leading-snug">{alert.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{alert.detail}</p>
                    <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performing Branches */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <SectionHeader icon={Award} title="Top Performing Branches" sub="By delivery success rate" />
          <div className="space-y-4">
            {topBranches.map((b, i) => (
              <div key={b.name} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${i === 0 ? "bg-amber-100 text-amber-700" : i === 1 ? "bg-slate-100 text-slate-600" : "bg-orange-50 text-orange-600"}`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">{b.name}</p>
                    <span className="text-sm font-bold text-indigo-600 ml-2">{b.successRate}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                      <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${b.successRate}%` }} />
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{b.processed.toLocaleString()} parcels</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-400">{b.code}</span>
                    <StatusBadge status={b.status} />
                  </div>
                </div>
              </div>
            ))}

            {/* Quick stats */}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {[
                { label: "Avg SLA", value: "96.0%", color: "text-indigo-600" },
                { label: "Least Complaints", value: "34", color: "text-emerald-600" },
              ].map(s => (
                <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                  <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Staff Productivity */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <SectionHeader icon={Users} title="Staff Productivity" sub="Top delivery agents this month" />
          <div className="space-y-3">
            {TOP_AGENTS.map((agent, i) => (
              <div key={agent.name} className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {agent.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-800 truncate">{agent.name}</p>
                    <div className="flex items-center gap-1 ml-2">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold text-slate-700">{agent.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-400">{agent.branch}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-slate-100 rounded-full h-1">
                      <div className="bg-indigo-400 h-1 rounded-full" style={{ width: `${agent.efficiency}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-indigo-600 whitespace-nowrap">{agent.parcels} parcels</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
              {[
                { label: "Avg Efficiency", value: "93.8%" },
                { label: "Total Parcels", value: "1,393" },
                { label: "Avg Rating", value: "4.7★" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-sm font-bold text-slate-800">{s.value}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Branch KPI Table ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 rounded-xl">
              <MapPin className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Branch KPI Monitoring</h2>
              <p className="text-xs text-slate-400">{filteredBranches.length} branches</p>
            </div>
          </div>
          <div className="ml-auto flex flex-wrap gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search branch..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl w-48 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2 text-sm border border-slate-200 rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
              >
                <option value="ALL">All Status</option>
                {["EXCELLENT","GOOD","AVERAGE","NEEDS_IMPROVEMENT","CRITICAL"].map(s => (
                  <option key={s} value={s}>{s.replace("_", " ")}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Branch Name","Code","Parcels Processed","Delivery Success %","Avg Delivery Time","Complaints Raised","Complaints Resolved","Active Staff","SLA Compliance","Performance"].map(col => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredBranches.map(b => (
                <tr key={b.code} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{b.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 whitespace-nowrap">{b.code}</td>
                  <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{b.processed.toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${b.successRate >= 90 ? "bg-emerald-500" : b.successRate >= 80 ? "bg-blue-500" : "bg-amber-500"}`}
                          style={{ width: `${b.successRate}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">{b.successRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{b.avgTime}</td>
                  <td className="px-4 py-3 text-rose-600 font-semibold whitespace-nowrap">{b.complaintsRaised}</td>
                  <td className="px-4 py-3 text-emerald-600 font-semibold whitespace-nowrap">{b.complaintsResolved}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{b.staff}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-xs font-semibold ${b.sla >= 90 ? "text-emerald-600" : b.sla >= 80 ? "text-blue-600" : "text-amber-600"}`}>{b.sla}%</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">Showing {filteredBranches.length} of {BRANCHES.length} branches</p>
          <p className="text-xs text-slate-400">Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}