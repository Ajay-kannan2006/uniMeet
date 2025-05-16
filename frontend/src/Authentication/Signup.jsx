import "./signup.css";
import signupImg from "../assets/login-img.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotificationCard from "../Components/NotificationCard";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      setError("User Name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!formData.password.trim()) {
      setError("Password is Required");
      return;
    } else if (formData.password.length < 6) {
      setError("Password should be atleast of length 6");
      return;
    }

    try {
      const res = await axios.post(
        "https://unimeet-8ox2.onrender.com/api/auth/signup",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(res);

      navigate("/home");
    } catch (err) {
      const errorMessage = err.response?.data?.error;
      setError(errorMessage);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          "https://unimeet-8ox2.onrender.com/api/auth/check-user",
          {
            withCredentials: true,
          }
        );
        navigate("/home");
      } catch (err) {
        return;
      }
    };
    checkUser();
  }, []);

  return (
    <div className="signup-page">
      <div className="signup">
        <div className="left-signup">
          <form className="signup-form ">
            <h2 className="text-3xl">
              Welcome To{" "}
              <span className="text-[var(--accent-color)]">
                <b>UniMeet</b>
              </span>
            </h2>
            <br />
            <p>
              This is an innovative video conference product that revolutionzes
              virtual meetings.
            </p>
            <br />
            <div className="form-element">
              <label htmlFor="username">
                Username<sup className="text-red-800 font-bold ">*</sup>
              </label>
              <br />
              <input
                type="username"
                id="Username"
                name="username"
                placeholder="Enter your Username"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="form-element" style={{ marginTop: "5px" }}>
              <label htmlFor="email">
                Email Address<sup className="text-red-800 font-bold ">*</sup>
              </label>
              <br />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your Email Address"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="form-element" style={{ marginTop: "5px" }}>
              <label htmlFor="password">
                Password<sup className="text-red-800 font-bold ">*</sup>
              </label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                }}
              />
            </div>

            <br />
            <button
              className="submit-button"
              type="submit"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
            <br />
            <br />
            <button className="google-button bg-white text-[var(--primary-color)]">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
              />
              Sign up With Google
            </button>
            <p className="forgot">
              <a href="">Forgot Password?</a>
            </p>
            <br />
            <p className="signup-button">
              Already have an Account?&nbsp;
              <span
                className="text-[var(--accent-color)] hover:cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
        <div className="right-signup">
          <img src={signupImg} alt="" />
        </div>
        {error && <NotificationCard error={error} setError={setError} />}
      </div>
    </div>
  );
};

export default Signup;
