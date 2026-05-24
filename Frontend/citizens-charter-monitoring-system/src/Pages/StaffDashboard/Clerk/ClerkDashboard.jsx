import { useState, useEffect,useContext} from "react";
import {
  LayoutDashboard, PackagePlus, Archive, Truck, MessageSquareWarning,
  ClipboardList, HeadphonesIcon, CheckSquare, Bell, BarChart3,
  UserCog, LogOut, Search, Package, AlertTriangle, ChevronRight,
  Filter, RefreshCw, Eye, Edit3, Clock, MapPin, User, Zap,
  TrendingUp, CheckCircle2, XCircle, Circle, ArrowUpRight,
  Calendar, Shield, Star, Hash, Boxes
} from "lucide-react";
import { useNavigate,Link } from "react-router-dom";
import { MyContext } from '../../../Context';
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import MainDashboard from './MainDashboard'
import CreateParcel from '../Common/CreateParcel'
import ParcelRecordsSection from "../Common/ParcelRecordsSection";
const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: PackagePlus, label: "Parcel Booking", id: "booking" },
  { icon: Archive, label: "Parcel Records", id: "records" },
  { icon: Truck, label: "Update Delivery Status", id: "delivery" },
  { icon: MessageSquareWarning, label: "Citizen Complaints", id: "complaints" },
  { icon: HeadphonesIcon, label: "Customer Assistance", id: "assistance" },
];

export default function ClerkDashboard() {
  const navigate = useNavigate();
    const {isLogin,setIsLogin,user,setUser} = useContext(MyContext);
  useEffect(() => {
          if (localStorage.getItem("token") != null) {
              const decoded = jwtDecode(localStorage.getItem("token"));
              if (decoded.exp < Date.now() / 1000) {
                  localStorage.removeItem("token");
              } else {
                  if (decoded) {
                      console.log(decoded)
                      if(decoded?.designation!="Clerk"){
                        tooast.warn("You don't have permission to access Clerk Deshboard")
                        navigate("/")
                      }

                  }
              }
          }
      }, []);
    const [employee,setEmployee] = useState(null);
    
    useEffect(()=>{
      fetch(`http://localhost:8080/api/postalstaff/employee/rajesh.verma@postmail.com`,{
        method:"GET",
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
      }).then((response)=>{
        return response.json();
      }).then((data)=>{
        console.log(data)
        setEmployee(data)
      }).catch((err)=>{
        console.log(err)
      })
    },[])
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");


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
              <p className="text-xs font-semibold text-slate-800">{employee?.name}</p>
              <p className="text-[10px] text-blue-500 font-medium">Postal Clerk · {employee?.employeeId}</p>
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
          </div>
        </div>
        {(active=="dashboard")?
          <MainDashboard employee={employee}/>
        :(active=="booking")?
          <CreateParcel employee={employee}/>
        :(active=="records")?
          <ParcelRecordsSection/>
        :null
        }
        <div className="px-6 py-5 space-y-5">   
          {/* Footer */}
          <div className="text-center py-2">
            <p className="text-[11px] text-slate-300">Department of Posts · PostalNet Clerk Portal · v2.4.1</p>
          </div>
        </div>
      </main>
    </div>
  );
}