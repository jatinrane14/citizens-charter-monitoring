import { useState, useEffect,useContext } from "react";
import {
  Package, Search, User, MapPin, Phone, Mail, AtSign,
  Truck, CreditCard, Hash, Calendar, ClipboardList,
  ChevronDown, RotateCcw, Save, CheckCircle2, Info,
  Building2, Weight, BadgeIndianRupee, FileText, Zap,
  X, UserCheck, AlertCircle
} from "lucide-react";
import { MyContext } from '../../../Context';
import {toast} from 'react-toastify'

const PARCEL_TYPES = ["Document", "Electronics", "Fragile", "Clothing", "Other"];
const DELIVERY_TYPES = ["Standard", "Speed Post", "Express"];
const PAYMENT_METHODS = ["Cash", "UPI", "Card"];
const STATUSES = ["BOOKED", "PROCESSING"];
const SEARCH_BY = ["Phone Number", "Email", "Username"];
const STATES = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Puducherry", "Chandigarh"];


const genTrackingId = () => "DOP" + Date.now().toString().slice(-8).toUpperCase();

const INITIAL = {
  citizenQuery: "", searchBy: "Phone Number", linkedCitizen: null,
  senderName: "", senderPhone: "", senderAddress: "", senderCity: "", senderState: "", senderPincode: "",
  receiverName: "", receiverPhone: "", receiverAddress: "", receiverCity: "", receiverState: "", receiverPincode: "",
  parcelType: "", weight: "", deliveryType: "Standard", parcelValue: "", expectedDate: "", specialInstructions: "",
  bookingAmount: "", paymentMethod: "Cash", status: "BOOKED", branch: "", clerk: "",
};

