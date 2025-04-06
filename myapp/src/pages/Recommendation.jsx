import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { SelectBudgetOptions, SelectTravelesList } from "../constants/options";

function Recommendation() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({
    location: "",
    noOfDays: "",
    budget: "",
    traveler: "",
  });
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handlePlaceSelected = (place) => {
    const address = place.formatted_address || "";
    setPlace(address);
    handleInputChange("location", address);
  };

  const OnGenerateTrip = async () => {};

  return (
<div className="w-full px-10 sm:px-10 md:px-40 lg:px-60 xl:px-72 bg-gradient-to-b from-black to-purple-900 ">
  <h2 className="text-3xl font-bold text-white  py-5">
    Tell us your travel preferences🌴🏕️
  </h2>
  <p className="mt-3 text-xl text-gray-300 ">
    Just provide some basic information, and our recommendation model will
    generate a customized itinerary based on your preferences.
  </p>

  <div className="mt-20 flex flex-col gap-10">
    {/* Destination */}
    <div>
      <h2 className="font-md text-xl my-3 text-white">
        What is destination of choice?
      </h2>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
        libraries={["places"]}
      >
        <Autocomplete onPlaceSelected={handlePlaceSelected}>
          <input
            type="text"
            placeholder="Search location"
            className="w-full py-2 px-3 border text-white border-gray-200 rounded-md bg-transparent"
            value={place || ""}
            onChange={(e) => {
              setPlace(e.target.value);
              handleInputChange("location", e.target.value);
            }}
          />
        </Autocomplete>
      </LoadScript>
    </div>

    {/* Number of days */}
    <div>
      <h2 className="font-md text-xl my-3 text-white">
        How many days are you planning your trip?
      </h2>
      <input
        placeholder="Ex. 3"
        type="number"
        className="w-full py-2 px-3 text-white border border-gray-200 rounded-md bg-transparent"
        onChange={(e) => handleInputChange("noOfDays", e.target.value)}
      />
    </div>

    {/* Budget selection */}
    <div>
      <h2 className="font-md text-xl my-3 text-white">What is your budget?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {SelectBudgetOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => handleInputChange("budget", item.title)}
            className={`p-4 border-3 cursor-pointer border-[#9A6C6D] rounded-lg hover:shadow-lg ${
              formData?.budget === item.title && "shadow-lg border-white"
            }`}
          >
            <h2 className="text-4xl">{item.icon}</h2>
            <h2 className="font-bold text-lg text-white">{item.title}</h2>
            <h2 className="text-sm text-gray-300">{item.desc}</h2>
          </div>
        ))}
      </div>
    </div>

    {/* Travel companions */}
    <div>
      <h2 className="font-md text-xl my-3 text-white">
        Who do you plan on travelling with on your next adventure?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {SelectTravelesList.map((item, index) => (
          <div
            key={index}
            onClick={() => handleInputChange("traveler", item.people)}
            className={`p-4 border-3 cursor-pointer border-[#9A6C6D] rounded-lg hover:shadow-lg ${
              formData?.traveler === item.people && "shadow-lg border-white"
            }`}
          >
            <h2 className="text-4xl">{item.icon}</h2>
            <h2 className="font-bold text-lg text-white">{item.title}</h2>
            <h2 className="text-sm text-gray-300">{item.desc}</h2>
          </div>
        ))}
      </div>
    </div>

    {/* Button */}
    <div className="my-10 flex justify-end">
      <button
        onClick={OnGenerateTrip}
        disabled={loading}
        className="bg-transparent border-3 cursor-pointer border-[#9A6C6D] text-white px-6 py-2 rounded-md font-bold hover:bg-gray-200 hover:text-black "
      >
        {loading ? "Loading..." : "Generate Trip"}
      </button>
    </div>
  </div>
</div>

  );
}

export default Recommendation;
