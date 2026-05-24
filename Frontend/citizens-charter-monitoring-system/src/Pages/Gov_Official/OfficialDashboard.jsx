import { useState, useEffect, useMemo } from "react";
import {
  Shield, Building2, AlertTriangle, TrendingUp, Users, Star,
  Package, Search, ChevronDown, ChevronUp, Eye, ArrowUpCircle,
  CheckCircle, UserPlus, Bell, Server, Wifi, Lock, Database,
  Clock, MapPin, FileText, BarChart2, X,
  ChevronLeft, ChevronRight, AlertCircle, CheckCircle2,
  Radio, Cpu, Globe, TrendingDown, Flag, Layers
} from "lucide-react";

// ─── SINGLE SOURCE OF TRUTH FOR ALL COLORS ───────────────────────────────────
const C = {
  // Base palette
  bg:         "#06101f",
  surface:    "#0b1a2e",
  surfaceHi:  "#0f2240",
  border:     "rgba(255,255,255,0.08)",
  borderHi:   "rgba(255,255,255,0.14)",

  // Semantic tokens
  blue:    { solid: "#3b82f6", dim: "rgba(59,130,246,0.18)",  border: "rgba(59,130,246,0.30)",  text: "#93c5fd" },
  indigo:  { solid: "#6366f1", dim: "rgba(99,102,241,0.18)",  border: "rgba(99,102,241,0.30)",  text: "#a5b4fc" },
  violet:  { solid: "#8b5cf6", dim: "rgba(139,92,246,0.18)",  border: "rgba(139,92,246,0.30)",  text: "#c4b5fd" },
  emerald: { solid: "#10b981", dim: "rgba(16,185,129,0.18)",  border: "rgba(16,185,129,0.30)",  text: "#6ee7b7" },
  teal:    { solid: "#14b8a6", dim: "rgba(20,184,166,0.18)",  border: "rgba(20,184,166,0.30)",  text: "#5eead4" },
  amber:   { solid: "#f59e0b", dim: "rgba(245,158,11,0.18)",  border: "rgba(245,158,11,0.30)",  text: "#fcd34d" },
  orange:  { solid: "#f97316", dim: "rgba(249,115,22,0.18)",  border: "rgba(249,115,22,0.30)",  text: "#fdba74" },
  red:     { solid: "#ef4444", dim: "rgba(239,68,68,0.18)",   border: "rgba(239,68,68,0.30)",   text: "#fca5a5" },
  sky:     { solid: "#0ea5e9", dim: "rgba(14,165,233,0.18)",  border: "rgba(14,165,233,0.30)",  text: "#7dd3fc" },
  slate:   { solid: "#64748b", dim: "rgba(100,116,139,0.18)", border: "rgba(100,116,139,0.30)", text: "#94a3b8" },

  // Text
  textPrimary:   "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted:     "#475569",

  // Status → color token key
  status: {
    OPEN:        "blue",
    IN_PROGRESS: "amber",
    ESCALATED:   "red",
    RESOLVED:    "emerald",
    CLOSED:      "slate",
  },
  statusLabel: {
    OPEN: "OPEN", IN_PROGRESS: "IN PROGRESS", ESCALATED: "ESCALATED", RESOLVED: "RESOLVED", CLOSED: "CLOSED"
  },

  // Priority → color token key
  priority: {
    LOW:      "slate",
    MEDIUM:   "sky",
    HIGH:     "orange",
    CRITICAL: "red",
  },

  // KPI cards
  kpi: ["blue","orange","red","emerald","violet","teal"],

  // Activity colors
  activity: { red:"red", orange:"orange", green:"emerald", blue:"blue", teal:"teal" },

  // Alert severity
  alert: { CRITICAL:"red", HIGH:"orange", MEDIUM:"amber" },

  // System health
  health: { ONLINE:"emerald", STABLE:"teal", SECURE:"emerald", good:"emerald", warn:"amber" },
};

// Helper: get token object from key
const tok = (key) => C[key] || C.slate;

// Helper: badge style from token key
const badge = (key) => ({
  background: tok(key).dim,
  border: `1px solid ${tok(key).border}`,
  color: tok(key).text,
  borderRadius: "999px",
  padding: "2px 8px",
  fontSize: "10px",
  fontWeight: 700,
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  whiteSpace: "nowrap",
});

// Helper: card bg style
const cardStyle = (key, extra = {}) => ({
  background: `linear-gradient(135deg, ${tok(key).dim}, rgba(0,0,0,0))`,
  border: `1px solid ${tok(key).border}`,
  borderRadius: 16,
  ...extra,
});

// ─── DATA ─────────────────────────────────────────────────────────────────────
const COMPLAINTS = [
  { id:"CMP-2024-001", citizen:"Rajesh Kumar",   type:"Parcel Not Delivered",       region:"North Delhi",     branch:"Connaught Place PO", priority:"CRITICAL", status:"ESCALATED",   escalation:3, officer:"D.K. Sharma",      date:"2024-01-15" },
  { id:"CMP-2024-002", citizen:"Priya Mehta",    type:"Wrong Address Delivery",     region:"Mumbai West",     branch:"Andheri PO",         priority:"HIGH",     status:"IN_PROGRESS", escalation:2, officer:"S. Patil",          date:"2024-01-16" },
  { id:"CMP-2024-003", citizen:"Amit Singh",     type:"Delayed Speed Post",         region:"Bengaluru South", branch:"Jayanagar PO",       priority:"MEDIUM",   status:"OPEN",        escalation:1, officer:"Unassigned",        date:"2024-01-17" },
  { id:"CMP-2024-004", citizen:"Sunita Devi",    type:"Money Order Not Received",   region:"Lucknow Central", branch:"Hazratganj PO",      priority:"HIGH",     status:"RESOLVED",    escalation:2, officer:"A.K. Verma",        date:"2024-01-14" },
  { id:"CMP-2024-005", citizen:"Mohammed Iqbal", type:"Parcel Damaged",             region:"Hyderabad East",  branch:"Secunderabad PO",    priority:"MEDIUM",   status:"CLOSED",      escalation:1, officer:"V. Reddy",          date:"2024-01-13" },
  { id:"CMP-2024-006", citizen:"Kavitha Nair",   type:"Staff Misconduct",           region:"Chennai North",   branch:"Egmore PO",          priority:"CRITICAL", status:"ESCALATED",   escalation:4, officer:"R. Krishnamurthy",  date:"2024-01-18" },
  { id:"CMP-2024-007", citizen:"Harpreet Kaur",  type:"Tracking System Error",      region:"Amritsar District",branch:"Golden Temple PO",  priority:"LOW",      status:"IN_PROGRESS", escalation:1, officer:"G. Singh",          date:"2024-01-17" },
  { id:"CMP-2024-008", citizen:"Deepak Joshi",   type:"Registered Letter Lost",     region:"Pune Municipal",  branch:"Shivajinagar PO",    priority:"HIGH",     status:"OPEN",        escalation:2, officer:"Unassigned",        date:"2024-01-19" },
  { id:"CMP-2024-009", citizen:"Meena Kumari",   type:"Pension Disbursement Delay", region:"Patna Metro",     branch:"Gandhi Maidan PO",   priority:"CRITICAL", status:"ESCALATED",   escalation:3, officer:"B.N. Prasad",       date:"2024-01-15" },
  { id:"CMP-2024-010", citizen:"Vikram Rathore", type:"Courier Not Delivered",      region:"Jaipur Pink City",branch:"MI Road PO",          priority:"MEDIUM",   status:"RESOLVED",    escalation:1, officer:"M. Sharma",         date:"2024-01-12" },
];

