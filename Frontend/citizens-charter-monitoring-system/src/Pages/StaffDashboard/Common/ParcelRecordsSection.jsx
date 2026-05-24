import { useState, useMemo,useEffect } from "react";
import {
  Search, SlidersHorizontal, RefreshCw, Eye, Pencil, MapPin,
  Package, ChevronLeft, ChevronRight, ArrowUpDown, TrendingUp,
  Clock, CheckCircle2, AlertTriangle, Truck, Box, Circle
} from "lucide-react";

// ─── Dummy Data Generation ───────────────────────────────────────────────────
const BRANCHES = [
  "Mumbai GPO", "Delhi Sorting Hub", "Chennai Main", "Kolkata Central",
  "Bengaluru North", "Hyderabad South", "Pune East", "Ahmedabad West",
  "Jaipur HQ", "Lucknow Central", "Indore City", "Bhopal Main",
  "Nagpur Division", "Surat Branch", "Coimbatore East",
];
const AGENTS = [
  "Ravi Kumar", "Sunita Sharma", "Mohan Verma", "Priya Nair",
  "Arjun Patel", "Neha Singh", "Vijay Reddy", "Meena Joshi",
  "Suresh Das", "Kavita Rao", "Deepak Tiwari", "Anita Gupta",
  "Ramesh Yadav", "Pooja Mehta", "Ashok Mishra",
];
const PARCEL_TYPES = ["Standard", "Express", "Registered", "Speed Post", "Parcel Post", "E-Commerce"];
const STATUSES = ["BOOKED", "PROCESSING", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED", "DELAYED"];
const SENDER_NAMES = [
  "Aditya Enterprises", "B.K. Logistics", "Chandni Traders", "Dev Exports",
  "Evergreen Pvt Ltd", "Fatima Stores", "Ganesh Distributors", "Hari & Sons",
  "Infra Supplies Co.", "Jyoti Medical", "Kumar Textiles", "Lalitha Silks",
  "Manish Auto Parts", "Nisha Exports", "Om Packaging",
];
const RECEIVER_NAMES = [
  "Pradeep Mathur", "Qureshi Brothers", "Ritu Verma", "Santosh Iyer",
  "Tapan Bose", "Uma Krishnan", "Vivek Sharma", "Wani Associates",
  "Xavier Tech", "Yamini Das", "Zaheer Ansari", "Abha Pandey",
  "Bharat Rajan", "Chitra Menon", "Dhanraj Shetty",
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randDate = (start, end) => {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split("T")[0];
};


// ─── Config ───────────────────────────────────────────────────────────────────
const PAGE_SIZE = 50;

const STATUS_CONFIG = {
  BOOKED:            { label: "Booked",            color: "bg-slate-100 text-slate-600 border-slate-200",     dot: "bg-slate-400",  icon: Box },
  PROCESSING:        { label: "Processing",         color: "bg-amber-50 text-amber-700 border-amber-200",      dot: "bg-amber-400",  icon: Clock },
  IN_TRANSIT:        { label: "In Transit",          color: "bg-blue-50 text-blue-700 border-blue-200",         dot: "bg-blue-500",   icon: Truck },
  OUT_FOR_DELIVERY:  { label: "Out for Delivery",   color: "bg-violet-50 text-violet-700 border-violet-200",   dot: "bg-violet-500", icon: MapPin },
  DELIVERED:         { label: "Delivered",           color: "bg-emerald-50 text-emerald-700 border-emerald-200",dot: "bg-emerald-500",icon: CheckCircle2 },
  DELAYED:           { label: "Delayed",             color: "bg-rose-50 text-rose-700 border-rose-200",         dot: "bg-rose-500",   icon: AlertTriangle },
};

const SUMMARY_STATS = Object.entries(STATUS_CONFIG).map(([key, cfg]) => ({
  key,
  ...cfg,
}));

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.BOOKED;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function ActionButtons({ row, onView, onEdit, onTrack }) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onView(row)}
        title="View Details"
        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
      >
        <Eye size={14} />
      </button>
      <button
        onClick={() => onEdit(row)}
        title="Edit Record"
        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
      >
        <Pencil size={14} />
      </button>
      <button
        onClick={() => onTrack(row)}
        title="Track Parcel"
        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
      >
        <MapPin size={14} />
      </button>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg leading-none">✕</button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ParcelRecordsSection() {
  const [DATA,setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [modal, setModal] = useState({ open: false, type: "", row: null });
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {

  fetch(
    "http://localhost:8080/api/v1/parcel/list",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":
          `Bearer ${localStorage.getItem("token")}`
      }
    }
  )
    .then(async (response) => {

      if (!response.ok) {

        const error =
          await response.text();

        throw new Error(error);
      }

      return response.json();
    })
    .then((data) => {

      console.log(data);

      const formattedData =
        data.map((item) => ({

          id: item.id,

          trackingId: item.trackingId,

          sender: item.senderName,

          receiver: item.receiverName,

          parcelType: item.parcelType,

          branch: item.branch
            ? item.branch.branchName
            : "Not Assigned",

          agent: item.createdBy
            ? item.createdBy.userName
            : "Not Assigned",

          status: item.status,

          bookingDate: item.createdAt
            ? item.createdAt.split("T")[0]
            : "-",

          expectedDelivery:
            item.expectedDeliveryDate
              ? item.expectedDeliveryDate
              : "-",
        }));

      setData(formattedData);

    })
    .catch((err) => {

      console.log(err);

    });

}, []);
  // Filtered + sorted data
  const processed = useMemo(() => {

  let data = [...DATA];

  // Filter
  if (filter !== "ALL") {

    data = data.filter(
      (r) => r.status === filter
    );
  }

  // Search
  if (search.trim()) {

    const q =
      search.toLowerCase();

    data = data.filter((r) =>

      r.trackingId
        ?.toLowerCase()
        .includes(q)

      ||

      r.sender
        ?.toLowerCase()
        .includes(q)

      ||

      r.receiver
        ?.toLowerCase()
        .includes(q)

      ||

      r.branch
        ?.toLowerCase()
        .includes(q)

      ||

      r.agent
        ?.toLowerCase()
        .includes(q)
    );
  }

  // Sorting
  if (sortField) {

    data.sort((a, b) => {

      const av =
        a[sortField] || "";

      const bv =
        b[sortField] || "";

      return sortDir === "asc"
        ? av.toString()
            .localeCompare(
              bv.toString()
            )

        : bv.toString()
            .localeCompare(
              av.toString()
            );
    });
  }

  return data;

}, [
  DATA,
  search,
  filter,
  sortField,
  sortDir,
  refreshKey
]);
  const visible = processed.slice(0, visibleCount);
  const hasMore = visibleCount < processed.length;

  // Status summary counts
  const counts = useMemo(() =>
  DATA.reduce((acc, r) => {

    acc[r.status] =
      (acc[r.status] || 0) + 1;

    return acc;

  }, {}),
[DATA]);

  const toggleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const handleRefresh = () => {
    setSearch("");
    setFilter("ALL");
    setVisibleCount(PAGE_SIZE);
    setSortField(null);
    setRefreshKey((k) => k + 1);
  };

  const SortHeader = ({ field, label }) => (
    <button
      onClick={() => toggleSort(field)}
      className="flex items-center gap-1 group"
    >
      {label}
      <ArrowUpDown size={12} className={`transition-colors ${sortField === field ? "text-blue-600" : "text-slate-300 group-hover:text-slate-500"}`} />
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">

      {/* ── Status Summary Chips ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
        {SUMMARY_STATS.map(({ key, label, color, dot, icon: Icon }) => (
          <button
            key={key}
            onClick={() => { setFilter(f => f === key ? "ALL" : key); setVisibleCount(PAGE_SIZE); }}
            className={`flex flex-col items-start gap-1 px-3 py-2.5 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all cursor-pointer ${filter === key ? "ring-2 ring-blue-500 ring-offset-1" : ""}`}
          >
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${dot}`} />
              <span className="text-xs text-slate-500 font-medium leading-tight">{label}</span>
            </div>
            <span className="text-lg font-bold text-slate-800 leading-none">{counts[key] || 0}</span>
          </button>
        ))}
      </div>

      {/* ── Main Card ─────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5 mb-0.5">
              <div className="p-1.5 bg-blue-600 rounded-lg">
                <Package size={16} className="text-white" />
              </div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Parcel Records</h2>
            </div>
            <p className="text-xs text-slate-500 ml-9">Monitor and manage all parcel booking and delivery records.</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-56">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search tracking, name, branch…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <SlidersHorizontal size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                value={filter}
                onChange={(e) => { setFilter(e.target.value); setVisibleCount(PAGE_SIZE); }}
                className="pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="ALL">All Status</option>
                {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>

            {/* Refresh */}
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              title="Reset filters"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Result meta */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-700">{visible.length}</span> of{" "}
            <span className="font-semibold text-slate-700">{processed.length}</span> records
            {filter !== "ALL" && (
              <span className="ml-1.5 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {STATUS_CONFIG[filter]?.label}
              </span>
            )}
          </span>
          {search && (
            <button onClick={() => setSearch("")} className="text-xs text-blue-600 hover:underline">
              Clear search
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="max-h-[62vh] overflow-y-auto">
            <table className="w-full text-xs border-collapse min-w-[1100px]">
              <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200">
                <tr>
                  {[
                    { label: "#", w: "w-10" },
                    { label: <SortHeader field="trackingId" label="Tracking ID" />, w: "w-36" },
                    { label: <SortHeader field="sender" label="Sender" />, w: "w-36" },
                    { label: <SortHeader field="receiver" label="Receiver" />, w: "w-36" },
                    { label: "Type", w: "w-24" },
                    { label: <SortHeader field="branch" label="Branch" />, w: "w-36" },
                    { label: "Agent", w: "w-32" },
                    { label: "Status", w: "w-32" },
                    { label: <SortHeader field="bookingDate" label="Booked" />, w: "w-24" },
                    { label: <SortHeader field="expectedDelivery" label="Expected" />, w: "w-24" },
                    { label: "Actions", w: "w-20" },
                  ].map((col, i) => (
                    <th
                      key={i}
                      className={`${col.w} text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide whitespace-nowrap`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {visible.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center py-16 text-slate-400">
                      <Package size={32} className="mx-auto mb-2 opacity-30" />
                      <p className="font-medium">No records found</p>
                      <p className="text-xs mt-1">Try adjusting search or filters</p>
                    </td>
                  </tr>
                ) : (
                  visible.map((row, idx) => (
                    <tr
                      key={row.id}
                      className="hover:bg-blue-50/40 transition-colors group cursor-default"
                    >
                      <td className="px-4 py-3 text-slate-400 font-medium">{idx + 1}</td>
                      <td className="px-4 py-3">
                        <span className="font-mono font-semibold text-blue-700 tracking-tight text-[11px] bg-blue-50 px-2 py-0.5 rounded">
                          {row.trackingId}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap">{row.sender}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.receiver}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-medium">
                          {row.parcelType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.branch}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.agent}</td>
                      <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap font-mono text-[11px]">{row.bookingDate}</td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                        <span className={row.status === "DELAYED" ? "text-rose-600 font-semibold" : ""}>
                          {row.expectedDelivery}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <ActionButtons
                          row={row}
                          onView={(r) => setModal({ open: true, type: "view", row: r })}
                          onEdit={(r) => setModal({ open: true, type: "edit", row: r })}
                          onTrack={(r) => setModal({ open: true, type: "track", row: r })}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer / Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
          <span className="text-xs text-slate-500">
            {processed.length} total record{processed.length !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-2">
            {visibleCount > PAGE_SIZE && (
              <button
                onClick={() => setVisibleCount((c) => Math.max(PAGE_SIZE, c - PAGE_SIZE))}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft size={13} /> Show Less
              </button>
            )}
            {hasMore && (
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
              >
                Load More Records <ChevronRight size={13} />
              </button>
            )}
            {!hasMore && processed.length > 0 && (
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-500" /> All records loaded
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Modals ────────────────────────────────────────────────────────────── */}
      {/* View Modal */}
      <Modal
        open={modal.open && modal.type === "view"}
        onClose={() => setModal({ open: false, type: "", row: null })}
        title="Parcel Details"
      >
        {modal.row && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg">
                {modal.row.trackingId}
              </span>
              <StatusBadge status={modal.row.status} />
            </div>
            {[
              ["Sender", modal.row.sender],
              ["Receiver", modal.row.receiver],
              ["Parcel Type", modal.row.parcelType],
              ["Branch", modal.row.branch],
              ["Assigned Agent", modal.row.agent],
              ["Booking Date", modal.row.bookingDate],
              ["Expected Delivery", modal.row.expectedDelivery],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center text-sm py-1.5 border-b border-slate-50">
                <span className="text-slate-500 text-xs">{k}</span>
                <span className="text-slate-800 font-medium text-xs">{v}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={modal.open && modal.type === "edit"}
        onClose={() => setModal({ open: false, type: "", row: null })}
        title="Edit Parcel Record"
      >
        {modal.row && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700">
              Editing: <span className="font-bold">{modal.row.trackingId}</span>
            </div>
            {["sender", "receiver", "branch", "agent"].map((field) => (
              <div key={field}>
                <label className="block text-xs font-medium text-slate-600 mb-1 capitalize">{field}</label>
                <input
                  defaultValue={modal.row[field]}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
              <select
                defaultValue={modal.row.status}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              >
                {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        )}
      </Modal>

      {/* Track Modal */}
      <Modal
        open={modal.open && modal.type === "track"}
        onClose={() => setModal({ open: false, type: "", row: null })}
        title="Track Parcel"
      >
        {modal.row && (
          <div>
            <div className="text-center mb-6">
              <p className="font-mono text-sm font-bold text-blue-700 bg-blue-50 inline-block px-4 py-2 rounded-lg mb-2">
                {modal.row.trackingId}
              </p>
              <div><StatusBadge status={modal.row.status} /></div>
            </div>
            {/* Timeline */}
            <div className="space-y-0">
              {["BOOKED", "PROCESSING", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED"].map((step, i) => {
                const stepOrder = ["BOOKED","PROCESSING","IN_TRANSIT","OUT_FOR_DELIVERY","DELIVERED","DELAYED"];
                const currentIdx = stepOrder.indexOf(modal.row.status);
                const isDelayed = modal.row.status === "DELAYED";
                const done = !isDelayed && i <= (currentIdx === -1 ? -1 : currentIdx);
                const active = !isDelayed && i === currentIdx;
                const cfg = STATUS_CONFIG[step];
                return (
                  <div key={step} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                        done ? "bg-blue-600 border-blue-600" : "bg-white border-slate-200"
                      }`}>
                        {done
                          ? <CheckCircle2 size={14} className="text-white" />
                          : <Circle size={10} className="text-slate-300" />
                        }
                      </div>
                      {i < 4 && <div className={`w-0.5 h-6 ${done ? "bg-blue-300" : "bg-slate-100"}`} />}
                    </div>
                    <div className={`pb-4 pt-1 ${active ? "text-blue-700" : done ? "text-slate-700" : "text-slate-400"}`}>
                      <p className={`text-xs font-semibold`}>{cfg.label}</p>
                      {active && <p className="text-[11px] mt-0.5 text-blue-500">Current status • {modal.row.branch}</p>}
                    </div>
                  </div>
                );
              })}
              {modal.row.status === "DELAYED" && (
                <div className="flex items-center gap-2 mt-1 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                  <AlertTriangle size={14} className="text-rose-500" />
                  <span className="text-xs text-rose-700 font-medium">Parcel is delayed. Expected: {modal.row.expectedDelivery}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}