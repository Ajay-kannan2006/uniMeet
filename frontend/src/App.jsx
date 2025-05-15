import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import HomePage from "./Home";
import MeetingsPage from "./Meetings";
import VideoCallUI from "./VideoCallUI";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";

function App() {
  const navigate = useNavigate();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === "m" || e.key === "M") && !e.repeat) {
        SpeechRecognition.startListening({ continuous: true });
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "m" || e.key === "M") {
        SpeechRecognition.stopListening();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const command = transcript.toLowerCase();
    // console.log(1, command, 1);

    if (command.includes("go to sign up")) {
      // console.log(1);

      navigate("/signup");
      resetTranscript();
    } else if (command.includes("go to login")) {
      navigate("/login");
      resetTranscript();
    } else if (command.includes("go to home")) {
      navigate("/home");
      resetTranscript();
    } else if (command.includes("go to meetings")) {
      navigate("/meetings");
      resetTranscript();
    }
  }, [transcript, navigate, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LobbyScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/meetings" element={<MeetingsPage />} />
        {/* <Route path="/room/:roomId" element={<VideoCallUI />} /> */}
        {/* <Route path="/try" element={<Summa />} /> */}
        <Route path="/lobby" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </>
  );
}

export default App;
