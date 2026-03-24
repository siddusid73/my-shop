import { useState, useMemo } from 'react'
import useProducts from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

const CATEGORIES = ['all', "men's clothing", "women's clothing", 'jewelery', 'electronics']

function Shop() {
  const { products, loading } = useProducts()
  const [search, setSearch]   = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort]       = useState('default')

  const filtered = useMemo(() => {
    let list = [...products]

    if (category !== 'all')
      list = list.filter(p => p.category === category)

    if (search.trim())
      list = list.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )

    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'rating')     list.sort((a, b) => b.rating.rate - a.rating.rate)

    return list
  }, [products, search, category, sort])

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="animate-spin h-8 w-8 rounded-full border-4 border-indigo-500 border-t-transparent" />
    </div>
  )

  return (
    <div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
        <p className="text-gray-500 mt-1">{filtered.length} products found</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>

      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
              category === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No products found.</p>
          <button
            onClick={() => { setSearch(''); setCategory('all') }}
            className="mt-3 text-indigo-500 text-sm underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  )
}

export default Shop