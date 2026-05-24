import { useState, useMemo,useEffect ,useContext} from "react";
import {
  Search, Filter, Eye, RefreshCw, AlertTriangle, CheckCircle2,
  Clock, TrendingUp, Package, Users, BarChart3, ArrowUpRight,
  ArrowDownRight, X, ChevronDown, FileText, User, MessageSquare,
  Bell, Zap, Circle, Activity, Flag
} from "lucide-react";
import { MyContext } from '../../Context';

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
  const [complaints, setComplaints] = useState([]);
    const {isLogin,setIsLogin,user,setUser} = useContext(MyContext);
    console.log(user)
    useEffect(()=>{
    fetch(`http://localhost:8080/api/v1/complaints/mycomplaints/${user?.sub}`,{
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
      const q = search?.toLowerCase();
      const matchSearch = !q || c?.id?.toLowerCase().includes(q) || c.citizen.toLowerCase().includes(q);
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
              Citizen Complaints History
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
       
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
        <div className="xl:col-span-4 card overflow-hidden">
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
                  {["Complaint ID","Type","Tracking ID","Priority","Status","Date","Last Update","Resolution Note"].map(h => (
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
                    
                    <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{c?.complaintType}</td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs text-slate-500">{c?.trackingId}</span>
                    </td>
                    <td className="px-4 py-3.5"><PriorityBadge priority={c?.priority} /></td>
                    <td className="px-4 py-3.5"><StatusBadge status={c?.status} /></td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs whitespace-nowrap">{c?.createdAt?.split("T")[0]}</td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs whitespace-nowrap">{c?.createdAt?.split("T")[0]}</td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs whitespace-nowrap">{c?.resolutionNotes }</td>
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
      </div>
    </div>
  );
}