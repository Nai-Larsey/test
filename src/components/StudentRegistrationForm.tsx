"use client"

import { useState } from "react"
import { registerStudent } from "@/app/actions"

export default function StudentRegistrationForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return setMessage({ type: "error", text: "Please fill in all fields." })

    setLoading(true)
    setMessage(null)

    const result = await registerStudent({ name, email })

    if (result.success) {
      setMessage({ type: "success", text: `Successfully registered ${name}!` })
      setName("") 
      setEmail("")
      // Refresh the page to update the student list in the enrollment form
      window.location.reload()
    } else {
      setMessage({ type: "error", text: result.error || "Registration failed." })
    }
    setLoading(false)
  }

  return (
    <div className="glass p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center tracking-tight text-gradient">
        Student Onboarding
      </h2>
      
      {message && (
        <div className={`p-4 mb-6 rounded-2xl text-sm font-semibold animate-in fade-in slide-in-from-top-4 duration-300 ${
          message.type === "success" 
            ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
            : "bg-rose-50 text-rose-700 border border-rose-100"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-600 ml-1">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alexander Hamilton"
            className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all placeholder:text-slate-400 text-slate-900"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-600 ml-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@academy.edu"
            className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all placeholder:text-slate-400 text-slate-900"
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full group relative overflow-hidden">
          <span className={loading ? "opacity-0" : "flex items-center justify-center gap-2"}>
            Register Student
          </span>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </button>
      </form>
    </div>
  )

}
