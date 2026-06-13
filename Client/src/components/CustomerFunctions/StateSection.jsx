import React, { useEffect, useState } from "react";

const Counter = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const duration = 2000; 
    const increment = end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const StateSection = () => {
  return (
    <section className="bg-[#2596be] text-white py-16">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <Counter end={15000} suffix="+" />
            </div>
            <div className="text-blue-100">Students</div>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <Counter end={300} suffix="+" />
            </div>
            <div className="text-blue-100">Faculty</div>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <Counter end={25} suffix="+" />
            </div>
            <div className="text-blue-100">Programs</div>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <Counter end={95} suffix="%" />
            </div>
            <div className="text-blue-100">Placement Rate</div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StateSection;