import { useState, useEffect, useMemo } from "react";
import {
  Bell, Package, AlertCircle, Building2, Users, TrendingUp, AlertTriangle,
  Search, Filter, Eye, Edit, UserPlus, ChevronUp, ChevronDown, Activity,
  Database, Server, Wifi, Clock, Star, CheckCircle, XCircle, Truck,
  RotateCcw, MapPin, Phone, Mail, Shield, BarChart3, PieChart, Zap,
  ArrowUpRight, ArrowDownRight, Plus, X, FileText, RefreshCw, Settings,
  Home, LogOut, Menu, ChevronRight, Hash, Globe, Layers, Award, Target
} from "lucide-react";

const PARCELS = [
  { id: "TRK-2024-001", sender: "Rajesh Kumar", receiver: "Priya Singh", branch: "Mumbai Central", status: "IN_TRANSIT", priority: "HIGH", staff: "Amit Sharma", city: "Mumbai" },
  { id: "TRK-2024-002", sender: "Sunita Devi", receiver: "Mohan Lal", branch: "Delhi South", status: "DELIVERED", priority: "NORMAL", staff: "Kavita Patel", city: "Delhi" },
  { id: "TRK-2024-003", sender: "Aarav Mehta", receiver: "Neha Gupta", branch: "Bangalore East", status: "DELAYED", priority: "URGENT", staff: "Ravi Kumar", city: "Bangalore" },
  { id: "TRK-2024-004", sender: "Pooja Verma", receiver: "Suresh Yadav", branch: "Chennai Port", status: "BOOKED", priority: "LOW", staff: "Deepa Nair", city: "Chennai" },
  { id: "TRK-2024-005", sender: "Vikram Singh", receiver: "Anita Bose", branch: "Kolkata North", status: "OUT_FOR_DELIVERY", priority: "HIGH", staff: "Suresh Das", city: "Kolkata" },
  { id: "TRK-2024-006", sender: "Meera Joshi", receiver: "Rahul Sharma", branch: "Hyderabad Central", status: "RETURNED", priority: "NORMAL", staff: "Priya Reddy", city: "Hyderabad" },
  { id: "TRK-2024-007", sender: "Arjun Patel", receiver: "Sita Ram", branch: "Pune West", status: "IN_TRANSIT", priority: "URGENT", staff: "Manoj Tiwari", city: "Pune" },
  { id: "TRK-2024-008", sender: "Kavya Nair", receiver: "Dev Anand", branch: "Ahmedabad GPO", status: "DELIVERED", priority: "NORMAL", staff: "Hina Shah", city: "Ahmedabad" },
];

const COMPLAINTS = [
  { id: "CMP-001", citizen: "Ramesh Gupta", type: "Delivery Delay", priority: "HIGH", status: "OPEN", branch: "Mumbai Central", escalation: 2, date: "2024-01-15" },
  { id: "CMP-002", citizen: "Sunita Rao", type: "Lost Parcel", priority: "URGENT", status: "ESCALATED", branch: "Delhi South", escalation: 3, date: "2024-01-14" },
  { id: "CMP-003", citizen: "Anil Sharma", type: "Staff Behavior", priority: "MEDIUM", status: "IN_PROGRESS", branch: "Bangalore East", escalation: 1, date: "2024-01-13" },
  { id: "CMP-004", citizen: "Geeta Patel", type: "Wrong Delivery", priority: "HIGH", status: "RESOLVED", branch: "Chennai Port", escalation: 0, date: "2024-01-12" },
  { id: "CMP-005", citizen: "Mahesh Kumar", type: "Damaged Parcel", priority: "MEDIUM", status: "OPEN", branch: "Kolkata North", escalation: 1, date: "2024-01-11" },
  { id: "CMP-006", citizen: "Lalita Singh", type: "Billing Issue", priority: "LOW", status: "IN_PROGRESS", branch: "Hyderabad Central", escalation: 0, date: "2024-01-10" },
];

