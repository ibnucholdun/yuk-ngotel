import Hero from "@/components/Hero";
import Main from "@/components/Main";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">Rooms & Rates</h1>
          <p className="py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, quia!
          </p>
        </div>
        <Main />
      </div>
    </div>
  );
};

export default HomePage;
