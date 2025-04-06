import { TruckIcon, ShieldCheckIcon, CreditCardIcon } from "@heroicons/react/20/solid";

const features = [
  {
    name: "Fast & Free Delivery",
    description: "Enjoy same-day delivery on all orders over Rs.25. Groceries delivered right to your doorstep, fresh and fast.",
    icon: TruckIcon,
  },
  {
    name: "Freshness Guarantee",
    description: "We handpick the best quality products and ensure they stay fresh until they reach your kitchen.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Secure Payments",
    description: "All transactions are protected with advanced encryption to keep your personal and payment info safe.",
    icon: CreditCardIcon,
  },
];

export default function FeatureSection() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Text Content */}
          <div className="lg:ml-auto lg:pt-4 lg:pl-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold text-green-600">Why Shop With Us</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Your Daily Essentials, Delivered with Care</p>
              <p className="mt-6 text-lg text-gray-600">
                From farm to table, we bring you the freshest groceries with top-notch convenience and safety. Shop smarter and healthier with
                us.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-green-600" />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Image */}
          <div className="flex items-start justify-end lg:order-first px-10">
            <img
              alt="Grocery delivery preview"
              src="https://images.unsplash.com/photo-1695653422259-8a74ffe90401?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
