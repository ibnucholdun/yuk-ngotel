import React from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What is the check-in and check-out time?",
    answer:
      "Check-in is from 2:00 PM, and check-out is until 12:00 PM. Early check-in and late check-out are subject to availability.",
  },
  {
    question: "Do you offer airport shuttle services?",
    answer:
      "Yes, we offer airport shuttle services for an additional charge. Please contact our concierge to arrange your transfer.",
  },
  {
    question: "Is breakfast included in the room rate?",
    answer:
      "It depends on the room package you choose. Some rates include breakfast, while others do not. Please check the room details before booking.",
  },
  {
    question: "Are pets allowed in the hotel?",
    answer:
      "We are a pet-friendly hotel! However, please inform us in advance if you are bringing a pet. Additional charges may apply.",
  },
  {
    question: "Do you have a cancellation policy?",
    answer:
      "Yes, our cancellation policy varies depending on the rate type. Flexible rates can be cancelled up to 24 hours before arrival, while non-refundable rates cannot be changed.",
  },
];

const FAQ = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about your stay with us.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border border-gray-200 rounded-lg bg-gray-50 open:bg-white open:ring-1 open:ring-black/5 transition-all duration-300"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 md:p-6 font-medium text-gray-900 marker:content-none hover:bg-gray-100 group-open:hover:bg-white transition-colors">
                <span className="text-lg">{faq.question}</span>
                <span className="transition group-open:rotate-180">
                  <FaChevronDown className="text-orange-500" />
                </span>
              </summary>
              <div className="px-4 pb-4 md:px-6 md:pb-6 text-gray-600 leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
