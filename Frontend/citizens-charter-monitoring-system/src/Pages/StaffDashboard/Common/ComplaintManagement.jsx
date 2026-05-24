import { useState, useMemo } from "react";
import {
  Search, Filter, RefreshCw, Eye, UserCheck, RefreshCcw, CheckCircle,
  AlertTriangle, Clock, Package, TrendingUp, Users, BarChart2,
  ChevronDown, X, MapPin, Phone, Mail, Calendar, FileText,
  ArrowUpRight, Bell, Shield, Truck, MessageSquare, ChevronLeft, ChevronRight
} from "lucide-react";

// ─── Dummy Data Generation ───────────────────────────────────────────────────

const indianNames = [
  "Rajesh Kumar","Sunita Devi","Amit Sharma","Priya Singh","Vikram Patel",
  "Meena Rao","Suresh Verma","Kavitha Nair","Anil Gupta","Deepa Joshi",
  "Ravi Shankar","Lakshmi Menon","Mohan Das","Usha Kumari","Harish Yadav",
  "Geeta Bai","Sanjay Mishra","Rekha Pandey","Dinesh Tiwari","Shobha Reddy",
  "Mahesh Patil","Asha Bhosle","Ramesh Chandra","Neeta Jain","Prakash Nair",
  "Savita Sharma","Vinod Kumar","Pooja Agarwal","Naresh Singh","Sunanda Rao",
  "Ashok Mehta","Radha Krishnan","Gopal Verma","Kamala Devi","Sunil Bose",
  "Anita Pillai","Prabha Kumari","Santosh Garg","Vijaya Lakshmi","Mukesh Shah",
  "Sushma Swarup","Ramakrishna Iyengar","Bharati Mukherjee","Rajani Gupta","Dilip Yadav",
  "Nirmala Devi","Shyam Sundar","Vasantha Kumari","Arun Kumar","Padmavathi Reddy",
  "Balakrishnan Nair","Indira Patel","Girish Bhat","Leela Kumari","Jayant Shah",
  "Mangala Devi","Pramod Tiwari","Saraswati Rao","Bharat Singh","Vimala Devi",
];

const branches = [
  "New Delhi GPO","Mumbai Central PO","Chennai GPO","Kolkata GPO","Bengaluru GPO",
  "Hyderabad GPO","Pune Head PO","Ahmedabad GPO","Jaipur GPO","Lucknow GPO",
  "Bhopal GPO","Patna GPO","Chandigarh PO","Indore PO","Nagpur PO",
  "Surat PO","Vadodara PO","Visakhapatnam PO","Coimbatore PO","Kochi PO",
  "Thiruvananthapuram PO","Guwahati GPO","Bhubaneswar PO","Ranchi PO","Raipur PO",
];

const officers = [
  "Rajiv Mehta","Ananya Sharma","Suresh Babu","Preethi Nair","Karthik Raja",
  "Madhuri Dixit","Sanjiv Kumar","Tanvi Bose","Vivek Oberoi","Smitha Pillai",
  "Navin Joshi","Rekha Menon","Arvind Patel","Swati Gupta","Deepak Yadav",
];

const complaintTypes = [
  "Delayed Delivery","Lost Parcel","Damaged Parcel","Wrong Delivery",
  "Service Issue","Employee Behavior","Tracking Issue","Non-Delivery",
  "Billing Dispute","Speed Post Delay","Registered Post Issue","EMO Issue",
];

const statusList = ["PENDING","UNDER_REVIEW","IN_PROGRESS","RESOLVED","REJECTED","ESCALATED"];
const priorityList = ["LOW","MEDIUM","HIGH","CRITICAL"];

const descriptions = {
  "Delayed Delivery": "Parcel dispatched 15 days ago but not yet delivered to the destination address. Multiple follow-ups made but no resolution provided.",
  "Lost Parcel": "Registered letter posted on the given date has not been received. Tracking shows 'In Transit' with no updates for over 10 days.",
  "Damaged Parcel": "Parcel received in severely damaged condition. Contents were broken/missing. No explanation provided by delivery staff.",
  "Wrong Delivery": "A parcel meant for a different address was delivered to my premises. The recipient's name and address do not match.",
  "Service Issue": "Counter staff were unhelpful and refused to accept the parcel citing invalid reasons. Request immediate action.",
  "Employee Behavior": "Delivery agent was rude, demanded extra charges, and used inappropriate language during delivery.",
  "Tracking Issue": "Tracking ID shows no movement for past 7 days. Helpline not responding. Urgent delivery expected.",
};

