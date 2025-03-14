import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";

import Layout from "../component/Layout";

const Register = () => {
  const [userDetail, setUserDetail] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    question: "",
    description: "",
  });
  const {
    name,
    username,
    description,
    email,
    password,
    address,
    phone,
    question,
  } = userDetail;
  const navigate = useNavigate();

  //onsubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formValidation()) {
        const res = await axios.post(`${process.env.REACT_APP_APIURL}/api/auth/register`, {
          name,
          username,
          description,
          email,
          password,
          address,
          phone,
        });

        if (res.data.success) {
          console.log("succes");
          navigate("/login");
          toast.success(res.data.message);
        } else {
          console.log("fauiless");
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  //form validation
  const formValidation = () => {
    const nameRegex = /^[a-zA-z ]{3,15}$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[a-zA-Z1-9]+\@[a-zA-z]+\.[a-zA-Z]+$/;
    const passwordRegex = /^[a-zA-z0-9_@#]{3,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!nameRegex.test(name)) {
      toast.error("name is invalid");
      return false;
    }
    if (!usernameRegex.test(username)) {
      toast.error("username is invalid");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Email is invalid");
      return false;
    }
    if (!passwordRegex.test(password)) {
      toast.error("Keep strong password");
      return false;
    }
    if (address == "") {
      toast.error("Address is invalid");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number is not valid");
      return false;
    }
    console.log("reply");
    return true;
  };

  return (
      <Wrapper>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10 form-container">
              <form className="register-form" onSubmit={handleSubmit}>
                <h1 className="mb-4 text-center">Registration</h1>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) =>
                      setUserDetail({ ...userDetail, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="User Name"
                    value={username}
                    onChange={(e) =>
                      setUserDetail({ ...userDetail, username: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                      setUserDetail({ ...userDetail, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      setUserDetail({ ...userDetail, password: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    rows="3"
                    className="form-control"
                    id="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) =>
                      setUserDetail({ ...userDetail, address: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    rows="3"
                    className="form-control"
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                      setUserDetail({
                        ...userDetail,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) =>
                      setUserDetail({ ...userDetail, phone: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-block">
                  Register
                </button>
                <NavLink className="login-link" to="/login">
                  Already User? Login
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div`
  background-color: rgb(35 64 122);
  font-family: "Poppins", sans-serif;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  .form-container {
    display: flex;
    padding: 56px 0px;
    justify-content: center;
    margin: 40px 0px;
    background-color: white;
  }
  .register-form {
    h1 {
      font-weight: 700;
      // letter-spacing: 3px;
      font-weight: bold;
    }
    width: 80%;
    display: flex;
    flex-direction: column;
    .form-group {
      padding: 10px 0px;
      input,
      textarea {
        &:focus {
          outline: none !important;
          box-shadow: none;
          border: 1px solid black;
        }
      }
    }
    .btn {
      background-color: rgb(35 64 122);
      color: white;
      margin-top: 10px;
    }
    .login-link {
      margin: auto;
      margin-top: 10px;
      text-decoration: none;
      color: grey;
    }
  }
  @media (max-width: ${({ theme }) => theme.responsive.Small}) {
    .container {
      width: 80%;
    }
    .register-form {
      width: 90%;
    }
  }
`;