export default function NewParcelEntry({employee}) {
    const {isLogin,setIsLogin,user,setUser} = useContext(MyContext);
  const [CITIZENS, setCitizen] = useState(null);
  const [BRANCHES, setBranches] = useState(null);
  const [DELIVERYMAN, setDELIVERYMAN] = useState(null);
  console.log("From Form")
  console.log(employee)
  useEffect(() => {
    fetch(`http://localhost:8080/api/citizen/users`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (!data) {
        throw new Error("Server Error")
      }
      console.log(data)
      setCitizen(data);
    }).catch((err) => {
      toast.error(err)
    })
    fetch(`http://localhost:8080/api/branch/option/branches`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((data) => {
      if (!data) {
        throw new Error("Server Error")
      }
      setBranches(data)
      console.log("Branches")
      console.log(data)
    }).catch((err) => {
      toast.error(err)
    })
    fetch(`http://localhost:8080/api/postalstaff/deliveryman`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((data) => {
      if (!data) {
        throw new Error("Server Error")
      }
      setDELIVERYMAN(data)
      console.log("delivery maN")
      console.log(data)
    }).catch((err) => {
      toast.error(err)
    })
  }, [])
  console.log(CITIZENS)

  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [trackingId] = useState(genTrackingId);
  const [searchResult, setSearchResult] = useState(null); // null | "found" | "not_found"
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const set = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  // Auto-fill booking amount based on delivery type
  useEffect(() => {
    const amounts = { Standard: "45", "Speed Post": "85", Express: "150" };
    setForm((p) => ({ ...p, bookingAmount: amounts[p.deliveryType] || "" }));
  }, [form.deliveryType]);

  const handleSearch = () => {
    if (!form.citizenQuery.trim()) return;
    const q = form.citizenQuery.trim().toLowerCase();
    const keyMap = { "Phone Number": "phone", Email: "email", Username: "username" };
    const key = keyMap[form.searchBy];
    const found = CITIZENS.find((c) => c[key].toLowerCase().includes(q));
    if (found) {
      setSearchResult("found");
      setForm((p) => ({
        ...p, linkedCitizen: found,
        senderName: found.name, senderPhone: found.phone,
        senderAddress: found.address, senderCity: found.city,
        senderState: found.state, senderPincode: found.pincode,
      }));
    } else {
      setSearchResult("not_found");
    }
  };

  const unlinkCitizen = () => {
    setForm((p) => ({ ...p, linkedCitizen: null, citizenQuery: "" }));
    setSearchResult(null);
  };

  const validate = () => {
    const e = {};
    if (!form.senderName.trim()) e.senderName = "Required";
    // if (!form.senderPhone.match(/^[6-9]\d{9}$/)) e.senderPhone = "Valid 10-digit number required";
    if (!form.senderAddress.trim()) e.senderAddress = "Required";
    if (!form.senderCity.trim()) e.senderCity = "Required";
    if (!form.senderState) e.senderState = "Required";
    if (!form.senderPincode.match(/^\d{6}$/)) e.senderPincode = "Valid 6-digit pincode";
    if (!form.receiverName.trim()) e.receiverName = "Required";
    if (!form.receiverPhone.match(/^[6-9]\d{9}$/)) e.receiverPhone = "Valid 10-digit number required";
    if (!form.receiverAddress.trim()) e.receiverAddress = "Required";
    if (!form.receiverCity.trim()) e.receiverCity = "Required";
    if (!form.receiverState) e.receiverState = "Required";
    if (!form.receiverPincode.match(/^\d{6}$/)) e.receiverPincode = "Valid 6-digit pincode";
    if (!form.parcelType) e.parcelType = "Required";
    if (!form.weight || isNaN(form.weight)) e.weight = "Valid weight required";
    if (!form.bookingAmount || isNaN(form.bookingAmount)) e.bookingAmount = "Required";
    if (!form.branch) e.branch = "Required";
    if (!form.clerk) e.clerk = "Required";
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const data = {
      trackingId: trackingId,
      parcelType: form.parcelType,
      deliveryType: form.deliveryType,
      status: form.status,
      senderName: form.senderName,
      senderPhone: form.senderPhone,
      senderAddress: form.senderAddress,
      senderCity: form.senderCity,
      senderState: form.senderState,
      senderPincode: form.senderPincode,

      receiverName: form.receiverName,
      receiverPhone: form.receiverPhone,
      receiverAddress: form.receiverAddress,
      receiverCity: form.receiverCity,
      receiverState: form.receiverState,
      receiverPincode: form.receiverPincode,

      weight: form.weight,
      parcelValue: form.parcelValue,
      specialInstructions: form.specialInstructions,

      bookingAmount: form.bookingAmount,
      paymentMethod: form.paymentMethod,

      expectedDeliveryDate: form.expectedDeliveryDate,

      citizen: {
        id:form?.linkedCitizen?.id
      },
      createdBy: {
        employeeId:employee?.employeeId
      },
      branch: {
        branchCode:employee?.branchCode
      }
    };
    console.log("Parcel Entry")
    console.log(data)
    fetch("http://localhost:8080/api/v1/parcel/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(data)
    }).then(async (response) => {
        if (!response.ok) {
          const error =
            await response.text();
          throw new Error(error);
        }
        return response.json();
      })
      .then((result) => {
        console.log("Parcel Created");
        console.log(result);
        toast.success("Parcel Added Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
    // setSubmitted(true);
  };

  const handleReset = () => { setForm(INITIAL); setErrors({}); setSearchResult(null); setSubmitted(false); };

  // ── Shared styles ──────────────────────────────────────────────────────────
  const inp = (k) =>
    `w-full border rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-150
     focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:bg-white
     ${errors[k] ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`;

  if (submitted) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 border-4 border-green-200 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Parcel Booked!</h2>
        <p className="text-gray-500 text-sm mb-5">Your parcel has been successfully registered.</p>
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-6">
          <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider mb-1">Tracking ID</p>
          <p className="text-2xl font-black text-blue-700 tracking-widest">{trackingId}</p>
        </div>
        <div className="text-left text-sm text-gray-600 space-y-1.5 mb-7">
          <div className="flex justify-between"><span className="text-gray-400">Sender</span><span className="font-medium">{form.senderName}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Receiver</span><span className="font-medium">{form.receiverName}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Delivery</span><span className="font-medium">{form.deliveryType}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Amount</span><span className="font-medium text-green-600">₹{form.bookingAmount}</span></div>
        </div>
        <button onClick={handleReset} className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors">
          Book Another Parcel
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
              <Package size={20} className="text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-800 leading-tight">New Parcel Entry</h1>
              <p className="text-xs text-gray-500 mt-0.5">Create parcel bookings for registered and walk-in citizens.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
              <Calendar size={14} className="text-gray-400" />
              <span className="text-xs font-semibold text-gray-600">{today}</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-600 rounded-xl px-4 py-2 shadow-md shadow-blue-200">
              <Hash size={13} className="text-blue-200" />
              <span className="text-xs font-bold text-white tracking-wider">{trackingId}</span>
            </div>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ── LEFT: Form ── */}
          <div className="xl:col-span-2 space-y-5">

            {/* Section 1: Citizen Linking */}
            <Card>
              <SectionTitle icon={UserCheck} title="Citizen Linking" subtitle="Optional — link a registered citizen or leave blank for walk-in." />

              <div className="flex flex-col sm:flex-row gap-3 mb-3">
                <div className="flex-1">
                  <select className={`${inp("searchBy")} appearance-none`} value={form.searchBy} onChange={set("searchBy")}>
                    {SEARCH_BY.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex-[2] relative">
                  <input
                    className={inp("citizenQuery")}
                    placeholder={`Search by ${form.searchBy.toLowerCase()}…`}
                    value={form.citizenQuery}
                    onChange={set("citizenQuery")}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <button onClick={handleSearch} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shrink-0">
                  <Search size={15} /> Search
                </button>
              </div>

              <p className="flex items-center gap-1.5 text-xs text-gray-400">
                <Info size={12} /> Leave blank for walk-in / offline citizens.
              </p>

              {searchResult === "found" && form.linkedCitizen && (
                <div className="mt-3 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <UserCheck size={16} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-green-800">{form.linkedCitizen.name}</p>
                    <p className="text-xs text-green-600">{form.linkedCitizen.id} · {form.linkedCitizen.phone}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-green-200 text-green-700 text-[10px] font-bold uppercase">Linked</span>
                  <button onClick={unlinkCitizen} className="p-1 rounded-lg hover:bg-green-100 text-green-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              )}
              {searchResult === "not_found" && (
                <div className="mt-3 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  <AlertCircle size={15} className="text-amber-500 shrink-0" />
                  <p className="text-xs text-amber-700 font-medium">No citizen found. You can still proceed with manual entry.</p>
                </div>
              )}
            </Card>

            {/* Section 2: Sender Info */}
            <Card>
              <SectionTitle icon={User} title="Sender Information" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" error={errors.senderName} required>
                  <input className={inp("senderName")} placeholder="Ramesh Kumar" value={form.senderName} onChange={set("senderName")} />
                </Field>
                <Field label="Phone Number" error={errors.senderPhone} required>
                  <input type="tel" maxLength={10} className={inp("senderPhone")} placeholder="9XXXXXXXXX" value={form.senderPhone} onChange={set("senderPhone")} />
                </Field>
                <Field label="Address" error={errors.senderAddress} required className="sm:col-span-2">
                  <input className={inp("senderAddress")} placeholder="House No., Street, Locality" value={form.senderAddress} onChange={set("senderAddress")} />
                </Field>
                <Field label="City" error={errors.senderCity} required>
                  <input className={inp("senderCity")} placeholder="Bhopal" value={form.senderCity} onChange={set("senderCity")} />
                </Field>
                <Field label="State" error={errors.senderState} required>
                  <select className={`${inp("senderState")} appearance-none`} value={form.senderState} onChange={set("senderState")}>
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Pincode" error={errors.senderPincode} required>
                  <input maxLength={6} className={inp("senderPincode")} placeholder="462001" value={form.senderPincode} onChange={set("senderPincode")} />
                </Field>
              </div>
            </Card>

            {/* Section 3: Receiver Info */}
            <Card>
              <SectionTitle icon={MapPin} title="Receiver Information" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" error={errors.receiverName} required>
                  <input className={inp("receiverName")} placeholder="Priya Singh" value={form.receiverName} onChange={set("receiverName")} />
                </Field>
                <Field label="Phone Number" error={errors.receiverPhone} required>
                  <input type="tel" maxLength={10} className={inp("receiverPhone")} placeholder="9XXXXXXXXX" value={form.receiverPhone} onChange={set("receiverPhone")} />
                </Field>
                <Field label="Address" error={errors.receiverAddress} required className="sm:col-span-2">
                  <input className={inp("receiverAddress")} placeholder="House No., Street, Locality" value={form.receiverAddress} onChange={set("receiverAddress")} />
                </Field>
                <Field label="City" error={errors.receiverCity} required>
                  <input className={inp("receiverCity")} placeholder="Indore" value={form.receiverCity} onChange={set("receiverCity")} />
                </Field>
                <Field label="State" error={errors.receiverState} required>
                  <select className={`${inp("receiverState")} appearance-none`} value={form.receiverState} onChange={set("receiverState")}>
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Pincode" error={errors.receiverPincode} required>
                  <input maxLength={6} className={inp("receiverPincode")} placeholder="452001" value={form.receiverPincode} onChange={set("receiverPincode")} />
                </Field>
              </div>
            </Card>

            {/* Section 4: Parcel Details */}
            <Card>
              <SectionTitle icon={Package} title="Parcel Details" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Parcel Type" error={errors.parcelType} required>
                  <select className={`${inp("parcelType")} appearance-none`} value={form.parcelType} onChange={set("parcelType")}>
                    <option value="">Select Type</option>
                    {PARCEL_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Weight (kg)" error={errors.weight} required>
                  <input type="number" min="0" step="0.1" className={inp("weight")} placeholder="1.5" value={form.weight} onChange={set("weight")} />
                </Field>
                <Field label="Delivery Type" error={errors.deliveryType}>
                  <select className={`${inp("deliveryType")} appearance-none`} value={form.deliveryType} onChange={set("deliveryType")}>
                    {DELIVERY_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Parcel Value (₹)" error={errors.parcelValue}>
                  <input type="number" min="0" className={inp("parcelValue")} placeholder="500" value={form.parcelValue} onChange={set("parcelValue")} />
                </Field>
                <Field label="Expected Delivery Date" error={errors.expectedDate}>
                  <input type="date" className={inp("expectedDate")} value={form.expectedDate} onChange={set("expectedDate")} min={new Date().toISOString().split("T")[0]} />
                </Field>
                <Field label="Special Instructions" error={errors.specialInstructions} className="sm:col-span-2">
                  <textarea rows={2} className={`${inp("specialInstructions")} resize-none`} placeholder="Fragile, Handle with care, Do not bend…" value={form.specialInstructions} onChange={set("specialInstructions")} />
                </Field>
              </div>
            </Card>

            {/* Section 5: Payment & Status */}
            <Card>
              <SectionTitle icon={CreditCard} title="Payment & Status" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Booking Amount (₹)" error={errors.bookingAmount} required>
                  <input type="number" min="0" className={inp("bookingAmount")} placeholder="45" value={form.bookingAmount} onChange={set("bookingAmount")} />
                </Field>
                <Field label="Payment Method" error={errors.paymentMethod}>
                  <select className={`${inp("paymentMethod")} appearance-none`} value={form.paymentMethod} onChange={set("paymentMethod")}>
                    {PAYMENT_METHODS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </Field>
                <Field label="Initial Status" error={errors.status}>
                  <select className={`${inp("status")} appearance-none`} value={form.status} onChange={set("status")}>
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Assigned Branch" error={errors.branch} required>
                  <select className={`${inp("branch")} appearance-none`} value={form.branch} onChange={set("branch")}>
                    <option value="">Select Branch</option>
                    {BRANCHES?.map(b => <option key={b?.id} value={b?.branchCode}>{b?.branchName}</option>)}
                  </select>
                </Field>
                <Field label="Assigned Clerk" error={errors.clerk} required className="sm:col-span-2">
                  <select className={`${inp("clerk")} appearance-none`} value={form.clerk} onChange={set("clerk")}>
                    <option value="">Select Clerk</option>
                    {DELIVERYMAN?.map(c => <option key={c?.id} value={c?.employeeId}>{c?.name + " " + c?.employeeId}</option>)}
                  </select>
                </Field>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-end pb-2">
              <button onClick={handleReset} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-600 font-semibold hover:bg-gray-50 transition-colors">
                <RotateCcw size={14} /> Reset Form
              </button>
              <button onClick={handleSubmit} className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-200 transition-colors">
                <Package size={15} /> Create Parcel
              </button>
            </div>
          </div>

          {/* ── RIGHT: Summary ── */}
          <div className="xl:col-span-1 space-y-4 xl:sticky xl:top-6 self-start">

            {/* Tracking badge */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-xl shadow-blue-200">
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1">Tracking ID</p>
              <p className="text-2xl font-black tracking-widest mb-3">{trackingId}</p>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${form.status === "BOOKED" ? "bg-green-400/20 text-green-200" : "bg-amber-400/20 text-amber-200"}`}>
                  ● {form.status}
                </span>
                {form.deliveryType && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/15 text-white">
                    {form.deliveryType}
                  </span>
                )}
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Booking Summary</p>
              <div className="space-y-3">
                <SummaryRow icon={User} label="Sender" value={form.senderName || "—"} />
                <SummaryRow icon={MapPin} label="Receiver" value={form.receiverName || "—"} />
                <SummaryRow icon={Package} label="Type" value={form.parcelType || "—"} />
                <SummaryRow icon={Truck} label="Delivery" value={form.deliveryType || "—"} />
                <SummaryRow icon={Weight} label="Weight" value={form.weight ? `${form.weight} kg` : "—"} />
                <div className="border-t border-gray-100 pt-3 mt-1">
                  <SummaryRow icon={BadgeIndianRupee} label="Amount" value={form.bookingAmount ? `₹${form.bookingAmount}` : "—"} highlight />
                  <div className="mt-2">
                    <SummaryRow icon={CreditCard} label="Payment" value={form.paymentMethod || "—"} />
                  </div>
                </div>
              </div>
            </div>

            {/* Linked Citizen card */}
            {form.linkedCitizen ? (
              <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Linked Citizen</p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <User size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{form.linkedCitizen.name}</p>
                    <p className="text-xs text-gray-500">{form.linkedCitizen.id}</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>📞 {form.linkedCitizen.phone}</p>
                  <p>✉️ {form.linkedCitizen.email}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-200 p-5 text-center">
                <User size={28} className="text-gray-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-400">No citizen linked</p>
                <p className="text-[11px] text-gray-300 mt-0.5">Walk-in / Offline booking</p>
              </div>
            )}

            {/* Tips */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-amber-700 mb-2 flex items-center gap-1.5"><Info size={13} /> Quick Tips</p>
              <ul className="text-[11px] text-amber-600 space-y-1 leading-relaxed">
                <li>• Citizen ID is optional for walk-in customers.</li>
                <li>• Booking amount auto-fills by delivery type.</li>
                <li>• Tracking ID is auto-generated on load.</li>
                <li>• Search citizen to auto-fill sender details.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function Card({ children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {children}
    </div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-2.5 mb-5 pb-4 border-b border-gray-100">
      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={15} className="text-blue-600" strokeWidth={2.2} />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-800">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function Field({ label, error, required, className = "", children }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-[11px] mt-1 font-medium">{error}</p>}
    </div>
  );
}

function SummaryRow({ icon: Icon, label, value, highlight }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 text-gray-400 min-w-0">
        <Icon size={13} strokeWidth={2} />
        <span className="text-xs">{label}</span>
      </div>
      <span className={`text-xs font-semibold truncate ml-2 ${highlight ? "text-green-600 text-sm" : "text-gray-700"}`}>
        {value}
      </span>
    </div>
  );
}