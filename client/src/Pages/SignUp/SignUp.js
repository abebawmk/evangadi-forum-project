import React, { useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Constant/axios";
import "./Signup.css";

function SignUp() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  //importing global state from context
  const [userData, setUserData] = useUserContext();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", form);

      const loginRes = await axios.post(
        "users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);

      navigate("/");
    } catch (error) {
      console.log("problem ==>", error.response.data.msg);
    }
  };
  return (
    <div className="signup">
      <div className="signup_container">
        <div className="signup__top">
          <h3 className="signup__title">Join the network</h3>
          <p>
            Already have an account?
            <Link className="login__link clear_link" to="/login">
              Sign in
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Email Address"
          />
          <br />
          <div className="signup__name">
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              placeholder="First Name"
            />
            <br />
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
          <br />
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            placeholder="Username"
          />
          <br />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <br />
          <p>
            I agree to the <Link to="/">privacy policy</Link> and{" "}
            <Link to="/"> terms of service</Link>.
          </p>
          <br />
          <button>Agree and Join</button>
        </form>
      </div>
      <div className="signup__about">
        <p className="signup__about--title">About</p>
        <div className="about__detail">
          <h1>Evangadi Newtorks Q&A</h1>
          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
            <br />
            <br />
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
        </div>
        <button className="">HOW IT WORKS</button>
      </div>
    </div>
  );
}

export default SignUp;
