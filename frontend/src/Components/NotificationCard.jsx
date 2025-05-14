import { useEffect, useState } from "react";

const NotificationCard = ({ error, setError }) => {
  useEffect(() => {
    const setNotification = () => {
      setTimeout(() => {
        setError("");
      }, 4000);
    };
    setNotification();
  }, error);
  return (
    <>
      <div className="min-h-[80px] w-[400px] bg-[var(--notification-color)] rounded-[10px] fixed right-[5vw] bottom-[10vh] text-white font-semibold border-[var(--primary-color)]">
        <div
          className="bg-[var(--primary-color)] rounded-t-[10px]  flex justify-between  "
          style={{ paddingRight: "10px", paddingLeft: "10px" }}
        >
          <p>Notification</p>
          <button onClick={() => setError("")}>X</button>
        </div>
        <div
          className="text-[var(--primary-color)]"
          style={{ paddingRight: "5px", paddingLeft: "10px" }}
        >
          {error}
        </div>
      </div>
    </>
  );
};
export default NotificationCard;
