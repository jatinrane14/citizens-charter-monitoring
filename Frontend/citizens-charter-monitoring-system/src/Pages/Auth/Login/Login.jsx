import React, { useContext } from 'react'
import { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { MyContext } from '../../../Context';
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

// ── SVG Icons ───────────────────────────────────────────────────────────────
function MailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function LockIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
  );
}

function EyeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );
}

function EyeOffIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
    </svg>
  );
}

function AlertCircleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );
}

function SpinnerIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  );
}

function CheckCircleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
    </svg>
  );
}

function PackageIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.82-1h12l.93 1H5.12z" />
    </svg>
  );
}

function BellIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  );
}

function MapPinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

// ── Left Panel Illustration ─────────────────────────────────────────────────
function LeftPanel() {
  const features = [
    { icon: <PackageIcon className="w-4 h-4" />, title: "Track Deliveries", desc: "Real-time status of your parcels and letters" },
    { icon: <BellIcon className="w-4 h-4" />, title: "Get Notifications", desc: "Instant alerts on delivery updates" },
    { icon: <MapPinIcon className="w-4 h-4" />, title: "Find Post Offices", desc: "Locate the nearest DoP branch" },
  ];

  return (
    <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-10 rounded-l-2xl relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-400/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top: logo + brand */}
      <div>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-1 14H5V8h14v10zm-7-7a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">DoP System</p>
            <p className="text-blue-200 text-xs">Department of Posts</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white leading-snug mb-3">
          Your gateway to <br />
          <span className="text-blue-200">postal services</span>
        </h2>
        <p className="text-blue-200/80 text-sm leading-relaxed max-w-xs">
          Manage deliveries, track parcels, and stay updated — all from one secure citizen portal.
        </p>
      </div>

      {/* Feature list */}
      <div className="flex flex-col gap-4">
        {features.map(({ icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3 group">
            <div className="w-8 h-8 bg-white/10 border border-white/15 rounded-lg flex items-center justify-center text-blue-200 shrink-0 group-hover:bg-white/15 transition-colors">
              {icon}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{title}</p>
              <p className="text-blue-300/70 text-xs mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-blue-300/50 text-xs mt-8">
        Government of India &nbsp;·&nbsp; Secure &amp; Trusted Portal
      </p>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function CitizenLogin() {
  const navigate = useNavigate();

  useEffect(() => {
        if (localStorage.getItem("token") != null) {
            const decoded = jwtDecode(localStorage.getItem("token"));
            if (decoded.exp < Date.now() / 1000) {
                localStorage.removeItem("token");
            } else {
                if (decoded) {
                    toast.success("User Already LOGGED IN");
                    navigate("/");
                }
            }
        }
    }, []);

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const {isLogin,setIsLogin,user,setUser} = useContext(MyContext);

  // Detect whether identifier looks like mobile or email
  const identifierType = /^\d/.test(form.identifier) ? "mobile" : "email";

  const validate = (values = form) => {
    const errs = {};
    if (!values.identifier.trim()) {
      errs.identifier = "Email or mobile number is required.";
    } else if (
      values.identifier.includes("@") &&
      !/\S+@\S+\.\S+/.test(values.identifier)
    ) {
      errs.identifier = "Enter a valid email address.";
    } else if (
      /^\d+$/.test(values.identifier) &&
      values.identifier.length !== 10
    ) {
      errs.identifier = "Mobile number must be 10 digits.";
    }
    if (!values.password) {
      errs.password = "Password is required.";
    } else if (values.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(updated)[name] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ identifier: true, password: true });
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    const data = {
      userEmail: form.identifier,
      password: form.password
    }
    console.log(data)
    fetch(`${import.meta.env.VITE_API_END_POINT}/api/citizen/login`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    }).then((responce) => {
      return responce.json();
    }).then((data) => {
      console.log(!data.success)
      if(!data?.success){
        toast.error(data?.message)
        throw new Error(data?.message)
      }
      console.log("coming" , data.token)
      localStorage.setItem("token", data?.token);
      toast.success(data.message)
      setIsLogin(true)
      navigate("/")
    }).catch(() => {
      setErrors({});
    }).finally(() => {
      setLoading(false);
    })  
  };

  const inputBase =
    "w-full bg-gray-800/70 border rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-150 focus:ring-1 focus:bg-gray-800 py-2.5 pr-4";

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-700/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-indigo-600/6 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Card wrapper */}
      <div className="relative w-full max-w-4xl">
        {/* Mobile-only logo */}
        <div className="lg:hidden text-center mb-7">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-2xl mb-3 shadow-lg shadow-blue-500/30">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-1 14H5V8h14v10zm-7-7a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">DoP System</h1>
          <p className="text-xs text-gray-500 mt-0.5">Department of Posts, India</p>
        </div>

        {/* Two-column card */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-white/8 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <LeftPanel />

          {/* Right: form panel */}
          <div className="p-8 flex flex-col justify-center">
            {/* Header */}
            <div className="mb-7">
              <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium px-2.5 py-1 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Citizen Login
              </div>
              <h2 className="text-2xl font-bold text-white leading-tight">
                Welcome back
              </h2>
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                Access your postal services and track deliveries
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {/* Identifier field */}
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-xs font-medium text-gray-400 mb-1.5"
                >
                  Email / Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    {identifierType === "mobile" ? (
                      <PhoneIcon className="w-4 h-4" />
                    ) : (
                      <MailIcon className="w-4 h-4" />
                    )}
                  </span>
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    autoComplete="username"
                    value={form.identifier}
                    onChange={handleChange}
                    placeholder="you@example.com or +91 123456789"
                    className={`${inputBase} pl-9
                      ${errors.identifier
                        ? "border-red-500/60 focus:ring-red-500/30"
                        : "border-white/8 hover:border-white/15 focus:border-blue-500/50 focus:ring-blue-500/20"
                      }`}
                  />
                </div>
                {errors.identifier && (
                  <p className="flex items-start gap-1.5 text-red-400 text-xs mt-1.5">
                    <AlertCircleIcon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    {errors.identifier}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="text-xs font-medium text-gray-400"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <LockIcon className="w-4 h-4" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`${inputBase} pl-9 pr-10
                      ${errors.password
                        ? "border-red-500/60 focus:ring-red-500/30"
                        : "border-white/8 hover:border-white/15 focus:border-blue-500/50 focus:ring-blue-500/20"
                      }`}

                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-4 h-4" />
                    ) : (
                      <EyeIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="flex items-start gap-1.5 text-red-400 text-xs mt-1.5">
                    <AlertCircleIcon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer group w-fit">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500/30 accent-blue-600"
                />
                <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  Keep me signed in
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <SpinnerIcon className="w-4 h-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in as Citizen
                    <ArrowRightIcon className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/6" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-900 px-3 text-xs text-gray-600">
                  or
                </span>
              </div>
            </div>

            {/* Create account */}
            <p className="text-center text-sm text-gray-500">
              New to DoP?{" "}
              <Link to={"/register"} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Create an account
              </Link>
            </p>

            {/* Security note */}
            <div className="mt-6 flex items-center justify-center gap-1.5 text-gray-600">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
              <span className="text-xs">
                Secured by Government of India &nbsp;·&nbsp; All sessions are encrypted
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}