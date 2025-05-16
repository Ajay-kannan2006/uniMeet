import { useState } from "react";
import {
  Video,
  Plus,
  LogIn,
  Calendar,
  Clock,
  Users,
  Settings,
  ChevronRight,
  Link,
  Copy,
} from "react-feather";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";

const MeetingsPage = () => {
  const navigate = useNavigate();
  const [meetingId, setMeetingId] = useState("");
  const [activeTab, setActiveTab] = useState("new");
  const [copied, setCopied] = useState(false);

  const upcomingMeetings = [
    {
      id: "x7y3-z8k9",
      title: "Project Kickoff",
      time: "Today, 3:00 PM",
      participants: 5,
      organizer: "You",
    },
    {
      id: "a2b4-c6d8",
      title: "Design Review",
      time: "Tomorrow, 10:00 AM",
      participants: 3,
      organizer: "Alicia P.",
    },
    {
      id: "e5f7-g9h1",
      title: "Client Demo",
      time: "Fri, 2:30 PM",
      participants: 8,
      organizer: "Sri V.",
    },
  ];

  const handleStartMeeting = () => {
    const newMeetingId = Math.random().toString(36).substring(2, 10);
    navigate(`/meeting/${newMeetingId}`);
  };

  const handleJoinMeeting = () => {
    if (meetingId.trim()) {
      navigate(`/meeting/${meetingId}`);
    }
  };

  return (
    <div className="bg-[#f8fafc] w-[100vw] min-h-screen flex flex-col items-center">
      {/* <Header /> */}

      <main className="w-full max-w-7xl px-6 py-8 flex-1 flex flex-col lg:flex-row gap-8">
        <div className="w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 min-h-[550px]">
          <div className="flex border-b h-14 border-gray-200">
            <button
              className={`flex-1 py-5 text-lg font-semibold text-center transition-all duration-300 ${
                activeTab === "new"
                  ? "text-[var(--primary-color)] border-b-4 border-[var(--primary-color)] bg-gray-50"
                  : "text-gray-500 hover:text-gray-700 bg-white"
              }`}
              onClick={() => setActiveTab("new")}
            >
              New Meeting
            </button>
            <button
              className={`flex-1 py-5 text-lg font-semibold text-center transition-all duration-300 ${
                activeTab === "join"
                  ? "text-[var(--primary-color)] border-b-4 border-[var(--primary-color)] bg-gray-50"
                  : "text-gray-500 hover:text-gray-700 bg-white"
              }`}
              onClick={() => setActiveTab("join")}
            >
              Join Meeting
            </button>
          </div>

          <div className="p-10 flex-1 flex flex-col justify-center items-center bg-gradient-to-b from-white via-gray-50 to-white rounded-b-2xl transition-all duration-500 w-full">
            {activeTab === "new" ? (
              <div className="w-full max-w-md space-y-10 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <Video size={48} className="text-[var(--primary-color)]" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Start a New Meeting
                  </h2>
                  <p className="text-sm text-gray-500">
                    Instantly create a video meeting room and share the link.
                  </p>
                </div>

                <button
                  onClick={handleStartMeeting}
                  className="w-full bg-[var(--primary-color)] text-white py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 hover:shadow-lg hover:brightness-110 transition-all duration-300"
                >
                  <Plus size={20} />
                  <span>Start Instant Meeting</span>
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="mx-4 text-gray-400 text-sm font-medium">
                    OR
                  </span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl text-base font-medium flex items-center justify-center gap-2 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all">
                  <Calendar size={20} />
                  Schedule for Later
                </button>

                <div className="bg-gray-50 rounded-xl p-5 text-left shadow-sm border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Your Personal Meeting Room
                  </h3>
                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                    <span className="text-sm font-mono text-gray-600">
                      unimeet.com/ajay
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("unimeet.com/ajay");
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="text-gray-500 hover:text-[var(--primary-color)] transition-colors"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  {copied && (
                    <p className="text-green-500 text-xs mt-2 font-medium">
                      Link copied!
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md space-y-10">
                <div className="flex flex-col items-center space-y-3">
                  <LogIn size={40} className="text-[var(--primary-color)]" />
                  <h2 className="text-xl font-bold text-gray-800">
                    Join a Meeting
                  </h2>
                  <p className="text-sm text-gray-500">
                    Enter a meeting ID or link to join instantly.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Meeting ID or Link
                  </label>
                  <input
                    type="text"
                    value={meetingId}
                    onChange={(e) => setMeetingId(e.target.value)}
                    placeholder="e.g. x7y3-z8k9 or unimeet.com/meeting/x7y3-z8k9"
                    className="w-full p-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all"
                  />
                </div>

                <button
                  onClick={handleJoinMeeting}
                  disabled={!meetingId.trim()}
                  className={`w-full py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    meetingId.trim()
                      ? "bg-gradient-to-r from-[var(--primary-color)] to-blue-600 text-white hover:shadow-lg"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <LogIn size={20} />
                  <span>Join Meeting</span>
                </button>

                <div className="text-center">
                  <button className="text-sm text-[var(--primary-color)] hover:underline flex items-center justify-center mx-auto">
                    <Link size={14} className="mr-1" />
                    Join with meeting link instead
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          style={{ padding: "10px" }}
        >
          <div className="p-6 border-b border-gray-200 h-14 flex justify-center items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Upcoming Meetings
            </h2>
          </div>

          {upcomingMeetings.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {upcomingMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className=" hover:bg-gray-50 transition-colors"
                  style={{ padding: "5px" }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 p-2 rounded-lg bg-blue-50 text-[var(--primary-color)]">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {meeting.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                          <span className="flex items-center">
                            <Clock className="mr-1.5" size={14} />
                            {meeting.time}
                          </span>
                          <span className="flex items-center">
                            <Users className="mr-1.5" size={14} />
                            {meeting.participants} people
                          </span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Organized by: {meeting.organizer}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `${window.location.origin}/meeting/${meeting.id}`
                          )
                        }
                        className="p-2 text-gray-500 hover:text-[var(--primary-color)] rounded-full hover:bg-gray-100"
                        title="Copy meeting link"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={() => navigate(`/meeting/${meeting.id}`)}
                        className="flex items-center space-x-1 text-[var(--primary-color)] hover:text-blue-600"
                      >
                        <span>Join</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No upcoming meetings
              </h3>
              <p className="text-gray-500 mb-4">
                Schedule a meeting to get started
              </p>
              <button
                onClick={() => setActiveTab("new")}
                className="text-[var(--primary-color)] font-medium hover:underline flex items-center justify-center mx-auto"
              >
                Create meeting
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MeetingsPage;
