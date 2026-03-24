import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const { user, logout } = useAuth()
  const { cart, totalItems, totalPrice } = useCart()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  const initials = user?.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0].toUpperCase()

  return (
    <div className="max-w-2xl mx-auto">

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6 flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-900 truncate">
            {user?.displayName || 'My Account'}
          </h1>
          <p className="text-sm text-gray-400 truncate">{user?.email}</p>
          <p className="text-xs text-gray-300 mt-1">
            Member since {new Date(user?.metadata?.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-400 hover:text-red-500 border border-red-200 hover:border-red-300 px-4 py-2 rounded-lg transition-colors flex-shrink-0"
        >
          Sign out
        </button>
      </div>

      {/* Cart summary card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Cart Summary</h2>
        {cart.length === 0 ? (
          <p className="text-sm text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="space-y-2">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-600 truncate flex-1 mr-4">{item.title}</span>
                <span className="text-gray-400 mr-4">x{item.qty}</span>
                <span className="font-medium text-gray-800">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-sm">
              <span>{totalItems} items</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Account details card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Account Details</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-400">Name</span>
            <span className="text-gray-800 font-medium">{user?.displayName || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-400">Email</span>
            <span className="text-gray-800 font-medium">{user?.email}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-400">User ID</span>
            <span className="text-gray-300 font-mono text-xs">{user?.uid?.slice(0, 12)}…</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile