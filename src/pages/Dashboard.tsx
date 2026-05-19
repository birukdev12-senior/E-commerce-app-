import { useEffect, useState } from 'react'
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react'
import { StatCard } from '../components/dashboard/StatCard'
import { RecentOrders } from '../components/dashboard/RecentOrders'
import { TopProducts } from '../components/dashboard/TopProducts'
import { supabase } from '../lib/supabase'
import type { Order, Product } from '../types'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
}

export function Dashboard() {
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [topProducts, setTopProducts] = useState<Product[]>([])
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    customers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [ordersRes, productsRes] = await Promise.all([
          supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('products').select('*').order('created_at', { ascending: false }).limit(4),
        ])

        if (ordersRes.data) setRecentOrders(ordersRes.data as Order[])
        if (productsRes.data) setTopProducts(productsRes.data as Product[])

        const [revenueRes, countRes, productCountRes] = await Promise.all([
          supabase.from('orders').select('total').neq('status', 'cancelled'),
          supabase.from('orders').select('customer_email', { count: 'exact', head: false }),
          supabase.from('products').select('id', { count: 'exact', head: true }),
        ])

        const totalRevenue = (revenueRes.data ?? []).reduce((sum, o) => sum + (o.total ?? 0), 0)
        const uniqueCustomers = new Set((countRes.data ?? []).map((o) => o.customer_email)).size

        setStats({
          revenue: totalRevenue,
          orders: countRes.count ?? 0,
          products: productCountRes.count ?? 0,
          customers: uniqueCustomers,
        })
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={loading ? '—' : formatCurrency(stats.revenue)}
          change={12.5}
          icon={DollarSign}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Total Orders"
          value={loading ? '—' : stats.orders.toLocaleString()}
          change={8.2}
          icon={ShoppingCart}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Total Products"
          value={loading ? '—' : stats.products.toLocaleString()}
          change={-2.4}
          icon={Package}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatCard
          title="Total Customers"
          value={loading ? '—' : stats.customers.toLocaleString()}
          change={5.1}
          icon={Users}
          iconColor="text-rose-600"
          iconBg="bg-rose-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <RecentOrders orders={recentOrders} loading={loading} />
        </div>
        <div className="lg:col-span-2">
          <TopProducts products={topProducts} loading={loading} />
        </div>
      </div>
    </div>
  )
}
