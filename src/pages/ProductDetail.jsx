import { useCart } from '../context/CartContext'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import fallback from '../data/products.json'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!res.ok) throw new Error()
        setProduct(await res.json())
      } catch {
        setProduct(fallback.find(p => p.id === Number(id)) || null)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const { addItem } = useCart()

function handleAddToCart() {
  addItem(product, qty)
  setAdded(true)
  setTimeout(() => setAdded(false), 2000)
}

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="animate-spin h-8 w-8 rounded-full border-4 border-indigo-500 border-t-transparent" />
    </div>
  )

  if (!product) return (
    <div className="text-center py-20">
      <p className="text-gray-500">Product not found.</p>
      <Link to="/shop" className="text-indigo-500 underline text-sm mt-2 block">
        Back to shop
      </Link>
    </div>
  )

  const { title, price, description, image, category, rating } = product

  return (
    <div>

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-indigo-500">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-indigo-500">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 line-clamp-1">{title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Image */}
        <div className="bg-white rounded-2xl border border-gray-100 flex items-center justify-center p-12 h-96">
          <img src={image} alt={title} className="max-h-full object-contain" />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <span className="text-xs text-indigo-500 font-medium uppercase tracking-widest mb-2">
            {category}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
            {title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <span key={s} className={`text-lg ${s <= Math.round(rating.rate) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
              ))}
            </div>
            <span className="text-sm text-gray-500">{rating.rate} · {rating.count} reviews</span>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-6">{description}</p>

          <p className="text-3xl font-bold text-gray-900 mb-6">${price.toFixed(2)}</p>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 text-lg"
              >−</button>
              <span className="px-4 py-2 text-sm font-medium border-x border-gray-200">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 text-lg"
              >+</button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {added ? '✓ Added to cart!' : 'Add to Cart'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductDetail