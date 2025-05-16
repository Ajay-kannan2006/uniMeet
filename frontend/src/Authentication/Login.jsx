import "./login.css";
import loginImg from "../assets/login-img.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotificationCard from "../Components/NotificationCard";
const Login = () => {
  var [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  var [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        "https://unimeet-8ox2.onrender.com/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );
      navigate("/home");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Something went wrong";
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
        console.log(err);
        return;
      }
    };
    checkUser();
  }, []);

  return (
    <div className="login-page">
      <div className="login">
        <div className="left-login">
          <form className="login-form " onSubmit={handleSubmit}>
            <h2 className="text-3xl">
              Welcome Back To{" "}
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
            <br />
            <div className="form-element">
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
              ></input>
            </div>
            <br />
            <button className="submit-button" type="submit">
              Login
            </button>
            <br />
            <br />
            <button className="google-button  bg-white text-[var(--primary-color)]">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
              />
              Login With Google
            </button>
            <p className="forgot">
              <a href="">Forgot Password?</a>
            </p>
            <br />
            <p className="signup-button">
              Doesn't Have Account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-[var(--accent-color)] hover:cursor-pointer"
              >
                SignUp
              </span>
            </p>
          </form>
        </div>
        <div className="right-login">
          <img src={loginImg} alt="" />
        </div>
      </div>
      {error && <NotificationCard error={error} setError={setError} />}
    </div>
  );
};

export default Login;
