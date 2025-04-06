const navigation = {
  shop: [
    { name: "Fruits & Vegetables", href: "#" },
    { name: "Dairy & Bakery", href: "#" },
    { name: "Snacks & Beverages", href: "#" },
    { name: "Household Essentials", href: "#" },
  ],
  customerService: [
    { name: "FAQs", href: "#" },
    { name: "Track Order", href: "#" },
    { name: "Return Policy", href: "#" },
    { name: "Contact Support", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Store Locator", href: "#" },
    { name: "Partner With Us", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white mt-10 bottom-0">
      <div className="mx-auto max-w-8xl px-6 py-20 border border-t-gray-200">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <a href="/" className="text-xl font-bold text-gray-800">
          Grocery Shop
          </a>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-gray-900">Shop</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.shop.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-gray-900">Customer Service</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.customerService.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-gray-900">Company</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
