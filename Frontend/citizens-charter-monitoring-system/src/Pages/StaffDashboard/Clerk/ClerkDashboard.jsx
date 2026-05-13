import { useState } from "react";
import {
  LayoutDashboard, PackagePlus, Archive, Truck, MessageSquareWarning,
  ClipboardList, HeadphonesIcon, CheckSquare, Bell, BarChart3,
  UserCog, LogOut, Search, Package, AlertTriangle, ChevronRight,
  Filter, RefreshCw, Eye, Edit3, Clock, MapPin, User, Zap,
  TrendingUp, CheckCircle2, XCircle, Circle, ArrowUpRight,
  Calendar, Shield, Star, Hash, Boxes
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: PackagePlus, label: "Parcel Booking", id: "booking" },
  { icon: Archive, label: "Parcel Records", id: "records" },
  { icon: Truck, label: "Update Delivery Status", id: "delivery" },
  { icon: MessageSquareWarning, label: "Citizen Complaints", id: "complaints" },
  { icon: ClipboardList, label: "Service Requests", id: "services" },
  { icon: HeadphonesIcon, label: "Customer Assistance", id: "assistance" },
  { icon: CheckSquare, label: "Daily Tasks", id: "tasks" },
  { icon: Bell, label: "Notifications", id: "notifications" },
  { icon: BarChart3, label: "Reports", id: "reports" },
  { icon: UserCog, label: "Profile Settings", id: "profile" },
];

const parcels = [
  { id: "DOP-20481", citizen: "Ramesh Kumar", type: "Speed Post", dest: "Bhopal, MP", status: "Delivered" },
  { id: "DOP-20482", citizen: "Priya Sharma", type: "Registered Post", dest: "Indore, MP", status: "Out for Delivery" },
  { id: "DOP-20483", citizen: "Ankit Verma", type: "Parcel Post", dest: "Jabalpur, MP", status: "In Transit" },
  { id: "DOP-20484", citizen: "Sunita Patel", type: "Speed Post", dest: "Gwalior, MP", status: "Booked" },
  { id: "DOP-20485", citizen: "Mohan Rao", type: "Express Post", dest: "Ujjain, MP", status: "In Transit" },
  { id: "DOP-20486", citizen: "Kavita Singh", type: "Parcel Post", dest: "Sagar, MP", status: "Delivered" },
  { id: "DOP-20487", citizen: "Deepak Joshi", type: "Speed Post", dest: "Rewa, MP", status: "Booked" },
];

const complaints = [
  { id: "CMP-881", name: "Suresh Mishra", issue: "Parcel not delivered on time", priority: "High", status: "Open" },
  { id: "CMP-882", name: "Lata Dubey", issue: "Wrong address delivery attempt", priority: "Medium", status: "In Review" },
  { id: "CMP-883", name: "Rajiv Nair", issue: "Damaged parcel received", priority: "High", status: "Escalated" },
  { id: "CMP-884", name: "Geeta Mehta", issue: "Refund not processed", priority: "Low", status: "Resolved" },
];

const tasks = [
  { label: "Verify 12 incoming parcels", due: "Today, 12:00 PM", tag: "Verification", done: false },
  { label: "Update delivery status for 8 parcels", due: "Today, 2:00 PM", tag: "Update", done: false },
  { label: "Customer callback — DOP-20483", due: "Today, 3:30 PM", tag: "Support", done: false },
  { label: "Submit daily parcel report", due: "Today, 5:00 PM", tag: "Report", done: true },
  { label: "Process 3 service requests", due: "Tomorrow, 10:00 AM", tag: "Services", done: false },
];

const notifications = [
  { icon: AlertTriangle, color: "text-amber-500 bg-amber-50", title: "Delivery Delay — DOP-20483", time: "15 min ago", desc: "Parcel to Jabalpur delayed by 24 hrs due to route disruption." },
  { icon: Package, color: "text-blue-500 bg-blue-50", title: "New Parcel Assigned", time: "1 hr ago", desc: "Speed post DOP-20488 assigned for delivery verification." },
  { icon: MessageSquareWarning, color: "text-red-500 bg-red-50", title: "Complaint Escalated — CMP-883", time: "2 hrs ago", desc: "Rajiv Nair's damaged parcel complaint escalated to supervisor." },
  { icon: CheckCircle2, color: "text-green-500 bg-green-50", title: "Service Request Completed", time: "3 hrs ago", desc: "Address update service for SRQ-2201 successfully completed." },
];

