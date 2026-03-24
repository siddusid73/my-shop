import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const exists = state.find(item => item.id === action.product.id)
      if (exists) {
        return state.map(item =>
          item.id === action.product.id
            ? { ...item, qty: item.qty + action.qty }
            : item
        )
      }
      return [...state, { ...action.product, qty: action.qty }]
    }

    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.id)

    case 'UPDATE_QTY':
      return state.map(item =>
        item.id === action.id ? { ...item, qty: action.qty } : item
      )

    case 'CLEAR_CART':
      return []

    default:
      return state
  }
}

function getInitialCart() {
  try {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart)

  // Persist cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addItem    = (product, qty = 1) => dispatch({ type: 'ADD_ITEM', product, qty })
  const removeItem = (id)               => dispatch({ type: 'REMOVE_ITEM', id })
  const updateQty  = (id, qty)          => dispatch({ type: 'UPDATE_QTY', id, qty })
  const clearCart  = ()                 => dispatch({ type: 'CLEAR_CART' })

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}