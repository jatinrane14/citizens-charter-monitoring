import { useState, useMemo } from "react";

const INITIAL_DELIVERIES = [
  { id: "DOP-001", receiver: "Arjun Sharma", address: "14, Nehru Nagar, Bhopal, MP 462001", status: "In Transit", updated: "2026-05-03 09:14 AM" },
  { id: "DOP-002", receiver: "Priya Menon", address: "7B, MG Road, Indore, MP 452001", status: "Out for Delivery", updated: "2026-05-03 10:02 AM" },
  { id: "DOP-003", receiver: "Ramesh Gupta", address: "22, Civil Lines, Jabalpur, MP 482001", status: "Delivered", updated: "2026-05-03 08:45 AM" },
  { id: "DOP-004", receiver: "Sunita Patel", address: "9, Vijay Nagar, Indore, MP 452010", status: "Delayed", updated: "2026-05-02 05:30 PM" },
  { id: "DOP-005", receiver: "Deepak Verma", address: "55, Saket Nagar, Bhopal, MP 462024", status: "Pending", updated: "2026-05-03 07:00 AM" },
  { id: "DOP-006", receiver: "Kavita Joshi", address: "3, Ring Road, Gwalior, MP 474001", status: "In Transit", updated: "2026-05-03 09:50 AM" },
  { id: "DOP-007", receiver: "Manoj Tiwari", address: "18, Napier Town, Jabalpur, MP 482002", status: "Dispatched", updated: "2026-05-03 06:30 AM" },
  { id: "DOP-008", receiver: "Anita Singh", address: "11, Rajwada Area, Indore, MP 452007", status: "Out for Delivery", updated: "2026-05-03 10:30 AM" },
];

const STATUS_OPTIONS = ["Dispatched", "In Transit", "Out for Delivery", "Delivered", "Delayed"];

const STATUS_META = {
  Dispatched:      { bg: "bg-slate-100 text-slate-700 border-slate-200", dot: "bg-slate-400", bar: "bg-slate-400" },
  "In Transit":    { bg: "bg-amber-50 text-amber-700 border-amber-200",  dot: "bg-amber-400", bar: "bg-amber-400" },
  "Out for Delivery": { bg: "bg-blue-50 text-blue-700 border-blue-200",  dot: "bg-blue-500",  bar: "bg-blue-500" },
  Delivered:       { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", bar: "bg-emerald-500" },
  Delayed:         { bg: "bg-red-50 text-red-700 border-red-200",        dot: "bg-red-500",   bar: "bg-red-500" },
  Pending:         { bg: "bg-violet-50 text-violet-700 border-violet-200", dot: "bg-violet-400", bar: "bg-violet-400" },
};

const STATUS_ORDER = ["Dispatched", "In Transit", "Out for Delivery", "Delivered", "Delayed", "Pending"];

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META["Pending"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${meta.bg} whitespace-nowrap`}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`}></span>
      {status}
    </span>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex flex-col gap-1 hover:shadow-md transition-shadow duration-200">
      <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">{label}</span>
      <span className={`text-3xl font-black ${color}`}>{value}</span>
    </div>
  );
}

