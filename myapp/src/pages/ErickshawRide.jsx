import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ErickshawRide = () => {
  const [trip, setTrip] = useState(null);
  const [userStartLocation, setUserStartLocation] = useState("");
  const [userendLocation, setUserendLocation] = useState("");

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
        setUserendLocation(latestTrip.end);
        
      }
    }
  }, []);

  if (!trip) {
    return <p className="text-gray-500 text-center mt-10">Loading route details...</p>;
  }

  const origin = encodeURIComponent(userStartLocation);
  const destination = encodeURIComponent(userendLocation);

  const timelineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="w-full sm:px-10 md:px-32 lg:px-56 xl:px-10 bg-gradient-to-b from-black to-purple-900 text-white py-10">
      {/* Destination Image */}
      {trip.end_location?.image && (
        <img 
          src={trip.end_location.image} 
          alt={trip.end_location.name || "Destination"} 
          className="w-full h-64 object-cover  rounded-lg mb-6"
        />
      )}

      {/* Destination Name */}
      <h2 className="text-3xl font-bold text-white">{trip.end_location?.name}</h2>
      <p className="text-gray-300 mt-2">{trip.description}</p>

      {/* How to Travel Section */}
      <h3 className="text-2xl font-semibold mt-8 text-white">How to Travel</h3>
      <div className="relative border-l-4 border-purple-500 w-2xl mt-6 space-y-6">
        {trip.detailed_route?.map((segment, index) => (
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
              <span className="text-gray-400">From:</span> {segment.start_point} → <span className="text-gray-400">To:</span> {segment.end_point}
            </p>

            {/* Instructions Heading */}
            <h4 className="text-lg font-semibold mt-3 text-white">Instructions:</h4>

            {/* Instructions Animated Step by Step */}
            <div className="mt-2 space-y-1">
              {segment.route_description.split('. ').map((sentence, i) => (
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

            {/* Estimated Time and Fare */}
            <p className="text-gray-200 font-medium mt-3">⏳ <strong>Estimated Time:</strong> {segment.travel_time}</p>
          </motion.div>
        ))}
      </div>

      {/* Google Maps Route */}
      <h3 className="text-xl font-semibold mt-6 text-white">Route Preview</h3>
      <div className="mt-7 flex w-3xl">
        <iframe 
          width="80%" 
          height="300" 
          frameBorder="0" 
          style={{ borderRadius: "10px" }}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBs8XHMd35PE93DdOExZiKQoANedoPhHn8&origin=${origin}&destination=${destination}&mode=driving`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ErickshawRide;


