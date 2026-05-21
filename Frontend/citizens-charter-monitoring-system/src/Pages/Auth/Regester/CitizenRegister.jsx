import { useState } from "react";
import {
  Package,
  MessageSquareWarning,
  ShieldCheck,
  Eye,
  EyeOff,
  ChevronRight,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  CreditCard,
  Home,
  Building2,
  Hash,
  LoaderCircle,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const FEATURES = [
  {
    icon: Package,
    title: "Real-Time Parcel Tracking",
    desc: "Track shipments live across all postal zones",
  },
  {
    icon: MessageSquareWarning,
    title: "Complaint Management",
    desc: "Raise & resolve service issues instantly",
  },
  {
    icon: ShieldCheck,
    title: "Secure Citizen Access",
    desc: "End-to-end encrypted personal portal",
  },
  {
    icon: Globe,
    title: "Transparent Postal Services",
    desc: "Full visibility into delivery milestones",
  },
];

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir",
  "Ladakh","Puducherry","Chandigarh","Andaman & Nicobar","Lakshadweep",
  "Dadra & Nagar Haveli","Daman & Diu",
];

const INITIAL = {
  fullName: "", username: "", email: "", phone: "", gender: "",
  address: "", city: "", state: "", pincode: "", aadhaar: "",
  password: "", confirmPassword: "", terms: false,
};

