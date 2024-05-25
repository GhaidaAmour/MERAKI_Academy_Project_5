import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setUserId,
  setRoleId,
  setUsername,
} from "../../service/redux/reducers/auth/authSlice";
import { auth, provider } from "../config";
import { signInWithPopup } from "firebase/auth";
import Sptlization from "../Sptilization/index.jsx";
//====================================================================

const login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, userId, role } = useSelector((state) => {
    return {
      // token : state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
      role: state.auth.role,
    };
  });

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});

  //===============================================================
  const Login = async (e) => {
    // console.log(isLoggedIn);
    e.preventDefault();
    setErrors(Validation({ email, password }));
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      if (result.data) {
        console.log(result.data);
        setMessage("");
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        dispatch(setRoleId(result.data.role_id));
        dispatch(setUsername(result.data.username));
      } else throw Error;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  //===============================================================
  useEffect(() => {
    if (isLoggedIn) {
      if (role === 1) {
        navigate("/");
      }
    }
  }, [isLoggedIn, userId, role]);

  const handleWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        console.log(data);
        const result = await axios.post("http://localhost:5000/users/login", {
          email: data.user.email,
          password: data.user.uid,
        });
        setValue(data.user.email);
        console.log(result);
        localStorage.setItem("email", data.user.email);
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  const Validation = (values) => {
    const errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;

    if (values.email === "") {
      errors.email = "Email is Required!";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "Email did not match the format";
    }
    if (values.password === "") {
      errors.password = "Password is Required!";
    }
    return errors;
  };
  //===============================================================
  return (
    <>
      <div className="wrapper">
        <div className="title">User Login</div>
        <div className="form" onSubmit={Login}>
          <div className="inputfield">
            <label>Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text" style={{ color: "red" }}>
                {errors.email}
              </p>
            )}
          </div>

          <div className="inputfield">
            <label>Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="inputfield" style={{ color: "red" }}>
                {errors.password}
              </p>
            )}
          </div>
          <div className="inputfield">
            <button
              className="btn"
              onClick={(e) => {
                Login(e);
              }}
            >
              Login
            </button>
          </div>
          {status
            ? console.log("true")
            : message && (
                <p className="invalid-message" style={{ color: "red" }}>
                  {message}
                </p>
              )}
          <div className="inputfield">
            <button
              type="button"
              className="login-with-google-btn"
              onClick={handleWithGoogle}
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default login;
