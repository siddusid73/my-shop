import { Link } from 'react-router-dom'

function StarRating({ rate }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`text-sm ${star <= Math.round(rate) ? 'text-yellow-400' : 'text-gray-200'}`}
        >
          ★
        </span>
      ))}
      <span className="text-xs text-gray-400 ml-1">{rate}</span>
    </div>
  )
}

function ProductCard({ product }) {
  const { id, title, price, image, category, rating } = product

  return (
    <Link to={`/product/${id}`} className="group block">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">

        {/* Image */}
        <div className="h-48 flex items-center justify-center p-4 bg-gray-50">
          <img
            src={image}
            alt={title}
            className="h-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <span className="text-xs text-indigo-500 font-medium uppercase tracking-wide">
            {category}
          </span>
          <h3 className="text-sm font-semibold text-gray-800 mt-1 mb-2 line-clamp-2 leading-snug">
            {title}
          </h3>
          <StarRating rate={rating.rate} />
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
            <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
              View →
            </span>
          </div>
        </div>

      </div>
    </Link>
  )
}

export default ProductCard