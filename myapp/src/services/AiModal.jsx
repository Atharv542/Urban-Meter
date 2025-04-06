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
                {text: "Give the best rickshaw-only travel route from Shahdara Metro Station to Dr. Akhilesh Das Gupta Institute of Technology & Management.Prioritize direct rickshaw routes where possible.If a direct route is not feasible, provide the best two-step or multi-step route using well-known rickshaw transfer points.Include only major auto-rickshaw stops where passengers commonly switch autos.if the distancce is more then you can give a mix of metro, buses  route and other transport modes.Mention:The exact route with major stops.Fare per segment and total fare.Total travel time.If the route has a transfer, specify where to change rickshaws and why it's the best option. Also tell the location from where  to take the rikcshaw in start location and also tell the from where to change the rickshaw if there is any change in rickshaw Provide a real image of the end location. At last tell the important points or key points about the travelling or negotiation tips for the user. Give all thing in json format"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "```json\n{\n  \"route\": {\n    \"name\": \"Shahdara Metro Station to Dr. Akhilesh Das Gupta Institute of Technology & Management\",\n    \"description\": \"A combined auto-rickshaw and metro route prioritizing speed and cost-effectiveness.\",\n    \"segments\": [\n      {\n        \"mode\": \"Auto-Rickshaw\",\n        \"from\": \"Shahdara Metro Station (Rickshaw Stand outside Gate)\",\n        \"to\": \"Welcome Metro Station\",\n        \"fare\": 50,\n        \"time\": \"15-20 minutes\",\n        \"instructions\": \"Exit Shahdara Metro Station from any gate and head to the auto-rickshaw stand. Tell the driver you want to go to Welcome Metro Station.\"\n      },\n      {\n        \"mode\": \"Metro\",\n        \"from\": \"Welcome Metro Station\",\n        \"to\": \"Kashmere Gate Metro Station\",\n        \"fare\": 20,\n        \"time\": \"10 minutes\",\n        \"line\": \"Red Line\",\n        \"instructions\": \"Take the Red Line metro towards Kashmere Gate.\"\n      },\n     {\n        \"mode\": \"Metro\",\n        \"from\": \"Kashmere Gate Metro Station\",\n        \"to\": \"Shastri Park Metro Station\",\n        \"fare\": 20,\n        \"time\": \"5 minutes\",\n        \"line\": \"Red Line\",\n        \"instructions\": \"Take the Red Line metro towards Rithala.\"\n      },\n      {\n        \"mode\": \"Auto-Rickshaw\",\n        \"from\": \"Shastri Park Metro Station (Rickshaw Stand outside Gate)\",\n        \"to\": \"Dr. Akhilesh Das Gupta Institute of Technology & Management\",\n        \"fare\": 50,\n        \"time\": \"10-15 minutes\",\n        \"instructions\": \"Exit Shastri Park Metro Station and take an auto-rickshaw to DAGITM. Negotiate the fare before starting.\"\n      }\n    ],\n    \"total_fare\": 140,\n    \"total_time\": \"40-50 minutes\"\n  },\n  \"end_location\": {\n    \"name\": \"Dr. Akhilesh Das Gupta Institute of Technology & Management\",\n    \"image\": \"https://www.jagannath.university/wp-content/uploads/2020/05/jagannath-international-management-school.jpg\"\n  },\n  \"important_points\": [\n    \"Negotiate auto-rickshaw fares before starting the journey. Fares mentioned are estimates and may vary.\",\n    \"During peak hours, auto-rickshaw availability may be limited at Shahdara Metro and Shastri Park. You might need to wait.\",\n    \"Using the metro significantly reduces travel time compared to relying solely on auto-rickshaws.\",\n    \"Be aware of your surroundings and keep your belongings safe.\",\n    \"Consider using ride-sharing apps like Ola or Uber for potentially faster and more reliable transportation, although costs might be higher.\"\n  ],\n     \"negotiation_tips\": [\n        \"Always ask for the fare before getting in the rickshaw.\",\n        \"Know the approximate distance to your destination to gauge a fair price.\",\n        \"Be firm but polite in your negotiation.\",\n        \"If the driver refuses to negotiate to a reasonable price, try another rickshaw.\",\n        \"Consider using online maps to show the driver the route you want to take.\"\n    ]\n}\n```"},
              ],
            },
          ],
        });


  
