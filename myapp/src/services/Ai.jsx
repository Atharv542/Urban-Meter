import { GoogleGenerativeAI } from "@google/generative-ai";
    
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Give the best e-rickshaw-only travel route from Shahdara Metro Station to Dr. Akhilesh Das Gupta Institute of Technology & Management.Prioritize direct rickshaw routes where possible.If a direct route is not feasible, provide the best two-step or multi-step route using well-known rickshaw transfer points.Include only major auto-rickshaw stops where passengers commonly switch autos.if the distancce is more then you can give a mix of metro, buses  route and other transport modes.Mention:The exact route with major stops.Fare per segment and total fare.Total travel time.If the route has a transfer, specify where to change rickshaws and why it's the best option. Also tell the location from where  to take the rikcshaw in start location and also tell the from where to change the rickshaw if there is any change in rickshaw Provide a real image of the end location. At last tell the important points or key points about the travelling or negotiation tips for the user. Give all thing in json format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"route_name\": \"Shahdara Metro Station to Dr. Akhilesh Das Gupta Institute of Technology & Management (ADGITM) - E-Rickshaw & Public Transport Route\",\n  \"description\": \"This route utilizes a combination of e-rickshaw and public transport to efficiently reach ADGITM from Shahdara Metro Station. Direct e-rickshaws are not readily available for the entire distance, making a combined approach optimal.\",\n  \"route_summary\": {\n    \"total_fare\": \"₹35 - ₹55 (approximate)\",\n    \"total_travel_time\": \"45-60 minutes (approximate, depending on traffic and wait times)\",\n    \"modes_of_transport\": [\"E-Rickshaw\", \"Metro\",\"DTC Bus\"],\n    \"transfer_points\": [\"Shahdara Metro Station\",\"Welcome Metro Station\"]\n  },\n  \"detailed_route\": [\n    {\n      \"step\": 1,\n      \"mode\": \"E-Rickshaw\",\n      \"start_point\": \"Shahdara Metro Station (E-Rickshaw Stand - Exit towards Shahdara)\",\n      \"end_point\": \"Welcome Metro Station\",\n      \"route_description\": \"Take an e-rickshaw from the designated stand outside Shahdara Metro Station (typically near the main exit towards the Shahdara locality). Inform the driver you want to go to Welcome Metro Station.\",\n      \"fare\": \"₹10-₹20 (negotiable)\",\n      \"travel_time\": \"10-15 minutes\",\n      \"transfer_information\": \"Alight at Welcome Metro Station. Proceed to the Metro platform.\"\n    },\n    {\n      \"step\": 2,\n      \"mode\": \"Metro\",\n      \"start_point\": \"Welcome Metro Station\",\n      \"end_point\": \"Kashmere Gate Metro Station\",\n      \"route_description\": \"Take Red Line Metro from Welcome towards Kashmere Gate\",\n      \"fare\": \"₹20\",\n      \"travel_time\": \"10-15 minutes\",\n      \"transfer_information\": \"Alight at Kashmere Gate Metro Station. Proceed to the Bus station.\"\n    },\n     {\n      \"step\": 3,\n      \"mode\": \"DTC Bus\",\n      \"start_point\": \"Kashmere Gate Bus Terminal\",\n      \"end_point\": \"Near ADGITM (Azad Hind Gram)\",\n      \"route_description\": \"From Kashmere Gate Bus Terminal, board a DTC bus heading towards Bawana or Narela. Ask the conductor for the stop nearest to ADGITM, typically around Azad Hind Gram. Buses like 171, 169, 101B, etc. often ply on this route.\",\n      \"fare\": \"₹10-₹15\",\n      \"travel_time\": \"20-30 minutes\",\n      \"transfer_information\": \"Alight at the bus stop near Azad Hind Gram. ADGITM is a short walk or e-rickshaw ride from there.\"\n    }\n\n  ],\n  \"end_location_image\": \"https://www.adgitmdelhi.ac.in/wp-content/uploads/2020/05/ADGITM-Building-min.jpg\",\n  \"important_points\": [\n    \"E-rickshaw fares are generally negotiable, especially during off-peak hours. Confirm the fare before starting your journey.\",\n    \"During peak hours (morning and evening rush), allow extra travel time due to traffic congestion.\",\n    \"Always be aware of your belongings, especially when using public transport.\",\n    \"Ask locals for directions if you are unsure of the route or bus numbers.\",\n    \"Consider using ride-sharing apps (Ola, Uber) for the final leg from the bus stop to ADGITM if desired, but e-rickshaws are typically readily available.\"\n  ],\n  \"negotiation_tips\": [\n    \"Ask a local about the typical e-rickshaw fare for the route to get a baseline.\",\n    \"Negotiate politely and firmly.\",\n    \"If the driver is unwilling to negotiate, you can try another e-rickshaw.\",\n    \"Consider offering a slightly higher fare during peak hours when demand is high.\"\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
  
  