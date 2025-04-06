import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AutoRide = () => {
  const [trip, setTrip] = useState(null);
  const [userStartLocation, setUserStartLocation] = useState("");
  const [endLocationImage, setEndLocationImage] = useState(null);

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
 

  useEffect(() => {
    const savedRoutes = JSON.parse(localStorage.getItem("routes")) || [];

    if (savedRoutes.length > 0) {
      let latestTrip = savedRoutes[savedRoutes.length - 1];

      try {
        const cleanedRoute = latestTrip.route.replace(/```json\n|\n```/g, "").trim();
        latestTrip.route = JSON.parse(cleanedRoute);
      } catch (error) {
        console.error("Error parsing route JSON:", error);
      }

      setTrip(latestTrip.route);

      if (latestTrip.start) {
        setUserStartLocation(latestTrip.start);
      }

      console.log("Trip Data:", latestTrip.route);
      console.log("End Location:", latestTrip.route?.end_location);
    }
  }, []);


  

  if (!trip) {
    return <p className="text-gray-500 text-center mt-10">Loading route details...</p>;
  }

  const origin = encodeURIComponent(userStartLocation);
  const destination = encodeURIComponent(trip.end_location?.name);
  const googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${destination}&zoom=15&size=600x300&markers=color:red%7C${destination}&key=${GOOGLE_API_KEY}`;

  const timelineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.5, ease: "easeOut" },
    }),
  };
  

  return (
    <div className="w-full sm:px-10 md:px-32 lg:px-56 xl:px-24 bg-gradient-to-b from-black to-purple-900 text-white py-10">
      <h2 className="text-3xl font-bold text-white">{trip.end_location?.name}</h2>
      <p className="text-gray-300 mt-2">{trip.route?.description}</p>

      {/* How to Travel Section */}
      <h3 className="text-2xl font-semibold mt-8 text-white">How to Travel</h3>
      <div className="relative border-l-4 border-purple-500 w-2xl mt-6 space-y-6">
        {trip.route?.segments?.map((segment, index) => (
          <motion.div 
            key={index} 
            className="relative pl-6 bg-gray-800 p-4 rounded-lg shadow-lg"
            custom={index}
            variants={timelineVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-3 top-5 w-6 h-6 bg-purple-500 rounded-full border-4 border-gray-800"></div>

            {/* From & To Locations */}
            <p className="text-sm font-medium text-gray-300">
              <span className="text-gray-400">From:</span> {segment.from} → <span className="text-gray-400">To:</span> {segment.to}
            </p>

            {/* Instructions Heading */}
            <h4 className="text-lg font-semibold mt-3 text-white">Instructions:</h4>

            {/* Instructions Animated Step by Step */}
            <div className="mt-2 space-y-1">
              {segment.instructions.split('. ').map((sentence, i) => (
                <motion.p
                  key={i}
                  className="text-gray-200"
                  custom={index * 4 + i + 1}
                  variants={timelineVariants}
                  initial="hidden"
                  animate="visible"
                >
                  • {sentence}.
                </motion.p>
              ))}
            </div>

            {/* Estimated Time */}
            <p className="text-gray-200 font-medium mt-3">
              ⏳ <strong>Estimated Time:</strong> {segment.time}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Google Maps Route */}
      <h3 className="text-xl font-semibold mt-6 text-white">Route Preview</h3>
      <div className="mt-7 flex w-3xl relative">
        {/* Transparent overlay for click */}
        <div
          className="absolute top-0 left-0 w-full h-full cursor-pointer"
          onClick={() => window.open(googleMapsLink, "_blank")}
        ></div>

        <iframe 
          width="80%" 
          height="300" 
          frameBorder="0" 
          style={{ borderRadius: "10px" }}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_API_KEY}&origin=${origin}&destination=${destination}&mode=driving`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default AutoRide;




