function generateTrackingId() {
  const prefix = ["EE","RR","CP","CX","EM"][Math.floor(Math.random() * 5)];
  const num = Math.floor(100000000 + Math.random() * 900000000);
  return `${prefix}${num}IN`;
}

function generateDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

const ALL_COMPLAINTS = Array.from({ length: 150 }, (_, i) => {
  const type = complaintTypes[Math.floor(Math.random() * complaintTypes.length)];
  const status = statusList[Math.floor(Math.random() * statusList.length)];
  const priority = priorityList[Math.floor(Math.random() * priorityList.length)];
  const daysAgo = Math.floor(Math.random() * 60);
  return {
    id: `DOP-2024-${String(i + 1001).padStart(5, "0")}`,
    trackingId: generateTrackingId(),
    citizenName: indianNames[Math.floor(Math.random() * indianNames.length)],
    phone: `+91 ${Math.floor(7000000000 + Math.random() * 2999999999)}`,
    email: `citizen${i + 1}@gmail.com`,
    address: `${Math.floor(Math.random() * 500) + 1}, Sector ${Math.floor(Math.random() * 30) + 1}`,
    type,
    priority,
    officer: officers[Math.floor(Math.random() * officers.length)],
    branch: branches[Math.floor(Math.random() * branches.length)],
    date: generateDate(daysAgo),
    status,
    description: descriptions[type] || "No description provided.",
    weight: `${(Math.random() * 5 + 0.1).toFixed(2)} kg`,
    value: `₹${Math.floor(Math.random() * 5000 + 200)}`,
    remarks: status === "RESOLVED" ? "Issue investigated and resolved. Compensation processed." : status === "REJECTED" ? "Complaint found invalid after investigation." : "Under investigation.",
    timeline: [
      { step: "Complaint Registered", date: generateDate(daysAgo), done: true },
      { step: "Assigned to Officer", date: generateDate(daysAgo - 1), done: daysAgo > 2 },
      { step: "Under Investigation", date: generateDate(daysAgo - 3), done: daysAgo > 5 },
      { step: "Resolution Provided", date: generateDate(daysAgo - 7), done: status === "RESOLVED" || status === "REJECTED" },
      { step: "Complaint Closed", date: generateDate(daysAgo - 10), done: status === "RESOLVED" },
    ],
  };
});

// ─── Badge Helpers ────────────────────────────────────────────────────────────

const STATUS_STYLES = {
  PENDING: "bg-amber-50 text-amber-700 border border-amber-200",
  UNDER_REVIEW: "bg-blue-50 text-blue-700 border border-blue-200",
  IN_PROGRESS: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  RESOLVED: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  REJECTED: "bg-red-50 text-red-700 border border-red-200",
  ESCALATED: "bg-rose-50 text-rose-800 border border-rose-300",
};

const PRIORITY_STYLES = {
  LOW: "bg-slate-100 text-slate-600",
  MEDIUM: "bg-yellow-50 text-yellow-700",
  HIGH: "bg-orange-50 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700 font-semibold",
};

