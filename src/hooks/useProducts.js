import { useState, useEffect } from 'react'
import fallback from '../data/products.json'

function useProducts() {
  const [products, setProducts]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        if (!res.ok) throw new Error('Network response was not ok')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.warn('API failed, using local data:', err.message)
        setProducts(fallback)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return { products, loading, error }
}

export default useProducts