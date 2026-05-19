import { NavLink } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'

interface SidebarItemProps {
  to: string
  icon: LucideIcon
  label: string
  collapsed?: boolean
}

export function SidebarItem({ to, icon: Icon, label, collapsed = false }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
        ${isActive
          ? 'bg-brand-600 text-white shadow-sm'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
      title={collapsed ? label : undefined}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  )
}
