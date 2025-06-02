import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { FaPhone, FaPhoneSlash, FaCopy } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as faceapi from 'face-api.js';

const VideoCall = () => {
  const [stream, setStream] = useState();
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const { callId } = useParams();
  const [emotion, setEmotion] = useState('');


const socket = io("https://video-call-backend-y8v1.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
});

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; // Ensure models are in public/models
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };
  
    loadModels();
  }, []);
  useEffect(() => {
    let interval;
    if (myVideo.current) {
      interval = setInterval(async () => {
        const detections = await faceapi
          .detectSingleFace(myVideo.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();
  
        if (detections?.expressions) {
          const maxEmotion = Object.entries(detections.expressions).reduce((a, b) =>
            a[1] > b[1] ? a : b
          );
          setEmotion(maxEmotion[0]);
        }
      }, 1000);
    }
  
    return () => clearInterval(interval);
  }, [myVideo]);
  
  

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      if (myVideo.current) myVideo.current.srcObject = stream;
    });

    socket.on("connect", () => {
      setMe(socket.id);
    });

    socket.on("incomingCall", (data) => {
      setCall({
        isReceivingCall: true,
        from: data.from,
        name: data.name,
        signal: data.signal,
      });
    });

    if (callId) {
      setTimeout(() => {
        callUser(callId);
      }, 1000);
    }
  }, [callId]);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (targetId) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: targetId,
        signalData: data,
        from: me,
        name: "User",
      });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy();
    window.location.reload();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/video-call/${me}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-indigo-300 p-6 text-indigo-900">
      <h1 className="text-4xl font-bold mb-6">📞 Emo Call</h1>

      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          className="w-72 h-52 bg-black rounded-lg shadow-lg border-2 border-indigo-500"
        />
        {callAccepted && !callEnded ? (
          <video
            playsInline
            ref={userVideo}
            autoPlay
            className="w-72 h-52 bg-black rounded-lg shadow-lg border-2 border-green-500"
          />
        ) : (
          <div className="w-72 h-52 flex items-center justify-center text-sm text-gray-600 border-2 border-dashed border-gray-400 rounded-lg">
            Waiting for other user...
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-3 mb-6">
        <label className="font-medium">Share this call link:</label>
        <div className="flex items-center gap-2">
          <input
            readOnly
            value={`${window.location.origin}/video-call/${me}`}
            className="w-72 px-3 py-2 border rounded-md text-center shadow"
          />
          <button
            onClick={copyLink}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md"
            title="Copy Link"
          >
            <FaCopy />
          </button>
        </div>
      </div>

      {call.isReceivingCall && !callAccepted && (
        <div className="bg-white p-6 rounded-md shadow-md text-center mb-6">
          <h2 className="text-lg font-semibold mb-2">{call.name || "Someone"} is calling...</h2>
          <button
            onClick={answerCall}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Answer
          </button>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => callUser(callId || "")}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md flex items-center gap-2"
        >
          <FaPhone /> Call
        </button>
        <button
          onClick={leaveCall}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md flex items-center gap-2"
        >
          <FaPhoneSlash /> End Call
        </button>
      </div>
       
      <div className="bg-white px-4 py-2 rounded shadow text-indigo-800 font-bold absolute bottom-4 left-4">
        Current Emotion: {emotion.toUpperCase()}
      
      </div>
    </div>
    
    
    
  );
};

export default VideoCall;

