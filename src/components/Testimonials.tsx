"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "John Doe",
    role: "Business Traveler",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "The service was exceptional! The staff went above and beyond to ensure my stay was comfortable. Highly recommended for business travelers.",
  },
  {
    name: "Sarah Smith",
    role: "Vacationer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "A truly relaxing experience. The pool area is amazing and the rooms are spacious and clean. I will definitely be coming back.",
  },
  {
    name: "Michael Brown",
    role: "Family Trip",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    quote:
      "Great place for a family vacation. The kids loved the activities and the food was delicious. A perfect getaway.",
  },
  {
    name: "Emily Davis",
    role: "Solo Traveler",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "I felt very safe and welcomed. The location is perfect, close to all the main attractions but still quiet enough for a good night's sleep.",
  },
  {
    name: "David Wilson",
    role: "Digital Nomad",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    quote:
      "The wifi speed was excellent, which was crucial for my work. The co-working space in the lobby is also a nice touch.",
  },
  {
    name: "Jessica Taylor",
    role: "Honeymooners",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    quote:
      "We had the most romantic stay. The room service was impeccable and the view from our balcony was breathtaking.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here is what our satisfied
            guests have to say about their stay.
          </p>
        </div>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="pb-10">
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="relative w-12 h-12 mr-4 shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed grow line-clamp-3">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
