import type { Order } from '../../types'

interface RecentOrdersProps {
  orders: Order[]
  loading: boolean
}

const statusStyles: Record<Order['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-sky-100 text-sky-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateString))
}

export function RecentOrders({ orders, loading }: RecentOrdersProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Recent Orders</h2>
        <a href="/orders" className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors">
          View all
        </a>
      </div>
      <div className="divide-y divide-gray-100">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-5 py-3.5 animate-pulse flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-3 bg-gray-100 rounded w-24" />
              </div>
              <div className="h-6 bg-gray-200 rounded-full w-20" />
              <div className="h-4 bg-gray-200 rounded w-16" />
            </div>
          ))
        ) : orders.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-gray-400">
            No orders yet
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{order.customer_name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.created_at)}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[order.status]}`}>
                {order.status}
              </span>
              <span className="text-sm font-semibold text-gray-900 w-20 text-right">
                {formatCurrency(order.total)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
