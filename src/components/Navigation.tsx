"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, BookOpen, School } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Enrollment', href: '/enrollment', icon: BookOpen },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 glass border-r border-slate-200 p-6 flex flex-col z-50">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="bg-brand-primary p-2 rounded-xl text-white">
          <School size={24} />
        </div>
        <span className="text-xl font-black tracking-tighter text-slate-900">
          Academy<span className="text-brand-primary">OS</span>
        </span>
      </div>

      <div className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all group ${
                isActive
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-primary'} />
              {item.name}
            </Link>
          )
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100">
        <div className="glass p-4 rounded-2xl bg-brand-primary/5 border-brand-primary/10">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary mb-1">Status</p>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            System Live
          </div>
        </div>
      </div>
    </nav>
  )
}