const BRANCHES = [
  { name:"Connaught Place PO", region:"North Delhi",     parcels:4820, success:94.2, complaints:18, delayed:12, efficiency:91 },
  { name:"Andheri West PO",    region:"Mumbai West",     parcels:6140, success:97.1, complaints:9,  delayed:5,  efficiency:96 },
  { name:"Jayanagar PO",       region:"Bengaluru South", parcels:3290, success:88.7, complaints:24, delayed:21, efficiency:82 },
  { name:"Hazratganj PO",      region:"Lucknow Central", parcels:2870, success:92.4, complaints:15, delayed:9,  efficiency:88 },
  { name:"Egmore PO",          region:"Chennai North",   parcels:5120, success:85.3, complaints:31, delayed:28, efficiency:79 },
  { name:"Shivajinagar PO",    region:"Pune Municipal",  parcels:3760, success:95.8, complaints:7,  delayed:4,  efficiency:94 },
];

const ACTIVITIES = [
  { id:1, text:"Complaint CMP-2024-006 escalated to Level 4",           time:"2 min ago",  icon:"alert",   color:"red"    },
  { id:2, text:"Parcel spike detected at Egmore PO — 28 delayed",       time:"8 min ago",  icon:"package", color:"orange" },
  { id:3, text:"Branch inspection completed at Andheri West PO",        time:"23 min ago", icon:"check",   color:"green"  },
  { id:4, text:"Staff disciplinary notice issued — Egmore PO",          time:"1 hr ago",   icon:"flag",    color:"red"    },
  { id:5, text:"Monthly regional report generated — Q1 2024",           time:"2 hr ago",   icon:"file",    color:"blue"   },
  { id:6, text:"Delivery performance updated — National Average 92.1%", time:"3 hr ago",   icon:"trending",color:"teal"   },
  { id:7, text:"High escalation zone flagged — Chennai North",          time:"4 hr ago",   icon:"alert",   color:"orange" },
  { id:8, text:"New citizen complaints batch processed — 47 entries",   time:"5 hr ago",   icon:"file",    color:"blue"   },
];

const ALERTS = [
  { id:1, type:"CRITICAL", title:"Mass Parcel Delay — Chennai Zone",   desc:"28 parcels delayed beyond SLA at Egmore PO. Immediate action required.", time:"8 min ago" },
  { id:2, type:"HIGH",     title:"Escalation Surge — North Delhi",     desc:"Complaint escalations up 340% in last 48 hours at Connaught Place PO.", time:"1 hr ago"  },
  { id:3, type:"HIGH",     title:"Staff Misconduct Complaint",         desc:"Level 4 escalation filed against postal staff. Investigation initiated.", time:"2 hr ago"  },
  { id:4, type:"MEDIUM",   title:"Regional System Slowdown",           desc:"Tracking portal response time degraded in Lucknow zone — 3.2s avg.",    time:"3 hr ago"  },
];

const OFFICERS = ["D.K. Sharma","S. Patil","A.K. Verma","V. Reddy","R. Krishnamurthy","G. Singh","B.N. Prasad","M. Sharma","P. Iyer","N. Gupta"];

const ANALYTICS = {
  resolutionTrends: [
    { month:"Aug", resolved:68, escalated:22 }, { month:"Sep", resolved:74, escalated:18 },
    { month:"Oct", resolved:71, escalated:24 }, { month:"Nov", resolved:82, escalated:14 },
    { month:"Dec", resolved:79, escalated:16 }, { month:"Jan", resolved:88, escalated:11 },
  ],
  regionalDelivery: [
    { region:"North Delhi", rate:94 }, { region:"Mumbai West", rate:97 },
    { region:"Bengaluru",   rate:89 }, { region:"Lucknow",     rate:92 },
    { region:"Chennai",     rate:85 }, { region:"Pune",        rate:96 },
  ],
  satisfactionMonths: [72,76,79,75,81,84,82,86,88,85,90,87],
  escalationGrowth: [
    { month:"Oct", count:48 }, { month:"Nov", count:38 },
    { month:"Dec", count:42 }, { month:"Jan", count:31 },
  ],
};

const KPI_DATA = [
  { label:"Active Branches",    value:"23,847",    change:"+124",   up:true,  key:"blue",    sub:"Across 28 states",   Icon:Building2    },
  { label:"Total Complaints",   value:"1,42,309",  change:"+847",   up:false, key:"orange",  sub:"Last 30 days",       Icon:AlertTriangle },
  { label:"Pending Escalations",value:"3,218",     change:"-312",   up:true,  key:"red",     sub:"Requires action",    Icon:ArrowUpCircle },
  { label:"Delivery Success",   value:"94.7%",     change:"+1.2%",  up:true,  key:"emerald", sub:"National average",   Icon:CheckCircle  },
  { label:"Satisfaction Index", value:"87.3",      change:"+2.4",   up:true,  key:"violet",  sub:"Citizen feedback",   Icon:Star         },
  { label:"Active Staff",       value:"4,09,612",  change:"+1,240", up:true,  key:"teal",    sub:"Deployed nationwide",Icon:Users        },
];

