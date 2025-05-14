import { useCallback, useEffect, useState } from "react";
import MainImage from "./assets/man-with-headset-video-call.jpg";
import Others from "./assets/others.jpg";
import Other2 from "./assets/medium-shot-smiley-man-wearing-headphones.jpg";
import Other3 from "./assets/portrait-smiley-woman-waving.jpg";
import { Captions, Check, Mic, Phone, Video, X } from "lucide-react";
// import { useSocket } from "./providers/Sockets";
// import { usePeer } from "./providers/Peer";
import ReactPlayer from "react-player";

const VideoCallUI = () => {
  const [activeTab, setActiveTab] = useState("participants");
  // const { socket } = useSocket();
  // const {
  //   peer,
  //   createOffer,
  //   createAnswer,
  //   setRemoteAns,
  //   sendStream,
  //   remoteStream,
  // } = usePeer();
  // const [myStream, setMyStream] = useState(null);

  // const handleNewUserJoined = useCallback(
  //   async (data) => {
  //     const { emailId } = data;
  //     console.log("new User Joined room", emailId);
  //     const offer = await createOffer();
  //     socket.emit("call-user", { emailId, offer });
  //   },
  //   [createOffer, socket]
  // );

  // const handleIncomingCall = useCallback(
  //   async (data) => {
  //     const { from, offer } = data;
  //     console.log("Incoming Call from", from, offer);
  //     const ans = await createAnswer(offer);
  //     socket.emit("call-accepted", { emailId: from, ans });
  //   },
  //   [createAnswer, socket]
  // );

  // const handleCallAccepted = useCallback(async (data) => {
  //   const { ans } = data;
  //   console.log("Call Answer got it");
  //   await setRemoteAns(ans);
  //   sendStream(myStream);
  // }, []);

  // const getUserMediaStream = useCallback(async () => {
  //   const stream = await navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //     video: true,
  //   });
  //   setMyStream(stream);
  // }, [sendStream]);

  // useEffect(() => {
  //   socket.on("user-joined", handleNewUserJoined);
  //   socket.on("incoming-call", handleIncomingCall);
  //   socket.on("call-accepted", handleCallAccepted);

  //   return () => {
  //     socket.off("user-joined", handleNewUserJoined);
  //     socket.off("incoming-call", handleIncomingCall);
  //     socket.off("call-accepted", handleCallAccepted);
  //   };
  // }, [socket, handleIncomingCall, handleNewUserJoined, handleCallAccepted]);

  // useEffect(() => {
  //   getUserMediaStream();
  // }, [getUserMediaStream]);
  const participants = [
    { id: 1, name: "Alicia Padlock", img: Others },
    { id: 2, name: "Sri Veronica", img: Other2 },
    { id: 3, name: "Corbyn Stefan", img: Other3 },
    { id: 4, name: "John Doe", img: Others },
    { id: 5, name: "John Doe", img: Other2 },
    { id: 6, name: "John Doe", img: Other3 },
  ];

  return (
    <>
      {/* <ReactPlayer url={myStream} playing muted />
      <ReactPlayer url={remoteStream} playing /> */}
    </>
    // <div className="bg-[var(--neutral-color)] w-[100vw] h-[100vh] flex flex-wrap items-center justify-center">
    //   {/* Header */}
    //   <div className="h-[70px] w-[98vw] rounded-[50px] flex justify-center gap-120 items-center bg-[var(--primary-color)]">
    //     <h1 className="text-4xl font-medium text-[var(--secondary-color)]">
    //       Ajay's Meeting Room
    //     </h1>
    //     <div
    //       className="bg-[var(--neutral-color)] h-[50px] w-[40vw] rounded-[50px] flex  justify-between items-center "
    //       style={{ padding: "10px" }}
    //     >
    //       <p>
    //         <b>Andrew</b> want to join the meeting
    //       </p>
    //       <div className="h-auto w-auto flex gap-1">
    //         <div className="h-11 w-11 rounded-full bg-red-700 flex justify-center items-center hover:cursor-pointer">
    //           <X size={24} color="white" strokWidth={35} />
    //         </div>
    //         <div className="h-11 w-11 rounded-full bg-[var(--primary-color)] flex justify-center items-center hover:cursor-pointer">
    //           <Check size={24} color="white" />
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Main Content */}
    //   <div className="bg-[var(--secondary-color)] h-[calc(100vh-100px)] w-[98vw] rounded-lg flex items-center justify-evenly flex-wrap">
    //     {/* Video Section */}
    //     <div className="bg-[var(--neutral-color)] w-[58%] h-[95%] rounded-[50px]">
    //       <img
    //         src={MainImage}
    //         className="h-[100%] w-[100%] rounded-[50px]"
    //         alt="Meeting"
    //       />
    //       <div className="h-14 w-14 rounded-full flex justify-center items-center bg-white-400 absolute top-155 left-80 backdrop-blur-sm border border-white bg-opacity-10  bg-clip-padding hover:cursor-pointer">
    //         <Mic size={26} color="white" />
    //       </div>
    //       <div className="h-14 w-14 rounded-full flex justify-center items-center bg-white-400 absolute top-155 left-100 backdrop-blur-sm border border-white bg-opacity-10  bg-clip-padding hover:cursor-pointer">
    //         <Video size={26} color="white" />
    //       </div>
    //       <div className="h-14 w-14 rounded-full flex justify-center items-center absolute top-155 left-120 bg-red-700 hover:cursor-pointer">
    //         <Phone size={26} color="white" />
    //       </div>
    //       <div className="h-14 w-14 rounded-full flex justify-center items-center bg-white-400 absolute top-155 left-140 backdrop-blur-sm border border-white bg-opacity-10  bg-clip-padding hover:cursor-pointer">
    //         <Captions size={26} color="white" />
    //       </div>
    //     </div>

    //     {/* Right Section - Participants/Chat */}
    //     <div className="bg-[var(--secondary-color)] border-2 border-[var(--neutral-color)] w-[40%] h-[95%] rounded-2xl p-4">
    //       {/* Tabs */}
    //       <div className="flex justify-between bg-[var(--neutral-color)] p-1 rounded-lg h-[10%] mt-2">
    //         <button
    //           className={`w-1/2 p-2 rounded-lg transition-all ${
    //             activeTab === "participants"
    //               ? "bg-[var(--primary-color)] text-[var(--secondary-color)] font-bold shadow-md"
    //               : "text-[var(--primary-color)] hover:bg-gray-200"
    //           }`}
    //           onClick={() => setActiveTab("participants")}
    //         >
    //           Participants
    //         </button>
    //         <button
    //           className={`w-1/2 p-2 rounded-lg transition-all ${
    //             activeTab === "chat"
    //               ? "bg-[var(--primary-color)] text-[var(--secondary-color)] font-bold shadow-md"
    //               : "text-[var(--primary-color)] hover:bg-gray-200"
    //           }`}
    //           onClick={() => setActiveTab("chat")}
    //         >
    //           Chat
    //         </button>
    //       </div>

    //       {/* Participants View */}
    //       {activeTab === "participants" && (
    //         <div className="flex justify-evenly items-center flex-wrap h-[90%] overflow-y-auto py-2">
    //           {participants.map((person) => (
    //             <div
    //               key={person.id}
    //               className="h-[30%] w-[40%] bg-[var(--secondary-color)] rounded-lg p-2 shadow-lg mb-4"
    //             >
    //               <img
    //                 src={person.img}
    //                 className="h-[90%] rounded-t-lg w-full object-cover"
    //                 alt={person.name}
    //               />
    //               <p className="relative  bg-[var(--primary-color)] rounded-b-lg text-center py-1 text-[var(--secondary-color)]">
    //                 {person.name}
    //               </p>
    //               {/* <div className="h-14 w-14 rounded-full flex justify-center items-center bg-white-400 backdrop-blur-sm border border-white bg-opacity-10  bg-clip-padding hover:cursor-pointer">
    //                 <Mic size={26} color="white" />
    //               </div> */}
    //             </div>
    //           ))}
    //         </div>
    //       )}

    //       {/* Chat View */}
    //       {activeTab === "chat" && (
    //         <div className="h-[90%] flex flex-col">
    //           {/* Chat header */}
    //           <div className="flex items-center justify-between p-3 border-b border-[var(--neutral-color)]">
    //             <h3 className="text-lg font-semibold text-[var(--primary-color)]">
    //               Meeting Chat
    //             </h3>
    //             <div className="flex items-center space-x-2">
    //               <span className="w-2 h-2 rounded-full bg-green-500"></span>
    //               <span className="text-sm text-[var(--primary-color)]">
    //                 Live
    //               </span>
    //             </div>
    //           </div>

    //           {/* Chat messages */}
    //           <div className="flex-1 overflow-y-auto p-4 space-y-4">
    //             <div className="flex flex-col space-y-1">
    //               <span className="text-xs text-gray-500 self-center">
    //                 Today, 10:02 AM
    //               </span>
    //               <div className="flex items-start space-x-2">
    //                 <div className="w-8 h-8 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-[var(--secondary-color)] text-sm">
    //                   AP
    //                 </div>
    //                 <div>
    //                   <div className="bg-[var(--neutral-color)] p-3 rounded-lg rounded-tl-none max-w-[80%]">
    //                     <p className="font-medium text-[var(--primary-color)]">
    //                       Alicia Padlock
    //                     </p>
    //                     <p className="text-[var(--primary-color)]">
    //                       How about our problem last week?
    //                     </p>
    //                   </div>
    //                   <span className="text-xs text-gray-500">10:02 AM</span>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="flex flex-col space-y-1">
    //               <div className="flex items-start space-x-2 justify-end">
    //                 <div>
    //                   <div className="bg-[var(--accent-color)] p-3 rounded-lg rounded-tr-none max-w-[80%]">
    //                     <p className="text-[var(--primary-color)]">
    //                       It's all clear, no worries 😊
    //                     </p>
    //                   </div>
    //                   <div className="flex justify-end items-center space-x-1">
    //                     <span className="text-xs text-gray-500">10:03 AM</span>
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       className="h-3 w-3 text-blue-500"
    //                       viewBox="0 0 20 20"
    //                       fill="currentColor"
    //                     >
    //                       <path
    //                         fillRule="evenodd"
    //                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
    //                         clipRule="evenodd"
    //                       />
    //                     </svg>
    //                   </div>
    //                 </div>
    //                 <div className="w-8 h-8 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-[var(--secondary-color)] text-sm">
    //                   Y
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           {/* Message input */}
    //           <div className="p-3 border-t border-[var(--neutral-color)]">
    //             <div className="relative flex items-center">
    //               <input
    //                 type="text"
    //                 className="flex-1 h-10 pr-12 rounded-full border border-[var(--neutral-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
    //                 style={{ padding: "5px" }}
    //                 placeholder="Type a message..."
    //               />
    //               <div className="absolute right-2 flex space-x-1">
    //                 <button className="p-1 text-[var(--primary-color)] hover:text-[var(--accent-color)]">
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     className="h-5 w-5"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     stroke="currentColor"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       strokeWidth={2}
    //                       d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    //                     />
    //                   </svg>
    //                 </button>
    //                 <button className="p-1 text-[var(--primary-color)] hover:text-[var(--accent-color)]">
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     className="h-5 w-5"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     stroke="currentColor"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       strokeWidth={2}
    //                       d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    //                     />
    //                   </svg>
    //                 </button>
    //                 <button className="bg-[var(--primary-color)] text-[var(--secondary-color)] p-2 rounded-full hover:bg-opacity-90">
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     className="h-5 w-5"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     stroke="currentColor"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       strokeWidth={2}
    //                       d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    //                     />
    //                   </svg>
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default VideoCallUI;
