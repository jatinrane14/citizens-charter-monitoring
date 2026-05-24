import { useState } from "react";
import {
  LayoutDashboard, Package, Truck, MessageSquareWarning,
  Users, BarChart3, TrendingUp, Clock, Bell, FileText,
  UserCircle, LogOut, ChevronRight, Search, Filter,
  CheckCircle2, AlertTriangle, XCircle, RefreshCw,
  MapPin, Star, ArrowUpRight, ArrowDownRight, Dot,
  Menu, X, Mail, Shield, Zap
} from "lucide-react";
import MainDashboard from "./MainDashboard";
import StaffManagementManager from "./Staff Management Board/StaffManagementManager";
import ParcelRecordsSection from "../Common/ParcelRecordsSection";
import ComplaintManagemet from "../Common/ComplaintManagement";
import KPIDashboard from "./KPIDashboard"; 


const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
  { icon: Package, label: "Parcel Management", key: "parcels" },
  { icon: Truck, label: "Delivery Status Updates", key: "delivery" },
  { icon: MessageSquareWarning, label: "Complaint Management", key: "complaints" },
  { icon: Users, label: "Postal Staff Management", key: "staff" },
  { icon: BarChart3, label: "Branch Performance", key: "branch" },
  { icon: TrendingUp, label: "KPI Analytics", key: "kpi" },
  { icon: Clock, label: "Delayed Deliveries", key: "delays" },
  // { icon: Bell, label: "Notifications & Alerts", key: "notifications" },
  { icon: Mail, label: "Citizen Requests", key: "citizens" },
  // { icon: FileText, label: "Reports", key: "reports" },
];

    const bottomMenu = [
      { icon: UserCircle, label: "Profile Settings", key: "profile" },
      { icon: LogOut, label: "Logout", key: "logout" },
    ];
export default function ManagerDashboard() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden" style={{ fontFamily: "'DM Sans', 'Nunito', sans-serif" }}>

      {/* ── SIDEBAR ── */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-0 overflow-hidden"} transition-all duration-300 flex-shrink-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 flex flex-col h-full shadow-2xl z-20`}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Dept. of Posts</p>
              <p className="text-slate-400 text-xs">Manager Portal</p>
            </div>
          </div>
        </div>

        {/* Manager badge */}
        <div className="px-4 py-3 mx-3 mt-4 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">SR</div>
          <div>
            <p className="text-white text-xs font-semibold">Suresh Rawat</p>
            <p className="text-blue-400 text-xs">Regional Manager</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 mt-4 overflow-y-auto space-y-0.5 scrollbar-hide">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest px-3 mb-2">Main Menu</p>
          {menuItems.map(({ icon: Icon, label, key }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
                ${active === key
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${active === key ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`} />
              <span className="truncate">{label}</span>
              {active === key && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-5 pt-3 border-t border-slate-700/60 space-y-0.5 mt-2">
          {bottomMenu.map(({ icon: Icon, label, key }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-150 group"
            >
              <Icon className="w-4 h-4 flex-shrink-0 text-slate-500 group-hover:text-blue-400" />
              {label}
            </button>
          ))}
        </div>
      </aside>
          {/*  */}
  {/* { icon: Users, label: "Postal Staff Management", key: "staff" },
  { icon: BarChart3, label: "Branch Performance", key: "branch" },
  { icon: TrendingUp, label: "KPI Analytics", key: "kpi" },
  { icon: Clock, label: "Delayed Deliveries", key: "delays" },
  { icon: Bell, label: "Notifications & Alerts", key: "notifications" },
  { icon: Mail, label: "Citizen Requests", key: "citizens" },
  { icon: FileText, label: "Reports", key: "reports" }, */}
      {/* ── MAIN ── */}
      {(active=="dashboard")?
        <MainDashboard></MainDashboard>
      :(active=="parcels")?
        <ParcelRecordsSection/>
      :(active=="delivery")?
        <div></div>
      :(active == "complaints")?
        <ComplaintManagemet></ComplaintManagemet>
      :(active=="staff")?
        <div>
          <StaffManagementManager/>
        </div>
      :(active == "branch AN")?
        <div>Branch</div>
      :(active == "kpi")?
        <div >
          <KPIDashboard/>
        </div>
      :(active == "delays")?
        <div>Delays</div>
      :(active == "notification")?
        <div>Notification sys</div>
      :(active == "citizens")?
        <div>Citizen Monitooring</div>
      :(active == "reports")?
        <div>Reports</div>
      :null
      }
    </div>
  );
}