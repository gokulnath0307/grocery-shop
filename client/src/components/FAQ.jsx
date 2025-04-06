import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "You can place an order by browsing our product categories, adding items to your cart, and proceeding to checkout. It’s fast and simple!",
  },
  {
    question: "What is the delivery time?",
    answer: "We typically deliver within 1-2 business days. Same-day delivery is available in select areas for orders placed before noon.",
  },
  {
    question: "Is there a minimum order value?",
    answer: "Yes, the minimum order value for delivery is ₹300. There is no minimum if you choose store pickup.",
  },
  {
    question: "Can I return or replace items?",
    answer: "Absolutely! If any item is damaged or not as expected, you can request a return or replacement within 24 hours of delivery.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-8xl px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Frequently Asked Questions</h2>
          <dl className="mt-16 divide-y divide-gray-900/10">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <button className="group flex w-full items-start justify-between text-left text-gray-900" onClick={() => toggleFAQ(index)}>
                    <span className="text-base font-semibold">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      {openIndex === index ? <FaMinus className="size-6 text-gray-600" /> : <FaPlus className="size-6 text-gray-600" />}
                    </span>
                  </button>
                </dt>
                {openIndex === index && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base text-gray-600">{faq.answer}</p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
