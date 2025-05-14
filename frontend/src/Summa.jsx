import { useCallback, useEffect, useState } from "react";
// import { useSocket } from "./providers/Sockets";
import { useNavigate } from "react-router-dom";

const Summa = () => {
  // const { socket } = useSocket();
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  // const handleRoomJoined = useCallback(
  //   ({ roomId }) => {
  //     console.log("room Joined", roomId);
  //     navigate(`/room/${roomId}`);
  //   },
  //   [navigate]
  // );
  // const handleJoinRoom = useCallback(
  //   (data) => {
  //     const { emailId, roomId } = data;
  //     console.log(emailId, roomId);

  //     // socket.emit("join-room", { emailId: email, roomId });
  //   },
  //   [socket, email, roomId]
  // );
  // useEffect(() => {
  //   socket.on("room:join", handleJoinRoom);
  //   return () => {
  //     socket.off("room:join", handleJoinRoom);
  //   };
  // }, [socket, handleJoinRoom]);

  // useEffect(() => {
  //   socket.on("joined-room", handleRoomJoined);
  //   return () => {
  //     socket.off("room-joined", handleRoomJoined);
  //   };
  // }, [socket, handleRoomJoined]);

  return (
    <>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Room Code"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button>Enter Room</button>
    </>
  );
};

export default Summa;
