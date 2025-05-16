// Components/Layout.js
import { useState } from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  const [activeTab, setActiveTab] = useState(1); // Default to HOME tab

  return (
    <div className="bg-[#f8fafc] w-[100vw] min-h-screen flex flex-col items-center">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {children}
    </div>
  );
};

export default Layout;