const PRIORITY_DOT = {
  LOW: "bg-slate-400",
  MEDIUM: "bg-yellow-500",
  HIGH: "bg-orange-500",
  CRITICAL: "bg-red-600",
};

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status] || ""}`}>
    {status.replace("_", " ")}
  </span>
);

const PriorityBadge = ({ priority }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${PRIORITY_STYLES[priority] || ""}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[priority]}`} />
    {priority}
  </span>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ title, value, icon: Icon, color, sub, trend }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-default">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <p className={`text-3xl font-bold mt-1.5 ${color}`}>{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
      <div className={`p-3 rounded-xl ${color.replace("text-", "bg-").replace("-700", "-100").replace("-600", "-100")}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
    </div>
    {trend && (
      <div className="mt-3 flex items-center gap-1 text-xs text-emerald-600">
        <ArrowUpRight className="w-3.5 h-3.5" />
        <span>{trend}</span>
      </div>
    )}
  </div>
);

// ─── Modal ────────────────────────────────────────────────────────────────────

const ComplaintModal = ({ complaint, onClose }) => {
  if (!complaint) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{complaint.id}</h2>
            <p className="text-xs text-slate-500 mt-0.5">Complaint Details & History</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
            <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">{complaint.type}</span>
          </div>

          {/* Citizen Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Citizen Details</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-700"><Users className="w-4 h-4 text-indigo-400" />{complaint.citizenName}</div>
                <div className="flex items-center gap-2 text-sm text-slate-700"><Phone className="w-4 h-4 text-indigo-400" />{complaint.phone}</div>
                <div className="flex items-center gap-2 text-sm text-slate-600 text-xs"><Mail className="w-4 h-4 text-indigo-400" />{complaint.email}</div>
                <div className="flex items-center gap-2 text-sm text-slate-600 text-xs"><MapPin className="w-4 h-4 text-indigo-400" />{complaint.address}</div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Parcel Details</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-700"><Package className="w-4 h-4 text-indigo-400" />{complaint.trackingId}</div>
                <div className="flex items-center gap-2 text-sm text-slate-700"><Truck className="w-4 h-4 text-indigo-400" />Weight: {complaint.weight}</div>
                <div className="flex items-center gap-2 text-sm text-slate-700"><Shield className="w-4 h-4 text-indigo-400" />Value: {complaint.value}</div>
                <div className="flex items-center gap-2 text-sm text-slate-700"><Calendar className="w-4 h-4 text-indigo-400" />{complaint.date}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h3 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Complaint Description</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{complaint.description}</p>
          </div>

          {/* Proof Placeholder */}
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex items-center justify-center gap-2 text-slate-400">
            <FileText className="w-5 h-5" />
            <span className="text-sm">Attached Proof: photo_evidence.jpg, tracking_screenshot.png</span>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Status Timeline</h3>
            <div className="space-y-3">
              {complaint.timeline.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? "bg-indigo-600" : "bg-slate-200"}`}>
                    {step.done ? <CheckCircle className="w-4 h-4 text-white" /> : <Clock className="w-4 h-4 text-slate-400" />}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className={`text-sm font-medium ${step.done ? "text-slate-800" : "text-slate-400"}`}>{step.step}</span>
                    <span className="text-xs text-slate-400">{step.done ? step.date : "Pending"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Remarks */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Officer Remarks</h3>
            <p className="text-sm text-slate-700">{complaint.remarks}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <UserCheck className="w-3.5 h-3.5" /> Assigned to: {complaint.officer} — {complaint.branch}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function ComplaintDashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(50);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const stats = useMemo(() => {
    const total = ALL_COMPLAINTS.length;
    const pending = ALL_COMPLAINTS.filter(c => c.status === "PENDING").length;
    const resolved = ALL_COMPLAINTS.filter(c => c.status === "RESOLVED").length;
    const high = ALL_COMPLAINTS.filter(c => c.priority === "HIGH" || c.priority === "CRITICAL").length;
    const escalated = ALL_COMPLAINTS.filter(c => c.status === "ESCALATED").length;
    const today = new Date().toISOString().split("T")[0];
    const resolvedToday = ALL_COMPLAINTS.filter(c => c.status === "RESOLVED" && c.date === today).length;
    return { total, pending, resolved, high, escalated, resolvedToday };
  }, []);

  const filtered = useMemo(() => {
    return ALL_COMPLAINTS.filter(c => {
      const matchSearch = !search || [c.id, c.citizenName, c.trackingId, c.branch, c.officer]
        .some(v => v.toLowerCase().includes(search.toLowerCase()));
      const matchStatus = statusFilter === "ALL" || c.status === statusFilter;
      const matchPriority = priorityFilter === "ALL" || c.priority === priorityFilter;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [search, statusFilter, priorityFilter]);

  const visible = filtered.slice(0, visibleCount);
  const escalatedList = ALL_COMPLAINTS.filter(c => c.status === "ESCALATED").slice(0, 4);
  const recentActivity = ALL_COMPLAINTS.slice(0, 6);
  const topTypes = useMemo(() => {
    const counts = {};
    ALL_COMPLAINTS.forEach(c => { counts[c.type] = (counts[c.type] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/80 p-6 font-sans">
      {/* ── Page Header ── */}
      <div className="mb-6 flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">Department of Posts</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Citizen Complaint Monitoring</h1>
          <p className="text-sm text-slate-500 mt-0.5">Complaint Charter Management System — FY 2024–25</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          Last refreshed: {lastRefresh.toLocaleTimeString()}
          <button
            onClick={() => setLastRefresh(new Date())}
            className="ml-2 p-1.5 hover:bg-white border border-slate-200 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-500" />
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard title="Total Complaints" value={stats.total} icon={FileText} color="text-indigo-700" sub="FY 2024–25" trend="+12 this week" />
        <StatCard title="Pending" value={stats.pending} icon={Clock} color="text-amber-600" sub="Awaiting action" />
        <StatCard title="Resolved" value={stats.resolved} icon={CheckCircle} color="text-emerald-600" sub="All time" trend="+5 today" />
        <StatCard title="High Priority" value={stats.high} icon={AlertTriangle} color="text-rose-600" sub="HIGH + CRITICAL" />
        <StatCard title="Avg. Resolution" value="4.2d" icon={TrendingUp} color="text-blue-700" sub="Target: 3 days" />
        <StatCard title="Resolved Today" value={stats.resolvedToday || "3"} icon={BarChart2} color="text-violet-700" sub={new Date().toLocaleDateString()} trend="On track" />
      </div>

      {/* ── Escalated Alert Banner ── */}
      {stats.escalated > 0 && (
        <div className="mb-6 bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3">
          <Bell className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-rose-700">{stats.escalated} Escalated Complaints Require Immediate Attention</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {escalatedList.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedComplaint(c)}
                  className="text-xs bg-white border border-rose-200 text-rose-700 px-2.5 py-1 rounded-lg hover:bg-rose-100 transition-colors"
                >
                  {c.id} — {c.type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Analytics Mini Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Top Categories */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm col-span-1 md:col-span-2">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-indigo-500" /> Top Complaint Categories
          </h3>
          <div className="space-y-3">
            {topTypes.map(([type, count], idx) => {
              const pct = Math.round((count / ALL_COMPLAINTS.length) * 100);
              const colors = ["bg-indigo-500","bg-blue-500","bg-violet-500","bg-sky-500","bg-cyan-500"];
              return (
                <div key={type}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">{type}</span>
                    <span className="text-slate-400">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`${colors[idx]} h-2 rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-500" /> Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map(c => (
              <div key={c.id} className="flex items-start gap-2.5 group">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${PRIORITY_DOT[c.priority]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-700 truncate">{c.citizenName}</p>
                  <p className="text-xs text-slate-400">{c.type}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Complaint Table ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Table Toolbar */}
        <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <FileText className="w-4 h-4 text-indigo-500" />
            Complaint Records
            <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{filtered.length} found</span>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search ID, name, branch..."
                value={search}
                onChange={e => { setSearch(e.target.value); setVisibleCount(50); }}
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl w-56 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
              />
            </div>
            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setVisibleCount(50); }}
                className="pl-9 pr-8 py-2 text-sm border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer bg-white"
              >
                <option value="ALL">All Status</option>
                {statusList.map(s => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
            {/* Priority Filter */}
            <div className="relative">
              <select
                value={priorityFilter}
                onChange={e => { setPriorityFilter(e.target.value); setVisibleCount(50); }}
                className="pl-3 pr-8 py-2 text-sm border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer bg-white"
              >
                <option value="ALL">All Priority</option>
                {priorityList.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
            <button
              onClick={() => { setSearch(""); setStatusFilter("ALL"); setPriorityFilter("ALL"); setVisibleCount(50); setLastRefresh(new Date()); }}
              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <RefreshCcw className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50/95 backdrop-blur-sm z-10">
              <tr className="border-b border-slate-100">
                {["Complaint ID","Tracking ID","Citizen Name","Type","Priority","Assigned Officer","Branch","Date","Status","Actions"].map(col => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-slate-400 text-sm">
                    No complaints match your search criteria.
                  </td>
                </tr>
              ) : visible.map(c => (
                <tr key={c.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-indigo-600 whitespace-nowrap">{c.id}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500 whitespace-nowrap">{c.trackingId}</td>
                  <td className="px-4 py-3 text-slate-800 font-medium whitespace-nowrap">{c.citizenName}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap text-xs">{c.type}</td>
                  <td className="px-4 py-3 whitespace-nowrap"><PriorityBadge priority={c.priority} /></td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap text-xs">{c.officer}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs max-w-[140px] truncate">{c.branch}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{c.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedComplaint(c)}
                        title="View"
                        className="p-1.5 rounded-lg hover:bg-indigo-100 text-indigo-500 hover:text-indigo-700 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Assign Officer"
                        className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Update Status"
                        className="p-1.5 rounded-lg hover:bg-amber-100 text-amber-500 hover:text-amber-700 transition-colors"
                      >
                        <RefreshCcw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Resolve"
                        className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-500 hover:text-emerald-700 transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Load More */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} complaints
          </p>
          {visibleCount < filtered.length && (
            <button
              onClick={() => setVisibleCount(v => v + 50)}
              className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-4 py-2 rounded-xl transition-colors"
            >
              Load More Complaints <ChevronRight className="w-4 h-4" />
            </button>
          )}
          {visibleCount > 50 && (
            <button
              onClick={() => setVisibleCount(50)}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Collapse
            </button>
          )}
        </div>
      </div>

      {/* ── Modal ── */}
      {selectedComplaint && (
        <ComplaintModal complaint={selectedComplaint} onClose={() => setSelectedComplaint(null)} />
      )}
    </div>
  );
}