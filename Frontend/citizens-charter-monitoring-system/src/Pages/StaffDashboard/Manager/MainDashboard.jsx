import React from 'react'
import {
  LayoutDashboard, Package, Truck, MessageSquareWarning,
  Users, BarChart3, TrendingUp, Clock, Bell, FileText,
  UserCircle, LogOut, ChevronRight, Search, Filter,
  CheckCircle2, AlertTriangle, XCircle, RefreshCw,
  MapPin, Star, ArrowUpRight, ArrowDownRight, Dot,
  Menu, X, Mail, Shield, Zap
} from "lucide-react";
import { MyContext } from '../../../Context';
const MainDashboard = ({sidebarOpen}) => {
    const parcels = [
  { id: "DOP-2024-00182", citizen: "Ramesh Verma", destination: "Raipur, CG", status: "In Transit" },
  { id: "DOP-2024-00183", citizen: "Priya Sharma", destination: "Bhilai, CG", status: "Out for Delivery" },
  { id: "DOP-2024-00184", citizen: "Ankit Singh", destination: "Bilaspur, CG", status: "Delivered" },
  { id: "DOP-2024-00185", citizen: "Sunita Patel", destination: "Korba, CG", status: "Delayed" },
  { id: "DOP-2024-00186", citizen: "Mohan Das", destination: "Durg, CG", status: "In Transit" },
  { id: "DOP-2024-00187", citizen: "Kavita Joshi", destination: "Jagdalpur, CG", status: "Out for Delivery" },
  { id: "DOP-2024-00188", citizen: "Rajesh Kumar", destination: "Ambikapur, CG", status: "Delivered" },
];
const complaints = [
  { label: "High Priority", count: 0, color: "text-red-600", bg: "bg-red-50", icon: AlertTriangle },
  { label: "Pending Review", count: 0, color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
  { label: "Resolved Today", count: 1, color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2 },
];

const staff = [
  { name: "Dinesh Yadav", role: "Senior Postman", parcels: 142, success: 98, avatar: "DY" },
  { name: "Meena Tiwari", role: "Delivery Officer", parcels: 128, success: 96, avatar: "MT" },
  { name: "Ashok Bhatt", role: "Postman", parcels: 115, success: 94, avatar: "AB" },
  { name: "Soni Gupta", role: "Sr. Delivery Staff", parcels: 108, success: 92, avatar: "SG" },
];
const notifications = [
  { type: "delay", msg: "6 parcels on Route R-09 delayed due to road block", time: "12 min ago", color: "bg-red-100 text-red-700", dot: "bg-red-500" },
  { type: "complaint", msg: "New high-priority complaint from Citizen #C-4821", time: "28 min ago", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  { type: "system", msg: "Branch performance report for May is ready", time: "1 hr ago", color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  { type: "system", msg: "KPI targets met for Raipur HO – 99.1% delivery rate", time: "2 hr ago", color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
];

    
    const statusConfig = {
      "In Transit": { color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
      "Out for Delivery": { color: "bg-violet-100 text-violet-700", dot: "bg-violet-500" },
      "Delivered": { color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
      "Delayed": { color: "bg-red-100 text-red-700", dot: "bg-red-500" },
    };
    
    const stats = [
      { label: "Total Parcels", value: "4", change: "+12%", up: true, sub: "This month", icon: Package, grad: "from-blue-500 to-blue-600" },
      { label: "Delivered Today", value: "1", change: "+8%", up: true, sub: "vs yesterday", icon: CheckCircle2, grad: "from-emerald-500 to-emerald-600" },
      { label: "Pending Complaints", value: "2", change: "-5%", up: false, sub: "Needs attention", icon: MessageSquareWarning, grad: "from-amber-500 to-amber-600" },
      { label: "Delayed Deliveries", value: "0", change: "+3%", up: false, sub: "Requires action", icon: Clock, grad: "from-red-500 to-red-600" },
    ];
    
  return (
    <React.Fragment>
        <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-500 hover:text-blue-600 transition-colors">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search parcels, complaints…"
                className="pl-9 pr-4 py-2 text-sm bg-slate-100 rounded-xl border-0 outline-none focus:ring-2 focus:ring-blue-500/30 w-64 text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-bold flex items-center justify-center cursor-pointer shadow-md shadow-blue-500/30">SR</div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Welcome Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 left-1/2 w-48 h-48 rounded-full bg-white translate-y-16"></div>
            </div>
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium mb-1">Sunday, 11 May 2026</p>
                <h1 className="text-2xl font-bold tracking-tight mb-1">Welcome back, Manager 👋</h1>
                <p className="text-blue-200 text-sm max-w-lg">Monitor postal operations, delivery performance, and citizen complaints in real time.</p>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/20">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">System Operational</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ label, value, change, up, sub, icon: Icon, grad }) => (
              <div key={label} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${up ? "text-emerald-600 bg-emerald-50" : "text-red-500 bg-red-50"}`}>
                    {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
                <p className="text-sm font-semibold text-slate-700 mt-0.5">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Parcel Table – spans 2 cols */}
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-800">Recent Parcel Activities</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Live tracking updates</p>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                  <Filter className="w-3.5 h-3.5" /> Filter
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      {["Tracking ID", "Citizen Name", "Destination", "Status", "Action"].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-slate-500 px-5 py-3 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parcels.map((p, i) => {
                      const s = statusConfig[p.status];
                      return (
                        <tr key={p.id} className={`border-t border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                          <td className="px-5 py-3.5 text-xs font-mono text-blue-600 font-semibold">{p.id}</td>
                          <td className="px-5 py-3.5 text-sm text-slate-700 font-medium">{p.citizen}</td>
                          <td className="px-5 py-3.5 text-sm text-slate-500">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.destination}</span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${s.color}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
                              {p.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <button className="text-xs font-semibold text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                              <RefreshCw className="w-3 h-3" /> Update
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right panels */}
            <div className="space-y-5">

              {/* Complaint Overview */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 text-sm">Complaint Overview</h3>
                  <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full font-medium">This Week</span>
                </div>
                <div className="space-y-3">
                  {complaints.map(({ label, count, color, bg, icon: Icon }) => (
                    <div key={label} className={`flex items-center justify-between p-3 rounded-xl ${bg} hover:scale-[1.02] transition-transform cursor-default`}>
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${color}`} />
                        <span className={`text-sm font-semibold ${color}`}>{label}</span>
                      </div>
                      <span className={`text-lg font-bold ${color}`}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staff Performance */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 text-sm">Top Staff Performance</h3>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div className="space-y-3">
                  {staff.map((s, i) => (
                    <div key={s.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-default">
                      <div className={`w-8 h-8 rounded-xl text-white text-xs font-bold flex items-center justify-center flex-shrink-0 shadow-sm
                        ${i === 0 ? "bg-gradient-to-br from-amber-400 to-orange-500" :
                          i === 1 ? "bg-gradient-to-br from-slate-400 to-slate-500" :
                          i === 2 ? "bg-gradient-to-br from-orange-700 to-orange-800" :
                          "bg-gradient-to-br from-blue-400 to-blue-600"}`}>
                        {s.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{s.name}</p>
                        <p className="text-xs text-slate-400 truncate">{s.role}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-bold text-slate-700">{s.parcels}</p>
                        <p className="text-xs text-emerald-500 font-semibold">{s.success}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-800 text-sm">Notifications & Alerts</h3>
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{notifications.length} new</span>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {notifications.map((n, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-default border border-slate-100">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.dot}`}></div>
                  <div>
                    <p className="text-xs text-slate-700 font-medium leading-snug">{n.msg}</p>
                    <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>    
    </React.Fragment>
  )
}

export default MainDashboard
