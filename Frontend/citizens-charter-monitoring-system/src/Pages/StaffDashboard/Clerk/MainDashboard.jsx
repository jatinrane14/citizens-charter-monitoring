import React,{useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {
  LayoutDashboard, PackagePlus, Archive, Truck, MessageSquareWarning,
  ClipboardList, HeadphonesIcon, CheckSquare, Bell, BarChart3,
  UserCog, LogOut, Search, Package, AlertTriangle, ChevronRight,
  Filter, RefreshCw, Eye, Edit3, Clock, MapPin, User, Zap,
  TrendingUp, CheckCircle2, XCircle, Circle, ArrowUpRight,
  Calendar, Shield, Star, Hash, Boxes
} from "lucide-react";



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

export default function MainDashboard({employee}){
//   const parcels = [
//   { id: "DOP-20481", citizen: "Ramesh Kumar", type: "Speed Post", dest: "Bhopal, MP", status: "Delivered" },
//   { id: "DOP-20482", citizen: "Priya Sharma", type: "Registered Post", dest: "Indore, MP", status: "Out for Delivery" },
//   { id: "DOP-20483", citizen: "Ankit Verma", type: "Parcel Post", dest: "Jabalpur, MP", status: "In Transit" },
//   { id: "DOP-20484", citizen: "Sunita Patel", type: "Speed Post", dest: "Gwalior, MP", status: "Booked" },
//   { id: "DOP-20485", citizen: "Mohan Rao", type: "Express Post", dest: "Ujjain, MP", status: "In Transit" },
//   { id: "DOP-20486", citizen: "Kavita Singh", type: "Parcel Post", dest: "Sagar, MP", status: "Delivered" },
//   { id: "DOP-20487", citizen: "Deepak Joshi", type: "Speed Post", dest: "Rewa, MP", status: "Booked" },
// ];
  const  [parcels,setParcels] = useState([])
  useEffect(()=>{
    fetch(`http://localhost:8080/api/v1/parcel/today/list`,{
      method:"GET",
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem("token")}`
      }
    }).then((response)=>{
      if(!response.ok){
        throw new Error("")
      }
      return response.json();
    }).then((data)=>{
      console.log(data)
      setParcels(data);
    })
  },[])
      const [search, setSearch] = useState("");
    const stats = [
        { icon: PackagePlus, label: "Parcels Booked Today", value: "47", sub: "+6 since morning", color: "from-blue-600 to-blue-400", light: "bg-blue-50 text-blue-600" },
        { icon: Truck, label: "Pending Deliveries", value: "18", sub: "3 overdue", color: "from-amber-500 to-amber-300", light: "bg-amber-50 text-amber-600" },
        { icon: MessageSquareWarning, label: "Complaints Assigned", value: "9", sub: "2 high priority", color: "from-red-500 to-rose-400", light: "bg-red-50 text-red-600" },
        { icon: CheckCircle2, label: "Completed Services", value: "31", sub: "↑ 12% vs yesterday", color: "from-emerald-600 to-emerald-400", light: "bg-emerald-50 text-emerald-600" }
    ]
      const filtered = parcels.filter(p =>
        p?.trackingId?.toLowerCase().includes(search.toLowerCase()) ||
        p?.senderName?.toLowerCase().includes(search.toLowerCase()) ||
        p?.receiverAddress?.toLowerCase().includes(search.toLowerCase())
      );
    return (
        <React.Fragment>
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
                            {new Date().toString()}
                          </p>
                          <h1 className="text-2xl font-bold text-white mb-1">Welcome back, {employee?.name} 👋</h1>
                          <p className="text-blue-100 text-sm max-w-xl">
                            Manage parcel operations, citizen requests, and delivery updates efficiently. You have <span className="font-bold text-white">18 pending tasks</span> today.
                          </p>
                          <div className="flex items-center gap-3 mt-4">
                        
                            <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5 text-white text-xs font-medium backdrop-blur-sm">
                              <Star size={12} className="text-yellow-300" /> Shift: 9AM – 5PM
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5 text-white text-xs font-medium backdrop-blur-sm">
                              <Shield size={12} className="text-green-300" /> {employee?.employeeId} · Active
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Main Grid */}
                      <div className="grid grid-cols-3 gap-4">
            
                        {/* Parcel Table — spans 2 cols */}
                        <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                            <div>
                              <h2 className="text-sm font-bold text-slate-800">Today's Parcel Activities</h2>
                              <p className="text-xs text-slate-400 mt-0.5">{filtered?.length} parcels found</p>
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
                                  <tr key={p.trackingId} className={`border-t border-slate-50 hover:bg-blue-50/40 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                                    <td className="px-4 py-3">
                                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg">{p.trackingId}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-200 flex items-center justify-center text-white text-[10px] font-bold">
                                          {p.senderName[0]}
                                        </div>
                                        <span className="text-xs font-medium text-slate-700">{p.senderName}</span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{p?.parcelType}</td>
                                    <td className="px-4 py-3">
                                      <span className="text-xs text-slate-500 flex items-center gap-1">
                                        <MapPin size={10} className="text-slate-400" /> {p?.receiverName}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusConfig[p.status]}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[p.status]}`} />
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
        </React.Fragment>
    )
}