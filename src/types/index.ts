export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  image_url: string | null
  created_at: string
}

export interface Order {
  id: string
  customer_name: string
  customer_email: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  created_at: string
  items_count: number
}

export interface DashboardStats {
  total_revenue: number
  total_orders: number
  total_products: number
  total_customers: number
  revenue_change: number
  orders_change: number
  products_change: number
  customers_change: number
}
