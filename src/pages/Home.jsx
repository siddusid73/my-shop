import { Link } from 'react-router-dom'

const features = [
  { icon: '🛍️', title: 'Wide Selection',   desc: 'Browse hundreds of products across all categories.'   },
  { icon: '🚚', title: 'Fast Delivery',    desc: 'Get your orders delivered quickly to your doorstep.'  },
  { icon: '🔒', title: 'Secure Checkout',  desc: 'Your payment and personal data are always protected.' },
]

function Home() {
  return (
    <div>

      {/* Hero section */}
      <section className="text-center py-20 bg-gradient-to-br from-indigo-50 to-white rounded-2xl mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-indigo-600">MyShop</span>
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
          Discover amazing products at great prices. Fast delivery, easy returns.
        </p>
        <Link
          to="/shop"
          className="bg-indigo-600 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          Shop Now
        </Link>
      </section>

      {/* Features section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Why shop with us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Home