const BRANCHES = [
  { name: "Mumbai Central GPO", code: "MUM-01", successRate: 97.2, delivered: 14832, complaints: 23, status: "ACTIVE", city: "Mumbai" },
  { name: "Delhi South HO", code: "DEL-02", successRate: 95.8, delivered: 12650, complaints: 31, status: "ACTIVE", city: "Delhi" },
  { name: "Bangalore East SO", code: "BLR-03", successRate: 94.1, delivered: 11203, complaints: 45, status: "ACTIVE", city: "Bangalore" },
  { name: "Chennai Port HO", code: "CHN-04", successRate: 96.5, delivered: 10891, complaints: 18, status: "ACTIVE", city: "Chennai" },
  { name: "Kolkata North GPO", code: "KOL-05", successRate: 93.7, delivered: 9750, complaints: 52, status: "ACTIVE", city: "Kolkata" },
];

const ACTIVITIES = [
  { id: 1, type: "branch", message: "New branch created: Jaipur West SO", time: "2 min ago", icon: "building" },
  { id: 2, type: "complaint", message: "Complaint CMP-002 escalated to Level 3", time: "8 min ago", icon: "alert" },
  { id: 3, type: "staff", message: "Staff account created: Ravi Shankar (Pune)", time: "15 min ago", icon: "user" },
  { id: 4, type: "parcel", message: "Parcel TRK-2024-005 marked delivered", time: "22 min ago", icon: "package" },
  { id: 5, type: "report", message: "Monthly report generated for January 2024", time: "35 min ago", icon: "file" },
  { id: 6, type: "system", message: "Database backup completed successfully", time: "1 hr ago", icon: "database" },
  { id: 7, type: "parcel", message: "Bulk import: 245 parcels from Delhi HO", time: "2 hr ago", icon: "package" },
  { id: 8, type: "staff", message: "Staff performance review: Q4 2023", time: "3 hr ago", icon: "award" },
];

const MONTHLY_DATA = [
  { month: "Aug", parcels: 62, complaints: 28 },
  { month: "Sep", parcels: 71, complaints: 24 },
  { month: "Oct", parcels: 78, complaints: 22 },
  { month: "Nov", parcels: 85, complaints: 19 },
  { month: "Dec", parcels: 91, complaints: 16 },
  { month: "Jan", parcels: 98, complaints: 14 },
];

const NOTIFICATIONS = [
  { id: 1, message: "3 parcels marked as critical delay", type: "warning", time: "5m" },
  { id: 2, message: "Complaint CMP-002 awaiting escalation approval", type: "error", time: "12m" },
  { id: 3, message: "System backup completed successfully", type: "success", time: "1h" },
  { id: 4, message: "New branch onboarding: Surat GPO", type: "info", time: "2h" },
];

