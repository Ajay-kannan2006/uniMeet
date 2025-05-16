import {
  Video,
  Users,
  Zap,
  Shield,
  Globe,
  Mic,
  MessageSquare,
} from "react-feather";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Video size={32} className="text-[var(--primary-color)]" />,
      title: "HD Video Calls",
      description: "Crystal clear video quality with adaptive resolution",
    },
    {
      icon: <Mic size={32} className="text-[var(--primary-color)]" />,
      title: "Noise Cancellation",
      description: "Background noise suppression for clear audio",
    },
    {
      icon: <Users size={32} className="text-[var(--primary-color)]" />,
      title: "Large Meetings",
      description: "Up to 100 participants in a single call",
    },
    {
      icon: <Shield size={32} className="text-[var(--primary-color)]" />,
      title: "End-to-End Encryption",
      description: "Your conversations stay private and secure",
    },
    {
      icon: <Globe size={32} className="text-[var(--primary-color)]" />,
      title: "Global Connectivity",
      description: "Low latency calls from anywhere in the world",
    },
    {
      icon: <MessageSquare size={32} className="text-[var(--primary-color)]" />,
      title: "Real-time Chat",
      description: "Integrated messaging during calls",
    },
  ];

  return (
    <div className="bg-[#f8fafc] w-[100vw] min-h-screen flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Connect Instantly with{" "}
            <span className="text-[var(--primary-color)]">UniMeet</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Professional video meetings made simple, secure, and seamless for
            everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {/* <button
              onClick={() => navigate("/meetings")}
              className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-dark)] text-white py-4 px-8 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Zap size={20} className="flex-shrink-0" />
              <span>Start Meeting</span>
            </button>
            <button
              onClick={() => navigate("/meetings?tab=join")}
              className="border-2 border-[var(--primary-color)] text-[var(--primary-color)] py-4 px-8 rounded-xl text-lg font-semibold hover:bg-gray-50/50 transition-all duration-300 flex items-center justify-center"
            >
              Join Meeting */}
            {/* </button> */}
          </div>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--primary-color)] to-blue-400 rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
                alt="Video call interface"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />

      {/* Features Section */}
      <section
        className=" w-[100vw] flex justify-center bg-white py-20 md:py-28"
        style={{ paddingTop: "20px" ,}}
      >
        <br />
        <div className="max-w-7xl mx-auto mt-2.5 px-6 flex flex-wrap justify-center">
          <div className=" mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Why Choose UniMeet?
            </h2>
            <br />
            <p className="text-lg md:text-xl w-[100vh]  text-gray-600 max-w-3xl mx-auto text-center">
              Designed for productivity, engineered for connection
            </p>
            <br />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-[var(--primary-color)] hover:border-opacity-50 border border-gray-100 flex flex-col items-start"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-[var(--primary-color)]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <br />
        </div>
        <br />
      </section>
      <br />

      {/* Testimonials Section */}
      {/* <section className="w-full bg-gray-50 py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Teams Worldwide
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who transformed their
              communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">Marketing Director</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "UniMeet has revolutionized our remote meetings. The video
                  quality is exceptional and the interface is so intuitive."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="w-[100vw] flex justify-center bg-gradient-to-r from-[var(--primary-color)] to-blue-500 py-24 md:py-32" style={{padding:"20px"}}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to experience better meetings?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join millions of users who trust UniMeet for their daily
            communication needs.
          </p>
          <button
            onClick={() => navigate("/meetings")}
            className="bg-white text-[var(--primary-color)] py-4 px-10 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
          >
            <Zap size={20} />
            Get Started - It's Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto" style={{padding:"20px"}}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-bold">UniMeet</span>
              <p className="text-gray-400 mt-3 max-w-md">
                The simplest way to connect with your team, clients, and
                partners.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
              <div>
                <h4 className="text-lg font-medium mb-4">Product</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Download
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Tutorials
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-4">Company</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} UniMeet. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
