import { useState, useRef, useCallback } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { chatSession } from "../services/Ai";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const libraries = ["places"];
const GOOGLE_API_KEY =import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
const ERickshaw = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [fare, setFare] = useState(null);
  const [startWeather, setStartWeather] = useState(null);
  const [endWeather, setEndWeather] = useState(null);
  const [isRainyStart, setIsRainyStart] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showStartWeather, setShowStartWeather] = useState(true);

  const [startInitials, setStartInitials] = useState("");
const [endInitials, setEndInitials] = useState("");
const [startWeatherTemp, setStartWeatherTemp] = useState(""); 
const [endWeatherTemp, setEndWeatherTemp] = useState(""); 
const [startWeatherIcon, setStartWeatherIcon] = useState("☀️"); 
const [endWeatherIcon, setEndWeatherIcon] = useState("☀️");

const navigate= useNavigate();


  const startRef = useRef(null);
  const endRef = useRef(null);

  const autocompleteOptions = {
    componentRestrictions: { country: "IN" },
    types: ["geocode", "establishment"],
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchWeather = async (lat, lon, type) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (!data.current) {
        console.error("Invalid weather data received");
        return "Unknown Weather";
      }
  
      const weatherCodes = {
        0: "Clear Sky",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Foggy",
        48: "Depositing Rime Fog",
        51: "Drizzle",
        53: "Moderate Drizzle",
        55: "Heavy Drizzle",
        56: "Freezing Drizzle",
        57: "Heavy Freezing Drizzle",
        61: "Light Rain",
        63: "Moderate Rain",
        65: "Heavy Rain",
        66: "Freezing Rain",
        67: "Heavy Freezing Rain",
        71: "Light Snow",
        73: "Moderate Snow",
        75: "Heavy Snow",
        77: "Snow Grains",
        80: "Light Showers",
        81: "Moderate Showers",
        82: "Heavy Showers",
        85: "Light Snow Showers",
        86: "Heavy Snow Showers",
        95: "Thunderstorm",
        96: "Thunderstorm with Hail",
        99: "Heavy Thunderstorm with Hail",
      };
      const weatherCode = data.current.weather_code;
      const temperature = data.current.temperature_2m;
      const weatherText = weatherCodes[weatherCode] || "🌍 Unknown Weather";
  
      if (type === "start") {
        setStartWeather(weatherText);
        setStartWeatherTemp(temperature);
        setStartWeatherIcon(weatherText.split(" ")[0]); // Extract icon
      } else {
        setEndWeather(weatherText);
        setEndWeatherTemp(temperature);
        setEndWeatherIcon(weatherText.split(" ")[0]);
      }
  
      return weatherText;
    } catch (error) {
      console.error("Weather fetch error:", error);
      return "Unknown Weather";
    }
  };
  

  const getInitials = (address) => {
    return address.split(" ").map((word) => word[0]).join("").toUpperCase();
  };
  
  const handlePlaceSelect = useCallback(async (type) => {
    let ref = type === "start" ? startRef.current : endRef.current;
    if (ref) {
      const place = ref.getPlace();
      if (place && place.geometry) {
        if (!place.formatted_address.includes("Delhi")) {
          alert("Please select a place within Delhi.");
          return;
        }
        const coords = {
          lat: place.geometry.location.lat(),
          lon: place.geometry.location.lng(),
        };
  
        if (type === "start") {
          setStart(place.formatted_address);
          setStartCoords(coords);
          setStartInitials(getInitials(place.formatted_address)); // ✅ Set initials
          await fetchWeather(coords.lat, coords.lon, "start");
        } else {
          setEnd(place.formatted_address);
          setEndCoords(coords);
          setEndInitials(getInitials(place.formatted_address)); // ✅ Set initials
          await fetchWeather(coords.lat, coords.lon, "end");
        }
      }
    }
  }, []);
  

  const calculateFare = (distance, isRainy) => {
    let baseFare = 10;
    if (distance > 3) {
      baseFare += (distance - 3) * 10;
    }
    if (isRainy) baseFare *= 1.1;
    return Math.round(baseFare);
  };

  const findFare = () => {
    const isLoggedIn = JSON.parse(localStorage.getItem("auth"));
    if (!isLoggedIn.user) {
      navigate("/login");
    }
    if (startCoords && endCoords) {
      const dist = getDistance(
        startCoords.lat,
        startCoords.lon,
        endCoords.lat,
        endCoords.lon
      );
      setDistance(dist.toFixed(2));
      setFare(calculateFare(dist, isRainyStart));
      setShowResults(true);
    } else {
      alert("Please select valid locations from autocomplete.");
    }
  };

  const getRoute = async () => {
    const isLoggedIn = JSON.parse(localStorage.getItem("auth"));
    if (!isLoggedIn.user) {
      navigate("/login");
    }else{
      toast.success("Generating the best route");
      const AI_PROMPT = "Give the best rickshaw-only travel route from {start} to {end}.Prioritize direct rickshaw routes where possible.If a direct route is not feasible, provide the best two-step or multi-step route using well-known rickshaw transfer points.Include only major auto-rickshaw stops where passengers commonly switch autos.if the distancce is more then you can give a mix of metro, buses  route and other transport modes.Mention:The exact route with major stops.Fare per segment and total fare.Total travel time.If the route has a transfer, specify where to change rickshaws and why it's the best option. Also tell the location from where  to take the rikcshaw in start location and also tell the from where to change the rickshaw if there is any change in rickshaw Provide a real image of the end location. At last tell the important points or key points about the travelling or negotiation tips for the user. Give all thing in json format";
    
      const FINAL_PROMPT = AI_PROMPT.replace("{start}", start).replace("{end}", end);
    
      try {
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        const routeResponse = await result?.response?.text();
    
        if (routeResponse) {
          console.log(routeResponse);
          const existingRoutes = JSON.parse(localStorage.getItem("routes")) || [];
          const updatedRoutes = [...existingRoutes, { start, end, route: routeResponse }];
          localStorage.setItem("routes", JSON.stringify(updatedRoutes));
    
          // Navigate to view route page
          navigate("/erickshaw-ride");
        } else {
          toast.error("Failed to find a route.");
        }
      } catch (error) {
        console.error("Error fetching route:", error);
        toast.error("An error occurred while finding the route.");
      }
    }
   
  };
  

  
  return (
    <div className="w-full sm:px-10 md:px-32 lg:px-56 xl:px-10 bg-gradient-to-b from-black to-purple-900">
      <h2 className="font-bold text-2xl py-5 text-white px-14">
      Go <span className="text-[#00FF66]">Green</span>, Ride <span className="text-[#FF00FF]">Smart</span> – Get Your <span className="text-[#FF00FF]">E- Rickshaw</span> Fare Instantly!
      </h2>
      <p className="mt-3 text-gray-500 px-14">
        Just provide information about your start and end location, and we will provide an estimated fare.
      </p>

      <div className="w-full flex flex-col items-center p-6 min-h-screen mt-8 text-white">
        <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={libraries}>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="p-6 rounded-lg w-[650px] h-[450px] shadow-lg border-5 border-[#9A6C6D] bg-gradient-to-b from-black to-purple-900">
              <h1 className="text-3xl font-bold mb-6 mt-6 text-center text-white">E-Rickshaw Fare</h1>

              <h1 className="text-white font-semibold mt-5">📍 Pickup Point</h1>
              <Autocomplete onLoad={(ref) => (startRef.current = ref)} onPlaceChanged={() => handlePlaceSelect("start")}>
                <input
                  type="text"
                  placeholder="Enter Start Location"
                  className="p-2 rounded w-11/12 mt-1 border-3 text-white border-white bg-transparent"
                />
              </Autocomplete>

              <label className="text-white font-semibold mt-4 block">📍 Destination</label>
              <Autocomplete onLoad={(ref) => (endRef.current = ref)} onPlaceChanged={() => handlePlaceSelect("end")}>
                <input
                  type="text"
                  placeholder="Enter Destination"
                  className="w-11/12 p-2 rounded text-white mt-1 border-3 border-white bg-transparent"
                />
              </Autocomplete>

              <button
                onClick={findFare}
                className="bg-yellow-500 w-2/3 mx-auto mt-10 text-black border-3  cursor-pointer rounded-lg border-black px-6 py-2 font-bold block"
              >
                Find Fare
              </button>
            </div>

            <div className="flex justify-center">
              {showResults ? (
                <div className="relative w-lg mt-10">
                  <img src="/ticket2.jpg" alt="Rickshaw Ticket" className="w-full rounded-lg shadow-lg" />
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-md font-bold text-black bg-transparent p-2 w-64">
                    <h1 className="text-md font-extrabold text-black px-15 mt-4 mb-4">Estimated Fare</h1>
                    <div className="flex mx-5 gap-20 w-full">
                      <span>Base Fare</span>
                      <span>₹10</span>
                    </div>
                    <div className="flex mx-5 gap-14 w-full mt-2">
                      <span>Per Km Rate</span>
                      <span>₹10</span>
                    </div>
                    <div className="border-t-2 border-black w-5/6 mx-auto mt-2"></div> 
                    <div className="flex mx-5 gap-19 w-full mt-2">
                      <span>Total Fare</span>
                      <span>₹{fare}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <img src="/batteryRickshaw2.jpg" alt="Rickshaw" className=" rounded-lg w-8/12 shadow-lg" />
              )}
            </div>
          </div>

          {showResults && (
  <div
    className="absolute top-20 right-40 w-36 h-32 cursor-pointer bg-opacity-50 backdrop-blur-lg bg-white/20 rounded-lg shadow-lg flex flex-col items-center justify-center text-center p-4 transition-all duration-500 hover:scale-105"
    onClick={() => setShowStartWeather((prev) => !prev)}
  >
    {showStartWeather ? (
      <>
        <h3 className="text-md font-bold">Start Location</h3>
        <p className="text-sm font-medium">{startWeather}</p>
        <p className="text-sm font-medium">{startWeatherTemp}°C</p>
      </>
    ) : (
      <>
        <h3 className="text-md font-bold">End Location</h3>
        <p className="text-sm font-medium">{endWeather}</p>
        <p className="text-sm font-medium">{endWeatherTemp}°C</p>
      </>
    )}
  </div>
)}

<div className="justify-end flex w-full">
  {showResults && 
  (
    <button
      onClick={getRoute}
      className="bg-tranparent border-2 hover:bg-[#ffcc00] hover:text-white  hover:border-3 border-[#9A6C6D] text-white px-6 py-2 rounded-lg cursor-pointer mx-24 font-bold mt-6 shadow-md"
    >
      Get Route
    </button>
  )
  }
</div>

        </LoadScript>
      </div>
    </div>


  );
};
export default ERickshaw;