const SYSTEM_HEALTH = [
  { label:"API Gateway",      status:"ONLINE",   val:99.98, colorKey:"emerald", Icon:Globe    },
  { label:"Main Database",    status:"ONLINE",   val:100,   colorKey:"emerald", Icon:Database },
  { label:"Active Sessions",  status:"3,247",    val:72,    colorKey:"blue",    Icon:Users    },
  { label:"Network Health",   status:"STABLE",   val:96,    colorKey:"teal",    Icon:Wifi     },
  { label:"Cyber Security",   status:"SECURE",   val:100,   colorKey:"emerald", Icon:Lock     },
  { label:"Server Load",      status:"68%",      val:68,    colorKey:"amber",   Icon:Cpu      },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function PostalDashboard() {
  const [search, setSearch]               = useState("");
  const [statusFilter, setStatusFilter]   = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [sortField, setSortField]         = useState("date");
  const [sortDir, setSortDir]             = useState("desc");
  const [currentPage, setCurrentPage]     = useState(1);
  const [modalOpen, setModalOpen]         = useState(false);
  const [selectedComplaint, setSel]       = useState(null);
  const [form, setForm]                   = useState({ officer:"", dept:"", priority:"HIGH", notes:"", deadline:"" });
  const [complaints, setComplaints]       = useState(COMPLAINTS);
  const [, setTick]                       = useState(0);
  const [activeTab, setActiveTab]         = useState("table");
  const PER_PAGE = 6;

  useEffect(() => { const t = setInterval(() => setTick(n => n+1), 1000); return () => clearInterval(t); }, []);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", second:"2-digit" });
  const dateStr = now.toLocaleDateString("en-IN",  { weekday:"short", year:"numeric", month:"short", day:"numeric" });

  const filtered = useMemo(() => {
    let d = [...complaints];
    if (search)          d = d.filter(c => [c.id,c.citizen,c.type,c.region].some(v => v.toLowerCase().includes(search.toLowerCase())));
    if (statusFilter !== "ALL")   d = d.filter(c => c.status   === statusFilter);
    if (priorityFilter !== "ALL") d = d.filter(c => c.priority === priorityFilter);
    d.sort((a,b) => { const [va,vb]=[a[sortField],b[sortField]]; return sortDir==="asc" ? (va>vb?1:-1) : (va<vb?1:-1); });
    return d;
  }, [complaints, search, statusFilter, priorityFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((currentPage-1)*PER_PAGE, currentPage*PER_PAGE);

  const doSort = (f) => { if (sortField===f) setSortDir(d => d==="asc"?"desc":"asc"); else { setSortField(f); setSortDir("asc"); } };
  const openModal = (c) => { setSel(c); setModalOpen(true); };
  const handleAssign = () => {
    if (!form.officer) return;
    setComplaints(prev => prev.map(c => c.id===selectedComplaint.id ? {...c, officer:form.officer, status:"IN_PROGRESS"} : c));
    setModalOpen(false);
    setForm({ officer:"", dept:"", priority:"HIGH", notes:"", deadline:"" });
  };
  const handleResolve  = (id) => setComplaints(prev => prev.map(c => c.id===id ? {...c, status:"RESOLVED"}   : c));
  const handleEscalate = (id) => setComplaints(prev => prev.map(c => c.id===id ? {...c, status:"ESCALATED", escalation:c.escalation+1} : c));

  const ActIcon = ({type}) => {
    const props = { style:{width:13,height:13} };
    if (type==="alert"||type==="alert") return <AlertTriangle {...props}/>;
    if (type==="package") return <Package {...props}/>;
    if (type==="check")   return <CheckCircle2 {...props}/>;
    if (type==="flag")    return <Flag {...props}/>;
    if (type==="trending")return <TrendingUp {...props}/>;
    return <FileText {...props}/>;
  };

  // efficiency → color key
  const effKey = (e) => e >= 90 ? "emerald" : e >= 83 ? "amber" : "red";
  // delivery rate → color key
  const rateKey = (r) => r >= 95 ? "emerald" : r >= 90 ? "blue" : "orange";

  // Shared glass card wrapper
  const GlassCard = ({children, style={}, className=""}) => (
    <div className={className} style={{ background:"rgba(255,255,255,0.025)", backdropFilter:"blur(12px)", border:`1px solid ${C.border}`, borderRadius:18, boxShadow:"0 8px 32px rgba(0,0,0,0.4)", ...style }}>
      {children}
    </div>
  );

  // Pill/badge
  const Badge = ({colorKey, children, dot=false}) => (
    <span style={badge(colorKey)}>
      {dot && <span style={{ width:6,height:6,borderRadius:"50%",background:tok(colorKey).solid,display:"inline-block",flexShrink:0 }} />}
      {children}
    </span>
  );

  // Action icon button
  const Btn = ({colorKey, onClick, title, children}) => (
    <button onClick={onClick} title={title} style={{ padding:"4px 5px", borderRadius:6, background:tok(colorKey).dim, border:`1px solid ${tok(colorKey).border}`, color:tok(colorKey).text, cursor:"pointer", display:"flex", alignItems:"center" }}>
      {children}
    </button>
  );

  // Progress bar
  const Bar = ({val, colorKey, h=6}) => (
    <div style={{ height:h, background:"rgba(255,255,255,0.05)", borderRadius:999, overflow:"hidden" }}>
      <div style={{ height:"100%", width:`${val}%`, background:`linear-gradient(90deg, ${tok(colorKey).solid}, ${tok(colorKey).text})`, borderRadius:999, transition:"width .7s ease" }} />
    </div>
  );

  // Section heading
  const SectionHead = ({Icon, label, colorKey="blue"}) => (
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
      <span style={{ color:tok(colorKey).text }}><Icon style={{width:15,height:15}}/></span>
      <span style={{ fontSize:13, fontWeight:700, color:C.textPrimary }}>{label}</span>
    </div>
  );

  const inputStyle = { width:"100%", background:"rgba(255,255,255,0.05)", border:`1px solid ${C.border}`, borderRadius:10, padding:"7px 12px", fontSize:12, color:C.textPrimary, outline:"none", boxSizing:"border-box" };
  const labelStyle = { display:"block", fontSize:10, fontWeight:700, letterSpacing:"0.07em", color:C.textSecondary, textTransform:"uppercase", marginBottom:4 };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Segoe UI',system-ui,sans-serif", color:C.textPrimary }}>
      <style>{`
        @keyframes pulseDot { 0%,100%{transform:scale(1);opacity:.9} 50%{transform:scale(1.7);opacity:0} }
        @keyframes slideIn  { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        .pulse-ring { animation: pulseDot 2s infinite; }
        .slide-in   { animation: slideIn .28s ease; }
        .fade-in    { animation: fadeIn .35s ease; }
        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-track { background:rgba(255,255,255,.03); }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,.12); border-radius:2px; }
        select option { background:#0b1a2e; }
        input[type=date]::-webkit-calendar-picker-indicator { filter:invert(1) opacity(.4); }
      `}</style>

      <div style={{ maxWidth:1600, margin:"0 auto", padding:"16px 16px 32px" }}>

        {/* ════════════════════ HEADER ════════════════════ */}
        <div style={{ position:"relative", overflow:"hidden", borderRadius:20, border:`1px solid ${C.blue.border}`, background:`linear-gradient(135deg, #091525 0%, #0d2040 50%, #091525 100%)`, marginBottom:16, boxShadow:`0 0 40px rgba(59,130,246,.12)` }}>
          {/* grid pattern */}
          <div style={{ position:"absolute", inset:0, opacity:.04, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 30px,#fff 30px,#fff 31px),repeating-linear-gradient(90deg,transparent,transparent 30px,#fff 30px,#fff 31px)" }} />
          {/* glow blob */}
          <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:400, height:120, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(59,130,246,.25),transparent)", filter:"blur(30px)", pointerEvents:"none" }} />

          <div style={{ position:"relative", zIndex:1, padding:"20px 24px", display:"flex", flexWrap:"wrap", gap:16, alignItems:"center", justifyContent:"space-between" }}>
            {/* Left: emblem + title */}
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ position:"relative" }}>
                <div style={{ width:60, height:60, borderRadius:16, background:`linear-gradient(135deg, ${C.blue.dim}, #0a1e40)`, border:`1px solid ${C.blue.border}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Shield style={{ width:28, height:28, color:C.blue.text }} />
                </div>
                <span style={{ position:"absolute", top:-2, right:-2, width:10, height:10, borderRadius:"50%", background:C.emerald.solid, border:`2px solid ${C.bg}`, display:"block" }}>
                  <span className="pulse-ring" style={{ position:"absolute", inset:0, borderRadius:"50%", background:C.emerald.solid, opacity:.6 }} />
                </span>
              </div>
              <div>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", color:C.blue.text, marginBottom:3 }}>GOVERNMENT OF INDIA — DEPARTMENT OF POSTS</div>
                <h1 style={{ margin:0, fontSize:20, fontWeight:800, color:C.textPrimary, lineHeight:1.2 }}>Government Operations Monitoring Dashboard</h1>
                <p style={{ margin:"4px 0 0", fontSize:12, color:C.textSecondary, maxWidth:520 }}>Monitor postal operations, public complaints, service efficiency and branch performance across all regions.</p>
              </div>
            </div>

            {/* Right: clock + profile */}
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <div style={{ background:"rgba(255,255,255,.04)", border:`1px solid ${C.border}`, borderRadius:14, padding:"10px 14px", textAlign:"right", minWidth:150 }}>
                <div style={{ fontSize:9, color:C.textMuted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:3 }}>System Clock</div>
                <div style={{ fontSize:18, fontFamily:"monospace", fontWeight:800, color:C.textPrimary }}>{timeStr}</div>
                <div style={{ fontSize:10, color:C.textSecondary }}>{dateStr}</div>
              </div>
              <div style={{ background:"rgba(255,255,255,.04)", border:`1px solid ${C.border}`, borderRadius:14, padding:"10px 14px", minWidth:210 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <div style={{ width:34, height:34, borderRadius:10, background:C.blue.dim, border:`1px solid ${C.blue.border}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Users style={{ width:16, height:16, color:C.blue.text }} />
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:C.textPrimary }}>Sh. Arvind K. Mehta</div>
                    <div style={{ fontSize:10, color:C.textSecondary }}>Director General, Postal Services</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  <Badge colorKey="blue">Pan-India Jurisdiction</Badge>
                  <Badge colorKey="violet">Level 1 Authority</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* status strip */}
          <div style={{ position:"relative", zIndex:1, padding:"0 24px 14px", display:"flex", gap:20, flexWrap:"wrap" }}>
            {[{l:"System Status",v:"OPERATIONAL",k:"emerald"},{l:"Data Refresh",v:"LIVE",k:"blue"},{l:"Security Level",v:"CLASSIFIED",k:"violet"},{l:"Portal Version",v:"v4.2.1",k:"slate"}].map(s => (
              <div key={s.l} style={{ display:"flex", alignItems:"center", gap:6, fontSize:10 }}>
                <span className="pulse-ring" style={{ width:6,height:6,borderRadius:"50%",background:tok(s.k).solid,display:"inline-block",flexShrink:0 }} />
                <span style={{ color:C.textMuted }}>{s.l}:</span>
                <span style={{ color:tok(s.k).text, fontWeight:700 }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════ KPI CARDS ════════════════════ */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:12, marginBottom:16 }}>
          {KPI_DATA.map(({label,value,change,up,key,sub,Icon}, i) => (
            <div key={i} style={{ ...cardStyle(key), padding:"16px", cursor:"pointer", transition:"transform .18s,box-shadow .18s", position:"relative", overflow:"hidden" }}
              onMouseEnter={e => { e.currentTarget.style.transform="scale(1.025)"; e.currentTarget.style.boxShadow=`0 8px 28px ${tok(key).dim}`; }}
              onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ position:"absolute", top:0, right:0, width:72, height:72, borderRadius:"50%", background:tok(key).solid, opacity:.08, filter:"blur(16px)" }} />
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:tok(key).dim, border:`1px solid ${tok(key).border}`, display:"flex", alignItems:"center", justifyContent:"center", color:tok(key).text }}>
                  <Icon style={{width:18,height:18}}/>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:3, fontSize:11, fontWeight:700, color: up ? (key==="red"||key==="orange" ? tok("red").text : tok("emerald").text) : tok("emerald").text }}>
                  {up ? <TrendingUp style={{width:11,height:11}}/> : <TrendingDown style={{width:11,height:11}}/>}
                  {change}
                </div>
              </div>
              <div style={{ fontSize:24, fontWeight:800, color:C.textPrimary, marginBottom:2 }}>{value}</div>
              <div style={{ fontSize:11, fontWeight:600, color:C.textSecondary }}>{label}</div>
              <div style={{ fontSize:10, color:C.textMuted, marginTop:2 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* ════════════════════ MAIN GRID ════════════════════ */}
        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>

          {/* LEFT 70% */}
          <div style={{ flex:"1 1 600px", minWidth:0 }}>

            {/* Tab bar */}
            <div style={{ display:"flex", gap:4, padding:4, background:"rgba(255,255,255,.04)", border:`1px solid ${C.border}`, borderRadius:12, width:"fit-content", marginBottom:14 }}>
              {[["table","Complaint Monitor"],["branches","Branch Performance"],["analytics","Analytics"]].map(([tab,label]) => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding:"6px 16px", borderRadius:8, fontSize:11, fontWeight:700, border:"none", cursor:"pointer", transition:"all .15s",
                  background: activeTab===tab ? tok("blue").solid : "transparent",
                  color: activeTab===tab ? "#fff" : C.textSecondary }}>
                  {label}
                </button>
              ))}
            </div>

            {/* ── COMPLAINT TABLE ── */}
            {activeTab==="table" && (
              <GlassCard className="fade-in">
                {/* toolbar */}
                <div style={{ padding:"14px 16px", borderBottom:`1px solid ${C.border}`, display:"flex", flexWrap:"wrap", gap:10, alignItems:"center", justifyContent:"space-between" }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:C.textPrimary, display:"flex", alignItems:"center", gap:6 }}>
                      <FileText style={{width:14,height:14,color:tok("blue").text}}/> Regional Complaint Monitoring
                    </div>
                    <div style={{ fontSize:10, color:C.textMuted, marginTop:2 }}>{filtered.length} complaints · page {currentPage}/{totalPages}</div>
                  </div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    <div style={{ position:"relative" }}>
                      <Search style={{ width:13,height:13,color:C.textMuted,position:"absolute",left:9,top:"50%",transform:"translateY(-50%)" }}/>
                      <input value={search} onChange={e=>{setSearch(e.target.value);setCurrentPage(1);}} placeholder="Search…" style={{ ...inputStyle, paddingLeft:28, width:160 }}/>
                    </div>
                    {[{val:statusFilter,set:(v)=>{setStatusFilter(v);setCurrentPage(1);},opts:["ALL","OPEN","IN_PROGRESS","ESCALATED","RESOLVED","CLOSED"]},
                      {val:priorityFilter,set:(v)=>{setPriorityFilter(v);setCurrentPage(1);},opts:["ALL","LOW","MEDIUM","HIGH","CRITICAL"]}].map((dd,i) => (
                      <select key={i} value={dd.val} onChange={e=>dd.set(e.target.value)} style={{ ...inputStyle, width:"auto", padding:"6px 10px", cursor:"pointer" }}>
                        {dd.opts.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ))}
                  </div>
                </div>

                {/* table */}
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
                    <thead>
                      <tr style={{ background:"rgba(255,255,255,.025)", borderBottom:`1px solid ${C.border}` }}>
                        {[["id","Complaint ID"],["citizen","Citizen"],["type","Type"],["region","Region"],["priority","Priority"],["status","Status"],["escalation","Esc"],["officer","Officer"],[null,"Actions"]].map(([f,label]) => (
                          <th key={label} onClick={() => f && doSort(f)} style={{ padding:"9px 12px", textAlign:"left", fontSize:9, fontWeight:700, letterSpacing:"0.08em", color:C.textMuted, textTransform:"uppercase", whiteSpace:"nowrap", cursor: f?"pointer":"default", userSelect:"none" }}>
                            <span style={{ display:"flex", alignItems:"center", gap:3 }}>
                              {label}
                              {f && sortField===f && (sortDir==="asc" ? <ChevronUp style={{width:11,height:11}}/> : <ChevronDown style={{width:11,height:11}}/>)}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.map(c => {
                        const sk = C.status[c.status];
                        const pk = C.priority[c.priority];
                        return (
                          <tr key={c.id} style={{ borderBottom:`1px solid rgba(255,255,255,.04)` }}
                            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.025)"}
                            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                            <td style={{ padding:"8px 12px", fontFamily:"monospace", color:tok("blue").text, whiteSpace:"nowrap" }}>{c.id}</td>
                            <td style={{ padding:"8px 12px", color:C.textPrimary, fontWeight:600, whiteSpace:"nowrap" }}>{c.citizen}</td>
                            <td style={{ padding:"8px 12px", color:C.textSecondary, maxWidth:130, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.type}</td>
                            <td style={{ padding:"8px 12px", color:C.textSecondary, whiteSpace:"nowrap" }}>
                              <span style={{ display:"flex", alignItems:"center", gap:4 }}><MapPin style={{width:11,height:11,color:C.textMuted}}/>{c.region}</span>
                            </td>
                            <td style={{ padding:"8px 12px" }}><Badge colorKey={pk} dot>{c.priority}</Badge></td>
                            <td style={{ padding:"8px 12px" }}><Badge colorKey={sk}>{C.statusLabel[c.status]}</Badge></td>
                            <td style={{ padding:"8px 12px", textAlign:"center" }}>
                              <span style={{ fontSize:11, fontWeight:800, color: c.escalation>=3 ? tok("red").text : c.escalation>=2 ? tok("orange").text : C.textMuted }}>L{c.escalation}</span>
                            </td>
                            <td style={{ padding:"8px 12px", color:C.textSecondary, whiteSpace:"nowrap", fontSize:11 }}>{c.officer}</td>
                            <td style={{ padding:"8px 12px" }}>
                              <div style={{ display:"flex", gap:4 }}>
                                <Btn colorKey="blue"    title="View"><Eye style={{width:12,height:12}}/></Btn>
                                <Btn colorKey="red"     title="Escalate" onClick={()=>handleEscalate(c.id)}><ArrowUpCircle style={{width:12,height:12}}/></Btn>
                                <Btn colorKey="emerald" title="Resolve"  onClick={()=>handleResolve(c.id)}><CheckCircle2 style={{width:12,height:12}}/></Btn>
                                <Btn colorKey="violet"  title="Assign"   onClick={()=>openModal(c)}><UserPlus style={{width:12,height:12}}/></Btn>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* pagination */}
                <div style={{ padding:"10px 16px", borderTop:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <span style={{ fontSize:10, color:C.textMuted }}>Showing {Math.min((currentPage-1)*PER_PAGE+1,filtered.length)}–{Math.min(currentPage*PER_PAGE,filtered.length)} of {filtered.length}</span>
                  <div style={{ display:"flex", gap:4 }}>
                    {[{Icon:ChevronLeft,act:()=>setCurrentPage(p=>Math.max(1,p-1)),dis:currentPage===1},
                      ...Array.from({length:Math.min(totalPages,5)},(_,i)=>({n:i+1})),
                      {Icon:ChevronRight,act:()=>setCurrentPage(p=>Math.min(totalPages,p+1)),dis:currentPage===totalPages}].map((item,i) => {
                      if (item.n !== undefined) {
                        return <button key={i} onClick={()=>setCurrentPage(item.n)} style={{ width:28,height:28,borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,
                          background: item.n===currentPage ? tok("blue").solid : "rgba(255,255,255,.06)",
                          color: item.n===currentPage ? "#fff" : C.textSecondary }}>{item.n}</button>;
                      }
                      return <button key={i} onClick={item.act} disabled={item.dis} style={{ width:28,height:28,borderRadius:8,border:`1px solid ${C.border}`,cursor:item.dis?"not-allowed":"pointer",background:"rgba(255,255,255,.04)",color:C.textSecondary,opacity:item.dis?.3:1,display:"flex",alignItems:"center",justifyContent:"center" }}>
                        <item.Icon style={{width:13,height:13}}/>
                      </button>;
                    })}
                  </div>
                </div>
              </GlassCard>
            )}

            {/* ── BRANCHES ── */}
            {activeTab==="branches" && (
              <div className="fade-in">
                <SectionHead Icon={Building2} label="Postal Branch Performance Overview" colorKey="blue"/>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
                  {BRANCHES.map((b,i) => {
                    const ek = effKey(b.efficiency);
                    return (
                      <GlassCard key={i} style={{ padding:16 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                          <div>
                            <div style={{ fontSize:13, fontWeight:700, color:C.textPrimary }}>{b.name}</div>
                            <div style={{ fontSize:10, color:C.textMuted, display:"flex", alignItems:"center", gap:4, marginTop:2 }}><MapPin style={{width:10,height:10}}/>{b.region}</div>
                          </div>
                          <Badge colorKey={ek}>{b.efficiency}% EFF</Badge>
                        </div>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:6, marginBottom:12 }}>
                          {[{l:"Parcels",v:b.parcels.toLocaleString(),k:"blue"},{l:"Success",v:b.success+"%",k:"emerald"},{l:"Complaints",v:b.complaints,k:"orange"},{l:"Delayed",v:b.delayed,k:"red"}].map(s => (
                            <div key={s.l} style={{ textAlign:"center" }}>
                              <div style={{ fontSize:14, fontWeight:800, color:tok(s.k).text }}>{s.v}</div>
                              <div style={{ fontSize:9, color:C.textMuted, textTransform:"uppercase" }}>{s.l}</div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:C.textMuted, marginBottom:4 }}>
                            <span>Efficiency Score</span><span style={{ color:C.textPrimary, fontWeight:700 }}>{b.efficiency}%</span>
                          </div>
                          <Bar val={b.efficiency} colorKey={ek}/>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── ANALYTICS ── */}
            {activeTab==="analytics" && (
              <div className="fade-in" style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <SectionHead Icon={BarChart2} label="National Analytics Overview" colorKey="blue"/>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>

                  {/* Resolution Trends */}
                  <GlassCard style={{ padding:16 }}>
                    <SectionHead Icon={TrendingUp} label="Complaint Resolution Trends" colorKey="emerald"/>
                    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                      {ANALYTICS.resolutionTrends.map((d,i) => (
                        <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <span style={{ fontSize:10, color:C.textMuted, width:28 }}>{d.month}</span>
                          <div style={{ flex:1, display:"flex", gap:3, height:18 }}>
                            <div style={{ background:tok("emerald").dim, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:4, width:`${d.resolved}%`, transition:"width .7s ease" }}>
                              <span style={{ fontSize:9, color:tok("emerald").text, fontWeight:700 }}>{d.resolved}%</span>
                            </div>
                            <div style={{ background:tok("red").dim, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:4, width:`${d.escalated}%`, transition:"width .7s ease" }}>
                              <span style={{ fontSize:9, color:tok("red").text, fontWeight:700 }}>{d.escalated}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display:"flex", gap:12, marginTop:8, fontSize:10, color:C.textSecondary }}>
                      <span style={{ display:"flex", alignItems:"center", gap:4 }}><span style={{ width:8,height:8,borderRadius:"50%",background:tok("emerald").solid,display:"inline-block" }}/>Resolved</span>
                      <span style={{ display:"flex", alignItems:"center", gap:4 }}><span style={{ width:8,height:8,borderRadius:"50%",background:tok("red").solid,display:"inline-block" }}/>Escalated</span>
                    </div>
                  </GlassCard>

                  {/* Regional Delivery */}
                  <GlassCard style={{ padding:16 }}>
                    <SectionHead Icon={Globe} label="Regional Delivery Analytics" colorKey="blue"/>
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                      {ANALYTICS.regionalDelivery.map((d,i) => {
                        const rk = rateKey(d.rate);
                        return (
                          <div key={i}>
                            <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, marginBottom:3 }}>
                              <span style={{ color:C.textSecondary }}>{d.region}</span>
                              <span style={{ color:tok(rk).text, fontWeight:800 }}>{d.rate}%</span>
                            </div>
                            <Bar val={d.rate} colorKey={rk} h={7}/>
                          </div>
                        );
                      })}
                    </div>
                  </GlassCard>

                  {/* Satisfaction Meter */}
                  <GlassCard style={{ padding:16 }}>
                    <SectionHead Icon={Star} label="Citizen Satisfaction Index" colorKey="violet"/>
                    <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:72, marginBottom:6 }}>
                      {ANALYTICS.satisfactionMonths.map((v,i) => (
                        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                          <div style={{ width:"100%", borderRadius:"3px 3px 0 0", transition:"height .7s ease", height:`${(v/100)*64}px`, background:`linear-gradient(to top, ${tok("violet").solid}, ${tok("blue").text})`, opacity:0.5+(i/12)*0.5 }}/>
                          <span style={{ fontSize:8, color:C.textMuted }}>{"JFMAMJJASOND"[i]}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ textAlign:"center" }}>
                      <span style={{ fontSize:28, fontWeight:800, color:tok("violet").text }}>87.3</span>
                      <span style={{ fontSize:12, color:C.textMuted }}> / 100 avg</span>
                    </div>
                  </GlassCard>

                  {/* Escalation Growth */}
                  <GlassCard style={{ padding:16 }}>
                    <SectionHead Icon={ArrowUpCircle} label="Monthly Escalation Growth" colorKey="orange"/>
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                      {ANALYTICS.escalationGrowth.map((d,i) => (
                        <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <span style={{ fontSize:10, color:C.textMuted, width:28 }}>{d.month}</span>
                          <div style={{ flex:1, height:24, background:"rgba(255,255,255,.05)", borderRadius:8, overflow:"hidden", position:"relative" }}>
                            <div style={{ height:"100%", borderRadius:8, background:`linear-gradient(90deg, ${tok("orange").solid}, ${tok("red").text})`, width:`${(d.count/50)*100}%`, transition:"width .7s ease", display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:6 }}>
                              <span style={{ fontSize:10, color:"#fff", fontWeight:800 }}>{d.count}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop:10, padding:"7px 10px", background:tok("emerald").dim, borderRadius:10, border:`1px solid ${tok("emerald").border}`, fontSize:10, color:tok("emerald").text, display:"flex", alignItems:"center", gap:6 }}>
                      <TrendingDown style={{width:12,height:12}}/> Escalations down 35% vs Oct 2023
                    </div>
                  </GlassCard>
                </div>

                {/* Heatmap */}
                <GlassCard style={{ padding:16 }}>
                  <SectionHead Icon={Layers} label="Branch Efficiency Heatmap" colorKey="teal"/>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:8 }}>
                    {BRANCHES.map((b,i) => {
                      const ek = effKey(b.efficiency);
                      return (
                        <div key={i} style={{ textAlign:"center" }}>
                          <div style={{ borderRadius:10, padding:"8px 4px", marginBottom:4, background:tok(ek).dim, border:`1px solid ${tok(ek).border}`, fontSize:13, fontWeight:800, color:tok(ek).text }}>
                            {b.efficiency}%
                          </div>
                          <div style={{ fontSize:9, color:C.textMuted, lineHeight:1.3 }}>{b.name.replace(" PO","")}</div>
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>
              </div>
            )}
          </div>

          {/* RIGHT 30% */}
          <div style={{ width:300, flexShrink:0, display:"flex", flexDirection:"column", gap:14 }}>

            {/* System Health */}
            <GlassCard style={{ padding:16 }}>
              <SectionHead Icon={Server} label="National System Health" colorKey="blue"/>
              <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                {SYSTEM_HEALTH.map((s,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 10px", background:"rgba(255,255,255,.025)", border:`1px solid ${C.border}`, borderRadius:10 }}>
                    <div style={{ position:"relative", width:8, height:8, flexShrink:0 }}>
                      <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:tok(s.colorKey).solid, display:"block" }}/>
                      <span className="pulse-ring" style={{ position:"absolute", inset:0, borderRadius:"50%", background:tok(s.colorKey).solid, opacity:.5 }}/>
                    </div>
                    <span style={{ color:tok(s.colorKey).text, display:"flex" }}><s.Icon style={{width:13,height:13}}/></span>
                    <span style={{ fontSize:11, color:C.textSecondary, flex:1 }}>{s.label}</span>
                    <span style={{ fontSize:10, fontWeight:700, color:tok(s.colorKey).text, marginRight:6 }}>{s.status}</span>
                    <div style={{ width:40 }}><Bar val={s.val} colorKey={s.colorKey} h={4}/></div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Live Activity */}
            <GlassCard style={{ padding:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                <Radio style={{width:14,height:14,color:tok("emerald").text}}/>
                <span style={{ fontSize:13, fontWeight:700, color:C.textPrimary }}>Live Activity Feed</span>
                <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:4, fontSize:9, color:tok("emerald").text, fontWeight:700 }}>
                  <span className="pulse-ring" style={{ width:6,height:6,borderRadius:"50%",background:tok("emerald").solid,display:"inline-block" }}/>LIVE
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:7, maxHeight:260, overflowY:"auto", paddingRight:2 }}>
                {ACTIVITIES.map(a => {
                  const ck = C.activity[a.color] || "blue";
                  return (
                    <div key={a.id} style={{ display:"flex", gap:8, padding:"7px 9px", borderRadius:9, background:tok(ck).dim, borderLeft:`2px solid ${tok(ck).solid}`, fontSize:11 }}>
                      <span style={{ color:tok(ck).text, marginTop:1, flexShrink:0 }}><ActIcon type={a.icon}/></span>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ margin:0, color:C.textSecondary, lineHeight:1.4 }}>{a.text}</p>
                        <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:3 }}>
                          <Clock style={{width:9,height:9,color:C.textMuted}}/>
                          <span style={{ fontSize:9, color:C.textMuted }}>{a.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            {/* Emergency Alerts */}
            <GlassCard style={{ padding:16, border:`1px solid ${tok("red").border}`, boxShadow:`0 8px 32px rgba(0,0,0,.4), 0 0 20px ${tok("red").dim}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                <Bell style={{width:14,height:14,color:tok("red").text}}/>
                <span style={{ fontSize:13, fontWeight:700, color:C.textPrimary }}>Emergency Alerts</span>
                <span style={{ marginLeft:"auto", ...badge("red") }}>{ALERTS.length} ACTIVE</span>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {ALERTS.map(a => {
                  const ck = C.alert[a.type];
                  return (
                    <div key={a.id} style={{ padding:"9px 11px", borderRadius:12, background:tok(ck).dim, border:`1px solid ${tok(ck).border}`, fontSize:11 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                        <AlertCircle style={{width:12,height:12,color:tok(ck).text}}/>
                        <span style={{ fontWeight:800, fontSize:10, color:tok(ck).text }}>{a.type}</span>
                        <span style={{ marginLeft:"auto", fontSize:9, color:C.textMuted }}>{a.time}</span>
                      </div>
                      <p style={{ margin:"0 0 3px", fontWeight:700, color:C.textPrimary }}>{a.title}</p>
                      <p style={{ margin:0, color:C.textSecondary, lineHeight:1.4 }}>{a.desc}</p>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* ════════════════════ MODAL ════════════════════ */}
      {modalOpen && (
        <div className="slide-in" style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:16, background:"rgba(0,0,0,.78)", backdropFilter:"blur(10px)" }}>
          <div style={{ width:"100%", maxWidth:440, borderRadius:20, border:`1px solid ${tok("blue").border}`, background:`linear-gradient(135deg, #0c1e38, #091525)`, boxShadow:`0 24px 64px rgba(0,0,0,.9), 0 0 40px ${tok("blue").dim}`, overflow:"hidden" }}>
            {/* header */}
            <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontSize:14, fontWeight:800, color:C.textPrimary, display:"flex", alignItems:"center", gap:8 }}>
                  <UserPlus style={{width:15,height:15,color:tok("violet").text}}/> Assign Investigation Officer
                </div>
                <div style={{ fontSize:10, color:C.textMuted, marginTop:2 }}>Complaint: <span style={{ color:tok("blue").text, fontFamily:"monospace" }}>{selectedComplaint?.id}</span></div>
              </div>
              <button onClick={()=>setModalOpen(false)} style={{ width:30, height:30, borderRadius:8, background:"rgba(255,255,255,.06)", border:`1px solid ${C.border}`, color:C.textSecondary, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <X style={{width:14,height:14}}/>
              </button>
            </div>

            {/* body */}
            <div style={{ padding:"16px 20px", display:"flex", flexDirection:"column", gap:12 }}>
              <div>
                <label style={labelStyle}>Complaint ID</label>
                <input defaultValue={selectedComplaint?.id} readOnly style={{ ...inputStyle, opacity:.5, cursor:"not-allowed" }}/>
              </div>
              <div>
                <label style={labelStyle}>Assign Officer *</label>
                <select value={form.officer} onChange={e=>setForm(p=>({...p,officer:e.target.value}))} style={{ ...inputStyle, cursor:"pointer" }}>
                  <option value="">— Select Officer —</option>
                  {OFFICERS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Department</label>
                <select value={form.dept} onChange={e=>setForm(p=>({...p,dept:e.target.value}))} style={{ ...inputStyle, cursor:"pointer" }}>
                  <option value="">— Select Department —</option>
                  {["Postal Operations","Vigilance & Inspection","Customer Grievance Cell","Regional Administration","IT & Digital Services"].map(d=><option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Priority Level</label>
                <div style={{ display:"flex", gap:6 }}>
                  {["LOW","MEDIUM","HIGH","CRITICAL"].map(p => {
                    const pk = C.priority[p];
                    const active = form.priority===p;
                    return (
                      <button key={p} onClick={()=>setForm(f=>({...f,priority:p}))} style={{ flex:1, padding:"6px 0", borderRadius:8, fontSize:10, fontWeight:800, cursor:"pointer", transition:"all .15s",
                        background: active ? tok(pk).dim : "rgba(255,255,255,.04)",
                        border: active ? `1px solid ${tok(pk).border}` : `1px solid ${C.border}`,
                        color: active ? tok(pk).text : C.textMuted }}>
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Investigation Notes</label>
                <textarea value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} rows={3} placeholder="Enter investigation scope and instructions…" style={{ ...inputStyle, resize:"none" }}/>
              </div>
              <div>
                <label style={labelStyle}>Resolution Deadline</label>
                <input type="date" value={form.deadline} onChange={e=>setForm(p=>({...p,deadline:e.target.value}))} style={inputStyle}/>
              </div>
            </div>

            {/* footer */}
            <div style={{ padding:"12px 20px", borderTop:`1px solid ${C.border}`, display:"flex", gap:8 }}>
              <button onClick={handleAssign} disabled={!form.officer} style={{ flex:1, padding:"10px 0", borderRadius:12, border:"none", cursor: form.officer?"pointer":"not-allowed", fontSize:12, fontWeight:800, color:"#fff", background:`linear-gradient(90deg, ${tok("blue").solid}, ${tok("violet").solid})`, opacity: form.officer?1:.4, display:"flex", alignItems:"center", justifyContent:"center", gap:6, transition:"opacity .15s" }}>
                <UserPlus style={{width:13,height:13}}/> Assign Officer
              </button>
              <button onClick={()=>setModalOpen(false)} style={{ padding:"10px 20px", borderRadius:12, border:`1px solid ${C.border}`, background:"rgba(255,255,255,.05)", color:C.textSecondary, cursor:"pointer", fontSize:12, fontWeight:700 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}