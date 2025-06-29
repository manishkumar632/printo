import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="gradient-bg text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Design & Print Custom Apparel With Ease
              </h1>
              <p className="text-xl text-purple-100 max-w-lg">
                Upload your designs, choose your products, and we&apos;ll handle the rest. Quality printing, fast shipping, no minimum orders.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/get-started" 
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Get Designing
              </Link>
              <Link 
                href="/products" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors text-center"
              >
                View Products
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-purple-200">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1M+</div>
                <div className="text-purple-200">Products Printed</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4.9★</div>
                <div className="text-purple-200">Customer Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Preview */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="bg-white rounded-lg p-6 shadow-2xl">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">P</span>
                  </div>
                </div>
                <div className="text-center text-gray-800">
                  <h3 className="font-semibold mb-2">Custom T-Shirt</h3>
                  <p className="text-sm text-gray-600">Upload your design and see it come to life</p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
              NEW
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-semibold">
              Fast Shipping
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;