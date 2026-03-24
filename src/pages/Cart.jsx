import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartItem({ item }) {
  const { removeItem, updateQty } = useCart()

  return (
    <div className="flex items-center gap-4 py-5 border-b border-gray-100 last:border-0">

      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center p-2">
        <img src={item.image} alt={item.title} className="max-h-full object-contain" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
        <p className="text-xs text-gray-400 mt-0.5 capitalize">{item.category}</p>
        <p className="text-sm font-bold text-indigo-600 mt-1">${item.price.toFixed(2)}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => {
            if (item.qty === 1) removeItem(item.id)
            else updateQty(item.id, item.qty - 1)
          }}
          className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 text-lg leading-none"
        >
          −
        </button>
        <span className="px-3 py-1.5 text-sm font-medium border-x border-gray-200">
          {item.qty}
        </span>
        <button
          onClick={() => updateQty(item.id, item.qty + 1)}
          className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 text-lg leading-none"
        >
          +
        </button>
      </div>

      {/* Line total */}
      <div className="text-right min-w-[64px]">
        <p className="text-sm font-bold text-gray-900">
          ${(item.price * item.qty).toFixed(2)}
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.id)}
        className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
        aria-label="Remove item"
      >
        ✕
      </button>

    </div>
  )
}

function Cart() {
  const { cart, totalItems, totalPrice, clearCart } = useCart()

  if (cart.length === 0) return (
    <div className="text-center py-28">
      <p className="text-5xl mb-4">🛒</p>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
      <p className="text-gray-400 mb-6">Add some products to get started.</p>
      <Link
        to="/shop"
        className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors"
      >
        Browse Shop
      </Link>
    </div>
  )

  const shipping = totalPrice > 50 ? 0 : 4.99
  const tax      = totalPrice * 0.08

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-400 mt-1">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-400 hover:text-red-500 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart items */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 px-6">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({totalItems} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'text-green-500 font-medium' : ''}>
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            {shipping > 0 && (
              <p className="text-xs text-indigo-500 bg-indigo-50 rounded-lg px-3 py-2">
                Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
              </p>
            )}

            <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>${(totalPrice + shipping + tax).toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
            Proceed to Checkout
          </button>

          <Link
            to="/shop"
            className="block text-center mt-3 text-sm text-gray-400 hover:text-indigo-500 transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Cart