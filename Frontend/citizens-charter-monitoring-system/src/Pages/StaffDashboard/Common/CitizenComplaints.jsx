import { useState, useMemo,useEffect } from "react";
import {
  Search, Filter, Eye, RefreshCw, AlertTriangle, CheckCircle2,
  Clock, TrendingUp, Package, Users, BarChart3, ArrowUpRight,
  ArrowDownRight, X, ChevronDown, FileText, User, MessageSquare,
  Bell, Zap, Circle, Activity, Flag
} from "lucide-react";

const COMPLAINTS = [
  { id: "CMP-2024-001", citizen: "Rajesh Kumar", type: "Parcel Not Delivered", trackingId: "TRK89201A", priority: "HIGH", status: "OPEN", date: "2024-06-10", notes: "", staff: "" },
  { id: "CMP-2024-002", citizen: "Priya Sharma", type: "Damaged Package", trackingId: "TRK45102B", priority: "CRITICAL", status: "ESCALATED", date: "2024-06-09", notes: "Package arrived torn.", staff: "Amit Singh" },
  { id: "CMP-2024-003", citizen: "Mohammed Farooq", type: "Wrong Address Delivery", trackingId: "TRK78903C", priority: "MEDIUM", status: "IN_REVIEW", date: "2024-06-09", notes: "", staff: "Deepa Rao" },
  { id: "CMP-2024-004", citizen: "Sunita Patel", type: "Delayed Shipment", trackingId: "TRK33204D", priority: "LOW", status: "RESOLVED", date: "2024-06-08", notes: "Delay due to weather.", staff: "Kiran Mehta" },
  { id: "CMP-2024-005", citizen: "Anil Verma", type: "Missing Item in Package", trackingId: "TRK55605E", priority: "HIGH", status: "ESCALATED", date: "2024-06-08", notes: "", staff: "Amit Singh" },
  { id: "CMP-2024-006", citizen: "Kavya Nair", type: "Parcel Not Delivered", trackingId: "TRK22406F", priority: "CRITICAL", status: "OPEN", date: "2024-06-07", notes: "", staff: "" },
  { id: "CMP-2024-007", citizen: "Suresh Reddy", type: "Invoice Mismatch", trackingId: "TRK66307G", priority: "MEDIUM", status: "IN_REVIEW", date: "2024-06-07", notes: "", staff: "Deepa Rao" },
  { id: "CMP-2024-008", citizen: "Meena Iyer", type: "Courier Misconduct", trackingId: "TRK11108H", priority: "HIGH", status: "OPEN", date: "2024-06-06", notes: "", staff: "" },
  { id: "CMP-2024-009", citizen: "Vikram Joshi", type: "Delayed Shipment", trackingId: "TRK44409I", priority: "LOW", status: "RESOLVED", date: "2024-06-05", notes: "Resolved after verification.", staff: "Kiran Mehta" },
  { id: "CMP-2024-010", citizen: "Nisha Gupta", type: "Parcel Not Delivered", trackingId: "TRK77710J", priority: "CRITICAL", status: "ESCALATED", date: "2024-06-04", notes: "Third attempt failed.", staff: "Amit Singh" },
];

const ACTIVITIES = [
  { id: 1, icon: User, color: "text-blue-500 bg-blue-50", text: "CMP-2024-003 assigned to Deepa Rao", time: "2 min ago" },
  { id: 2, icon: AlertTriangle, color: "text-red-500 bg-red-50", text: "CMP-2024-005 escalated to regional head", time: "18 min ago" },
  { id: 3, icon: CheckCircle2, color: "text-emerald-500 bg-emerald-50", text: "CMP-2024-009 marked as Resolved", time: "1 hr ago" },
  { id: 4, icon: RefreshCw, color: "text-amber-500 bg-amber-50", text: "CMP-2024-002 status updated by Amit Singh", time: "2 hr ago" },
  { id: 5, icon: Bell, color: "text-violet-500 bg-violet-50", text: "CMP-2024-006 flagged as high priority", time: "3 hr ago" },
];

const STATUS_CONFIG = {
  OPEN:       { label: "Open",      bg: "bg-sky-100",    text: "text-sky-700",    dot: "bg-sky-500" },
  IN_REVIEW:  { label: "In Review", bg: "bg-amber-100",  text: "text-amber-700",  dot: "bg-amber-500" },
  ESCALATED:  { label: "Escalated", bg: "bg-red-100",    text: "text-red-700",    dot: "bg-red-500" },
  RESOLVED:   { label: "Resolved",  bg: "bg-emerald-100",text: "text-emerald-700",dot: "bg-emerald-500" },
};

const PRIORITY_CONFIG = {
  LOW:      { bg: "bg-slate-100",   text: "text-slate-600" },
  MEDIUM:   { bg: "bg-blue-100",    text: "text-blue-700" },
  HIGH:     { bg: "bg-orange-100",  text: "text-orange-700" },
  CRITICAL: { bg: "bg-rose-100",    text: "text-rose-700" },
};

const StatusBadge = ({ status }) => {
  const c = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const c = PRIORITY_CONFIG[priority];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold tracking-wide ${c?.bg} ${c?.text}`}>
      {priority}
    </span>
  );
};

export default function ComplaintDashboard() {
  const [complaints, setComplaints] = useState(COMPLAINTS);

    useEffect(()=>{
    fetch(`http://localhost:8080/api/v1/complaints/all/BPL001`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data)
        setComplaints(data)
    }).catch(()=>{

    }).finally(()=>{

    })
  },[]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ status: "", notes: "", staff: "" });

  


  const kpis = useMemo(() => {
    const total = complaints.length;
    const open = complaints.filter(c => c.status === "OPEN").length;
    const escalated = complaints.filter(c => c.status === "ESCALATED").length;
    const resolved = complaints.filter(c => c.status === "RESOLVED").length;
    return { total, open, escalated, resolved };
  }, [complaints]);

  const filtered = useMemo(() => {
    const statusMap = { Open: "OPEN", "In Review": "IN_REVIEW", Escalated: "ESCALATED", Resolved: "RESOLVED" };
    return complaints.filter(c => {
      const matchFilter = filter === "All" || c.status === statusMap[filter];
      const q = search.toLowerCase();
      const matchSearch = !q || c.id.toLowerCase().includes(q) || c.citizen.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [complaints, search, filter]);

  const highPriority = useMemo(() =>
    complaints.filter(c => c.priority === "CRITICAL" && c.status !== "RESOLVED").slice(0, 3),
  [complaints]);

  const openModal = (c) => {
    setModal(c);
    setForm({ status: c.status, notes: c.notes, staff: c.staff });
  };

  const saveModal = () => {
    setComplaints(prev => prev.map(c => c.id === modal.id ? { ...c, ...form } : c));
    setModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4 md:p-6 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        .card { background: white; border-radius: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04); }
        .hover-row:hover { background: #f8faff; }
        .kpi-hover { transition: transform .2s, box-shadow .2s; }
        .kpi-hover:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(0,0,0,.12); }
        .btn-primary { background: linear-gradient(135deg, #2563eb, #1d4ed8); }
        .btn-primary:hover { background: linear-gradient(135deg, #1d4ed8, #1e40af); }
        .modal-backdrop { animation: fadeIn .15s ease; }
        .modal-box { animation: slideUp .2s ease; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: #f1f5f9; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>

      {/* ── Header ── */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Package size={16} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">India Post · CMS v2.4</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">
              Citizen Complaints Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">Monitor, resolve and manage parcel-related complaints efficiently.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID or name…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white shadow-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
              />
            </div>
            {/* Filter */}
            <div className="relative">
              <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="pl-9 pr-8 py-2.5 text-sm rounded-xl border border-slate-200 bg-white shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition cursor-pointer"
              >
                {["All","Open","In Review","Escalated","Resolved"].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* ── Table ── */}
        <div className="xl:col-span-2 card overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-800 text-base">All Complaints</h2>
              <p className="text-xs text-slate-400">{filtered?.length} records found</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-500">Live</span>
            </div>
          </div>

          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[800px] text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  {["Complaint ID","Citizen","Type","Tracking ID","Priority","Status","Date","Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((c) => (
                  <tr key={c?.complaintId} className="hover-row transition-colors">
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{c?.complaintId}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
                          {c?.citizenName?.slice()[0]}
                        </div>
                        <span className="font-medium text-slate-700 whitespace-nowrap">{c?.citizenName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{c?.complaintType}</td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs text-slate-500">{c?.trackingId}</span>
                    </td>
                    <td className="px-4 py-3.5"><PriorityBadge priority={c?.priority} /></td>
                    <td className="px-4 py-3.5"><StatusBadge status={c?.status} /></td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs whitespace-nowrap">{c?.createdAt}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => alert(`Viewing complaint ${c?.id}\nCitizen: ${c?.citizen}\nType: ${c?.type}\nStatus: ${c?.status}\nTracking: ${c?.trackingId}`)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                        >
                          <Eye size={12} /> View
                        </button>
                        <button
                          onClick={() => openModal(c)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white btn-primary transition"
                        >
                          <RefreshCw size={12} /> Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-slate-400">
                      <FileText size={32} className="mx-auto mb-2 opacity-40" />
                      No complaints found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right Panels ── */}
        <div className="flex flex-col gap-4">

          {/* High Priority */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                <Flag size={15} className="text-rose-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">High Priority</h3>
                <p className="text-xs text-slate-400">Critical unresolved complaints</p>
              </div>
            </div>
            <div className="space-y-3">
              {highPriority.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">No critical complaints 🎉</p>
              )}
              {highPriority.map((c) => (
                <div key={c.complaintId} className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/50 border border-rose-100">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle size={14} className="text-rose-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-xs font-bold text-rose-600">{c?.complaintId}</span>
                      <StatusBadge status={c?.status} />
                    </div>
                    <p className="text-xs font-semibold text-slate-700 truncate">{c?.citizenName}</p>
                    <p className="text-xs text-slate-500 truncate">{c?.complaintType}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="card p-5 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                <Activity size={15} className="text-violet-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Recent Activity</h3>
                <p className="text-xs text-slate-400">Latest system events</p>
              </div>
            </div>
            <div className="space-y-1">
              {ACTIVITIES.map((a, i) => (
                <div key={a.id} className="flex items-start gap-3 py-2.5 relative">
                  {i < ACTIVITIES.length - 1 && (
                    <div className="absolute left-4 top-9 w-px h-full bg-slate-100" />
                  )}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${a.color}`}>
                    <a.icon size={13} />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-xs text-slate-700 font-medium leading-snug">{a.text}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary strip */}
          <div className="card p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <TrendingUp size={18} />
              </div>
              <div>
                <p className="text-sm font-bold">Resolution Rate</p>
                <p className="text-2xl font-extrabold">{Math.round((kpis.resolved / kpis.total) * 100)}%</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs opacity-70">This Month</p>
                <p className="text-sm font-semibold">{kpis.resolved}/{kpis.total}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Modal ── */}
      {modal && (
        <div
          className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)" }}
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div className="modal-box bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                  <RefreshCw size={16} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Update Complaint</h3>
                  <p className="text-xs text-slate-400">Modify status and resolution details</p>
                </div>
              </div>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition">
                <X size={16} className="text-slate-500" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Complaint ID */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Complaint ID</label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <FileText size={14} className="text-slate-400" />
                  <span className="font-mono text-sm font-bold text-blue-600">{modal.complaintId}</span>
                  <span className="ml-auto text-xs text-slate-400">Read-only</span>
                </div>
              </div>

              {/* Current status */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Current Status</label>
                <div className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center">
                  <StatusBadge status={modal.status} />
                </div>
              </div>

              {/* New Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Update Status</label>
                <div className="relative">
                  <select
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition cursor-pointer"
                  >
                    {["OPEN","IN_REVIEW","ESCALATED","RESOLVED"].map(s => (
                      <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Resolution Notes</label>
                <div className="relative">
                  <MessageSquare size={14} className="absolute left-3 top-3 text-slate-400" />
                  <textarea
                    rows={3}
                    placeholder="Add resolution notes or remarks…"
                    value={form.notes}
                    onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setModal(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveModal}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary transition flex items-center justify-center gap-2"
              >
                <Zap size={14} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}