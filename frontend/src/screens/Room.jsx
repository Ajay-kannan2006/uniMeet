import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../service/peer";
const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  // console.log("remoteStream", remoteStream);
  // console.log("remoteSocketId", remoteSocketId);
  // console.log("myStream", myStream);
  // console.log("remoteStream", remoteStream);

  // const [peer, setPeer] = useState(null);

  console.log(peer);

  // useEffect(() => {
  //   const initPeer = async () => {
  //     const initializedPeer = await peerService.init();
  //     setPeer(initializedPeer);
  //   };
  //   initPeer();
  // }, []);

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

  useEffect(() => {
    if (!peer) {
      return;
    }
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
    if (!peer) {
      return;
    }
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
    <div>
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      {myStream && (
        <>
          <h2>My Video</h2>
          <video
            autoPlay
            muted
            playsInline
            ref={(video) => {
              if (video) video.srcObject = myStream;
            }}
            width="300"
            height="200"
          />
        </>
      )}

      {remoteStream && (
        <>
          <h2>Remote Video</h2>
          <video
            autoPlay
            playsInline
            ref={(video) => {
              if (video) video.srcObject = remoteStream;
            }}
            width="300"
            height="200"
          />
        </>
      )}
    </div>
  );
};

export default RoomPage;
