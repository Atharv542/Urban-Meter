// GoogleContacts.js
import React, { useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID =
  "827556858367-o16prqd900voc4avps423mbtlugi203g.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/contacts.readonly";

const GoogleContacts = () => {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPES,
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const handleLogin = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        gapi.client.people.people.connections
          .list({
            resourceName: "people/me",
            personFields: "names,emailAddresses,phoneNumbers",
          })
          .then((response) => {
            console.log("Full Response:", response);

            const connections = response?.result?.connections;
            if (connections && connections.length > 0) {
              console.log("Contacts:", connections);
            } else {
              console.warn("No contacts found or response was undefined.");
            }
          })
          .catch((error) => {
            console.error("Error fetching contacts:", error);
          });
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
      });
  };

  return (
    <div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Import Google Contacts
      </button>
    </div>
  );
};

export default GoogleContacts;

