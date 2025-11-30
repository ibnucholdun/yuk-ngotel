import React from "react";

const Newsletter = () => {
  return (
    <section className="py-20 bg-orange-500 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Subscribe to our Newsletter
        </h2>
        <p className="text-lg mb-8 text-orange-100">
          Stay updated with our latest offers, news, and special promotions.
          Join our community today!
        </p>
        <form className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300  bg-orange-50"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors duration-300 shadow-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
