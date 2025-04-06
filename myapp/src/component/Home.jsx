import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const images = [
  '/Designer (1).jpeg',
  '/Designer (2).jpeg',
  '/Designer.jpeg',
  'fotor-ai-2025030819136.jpg',
];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const howItWorksRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleKnowMoreClick = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-gradient-to-b from-black/95 to-purple-900 text-white">
      <div className="py-16 px-5 sm:px-10 md:px-24 lg:px-28">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 text-center md:text-left">
          <div className="md:w-1/2">
            <h2 className="font-bold text-2xl sm:text-3xl text-white">
              No More <span className="text-[#FF00FF]">Surprises!</span>
            </h2>
            <h2 className="font-bold text-2xl sm:text-3xl text-white mt-2">
              Get Accurate <span className="text-[#FF00FF]">Rickshaw Fares</span> in Seconds
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-300">
              Tired of guessing your rickshaw fare? Our smart fare estimator gives
              you instant and accurate cost calculations based on real-time distance and location data 🚖✨
            </p>
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center md:justify-start">
              <button
                onClick={() => navigate('/auto')}
                className="px-4 py-2 border-3 border-[#9A6C6D] cursor-pointer rounded-lg text-white font-semibold"
              >
                Get Started
              </button>
              <button
                onClick={handleKnowMoreClick}
                className="px-4 py-2 border-3 border-[#9A6C6D] cursor-pointer rounded-lg font-semibold"
              >
                Know More
              </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt="Hero"
              className="w-[250px] sm:w-[350px] md:w-[434px] h-auto object-cover rounded-xl shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            />
          </div>
        </div>

        {/* Our Services Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Our Services</h2>
          <p className="mt-3 text-base sm:text-lg text-gray-300">
            Discover additional tools and services we offer to enhance your travel experience.
          </p>

          <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "E-Rickshaw Fare Estimator", img: "eRickshaw.jpeg" },
              { title: "Auto Rickshaw Fare Estimator", img: "Designer (3).jpeg" },
              { title: "Recommendation System", img: "Designer (5).jpeg" },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="border-5 bg-gradient-to-b from-purple-800/100 to-black/50 border-[#9A6C6D] hover:scale-105 cursor-pointer rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full lg:h-[300px] lg:w-[320px] sm:h-[200px] sm:w-[200px] mx-auto object-cover rounded-lg"
                />
                <p className="text-lg sm:text-xl font-semibold mt-4">{service.title}</p>
                <button className="mt-4 px-3 py-2 border-3 border-[#9A6C6D] cursor-pointer rounded-lg text-white font-semibold"
                 onClick={() => {
    if (service.title === "Recommendation System") {
      navigate('/recommendation');
    } else if (service.title === "E-Rickshaw Fare Estimator") {
      navigate('/e-rickshaw');
    } else if (service.title === "Auto Rickshaw Fare Estimator") {
      navigate('/auto');
    }
  }}>
                  {service.title === "Recommendation System" ? "Explore Now" : "Estimate Now"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How it Works Section */}
        <div ref={howItWorksRef} className="mt-28 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">How It Works</h2>
          <div className="flex flex-col gap-16 items-center">
            {[
              {
                title: " Step 1: Enter Start Location",
                desc: "Enter your current location to begin the fare estimation.",
              },
              {
                title: "Step 2: Enter your  Destination",
                desc: "Enter location where you want to reach",
              },
              {
                title: "Step 3: Fare Estimation",
                desc: "Our algorithm calculates the real-time fare based on accurate distance.",
              },
              {
                title: "Step 4: Explore More",
                desc: "Get route suggestions, alternative rides, and budget-friendly travel tips.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-black/50 border-3 border-[#9A6C6D] p-6 rounded-xl w-full max-w-2xl shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-[#FF00FF] mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
