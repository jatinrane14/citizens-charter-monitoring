import { useState } from "react";
import { Eye, EyeOff, X, UserPlus } from "lucide-react";
import {toast} from 'react-toastify'
const INITIAL = {
  fullName: "", username: "", email: "", phone: "", gender: "",
  employeeId: "", role: "", subRole: "", branchName: "",
  branchCode: "", workingArea: "", experience: "",
  password: "", confirmPassword: "",
};

const ROLES = ["POSTAL_STAFF", "GOV_OFFICIAL", "ADMIN"];
const SUB_ROLES = ["MANAGER", "CLERK", "DELIVERY_AGENT", "SUPERVISOR"];

export default function CreateStaffModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.username.trim()) e.username = "Username is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = "Enter a valid 10-digit phone number";
    if (!form.gender) e.gender = "Select a gender";
    if (!form.employeeId.trim()) e.employeeId = "Employee ID is required";
    if (!form.role) e.role = "Select a role";
    if (!form.subRole) e.subRole = "Select a sub-role";
    if (!form.branchName.trim()) e.branchName = "Branch name is required";
    if (!form.branchCode.trim()) e.branchCode = "Branch code is required";
    if (!form.workingArea.trim()) e.workingArea = "Working area is required";
    if (form.experience && isNaN(Number(form.experience))) e.experience = "Must be a number";
    if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const data = {
        "name":form.fullName,
        "userName":form.username,
        "userEmail":form.email,
        "phone":form.phone,
        "gender":form.gender,
        "employeeId":form.employeeId,
        "role":form.role,
        "active":true,
        "designation":form.subRole,
        "postOfficeName":form.branchName,
        "branchCode":form.branchCode,
        "workingArea":form.workingArea,
        "yearsOfExperience":form.experience,
        "password":form.password,
        "createdAt":new Date(),
        "updatedAt": new  Date(),
    }
    fetch(`http://localhost:8080/api/postalstaff/create`,{
        method:"POST",
        headers:{
            'Content-Type':'apllication/json'
        },
        body:JSON.stringify(data)
    }).then((response)=>{
      return response.json();
    }).then((data)=>{
      if(data?.error){
          throw new Error(data?.result)
      }
      toast.success(data.result)
      setSubmitted(true);
    }).catch(()=>{

    }).finally(()=>{
    })
    
  };

  const handleClose = () => {
    setOpen(false);
    setForm(INITIAL);
    setErrors({});
    setSubmitted(false);
  };

  const inp = (k) =>
    `w-full border rounded-lg px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-300 focus:border-blue-400 ${errors[k] ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50 focus:bg-white"}`;

  return (
    <div className="">

      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
      >
        <UserPlus size={16} />
        Create New Staff
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          {/* Modal */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Create New Staff</h2>
                <p className="text-xs text-gray-500 mt-0.5">Add a new postal employee to the branch system.</p>
              </div>
              <button onClick={handleClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-6 py-5">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Staff Created!</h3>
                  <p className="text-gray-500 text-sm mb-6">{form.fullName} has been added as {form.subRole}.</p>
                  <div className="flex gap-3">
                    <button onClick={() => { setForm(INITIAL); setErrors({}); setSubmitted(false); }} className="px-5 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 font-semibold hover:bg-gray-50">
                      Add Another
                    </button>
                    <button onClick={handleClose} className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>

                  {/* Personal Info */}
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Personal Information</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <Field label="Full Name" error={errors.fullName}>
                      <input className={inp("fullName")} placeholder="Ramesh Kumar" value={form.fullName} onChange={set("fullName")} />
                    </Field>
                    <Field label="Username" error={errors.username}>
                      <input className={inp("username")} placeholder="ramesh_k" value={form.username} onChange={set("username")} />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input type="email" className={inp("email")} placeholder="ramesh@post.gov.in" value={form.email} onChange={set("email")} />
                    </Field>
                    <Field label="Phone" error={errors.phone}>
                      <input type="tel" maxLength={10} className={inp("phone")} placeholder="9XXXXXXXXX" value={form.phone} onChange={set("phone")} />
                    </Field>
                    <Field label="Gender" error={errors.gender}>
                      <select className={inp("gender")} value={form.gender} onChange={set("gender")}>
                        <option value="">Select</option>
                        {["Male","Female","Transgender","Prefer not to say"].map(g => <option key={g}>{g}</option>)}
                      </select>
                    </Field>
                  </div>

                  {/* Staff Info */}
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Staff Information</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <Field label="Employee ID" error={errors.employeeId}>
                      <input className={inp("employeeId")} placeholder="EMP-0042" value={form.employeeId} onChange={set("employeeId")} />
                    </Field>
                    <Field label="Role" error={errors.role}>
                      <select className={inp("role")} value={form.role} onChange={set("role")}>
                        <option value="">Select</option>
                        {ROLES.map(r => <option key={r}>{r}</option>)}
                      </select>
                    </Field>
                    <Field label="Sub Role" error={errors.subRole}>
                      <select className={inp("subRole")} value={form.subRole} onChange={set("subRole")}>
                        <option value="">Select</option>
                        {SUB_ROLES.map(r => <option key={r}>{r}</option>)}
                      </select>
                    </Field>
                    <Field label="Branch Name" error={errors.branchName}>
                      <input className={inp("branchName")} placeholder="Bhopal HO" value={form.branchName} onChange={set("branchName")} />
                    </Field>
                    <Field label="Branch Code" error={errors.branchCode}>
                      <input className={inp("branchCode")} placeholder="BPL-001" value={form.branchCode} onChange={set("branchCode")} />
                    </Field>
                    <Field label="Working Area" error={errors.workingArea}>
                      <input className={inp("workingArea")} placeholder="Zone A" value={form.workingArea} onChange={set("workingArea")} />
                    </Field>
                    <Field label="Experience (years)" error={errors.experience}>
                      <input type="number" min="0" className={inp("experience")} placeholder="5" value={form.experience} onChange={set("experience")} />
                    </Field>
                  </div>

                  {/* Account */}
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Account Security</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Password" error={errors.password}>
                      <div className="relative">
                        <input type={showPass ? "text" : "password"} className={`${inp("password")} pr-10`} placeholder="Min. 8 characters" value={form.password} onChange={set("password")} />
                        <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                          {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </Field>
                    <Field label="Confirm Password" error={errors.confirmPassword}>
                      <div className="relative">
                        <input type={showConfirm ? "text" : "password"} className={`${inp("confirmPassword")} pr-10`} placeholder="Re-enter password" value={form.confirmPassword} onChange={set("confirmPassword")} />
                        <button type="button" onClick={() => setShowConfirm(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                          {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </Field>
                  </div>

                </form>
              )}
            </div>

            {/* Footer */}
            {!submitted && (
              <div className="flex gap-3 justify-end px-6 py-4 border-t border-gray-200">
                <button type="button" onClick={handleClose} className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-600 font-semibold hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleSubmit} className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors">
                  Create Staff
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}