import React,{ useState , useContext} from "react";
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import { MyContext } from '../../Context';
import { useEffect } from 'react';

const STATUS_STYLES = {

  DELIVERED: {
    badge:
      "bg-emerald-100 text-emerald-700 border border-emerald-300",
    dot: "bg-emerald-500",
    glow: "shadow-emerald-100",
  },

  IN_TRANSIT: {
    badge:
      "bg-amber-100 text-amber-700 border border-amber-300",
    dot: "bg-amber-400",
    glow: "shadow-amber-100",
  },

  DELAYED: {
    badge:
      "bg-red-100 text-red-700 border border-red-300",
    dot: "bg-red-500",
    glow: "shadow-red-100",
  },

  PROCESSING: {
    badge:
      "bg-blue-100 text-blue-700 border border-blue-300",
    dot: "bg-blue-500",
    glow: "shadow-blue-100",
  },

  RETURNED: {
    badge:
      "bg-orange-100 text-orange-700 border border-orange-300",
    dot: "bg-orange-500",
    glow: "shadow-orange-100",
  },

  CANCELED: {
    badge:
      "bg-slate-200 text-slate-700 border border-slate-300",
    dot: "bg-slate-500",
    glow: "shadow-slate-100",
  },

  BOOKED: {
    badge:
      "bg-violet-100 text-violet-700 border border-violet-300",
    dot: "bg-violet-500",
    glow: "shadow-violet-100",
  },

  OUT_FOR_DELIVERY: {
    badge:
      "bg-cyan-100 text-cyan-700 border border-cyan-300",
    dot: "bg-cyan-500",
    glow: "shadow-cyan-100",
  }
};

const TIMELINE_STEPS = ["Dispatched", "Processing","IN_TRANSIT", "Out for Delivery", "Delivered"];

function Spinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin"></div>
        <div className="absolute inset-2 rounded-full bg-indigo-50 flex items-center justify-center">
          <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function StatusTimeline({ currentStep }) {
  return (
    <div className="mt-8">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">Shipment Journey</h3>
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-slate-200 z-0"></div>
        <div
          className="absolute top-5 left-5 h-0.5 bg-indigo-500 z-0 transition-all duration-700"
          style={{ width: `calc(${(currentStep / (TIMELINE_STEPS.length - 1)) * 100}% - 10px)` }}
        ></div>

        <div className="relative z-10 flex justify-between">
          {TIMELINE_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            const isPending = idx > currentStep;

            return (
              <div key={step} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isCompleted
                      ? "bg-indigo-600 shadow-lg shadow-indigo-200"
                      : isCurrent
                      ? "bg-white border-2 border-indigo-500 shadow-md shadow-indigo-100 ring-4 ring-indigo-50"
                      : "bg-white border-2 border-slate-200"
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : isCurrent ? (
                    <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  )}
                </div>
                <span
                  className={`text-xs font-medium text-center leading-tight ${
                    isCompleted ? "text-indigo-600" : isCurrent ? "text-slate-800" : "text-slate-400"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ data, onRaiseComplaint,isLogin }) {
  const styles = STATUS_STYLES[data?.status] || STATUS_STYLES["PROCESSING"];

  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-xl ${styles?.glow} p-6 md:p-8 transition-all duration-500 animate-fadeIn`}>
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Tracking ID</p>
          <p className="text-lg font-bold text-slate-800 font-mono tracking-wider">{data.trackingId}</p>
        </div>
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold self-start ${styles?.badge}`}>
          <span className={`w-2 h-2 rounded-full ${styles?.dot} ${data?.status === "In Transit" ? "animate-pulse" : ""}`}></span>
          {data?.status}
        </span>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
        {[
          { label: "Current Location", value: data.location, icon: "📍" },
          { label: "Est. Delivery", value: new Date(data.estimatedDelivery).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), icon: "📅" },
          { label: "Last Updated", value: data.lastUpdated, icon: "🕐" },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-medium text-slate-400 mb-1">{icon} {label}</p>
            <p className="text-sm font-semibold text-slate-700">{value}</p>
          </div>
        ))}
      </div>

      <StatusTimeline currentStep={data.currentStep} />

      {/* CTA */}
      {(isLogin)?
      <React.Fragment>
        {data.status !== "DELAYED" && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <button
              onClick={onRaiseComplaint}
              className="text-sm text-slate-500 hover:text-red-500 font-medium flex items-center gap-1.5 transition-colors duration-200 group"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Have an issue? Raise a complaint
            </button>
          </div>
        )}
      </React.Fragment>:null
    }
    </div>
  );
}

function ComplaintForm({ tracking, onSuccess ,user}) {
  const [type, setType] = useState("Delay");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!description.trim()) {
      setError("Please describe your issue before submitting.");
      return;
    }
    
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    console.log("user")
    console.log(user)
    const data = {
      "complaintType":type,
      "description":description,
      "status":"OPEN",
      "trackingId":tracking?.trackingId,
      "citizen":{
        "userEmail":user?.sub
      },
      "branch":{
        "branchCode":tracking?.branchCode?.branchCode
      },
      "resolutionNotes": null,
      "resolvedAt": null,
      "createdAt": new Date(),
      "updatedAt": new Date()
    }
    fetch(`http://localhost:8080/api/v1/complaints/create`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem("token")}`
      },
      body:JSON.stringify(data)
    }).then(async(response)=>{
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Failed to register complaint");
      } 
      return response.json();
    }).then((data)=>{
      if(!data){
        throw new Error("Failed to regester complaint")
      }
      toast.success("Your complaint is regestered successfully!")
      setSubmitted(true);
      console.log(data)
      onSuccess && onSuccess();
    }).catch((err)=>{
        console.log(err);

  setError(err.message);

  toast.error(err.message);

    }).finally(()=>{

    })
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-emerald-800 mb-1">Complaint Registered</h3>
        <p className="text-sm text-emerald-600 mb-2">
          Your complaint for <span className="font-mono font-semibold">{tracking?.trackingId}</span> has been submitted.
        </p>
        <p className="text-xs text-emerald-500">Our team will reach out to you within 2–3 business days.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 md:p-8 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
          <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-800">Raise a Complaint</h3>
          <p className="text-xs text-slate-400">For tracking ID: <span className="font-mono font-semibold text-slate-500">{tracking?.trackingId}</span></p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Complaint Type
          </label>
          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 cursor-pointer"
            >
              <option value="DELAYED_DELIVERY">Delay in Delivery</option>
              <option value="ITEM_LOST">Item Lost</option>
              <option value="ITEM_DAMAGED">Item Damaged</option>
              <option value="STAFF_BEHAVIOR">Staff Behaviour</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => { setDescription(e.target.value); setError(""); }}
            placeholder="Please describe your issue in detail..."
            rows={4}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 resize-none"
          />
          {error && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1"><span>⚠</span>{error}</p>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 disabled:opacity-60 text-white font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-red-100 hover:shadow-lg hover:shadow-red-200 active:scale-[0.98]"
        >
          {submitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Submit Complaint
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function TrackService() {
  const {isLogin,setIsLogin,user,setUser} = useContext(MyContext);
  console.log(isLogin)
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showComplaint, setShowComplaint] = useState(false);
  const [inputError, setInputError] = useState("");
  const [trackData,setTrackData] = useState(null);
const handleTrack = async () => {

  if (!trackingId.trim()) {

    setInputError(
      "Please enter a valid Tracking ID to continue."
    );

    return;
  }

  setInputError("");
  setError("");
  setResult(null);
  setShowComplaint(false);
  setLoading(true);

  try {

    const response = await fetch(

      `http://localhost:8080/api/v1/parcel/track/${trackingId}`,

      {
        method: "GET",

        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {

      throw new Error(
        "Shipment not found"
      );
    }

    const data =
      await response.json();

    console.log(data);

    setTrackData(data);

    setResult(data);

    if (
      data.status === "DELAYED"
    ) {

      setShowComplaint(true);
    }

  } catch (err) {

    console.log(err);

    setError(
      "No shipment found for this Tracking ID. Please verify and try again."
    );

  } finally {

    setLoading(false);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleTrack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100">
      {/* Decorative blobs */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-violet-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="relative max-w-2xl mx-auto px-4 py-12 md:py-16">
        {/* Page heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            Department of Posts
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Track Your Shipment
          </h1>
          <p className="text-slate-500 text-sm">
            Enter your tracking ID to get real-time updates on your postal service.
          </p>
        </div>

        {/* Search box */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/80 p-2 mb-6 flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => { setTrackingId(e.target.value); setInputError(""); }}
              onKeyDown={handleKeyDown}
              placeholder="Enter Tracking ID (e.g. DOP123456)"
              className="w-full pl-10 pr-4 py-3.5 text-sm font-medium text-slate-700 placeholder-slate-400 bg-transparent focus:outline-none font-mono"
            />
          </div>
          <button
            onClick={handleTrack}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 active:scale-[0.97] whitespace-nowrap"
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            )}
            Track Service
          </button>
        </div>

        {/* Validation / input error */}
        {inputError && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm px-4 py-3 rounded-xl mb-4 animate-fadeIn">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {inputError}
          </div>
        )}

        {/* Loading */}
        {loading && <Spinner />}

        {/* API error */}
        {!loading && error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-5 py-4 rounded-2xl mb-6 animate-fadeIn">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold">Tracking ID Not Found</p>
              <p className="text-red-500 text-xs mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Result */}
        {!loading && result && (
          <div className="space-y-4">
            <ResultCard
              data={result}
              onRaiseComplaint={() => setShowComplaint(true)}
              isLogin={isLogin}
            />
            {(isLogin && user?.sub == result?.email)}
            <React.Fragment>
            {showComplaint && (
              <ComplaintForm
              tracking={result} user={user}
              />
            )}
            </React.Fragment>
          
          </div>
        )}

        {/* Empty state */}
        {!loading && !result && !error && (
          <div className="text-center py-12 text-slate-400">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-9 h-9 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-500">Your tracking results will appear here</p>
            <p className="text-xs mt-1">Enter a valid Tracking ID above to get started</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease forwards; }
      `}</style>
    </div>
  );
}