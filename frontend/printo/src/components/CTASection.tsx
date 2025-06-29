import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="gradient-bg text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Create Your Custom Apparel?
        </h2>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have brought their designs to life with PrintO.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/get-started" 
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Designing Now
          </Link>
          <Link 
            href="/contact" 
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
          >
            Contact Sales
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold mb-2">✓ No Minimum Orders</div>
            <div className="text-purple-200">Order as few as 1 item</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">✓ Fast Turnaround</div>
            <div className="text-purple-200">2-5 business days</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">✓ Quality Guarantee</div>
            <div className="text-purple-200">100% satisfaction promise</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;