export default function StaffDashboard() {
  const [deliveries, setDeliveries] = useState(
    INITIAL_DELIVERIES.map(d => ({ ...d, pendingStatus: d.status, saving: false, saved: false }))
  );
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleStatusChange = (id, val) => {
    setDeliveries(prev => prev.map(d => d.id === id ? { ...d, pendingStatus: val, saved: false } : d));
  };

  const handleUpdate = (id) => {
    setDeliveries(prev => prev.map(d => d.id === id ? { ...d, saving: true } : d));
    setTimeout(() => {
      const now = new Date();
      const time = now.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
      setDeliveries(prev => prev.map(d =>
        d.id === id ? { ...d, status: d.pendingStatus, saving: false, saved: true, updated: time } : d
      ));
      setTimeout(() => setDeliveries(prev => prev.map(d => d.id === id ? { ...d, saved: false } : d)), 2500);
    }, 800);
  };

  const stats = useMemo(() => ({
    total: deliveries.length,
    delivered: deliveries.filter(d => d.status === "Delivered").length,
    delayed: deliveries.filter(d => d.status === "Delayed").length,
    active: deliveries.filter(d => ["In Transit", "Out for Delivery", "Dispatched"].includes(d.status)).length,
  }), [deliveries]);

  const filtered = useMemo(() => {
    let data = deliveries.filter(d =>
      (filterStatus === "All" || d.status === filterStatus) &&
      (d.id.toLowerCase().includes(search.toLowerCase()) ||
       d.receiver.toLowerCase().includes(search.toLowerCase()))
    );
    if (sortBy === "status") {
      data = [...data].sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status));
    } else if (sortBy === "name") {
      data = [...data].sort((a, b) => a.receiver.localeCompare(b.receiver));
    }
    return data;
  }, [deliveries, search, sortBy, filterStatus]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Subtle top accent stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-sky-400 to-teal-400"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Header ── */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">Department of Posts</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Postal Service Dashboard</h1>
              <p className="text-sm text-slate-500 mt-0.5">Manage and update delivery items in real-time</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-400">Officer on duty</p>
              <p className="text-sm font-semibold text-slate-700">Rajesh Kumar · MP Zone</p>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          <StatCard label="Total Items"  value={stats.total}     color="text-slate-800" />
          <StatCard label="Active"       value={stats.active}    color="text-sky-600" />
          <StatCard label="Delivered"    value={stats.delivered} color="text-emerald-600" />
          <StatCard label="Delayed"      value={stats.delayed}   color="text-red-500" />
        </div>

        {/* ── Toolbar ── */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm px-4 py-3 mb-4 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by ID or name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-slate-700 placeholder-slate-400"
            />
          </div>
          {/* Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
            >
              <option value="All">All statuses</option>
              {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
              <option>Pending</option>
            </select>
            <svg className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
            >
              <option value="default">Default order</option>
              <option value="status">Sort by status</option>
              <option value="name">Sort by name</option>
            </select>
            <svg className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* ── Desktop Table ── */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-20 text-center">
            <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5" />
            </svg>
            <p className="text-slate-500 font-medium">No delivery items found</p>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tracking ID</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Receiver</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Address</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden xl:table-cell">Last Updated</th>
                    <th className="px-5 py-3.5 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((d) => {
                    const meta = STATUS_META[d.status] || STATUS_META["Pending"];
                    const isDirty = d.pendingStatus !== d.status;
                    return (
                      <tr key={d.id} className="hover:bg-slate-50/60 transition-colors duration-150 group">
                        {/* Left status bar */}
                        <td className="px-5 py-4 relative">
                          <div className={`absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity ${meta.bar}`}></div>
                          <span className="font-mono font-semibold text-slate-700 text-xs tracking-wide">{d.id}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-medium text-slate-800">{d.receiver}</span>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <span className="text-slate-500 text-xs leading-relaxed">{d.address}</span>
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={d.status} />
                        </td>
                        <td className="px-5 py-4 hidden xl:table-cell">
                          <span className="text-slate-400 text-xs">{d.updated}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 justify-center">
                            <div className="relative">
                              <select
                                value={d.pendingStatus}
                                onChange={e => handleStatusChange(d.id, e.target.value)}
                                className={`appearance-none text-xs border rounded-lg pl-3 pr-7 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer transition-all ${isDirty ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-slate-50 text-slate-700"}`}
                              >
                                {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                              </select>
                              <svg className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                            <button
                              onClick={() => handleUpdate(d.id)}
                              disabled={d.saving || !isDirty}
                              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                                d.saved
                                  ? "bg-emerald-500 text-white"
                                  : isDirty
                                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 active:scale-95"
                                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
                              }`}
                            >
                              {d.saving ? (
                                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                              ) : d.saved ? (
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9" />
                                </svg>
                              )}
                              {d.saving ? "Saving" : d.saved ? "Saved!" : "Update"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((d) => {
                const isDirty = d.pendingStatus !== d.status;
                return (
                  <div key={d.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs font-bold text-slate-600 tracking-wide">{d.id}</span>
                        <p className="font-semibold text-slate-800 mt-0.5">{d.receiver}</p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{d.address}</p>
                      </div>
                      <StatusBadge status={d.status} />
                    </div>
                    <p className="text-xs text-slate-400">Updated: {d.updated}</p>
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                      <div className="relative flex-1">
                        <select
                          value={d.pendingStatus}
                          onChange={e => handleStatusChange(d.id, e.target.value)}
                          className={`w-full appearance-none text-xs border rounded-lg pl-3 pr-7 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${isDirty ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-slate-50 text-slate-700"}`}
                        >
                          {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                        </select>
                        <svg className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <button
                        onClick={() => handleUpdate(d.id)}
                        disabled={d.saving || !isDirty}
                        className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                          d.saved
                            ? "bg-emerald-500 text-white"
                            : isDirty
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        {d.saving ? "Saving…" : d.saved ? "✓ Saved!" : "Update"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Footer row */}
        <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filtered.length} of {deliveries.length} items</span>
          <span>Last sync: just now</span>
        </div>
      </div>
    </div>
  );
}