import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { pathname }   = useLocation()
  const { totalItems } = useCart()
  const { user, logout } = useAuth()

  const isActive = (path) =>
    `text-sm font-medium transition-colors ${
      pathname === path
        ? 'text-indigo-600 border-b-2 border-indigo-600 pb-0.5'
        : 'text-gray-600 hover:text-indigo-600'
    }`

  const initials = user?.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0].toUpperCase()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600 tracking-tight">
          MyShop
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link to="/"     className={isActive('/')}>Home</Link>
          <Link to="/shop" className={isActive('/shop')}>Shop</Link>

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center">
            <span className={isActive('/cart')}>🛒 Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2.5 -right-3.5 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <Link to="/profile" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold group-hover:bg-indigo-200 transition-colors">
                {initials}
              </div>
            </Link>
          ) : (
            <Link to="/login" className={isActive('/login')}>Login</Link>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar