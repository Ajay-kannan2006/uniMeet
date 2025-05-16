import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import peer from "../service/peer";
import { Mic, MicOff, Video, VideoOff, Phone } from "lucide-react";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);

    if (peer.peer.getSenders().length === 0) {
      for (const track of stream.getTracks()) {
        peer.peer.addTrack(track, stream);
      }
    }

    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
  }, [socket, remoteSocketId]);

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      if (!peer) {
        console.warn("Peer not ready yet");
        return;
      }
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      setMyStream(stream);
      console.log("incoming call", from, offer);
      const ans = await peer.getAnswer(offer);
      console.log(ans);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    async ({ from, ans }) => {
      await peer.peer.setRemoteDescription(ans);
      console.log("Call Accepted");
      sendStreams();
    },
    [myStream, sendStreams]
  );

  const handleNegotiationNedded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [socket, remoteSocketId]);

  const handleNegoNeedIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      console.log();
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  const handleToggleMic = () => {
    if (myStream) {
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMicOn(!isMicOn);
    }
  };

  const handleToggleVideo = () => {
    if (myStream) {
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOn(!isVideoOn);
    }
  };

  useEffect(() => {
    if (!peer) return;
    peer.peer.addEventListener("negotiationneeded", handleNegotiationNedded);
    return () => {
      peer.peer.removeEventListener(
        "negotiationneeded",
        handleNegotiationNedded
      );
    };
  }, [peer]);

  const handleTrackEvent = useCallback(async (en) => {
    const remoteStream = en.streams;
    console.log("got Tracks");
    setRemoteStream(remoteStream[0]);
  }, []);

  useEffect(() => {
    if (!peer) return;
    peer.peer.addEventListener("track", handleTrackEvent);
    return () => {
      peer.peer.removeEventListener("track", handleTrackEvent);
    };
  });

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncoming);
    socket.on("handle:nego:final", handleNegoFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncoming);
      socket.off("peer:nego:final", handleNegoFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeedIncoming,
    handleNegoFinal,
  ]);

  return (
    <div className="w-screen h-screen bg-[#F5F7FA] flex flex-col items-center justify-center p-4">
      {/* Videos */}
      <div className="flex gap-4 w-full max-w-5xl h-[70vh]">
        {/* Local Video */}
        <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-md relative">
          {myStream ? (
            <video
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              ref={(video) => {
                if (video) video.srcObject = myStream;
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p>Your camera will appear here</p>
            </div>
          )}
          <div className="absolute bottom-2 left-2 text-white text-sm bg-[#0A2647] px-2 py-1 rounded">
            You
          </div>
        </div>

        {/* Remote Video */}
        <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-md relative">
          {remoteStream && (
            <video
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              ref={(video) => {
                if (video) video.srcObject = remoteStream;
              }}
            />
          )}
          {remoteSocketId ? (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <button
                onClick={handleCallUser}
                className="bg-[#0A2647] text-white px-4 py-2 rounded-lg"
              >
                Call User
              </button>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p>Waiting for someone to join...</p>
            </div>
          )}
          <div className="absolute bottom-2 left-2 text-white text-sm bg-[#0A2647] px-2 py-1 rounded">
            {remoteSocketId ? "Remote User" : "No one in room"}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center gap-6">
        {/* Mic */}
        <button
          onClick={handleToggleMic}
          className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          {isMicOn ? (
            <Mic size={26} color="#0A2647" />
          ) : (
            <MicOff size={26} color="#0A2647" />
          )}
        </button>

        {/* Video */}
        <button
          onClick={handleToggleVideo}
          className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          {isVideoOn ? (
            <Video size={26} color="#0A2647" />
          ) : (
            <VideoOff size={26} color="#0A2647" />
          )}
        </button>

        {/* End Call */}
        <button className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition">
          <Phone size={26} color="white" />
        </button>
      </div>
    </div>
  );
};

export default RoomPage;
