import Link from 'next/link';

const ProductsSection = () => {
  const products = [
    {
      name: "Classic T-Shirt",
      description: "100% Premium Cotton",
      price: "$24.99",
      image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400",
      colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#00FF00"]
    },
    {
      name: "Premium Hoodie",
      description: "Warm & Comfortable",
      price: "$39.99",
      image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400",
      colors: ["#000000", "#808080", "#FF0000", "#000080", "#008000"]
    },
    {
      name: "Tank Top",
      description: "Lightweight & Breathable",
      price: "$19.99",
      image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400",
      colors: ["#FFFFFF", "#000000", "#FF69B4", "#FFD700", "#00CED1"]
    },
    {
      name: "Long Sleeve Tee",
      description: "Comfortable & Stylish",
      price: "$29.99",
      image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400",
      colors: ["#000000", "#FFFFFF", "#800080", "#FFA500", "#008080"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our best-selling items and add your unique designs to create something special
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
              <div className="aspect-square bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Product Image</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>
                
                {/* Color Options */}
                <div className="flex space-x-2 mb-4">
                  {product.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    {product.price}
                  </span>
                  <Link 
                    href={`/customize?product=${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    Customize
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/products" 
            className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
          >
            View All Products
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;