const statusConfig = {
  BOOKED: { color: "bg-sky-500/20 text-sky-300 border border-sky-500/30", dot: "bg-sky-400" },
  IN_TRANSIT: { color: "bg-amber-500/20 text-amber-300 border border-amber-500/30", dot: "bg-amber-400" },
  OUT_FOR_DELIVERY: { color: "bg-violet-500/20 text-violet-300 border border-violet-500/30", dot: "bg-violet-400" },
  DELIVERED: { color: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30", dot: "bg-emerald-400" },
  DELAYED: { color: "bg-rose-500/20 text-rose-300 border border-rose-500/30", dot: "bg-rose-400" },
  RETURNED: { color: "bg-orange-500/20 text-orange-300 border border-orange-500/30", dot: "bg-orange-400" },
};

const priorityConfig = {
  URGENT: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
  HIGH: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  NORMAL: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  MEDIUM: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  LOW: "bg-slate-500/20 text-slate-300 border border-slate-500/30",
};

const complaintStatusConfig = {
  OPEN: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
  ESCALATED: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  IN_PROGRESS: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  RESOLVED: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
};

export default function PostalAdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("parcels");
  const [parcelSearch, setParcelSearch] = useState("");
  const [parcelStatusFilter, setParcelStatusFilter] = useState("ALL");
  const [complaintSearch, setComplaintSearch] = useState("");
  const [complaintFilter, setComplaintFilter] = useState("ALL");
  const [parcels, setParcels] = useState(PARCELS);
  const [complaints, setComplaints] = useState(COMPLAINTS);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newBranch, setNewBranch] = useState({
    name: "", code: "", type: "SUB_OFFICE", city: "", state: "", contact: "", manager: ""
  });
  const [serverLoad, setServerLoad] = useState(42);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadTimer = setInterval(() => {
      setServerLoad(prev => {
        const delta = (Math.random() - 0.5) * 8;
        return Math.min(85, Math.max(20, Math.round(prev + delta)));
      });
    }, 2500);
    return () => clearInterval(loadTimer);
  }, []);

  const filteredParcels = useMemo(() => {
    return parcels.filter(p => {
      const matchSearch = p.id.toLowerCase().includes(parcelSearch.toLowerCase()) ||
        p.sender.toLowerCase().includes(parcelSearch.toLowerCase()) ||
        p.receiver.toLowerCase().includes(parcelSearch.toLowerCase());
      const matchStatus = parcelStatusFilter === "ALL" || p.status === parcelStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [parcels, parcelSearch, parcelStatusFilter]);

  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const matchSearch = c.id.toLowerCase().includes(complaintSearch.toLowerCase()) ||
        c.citizen.toLowerCase().includes(complaintSearch.toLowerCase());
      const matchStatus = complaintFilter === "ALL" || c.status === complaintFilter;
      return matchSearch && matchStatus;
    });
  }, [complaints, complaintSearch, complaintFilter]);

  const handleResolveComplaint = (id) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: "RESOLVED", escalation: 0 } : c));
  };

  const handleEscalateComplaint = (id) => {
    setComplaints(prev => prev.map(c =>
      c.id === id ? { ...c, status: "ESCALATED", escalation: Math.min(c.escalation + 1, 3) } : c
    ));
  };

  const handleSaveBranch = () => {
    if (newBranch.name && newBranch.code) {
      setShowModal(false);
      setNewBranch({ name: "", code: "", type: "SUB_OFFICE", city: "", state: "", contact: "", manager: "" });
    }
  };

  const kpiCards = [
    { label: "Total Parcels", value: "1,24,856", icon: Package, trend: "+12.4%", up: true, sub: "3,204 processed today", gradient: "from-blue-600 to-cyan-500", glow: "shadow-blue-500/30" },
    { label: "Active Complaints", value: "248", icon: AlertCircle, trend: "-8.2%", up: false, sub: "42 resolved today", gradient: "from-rose-600 to-pink-500", glow: "shadow-rose-500/30" },
    { label: "Postal Branches", value: "3,842", icon: Building2, trend: "+2.1%", up: true, sub: "18 new this month", gradient: "from-violet-600 to-purple-500", glow: "shadow-violet-500/30" },
    { label: "Active Staff", value: "28,640", icon: Users, trend: "+5.7%", up: true, sub: "On duty: 18,450", gradient: "from-emerald-600 to-teal-500", glow: "shadow-emerald-500/30" },
    { label: "Delivery Success", value: "96.8%", icon: TrendingUp, trend: "+1.2%", up: true, sub: "National avg target: 95%", gradient: "from-amber-500 to-orange-500", glow: "shadow-amber-500/30" },
    { label: "Pending Escalations", value: "37", icon: AlertTriangle, trend: "+3", up: false, sub: "12 critical priority", gradient: "from-orange-600 to-red-500", glow: "shadow-orange-500/30" },
  ];

  const formatDate = (d) => d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const formatTime = (d) => d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const activityIcon = (type) => {
    const map = { building: Building2, alert: AlertCircle, user: Users, package: Package, file: FileText, database: Database, award: Award };
    const Icon = map[type] || Activity;
    return <Icon size={14} />;
  };

  const maxParcels = Math.max(...MONTHLY_DATA.map(d => d.parcels));

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 font-sans" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      {/* Background mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-600/6 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/5 rounded-full blur-3xl" />
      </div>

      <div className="flex h-screen overflow-hidden relative">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "w-60" : "w-16"} transition-all duration-300 flex-shrink-0 bg-[#0d1120]/90 border-r border-white/5 flex flex-col`}>
          <div className="p-4 border-b border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
              <Shield size={16} className="text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <p className="text-xs font-bold text-white leading-none">INDIA POST</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Charter Monitor</p>
              </div>
            )}
          </div>

          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
            {[
              { icon: Home, label: "Dashboard", active: true },
              { icon: Package, label: "Parcels" },
              { icon: AlertCircle, label: "Complaints" },
              { icon: Building2, label: "Branches" },
              { icon: Users, label: "Staff" },
              { icon: BarChart3, label: "Analytics" },
              { icon: FileText, label: "Reports" },
              { icon: Settings, label: "Settings" },
            ].map(({ icon: Icon, label, active }) => (
              <button key={label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${active ? "bg-blue-600/20 text-blue-300 border border-blue-500/20" : "text-slate-400 hover:bg-white/5 hover:text-slate-200"}`}>
                <Icon size={16} className="flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{label}</span>}
              </button>
            ))}
          </nav>

          <div className="p-2 border-t border-white/5">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all">
              <LogOut size={16} className="flex-shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="bg-[#0d1120]/80 backdrop-blur border-b border-white/5 px-6 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(p => !p)} className="text-slate-400 hover:text-white transition-colors">
                <Menu size={18} />
              </button>
              <div>
                <h1 className="text-sm font-semibold text-white">Welcome back, System Administrator 👋</h1>
                <p className="text-xs text-slate-400">{formatDate(currentTime)} · <span className="text-blue-400 font-mono">{formatTime(currentTime)}</span></p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Quick Actions */}
              <button onClick={() => setShowModal(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-xs font-medium rounded-lg transition-all hover:scale-[1.02]">
                <Plus size={12} /> Create Branch
              </button>
              <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-violet-300 text-xs font-medium rounded-lg transition-all hover:scale-[1.02]">
                <UserPlus size={12} /> Add Staff
              </button>
              <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-medium rounded-lg transition-all hover:scale-[1.02]">
                <FileText size={12} /> Report
              </button>

              {/* Notifications */}
              <div className="relative">
                <button onClick={() => setShowNotifications(p => !p)}
                  className="relative w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <Bell size={16} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-10 w-72 bg-[#131929] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-white/5 flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">Notifications</span>
                      <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded-full">{NOTIFICATIONS.length} new</span>
                    </div>
                    {NOTIFICATIONS.map(n => (
                      <div key={n.id} className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="flex items-start gap-2">
                          <span className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.type === "warning" ? "bg-amber-400" : n.type === "error" ? "bg-rose-400" : n.type === "success" ? "bg-emerald-400" : "bg-blue-400"}`} />
                          <div>
                            <p className="text-xs text-slate-200">{n.message}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{n.time} ago</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">SA</div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-white leading-none">Sys Admin</p>
                  <p className="text-[10px] text-slate-400">Super Admin</p>
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-5 space-y-5">

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
              {kpiCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label}
                    className={`relative overflow-hidden rounded-xl bg-[#131929] border border-white/5 p-4 hover:border-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${card.glow} group cursor-pointer`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                    <div className="relative">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                        <Icon size={15} className="text-white" />
                      </div>
                      <p className="text-2xl font-bold text-white leading-none mb-1">{card.value}</p>
                      <p className="text-[10px] text-slate-400 mb-2">{card.label}</p>
                      <div className="flex items-center gap-1">
                        {card.up ? <ChevronUp size={10} className="text-emerald-400" /> : <ChevronDown size={10} className="text-rose-400" />}
                        <span className={`text-[10px] font-medium ${card.up ? "text-emerald-400" : "text-rose-400"}`}>{card.trend}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 leading-tight">{card.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-10 gap-4">

              {/* Left: 70% */}
              <div className="xl:col-span-7 space-y-4">

                {/* Tab Switch */}
                <div className="bg-[#131929] border border-white/5 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-0 border-b border-white/5 px-4 pt-3">
                    {["parcels", "complaints"].map(tab => (
                      <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-xs font-semibold capitalize transition-all border-b-2 -mb-px ${activeTab === tab ? "border-blue-500 text-blue-400" : "border-transparent text-slate-400 hover:text-slate-200"}`}>
                        {tab === "parcels" ? "📦 Parcel Monitoring" : "⚠️ Complaint Monitoring"}
                      </button>
                    ))}
                  </div>

                  {activeTab === "parcels" && (
                    <div>
                      {/* Parcel Filters */}
                      <div className="p-4 flex flex-wrap gap-2 items-center">
                        <div className="relative flex-1 min-w-48">
                          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input value={parcelSearch} onChange={e => setParcelSearch(e.target.value)}
                            placeholder="Search tracking ID, sender, receiver..."
                            className="w-full pl-8 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors" />
                        </div>
                        <select value={parcelStatusFilter} onChange={e => setParcelStatusFilter(e.target.value)}
                          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-blue-500/50 transition-colors">
                          <option value="ALL">All Status</option>
                          {Object.keys(statusConfig).map(s => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
                        </select>
                        <span className="text-xs text-slate-500">{filteredParcels.length} records</span>
                      </div>

                      {/* Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-t border-white/5 bg-white/3">
                              {["Tracking ID", "Sender", "Receiver", "Branch", "Status", "Priority", "Staff", "Actions"].map(h => (
                                <th key={h} className="text-left px-4 py-2.5 text-slate-500 font-medium text-[10px] uppercase tracking-wider whitespace-nowrap">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {filteredParcels.map((p, i) => (
                              <tr key={p.id} className={`border-t border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                                <td className="px-4 py-3 font-mono text-blue-400 font-medium whitespace-nowrap">{p.id}</td>
                                <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{p.sender}</td>
                                <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{p.receiver}</td>
                                <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                                  <div className="flex items-center gap-1">
                                    <MapPin size={10} className="text-slate-500 flex-shrink-0" />
                                    {p.branch}
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${statusConfig[p.status]?.color}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[p.status]?.dot}`} />
                                    {p.status.replace(/_/g, " ")}
                                  </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${priorityConfig[p.priority]}`}>{p.priority}</span>
                                </td>
                                <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{p.staff}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center gap-1">
                                    <button className="p-1.5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 rounded-md transition-all" title="View"><Eye size={12} /></button>
                                    <button className="p-1.5 hover:bg-violet-500/20 text-slate-400 hover:text-violet-400 rounded-md transition-all" title="Edit"><Edit size={12} /></button>
                                    <button className="p-1.5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 rounded-md transition-all" title="Assign"><UserPlus size={12} /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {filteredParcels.length === 0 && (
                          <div className="text-center py-8 text-slate-500 text-xs">No parcels match your filter</div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "complaints" && (
                    <div>
                      <div className="p-4 flex flex-wrap gap-2 items-center">
                        <div className="relative flex-1 min-w-48">
                          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input value={complaintSearch} onChange={e => setComplaintSearch(e.target.value)}
                            placeholder="Search complaint ID or citizen..."
                            className="w-full pl-8 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500/50 transition-colors" />
                        </div>
                        <select value={complaintFilter} onChange={e => setComplaintFilter(e.target.value)}
                          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-rose-500/50 transition-colors">
                          <option value="ALL">All Status</option>
                          <option value="OPEN">Open</option>
                          <option value="ESCALATED">Escalated</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="RESOLVED">Resolved</option>
                        </select>
                        <span className="text-xs text-slate-500">{filteredComplaints.length} records</span>
                      </div>
                      <div className="space-y-0">
                        {filteredComplaints.map((c, i) => (
                          <div key={c.id} className={`px-4 py-3 border-t border-white/5 hover:bg-white/3 transition-colors flex items-center gap-3 ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                            <div className="flex-shrink-0">
                              <span className="font-mono text-rose-400 text-xs font-medium">{c.id}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-slate-200 font-medium truncate">{c.citizen}</p>
                              <p className="text-[10px] text-slate-500 truncate">{c.type} · {c.branch}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${priorityConfig[c.priority]}`}>{c.priority}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${complaintStatusConfig[c.status]}`}>{c.status}</span>
                              {c.escalation > 0 && (
                                <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full text-[10px]">
                                  L{c.escalation}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {c.status !== "RESOLVED" && (
                                <button onClick={() => handleResolveComplaint(c.id)}
                                  className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-md text-[10px] font-medium transition-all">
                                  <CheckCircle size={10} /> Resolve
                                </button>
                              )}
                              {c.status !== "RESOLVED" && c.escalation < 3 && (
                                <button onClick={() => handleEscalateComplaint(c.id)}
                                  className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 rounded-md text-[10px] font-medium transition-all">
                                  <ArrowUpRight size={10} /> Escalate
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        {filteredComplaints.length === 0 && (
                          <div className="text-center py-8 text-slate-500 text-xs">No complaints match your filter</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Analytics Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Monthly Parcel Growth */}
                  <div className="bg-[#131929] border border-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs font-semibold text-white">Monthly Parcel Volume</p>
                        <p className="text-[10px] text-slate-500">Last 6 months · thousands</p>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-medium">
                        <ArrowUpRight size={12} /> +58.1%
                      </div>
                    </div>
                    <div className="flex items-end gap-2 h-24">
                      {MONTHLY_DATA.map(d => (
                        <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
                          <div className="w-full relative flex-1 flex items-end">
                            <div
                              className="w-full rounded-t-sm bg-gradient-to-t from-blue-600 to-cyan-400 opacity-80 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                              style={{ height: `${(d.parcels / maxParcels) * 100}%` }} />
                          </div>
                          <span className="text-[9px] text-slate-500">{d.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Complaint Resolution */}
                  <div className="bg-[#131929] border border-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs font-semibold text-white">Resolution Trend</p>
                        <p className="text-[10px] text-slate-500">Complaints closed · monthly</p>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-medium">
                        <ArrowDownRight size={12} className="text-emerald-400" /> -50% complaints
                      </div>
                    </div>
                    <div className="space-y-2">
                      {MONTHLY_DATA.map(d => (
                        <div key={d.month} className="flex items-center gap-3">
                          <span className="text-[10px] text-slate-500 w-6">{d.month}</span>
                          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-rose-600 to-pink-400 transition-all duration-700"
                              style={{ width: `${(d.complaints / 30) * 100}%` }} />
                          </div>
                          <span className="text-[10px] text-slate-400 w-4">{d.complaints}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Performance */}
                  <div className="bg-[#131929] border border-white/5 rounded-xl p-4">
                    <p className="text-xs font-semibold text-white mb-1">Delivery Performance</p>
                    <p className="text-[10px] text-slate-500 mb-4">By parcel status breakdown</p>
                    <div className="space-y-3">
                      {[
                        { label: "Delivered On Time", val: 78, color: "from-emerald-600 to-teal-400" },
                        { label: "In Transit", val: 12, color: "from-blue-600 to-cyan-400" },
                        { label: "Out for Delivery", val: 6, color: "from-violet-600 to-purple-400" },
                        { label: "Delayed / Returned", val: 4, color: "from-rose-600 to-pink-400" },
                      ].map(item => (
                        <div key={item.label}>
                          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                            <span>{item.label}</span><span>{item.val}%</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.val}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Staff Heatmap */}
                  <div className="bg-[#131929] border border-white/5 rounded-xl p-4">
                    <p className="text-xs font-semibold text-white mb-1">Staff Activity Heatmap</p>
                    <p className="text-[10px] text-slate-500 mb-4">Parcels processed per shift</p>
                    <div className="grid grid-cols-7 gap-1">
                      {["M", "T", "W", "T", "F", "S", "S"].map(d => (
                        <span key={d} className="text-center text-[9px] text-slate-500">{d}</span>
                      ))}
                      {Array.from({ length: 28 }, (_, i) => {
                        const intensity = Math.random();
                        const bg = intensity > 0.75 ? "bg-blue-500" : intensity > 0.5 ? "bg-blue-600/60" : intensity > 0.25 ? "bg-blue-700/40" : "bg-white/5";
                        return <div key={i} className={`h-4 rounded-sm ${bg} hover:scale-110 transition-transform cursor-pointer`} title={`${Math.floor(intensity * 200)} parcels`} />;
                      })}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[9px] text-slate-500">Low</span>
                      {["bg-white/5", "bg-blue-700/40", "bg-blue-600/60", "bg-blue-500"].map((c, i) => (
                        <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
                      ))}
                      <span className="text-[9px] text-slate-500">High</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: 30% */}
              <div className="xl:col-span-3 space-y-4">

                {/* System Health */}
                <div className="bg-[#131929] border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-white">System Health</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-[10px] text-emerald-400 font-medium">Operational</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "API Uptime", val: "99.97%", icon: Wifi, color: "text-emerald-400", sub: "Last 30 days" },
                      { label: "Database", val: "Healthy", icon: Database, color: "text-emerald-400", sub: "Replica in sync" },
                      { label: "Active Users", val: "2,841", icon: Users, color: "text-blue-400", sub: "Live sessions" },
                      { label: "Server Load", val: `${serverLoad}%`, icon: Server, color: serverLoad > 70 ? "text-rose-400" : serverLoad > 50 ? "text-amber-400" : "text-emerald-400", sub: "CPU utilization" },
                    ].map(item => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-center gap-3 p-2.5 bg-white/3 rounded-lg hover:bg-white/5 transition-colors">
                          <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                            <Icon size={13} className={item.color} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-slate-400">{item.label}</p>
                            <p className="text-xs font-semibold text-white">{item.val}</p>
                          </div>
                          <span className="text-[9px] text-slate-600 truncate">{item.sub}</span>
                        </div>
                      );
                    })}
                  </div>
                  {/* Server load bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span>Server Load</span><span>{serverLoad}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${serverLoad > 70 ? "bg-rose-500" : serverLoad > 50 ? "bg-amber-500" : "bg-emerald-500"}`}
                        style={{ width: `${serverLoad}%` }} />
                    </div>
                  </div>
                </div>

                {/* Top Branches */}
                <div className="bg-[#131929] border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-white">Top Branches</p>
                    <Award size={13} className="text-amber-400" />
                  </div>
                  <div className="space-y-2">
                    {BRANCHES.slice(0, 5).map((b, i) => (
                      <div key={b.code} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${i === 0 ? "bg-amber-500/20 text-amber-300" : i === 1 ? "bg-slate-400/20 text-slate-300" : i === 2 ? "bg-orange-700/20 text-orange-400" : "bg-white/5 text-slate-500"}`}>
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-medium text-slate-200 truncate">{b.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full" style={{ width: `${b.successRate}%` }} />
                            </div>
                            <span className="text-[9px] text-emerald-400 font-mono flex-shrink-0">{b.successRate}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="bg-[#131929] border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-white">Recent Activity</p>
                    <button className="text-slate-500 hover:text-slate-300 transition-colors">
                      <RefreshCw size={12} />
                    </button>
                  </div>
                  <div className="space-y-0 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                    {ACTIVITIES.map((a, i) => (
                      <div key={a.id} className="flex gap-3 pb-3 relative">
                        {i < ACTIVITIES.length - 1 && (
                          <div className="absolute left-3 top-6 bottom-0 w-px bg-white/5" />
                        )}
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 z-10 ${a.type === "complaint" ? "bg-rose-500/20 text-rose-400" : a.type === "parcel" ? "bg-blue-500/20 text-blue-400" : a.type === "staff" ? "bg-violet-500/20 text-violet-400" : a.type === "branch" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-500/20 text-slate-400"}`}>
                          {activityIcon(a.icon)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-slate-300 leading-tight">{a.message}</p>
                          <p className="text-[9px] text-slate-600 mt-0.5 flex items-center gap-1">
                            <Clock size={8} /> {a.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-md bg-[#131929] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in">
            <div className="relative p-5 border-b border-white/5">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-violet-600/10" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <Building2 size={16} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Create New Branch</h2>
                    <p className="text-[10px] text-slate-400">Add a new postal branch to the network</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white hover:bg-white/10 w-7 h-7 flex items-center justify-center rounded-lg transition-all">
                  <X size={14} />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "name", label: "Branch Name", placeholder: "e.g. Jaipur West SO" },
                  { key: "code", label: "Branch Code", placeholder: "e.g. RAJ-JW-042" },
                ].map(f => (
                  <div key={f.key} className={f.key === "name" ? "col-span-2" : ""}>
                    <label className="block text-[10px] text-slate-400 font-medium mb-1.5">{f.label}</label>
                    <input value={newBranch[f.key]} onChange={e => setNewBranch(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors" />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-medium mb-1.5">Branch Type</label>
                <select value={newBranch.type} onChange={e => setNewBranch(p => ({ ...p, type: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-blue-500/60 transition-colors">
                  <option value="GPO">General Post Office (GPO)</option>
                  <option value="HO">Head Office (HO)</option>
                  <option value="SUB_OFFICE">Sub Office (SO)</option>
                  <option value="BRANCH_OFFICE">Branch Office (BO)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "city", label: "City", placeholder: "City name" },
                  { key: "state", label: "State", placeholder: "State name" },
                  { key: "contact", label: "Contact Number", placeholder: "+91 XXXXX XXXXX" },
                  { key: "manager", label: "Manager Name", placeholder: "Full name" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-[10px] text-slate-400 font-medium mb-1.5">{f.label}</label>
                    <input value={newBranch[f.key]} onChange={e => setNewBranch(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-white/5 flex gap-2">
              <button onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-medium rounded-lg transition-all">
                Cancel
              </button>
              <button onClick={handleSaveBranch}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold rounded-lg transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.01]">
                Create Branch
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        @keyframes animate-in {
          from { opacity: 0; transform: scale(0.95) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-in { animation: animate-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}