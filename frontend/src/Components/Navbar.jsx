import { Mic } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Navbar = ({ tab }) => {
  // const [selectedTab, setSelectedTab] = useState(1);
  const navigate = useNavigate();
  return (
    <div className="flex w-[700px] justify-between">
      <ul
        className="relative w-[555px] rounded-full flex justify-evenly items-center bg-[var(--primary-color)]"
        style={{ padding: "10px" }}
      >
        <li
          className="relative z-10  block cursor-pointer font-medium text-[25px] text-white hover:cursor-pointer "
          style={{
            padding: "5px",
            borderRadius: "15px",
            color: tab == "home" ? "var(--primary-color)" : "white",
            backgroundColor: tab == "home" ? "white" : "var(--primary-color)",
          }}
          // ref={ref}
          onClick={() => {
            // if (!ref.current) return;
            // const { width, left } = ref.current.getBoundingClientRect();
            // setSelectedTab(tab);
            // setPosition({
            //   width: width + 20,
            //   opacity: 1,
            //   left: ref.current.offsetLeft - 10,
            // });
            navigate("/home");
          }}
        >
          Home
        </li>
        <li
          className="relative z-10  block cursor-pointer font-medium text-[25px] text-white hover:cursor-pointer "
          style={{
            padding: "5px",
            borderRadius: "15px",
            color: tab == "meetings" ? "var(--primary-color)" : "white",
            backgroundColor:
              tab == "meetings" ? "white" : "var(--primary-color)",
          }}
          // ref={ref}
          onClick={() => {
            // if (!ref.current) return;
            // const { width, left } = ref.current.getBoundingClientRect();
            // setSelectedTab(tab);
            // setPosition({
            //   width: width + 20,
            //   opacity: 1,
            //   left: ref.current.offsetLeft - 10,
            // });
            navigate(`/meetings`);
          }}
        >
          Meetings
        </li>
        <li
          className="relative z-10  block cursor-pointer font-medium text-[25px] text-white hover:cursor-pointer "
          style={{
            padding: "5px",
            borderRadius: "15px",
            color: tab == "suuport" ? "var(--primary-color)" : "white",
            backgroundColor:
              tab == "support" ? "white" : "var(--primary-color)",
          }}
          // ref={ref}
          onClick={() => {
            // if (!ref.current) return;
            // const { width, left } = ref.current.getBoundingClientRect();
            // setSelectedTab(tab);
            // setPosition({
            //   width: width + 20,
            //   opacity: 1,
            //   left: ref.current.offsetLeft - 10,
            // });
            navigate(`/Support`);
          }}
        >
          Support
        </li>

        {/* <Cursor position={position} /> */}
      </ul>
      <div className=" flex justify-center items-center h-[65px] w-[65px] rounded-full bg-[var(--primary-color)] hover:cursor-pointer">
        <Mic color="white" size={24} />
      </div>
    </div>
  );
};

const Tab = ({
  children,
  setPosition,
  tab,
  selectedTab,
  setSelectedTab,
  nav,
}) => {
  const navigate = useNavigate();

  const ref = useRef(null);
  return (
    <li
      className="relative z-10  block cursor-pointer font-medium text-[25px] text-white hover:cursor-pointer "
      style={{ color: selectedTab == tab ? "var(--primary-color)" : "white" }}
      ref={ref}
      onClick={() => {
        if (!ref.current) return;
        const { width, left } = ref.current.getBoundingClientRect();
        setSelectedTab(tab);
        setPosition({
          width: width + 20,
          opacity: 1,
          left: ref.current.offsetLeft - 10,
        });
        navigate(`/${nav}`);
      }}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 rounded-full text-[var(--primary-color)] bg-white h-[55px]"
    />
  );
};
export default Navbar;