const statusConfig = {
  "Delivered":        { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  "Out for Delivery": { dot: "bg-blue-500",    badge: "bg-blue-50 text-blue-700 border border-blue-200" },
  "In Transit":       { dot: "bg-amber-500",   badge: "bg-amber-50 text-amber-700 border border-amber-200" },
  "Booked":           { dot: "bg-violet-500",  badge: "bg-violet-50 text-violet-700 border border-violet-200" },
};

const priorityConfig = {
  "High":   "bg-red-50 text-red-700 border border-red-200",
  "Medium": "bg-amber-50 text-amber-700 border border-amber-200",
  "Low":    "bg-green-50 text-green-700 border border-green-200",
};

const complaintStatusConfig = {
  "Open":       "bg-blue-50 text-blue-700 border border-blue-200",
  "In Review":  "bg-amber-50 text-amber-700 border border-amber-200",
  "Escalated":  "bg-red-50 text-red-700 border border-red-200",
  "Resolved":   "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

const tagConfig = {
  "Verification": "bg-blue-50 text-blue-600",
  "Update":       "bg-amber-50 text-amber-600",
  "Support":      "bg-violet-50 text-violet-600",
  "Report":       "bg-slate-100 text-slate-500",
  "Services":     "bg-green-50 text-green-600",
};

export default function ClerkDashboard() {
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const stats = [
    { icon: PackagePlus, label: "Parcels Booked Today", value: "47", sub: "+6 since morning", color: "from-blue-600 to-blue-400", light: "bg-blue-50 text-blue-600" },
    { icon: Truck, label: "Pending Deliveries", value: "18", sub: "3 overdue", color: "from-amber-500 to-amber-300", light: "bg-amber-50 text-amber-600" },
    { icon: MessageSquareWarning, label: "Complaints Assigned", value: "9", sub: "2 high priority", color: "from-red-500 to-rose-400", light: "bg-red-50 text-red-600" },
    { icon: CheckCircle2, label: "Completed Services", value: "31", sub: "↑ 12% vs yesterday", color: "from-emerald-600 to-emerald-400", light: "bg-emerald-50 text-emerald-600" },
  ];

  const filtered = parcels.filter(p =>
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.citizen.toLowerCase().includes(search.toLowerCase()) ||
    p.dest.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen bg-slate-50 font-sans overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside className="w-64 min-w-64 h-full bg-white border-r border-slate-100 flex flex-col shadow-sm z-20">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md shadow-blue-200">
              <Boxes size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-widest text-blue-500 uppercase">Dept. of Posts</p>
              <p className="text-sm font-bold text-slate-800 leading-none">PostalNet</p>
            </div>
          </div>
        </div>

        {/* Role badge */}
        <div className="px-5 pt-4 pb-2">
          <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">Clerk Ramesh</p>
              <p className="text-[10px] text-blue-500 font-medium">Postal Clerk · MPO-04</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-0.5">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase px-3 pt-2 pb-1">Main Menu</p>
          {sidebarItems.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
                ${active === id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}
            >
              <Icon size={16} className={active === id ? "text-white" : "text-slate-400 group-hover:text-blue-500"} />
              <span className="truncate">{label}</span>
              {active === id && <ChevronRight size={14} className="ml-auto text-blue-200" />}
            </button>
          ))}
        </nav>

        {/* Progress */}
        <div className="px-5 py-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Daily Progress</span>
            <span className="text-xs font-bold text-blue-600">72%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-[72%] bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all" />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">36 / 50 tasks completed</p>
        </div>

        {/* Logout */}
        <div className="px-3 pb-4">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 h-full overflow-y-auto">

        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search parcel ID, citizen, destination…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-72 pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-500 hover:bg-slate-50 transition">
              <Filter size={13} /> Filter
            </button>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-200 transition">
              <PackagePlus size={14} /> Book Parcel
            </button>
            <button className="flex items-center gap-2 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold rounded-xl border border-amber-200 transition">
              <RefreshCw size={13} /> Update Status
            </button>
            <button className="flex items-center gap-2 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-xl border border-red-200 transition">
              <AlertTriangle size={13} /> Raise Issue
            </button>
            <div className="relative">
              <button className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition">
                <Bell size={16} />
              </button>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">4</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">

          {/* Welcome Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-lg shadow-blue-200 px-7 py-6">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className="absolute right-8 top-0 bottom-0 flex items-center opacity-10">
              <Package size={120} className="text-white" />
            </div>
            <div className="relative">
              <p className="text-blue-100 text-xs font-semibold tracking-widest uppercase mb-1">
                <Calendar size={11} className="inline mr-1" />
                Wednesday, 13 May 2026
              </p>
              <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Clerk 👋</h1>
              <p className="text-blue-100 text-sm max-w-xl">
                Manage parcel operations, citizen requests, and delivery updates efficiently. You have <span className="font-bold text-white">18 pending tasks</span> today.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5 text-white text-xs font-medium backdrop-blur-sm">
                  <Zap size={12} className="text-yellow-300" /> 4 urgent items
                </div>
                <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5 text-white text-xs font-medium backdrop-blur-sm">
                  <Star size={12} className="text-yellow-300" /> Shift: 9AM – 5PM
                </div>
                <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5 text-white text-xs font-medium backdrop-blur-sm">
                  <Shield size={12} className="text-green-300" /> MPO-04 · Active
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map(({ icon: Icon, label, value, sub, color, light }) => (
              <div key={label} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition-shadow group">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${light}`}>
                    <Icon size={18} />
                  </div>
                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-blue-400 transition" />
                </div>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">{label}</p>
                <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                  <TrendingUp size={10} className="text-emerald-400" /> {sub}
                </p>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-3 gap-4">

            {/* Parcel Table — spans 2 cols */}
            <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-800">Today's Parcel Activities</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{filtered.length} parcels found</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
                    <Hash size={11} /> All Records
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      {["Tracking ID", "Citizen Name", "Parcel Type", "Destination", "Status", "Action"].map(h => (
                        <th key={h} className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p, i) => (
                      <tr key={p.id} className={`border-t border-slate-50 hover:bg-blue-50/40 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg">{p.id}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-200 flex items-center justify-center text-white text-[10px] font-bold">
                              {p.citizen[0]}
                            </div>
                            <span className="text-xs font-medium text-slate-700">{p.citizen}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{p.type}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin size={10} className="text-slate-400" /> {p.dest}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusConfig[p.status].badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[p.status].dot}`} />
                            {p.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-[11px] font-semibold rounded-lg transition">
                              <Edit3 size={11} /> Update
                            </button>
                            <button className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[11px] font-semibold rounded-lg transition border border-slate-200">
                              <Eye size={11} /> View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4">

              {/* Complaints */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-800">Citizen Complaints</h2>
                  <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-1 rounded-full border border-red-200">
                    {complaints.filter(c => c.status !== "Resolved").length} active
                  </span>
                </div>
                <div className="p-3 space-y-2">
                  {complaints.map(c => (
                    <div key={c.id} className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors border border-slate-100">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <p className="text-xs font-semibold text-slate-800 leading-tight">{c.issue}</p>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${priorityConfig[c.priority]}`}>{c.priority}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-mono">{c.id} · {c.name}</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${complaintStatusConfig[c.status]}`}>{c.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-800">Assigned Tasks</h2>
                  <span className="text-[10px] text-slate-400">{tasks.filter(t => t.done).length}/{tasks.length} done</span>
                </div>
                <div className="p-3 space-y-1.5">
                  {tasks.map((t, i) => (
                    <div key={i} className={`flex items-start gap-2.5 p-2.5 rounded-xl transition-colors ${t.done ? "opacity-50" : "hover:bg-slate-50"}`}>
                      {t.done
                        ? <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                        : <Circle size={15} className="text-slate-300 mt-0.5 shrink-0" />
                      }
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium leading-tight ${t.done ? "line-through text-slate-400" : "text-slate-700"}`}>{t.label}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Clock size={9} className="text-slate-400" />
                          <span className="text-[10px] text-slate-400">{t.due}</span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${tagConfig[t.tag]}`}>{t.tag}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Progress */}
                <div className="px-4 pb-4 pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-400 font-medium">Today's completion</span>
                    <span className="text-[10px] font-bold text-blue-600">{Math.round(tasks.filter(t => t.done).length / tasks.length * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all"
                      style={{ width: `${Math.round(tasks.filter(t => t.done).length / tasks.length * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800">Notifications & Alerts</h2>
              <button className="text-xs text-blue-600 font-semibold hover:underline">Mark all read</button>
            </div>
            <div className="grid grid-cols-4 divide-x divide-slate-100">
              {notifications.map(({ icon: Icon, color, title, time, desc }, i) => (
                <div key={i} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                    <Icon size={16} />
                  </div>
                  <p className="text-xs font-bold text-slate-800 leading-snug mb-1">{title}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-2">{desc}</p>
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock size={9} /> {time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-2">
            <p className="text-[11px] text-slate-300">Department of Posts · PostalNet Clerk Portal · v2.4.1</p>
          </div>

        </div>
      </main>
    </div>
  );
}