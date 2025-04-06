import React from "react";

export default function StatsSection() {
  return (
    <div>
      <div className="bg-white sm:py-32 drop-shadow-2xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            {/* Heading Section */}
            <div className="text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Trusted Grocery Delivery for Every Home</h2>
              <p className="mt-4 text-lg text-gray-600">Delivering freshness, quality, and convenience to thousands of families every day.</p>
            </div>

            {/* Stats Grid */}
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold text-gray-600">Happy Customers</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">100K+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold text-gray-600">Orders Delivered</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">1.2M+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold text-gray-600">Products Available</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">5,000+</dd>
              </div>
              <div className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold text-gray-600">Cities Served</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">75+</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
