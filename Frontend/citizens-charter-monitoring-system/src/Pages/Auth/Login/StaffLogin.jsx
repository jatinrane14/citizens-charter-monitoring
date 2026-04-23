import { useState } from "react";

// ── Role Config ─────────────────────────────────────────────────────────────
const ROLES = [
  {
    id: "staff",
    label: "Postal Staff",
    description: "Access delivery and tracking tools",
    accent: "blue",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-1 14H5V8h14v10zm-7-7a3 3 0 100 6 3 3 0 000-6z" />
      </svg>
    ),
  },
  {
    id: "official",
    label: "Government Official",
    description: "Review reports and analytics",
    accent: "emerald",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3L1 9l4 2.18V17h2v-4.82l2 1.09V17c0 1.66 3.13 3 7 3s7-1.34 7-3v-3.73l2-1.09L23 9 12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 16.99c-.32.36-2.22 1.01-5 1.01s-4.68-.65-5-1v-2.73l5 2.73 5-2.73v2.72z" />
      </svg>
    ),
  },
  {
    id: "admin",
    label: "Admin",
    description: "Full system access and control",
    accent: "violet",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5zm-1 3v4h2V8h-2zm0 6v2h2v-2h-2z" />
      </svg>
    ),
  },
];

const ACCENT_STYLES = {
  blue: {
    ring: "ring-blue-500/50 border-blue-500/60",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/20",
    btn: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25",
    dot: "bg-blue-400",
  },
  emerald: {
    ring: "ring-emerald-500/50 border-emerald-500/60",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    btn: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25",
    dot: "bg-emerald-400",
  },
  violet: {
    ring: "ring-violet-500/50 border-violet-500/60",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/20",
    btn: "bg-violet-600 hover:bg-violet-500 shadow-violet-500/25",
    dot: "bg-violet-400",
  },
};

// ── Icons ───────────────────────────────────────────────────────────────────
function EyeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );
}

// ── Role Card ───────────────────────────────────────────────────────────────
function RoleCard({ role, selected, onClick }) {
  const a = ACCENT_STYLES[role.accent];
  const isSelected = selected === role.id;

  return (
    <button
      type="button"
      onClick={() => onClick(role.id)}
      className={`relative flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 text-center
        ${isSelected
          ? `${a.ring} ${a.bg} ring-1`
          : "border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15"
        }`}
    >
      <span className={`transition-colors ${isSelected ? a.text : "text-gray-500"}`}>
        {role.icon}
      </span>
      <span className={`text-xs font-medium leading-tight transition-colors ${isSelected ? "text-white" : "text-gray-400"}`}>
        {role.label}
      </span>
      {isSelected && (
        <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${a.dot}`} />
      )}
    </button>
  );
}

// ── Main Login Component ─────────────────────────────────────────────────────
export default function Login() {
  const [role, setRole] = useState("staff");
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const activeRole = ROLES.find((r) => r.id === role);
  const accent = ACCENT_STYLES[activeRole.accent];

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email or username is required.";
    else if (form.email.includes("@") && !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className={`w-16 h-16 ${accent.bg} rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10`}>
            <svg className={`w-8 h-8 ${accent.text}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Welcome back!</h2>
          <p className="text-sm text-gray-400">
            Signed in as{" "}
            <span className={`font-medium ${accent.text}`}>{activeRole.label}</span>
          </p>
          <button
            onClick={() => { setSuccess(false); setForm({ email: "", password: "" }); }}
            className="mt-6 text-xs text-gray-500 hover:text-gray-300 underline underline-offset-2 transition-colors"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo + Brand */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-1 14H5V8h14v10zm-7-7a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">DoP System</h1>
          <p className="text-sm text-gray-500 mt-1">Department of Posts — India</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-white/8 rounded-2xl shadow-2xl shadow-black/60 p-7">

          {/* Card header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Sign in</h2>
              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${accent.badge}`}>
                {activeRole.label}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{activeRole.description}</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            {/* Role selector */}
            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Select your role
              </label>
              <div className="flex gap-2">
                {ROLES.map((r) => (
                  <RoleCard
                    key={r.id}
                    role={r}
                    selected={role}
                    onClick={setRole}
                  />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/6" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-900 px-3 text-xs text-gray-600">
                  credentials
                </span>
              </div>
            </div>

            {/* Email field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-1.5">
                Email / Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </span>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="username"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full bg-gray-800/70 border rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all duration-150
                    focus:ring-1 focus:bg-gray-800
                    ${errors.email
                      ? "border-red-500/60 focus:ring-red-500/40"
                      : `border-white/8 hover:border-white/15 focus:ring-1 focus:${accent.ring}`
                    }`}
                />
              </div>
              {errors.email && (
                <p className="flex items-start gap-1.5 text-red-400 text-xs mt-1.5">
                  <AlertIcon /> {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-xs font-medium text-gray-400">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full bg-gray-800/70 border rounded-xl pl-9 pr-10 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all duration-150
                    focus:ring-1 focus:bg-gray-800
                    ${errors.password
                      ? "border-red-500/60 focus:ring-red-500/40"
                      : `border-white/8 hover:border-white/15 focus:ring-1 focus:${accent.ring}`
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <p className="flex items-start gap-1.5 text-red-400 text-xs mt-1.5">
                  <AlertIcon /> {errors.password}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-5 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none ${accent.btn}`}
            >
              {loading ? (
                <>
                  <SpinnerIcon />
                  Signing in…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
                  </svg>
                  Sign in as {activeRole.label}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-600 mt-5">
          Government of India — Secure Portal &nbsp;·&nbsp; All access is logged and monitored
        </p>
      </div>
    </div>
  );
}