export default function CitizenRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.username.trim()) e.username = "Username is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = "Valid 10-digit mobile number required";
    if (!form.gender) e.gender = "Please select gender";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state) e.state = "Please select state";
    if (!form.pincode.match(/^\d{6}$/)) e.pincode = "Valid 6-digit pincode required";
    if (form.aadhaar && !form.aadhaar.match(/^\d{12}$/)) e.aadhaar = "Aadhaar must be 12 digits";
    if (form.password.length < 8) e.password = "Min 8 characters required";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (!form.terms) e.terms = "You must accept the terms";
    return e;
  };
  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    console.log(form)
    const data = {
      "name":form.fullName, 
      "userName":form.username,
      "userEmail":form.email,
      "password":form.password,
      "phone":form.phone,
      "gender":form.gender,
      "role":"CITIZEN",
      "active":true,
      "createdAt":new Date(),
      "updatedAt":new Date(),
      "address":form.address,
      "city":form.city,
      "state":form.state,
      "pincode":form.pincode,
      "aadhaarNumber":form.aadhaar
    }
    fetch(`${import.meta.env.VITE_API_END_POINT}/api/citizen/register`,{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(data)
    }).then((response)=>{
      return response.json();
    }).then((data)=>{
      console.log(data)
      if(data?.success == "false"){
        throw new Error(data?.result)
      }
      toast.success(data?.result)
      navigate("/login")
    }).catch((e)=>{
      console.log(e)
    }).finally(()=>{

    })
  };

  const inputBase =
    "w-full rounded-xl border bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";
  const errCls = (k) => (errors[k] ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100" : "border-gray-200");

  return (
    <div className="min-h-screen flex font-sans bg-gradient-to-br from-slate-100 to-blue-50">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-[44%] xl:w-[42%] flex-col relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-10 xl:px-14 py-12">

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-900/40 blur-3xl" />
          <svg className="absolute top-0 left-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Logo / Header */}
        <div className="relative z-10 flex items-center gap-3 mb-10">
          <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-white font-bold text-[15px] leading-tight tracking-wide">India Post</p>
            <p className="text-blue-200 text-[11px] tracking-widest uppercase">Digital Portal</p>
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-10 mb-8">
          <h1 className="text-white text-3xl xl:text-4xl font-extrabold leading-snug tracking-tight mb-4">
            Department of Posts<br />
            <span className="text-blue-200">Digital Service</span> Portal
          </h1>
          <p className="text-blue-100/80 text-sm xl:text-[15px] leading-relaxed max-w-sm">
            Register to access parcel tracking, complaint management, and real-time postal service updates across India.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="relative z-10 grid grid-cols-1 gap-3 mb-10">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3.5 rounded-2xl bg-white/10 border border-white/10 px-4 py-3.5 backdrop-blur-sm hover:bg-white/15 transition-all duration-200 cursor-default"
            >
              <div className="mt-0.5 w-9 h-9 shrink-0 rounded-xl bg-white/15 flex items-center justify-center">
                <Icon className="w-4.5 h-4.5 text-white" size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">{title}</p>
                <p className="text-blue-200/70 text-xs mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Illustration placeholder */}
        <div className="relative z-10 mt-auto">
          <div className="rounded-2xl bg-white/8 border border-white/10 px-5 py-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/15 border-2 border-white/20 flex items-center justify-center">
              <CheckCircle2 className="text-green-300 w-6 h-6" strokeWidth={2} />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Trusted by 2.5 Cr+ Citizens</p>
              <p className="text-blue-200 text-xs mt-0.5">Secure. Reliable. Government-backed.</p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="relative z-10 mt-5 text-blue-300/50 text-[11px] text-center tracking-wide">
          © {new Date().getFullYear()} Department of Posts, Government of India
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-start justify-center overflow-y-auto py-10 px-4 sm:px-8">
        <div className="w-full max-w-2xl">

          {/* Mobile header */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="text-blue-700 font-bold text-sm tracking-wide">India Post · Digital Portal</span>
          </div>

          {submitted ? (
            <div className="bg-white rounded-3xl shadow-xl border border-green-100 px-8 py-14 text-center">
              <div className="w-20 h-20 rounded-full bg-green-50 border-4 border-green-200 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-10 h-10 text-green-500" strokeWidth={2} />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Registration Successful!</h2>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Welcome, <span className="font-semibold text-blue-600">{form.fullName}</span>. Your account is being verified. You'll receive a confirmation email at <span className="font-medium text-gray-700">{form.email}</span>.
              </p>
              <button
                onClick={() => { setForm(INITIAL); setSubmitted(false); }}
                className="mt-8 px-7 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Register Another
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-6 sm:px-10 py-9">

              {/* Form header */}
              <div className="mb-7">
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Citizen Registration</h2>
                <p className="text-gray-500 text-sm mt-1">Create your account to access postal services online.</p>
              </div>

              {/* SECTION: Personal Info */}
              <SectionLabel label="Personal Information" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Field label="Full Name" error={errors.fullName} icon={<User size={15} />}>
                  <input className={`${inputBase} ${errCls("fullName")} pl-9`} placeholder="Ramesh Kumar Sharma" value={form.fullName} onChange={set("fullName")} />
                </Field>
                <Field label="Username" error={errors.username} icon={<Hash size={15} />}>
                  <input className={`${inputBase} ${errCls("username")} pl-9`} placeholder="ramesh_kumar" value={form.username} onChange={set("username")} />
                </Field>
                <Field label="Email Address" error={errors.email} icon={<Mail size={15} />}>
                  <input type="email" className={`${inputBase} ${errCls("email")} pl-9`} placeholder="ramesh@example.com" value={form.email} onChange={set("email")} />
                </Field>
                <Field label="Phone Number" error={errors.phone} icon={<Phone size={15} />}>
                  <input type="tel" maxLength={10} className={`${inputBase} ${errCls("phone")} pl-9`} placeholder="9XXXXXXXXX" value={form.phone} onChange={set("phone")} />
                </Field>
                <Field label="Gender" error={errors.gender}>
                  <select className={`${inputBase} ${errCls("gender")} appearance-none`} value={form.gender} onChange={set("gender")}>
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Transgender</option>
                    <option>Prefer not to say</option>
                  </select>
                </Field>
                <Field label="Aadhaar Number (Optional)" error={errors.aadhaar} icon={<CreditCard size={15} />}>
                  <input maxLength={12} className={`${inputBase} ${errCls("aadhaar")} pl-9`} placeholder="XXXX XXXX XXXX" value={form.aadhaar} onChange={set("aadhaar")} />
                </Field>
              </div>

              {/* SECTION: Address */}
              <SectionLabel label="Address Details" />
              <div className="grid grid-cols-1 gap-4 mb-4">
                <Field label="Street Address" error={errors.address} icon={<Home size={15} />}>
                  <textarea rows={2} className={`${inputBase} ${errCls("address")} pl-9 resize-none`} placeholder="House No, Street, Locality..." value={form.address} onChange={set("address")} />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <Field label="City" error={errors.city} icon={<Building2 size={15} />}>
                  <input className={`${inputBase} ${errCls("city")} pl-9`} placeholder="Bhopal" value={form.city} onChange={set("city")} />
                </Field>
                <Field label="State" error={errors.state}>
                  <select className={`${inputBase} ${errCls("state")} appearance-none`} value={form.state} onChange={set("state")}>
                    <option value="">Select State</option>
                    {STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Pincode" error={errors.pincode} icon={<MapPin size={15} />}>
                  <input maxLength={6} className={`${inputBase} ${errCls("pincode")} pl-9`} placeholder="462001" value={form.pincode} onChange={set("pincode")} />
                </Field>
              </div>

              {/* SECTION: Security */}
              <SectionLabel label="Account Security" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Field label="Password" error={errors.password} icon={<Lock size={15} />}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Lock size={15} /></span>
                    <input
                      type={showPass ? "text" : "password"}
                      className={`${inputBase} ${errCls("password")} pl-9 pr-10`}
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={set("password")}
                    />
                    <button type="button" onClick={() => setShowPass((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors">
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </Field>
                <Field label="Confirm Password" error={errors.confirmPassword} icon={<Lock size={15} />}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Lock size={15} /></span>
                    <input
                      type={showConfirm ? "text" : "password"}
                      className={`${inputBase} ${errCls("confirmPassword")} pl-9 pr-10`}
                      placeholder="Re-enter password"
                      value={form.confirmPassword}
                      onChange={set("confirmPassword")}
                    />
                    <button type="button" onClick={() => setShowConfirm((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors">
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </Field>
              </div>

              {/* Password strength */}
              {form.password && (
                <PasswordStrength password={form.password} />
              )}

              {/* Terms */}
              <div className="mt-5 mb-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.terms}
                    onChange={set("terms")}
                    className="mt-0.5 w-4 h-4 rounded accent-blue-600 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                    I agree to the{" "}
                    <span className="text-blue-600 font-medium hover:underline cursor-pointer">Terms & Conditions</span>
                    {" "}and{" "}
                    <span className="text-blue-600 font-medium hover:underline cursor-pointer">Privacy Policy</span>
                    {" "}of the Department of Posts, Government of India.
                  </span>
                </label>
                {errors.terms && <p className="text-red-500 text-xs mt-1.5 ml-7">{errors.terms}</p>}
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm py-3.5 transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                    Registering your account…
                  </>
                ) : (
                  <>
                    Register as Citizen
                    <ChevronRight size={16} />
                  </>
                )}
              </button>

              {/* Login link */}
              <p className="text-center text-sm text-gray-500 mt-5">
                Already have an account?{" "}
                <span className="text-blue-600 font-semibold hover:text-blue-700 hover:underline cursor-pointer transition-colors">
                  Login here
                </span>
              </p>
            </div>
          )}

          <p className="text-center text-xs text-gray-400 mt-5 pb-2">
            © {new Date().getFullYear()} Department of Posts, Ministry of Communications, Government of India
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-bold text-blue-600 uppercase tracking-widest whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-blue-100 to-transparent" />
    </div>
  );
}

function Field({ label, error, icon, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
            {icon}
          </span>
        )}
        {children}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const levels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"];
  const textColors = ["", "text-red-500", "text-yellow-600", "text-blue-600", "text-green-600"];

  return (
    <div className="mb-5 -mt-2">
      <div className="flex gap-1.5 mb-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= score ? colors[score] : "bg-gray-200"}`}
          />
        ))}
      </div>
      {score > 0 && (
        <p className={`text-xs font-medium ${textColors[score]}`}>
          Password strength: {levels[score]}
        </p>
      )}
    </div>
  );
}