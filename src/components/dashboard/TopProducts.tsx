import type { Product } from '../../types'

interface TopProductsProps {
  products: Product[]
  loading: boolean
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function TopProducts({ products, loading }: TopProductsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Top Products</h2>
        <a href="/products" className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors">
          View all
        </a>
      </div>
      <div className="divide-y divide-gray-100">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="px-5 py-3.5 animate-pulse flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-28" />
                <div className="h-3 bg-gray-100 rounded w-16" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-14" />
            </div>
          ))
        ) : products.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-gray-400">
            No products yet
          </div>
        ) : (
          products.map((product, index) => (
            <div key={product.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(product.price)}</p>
                <p className="text-xs text-gray-400 mt-0.5">{product.stock} in stock</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
