import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//api request
import axios from "../../api/axios";
//redux
import { useDispatch } from "react-redux";
// import * as Actions from "../../redux/reducers";
//toast message
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//css
import "../../css/Register/RegisterForm.css";
//components
import Input from "../Layouts/Input";
function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    address: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  const inputs = [
    {
      id: 0,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username Must Be At least 6 Char.",
      pattern: "[A-Za-z0-9-_.]{6,20}",
    },
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email Address",
      errorMessage: "Please Enter a Valid Email.",
    },
    {
      id: 3,
      name: "address",
      type: "text",
      placeholder: "Address ex: street-city-state",
      errorMessage: "Address Is Required",
      // pattern: "",
    },
    {
      id: 4,
      name: "number",
      type: "text",
      placeholder: "Number",
      errorMessage: "Enter Correct Number",
      pattern: "^(0|[1-9][0-9]*){11,}$",
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password must contain  at least 6, 30 character, capital, number and special character",
      pattern:
        "(?=^.{6,30}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*",
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "It Dosen't Match",
      pattern: values.password,
    },
  ];
  //handle Input Change
  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  //successfully message
  //toast message
  const successMessage = (message) =>
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  //handle submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...data } = values;
    await axios
      .post("/user/create", { ...data })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          successMessage(res?.data?.message);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      })
      .catch((err) => alert(err?.error?.message));
  };

  return (
    <div className="form grid place-items-center my-5 sm:my-10">
      <form
        onSubmit={onSubmit}
        className="py-14 px-10 shadow-none sm:shadow-lg rounded-md"
      >
        <h1 className="signUp text-4xl font-extrabold mb-10">Sign Up</h1>
        {/* inputs */}
        <div className="inputs flex flex-col justify-center gap-10">
          {inputs.map((i) => (
            <Input
              key={i.id}
              {...i}
              value={values[i.name]}
              onChange={handleInputChange}
              pattern={i?.pattern}
            />
          ))}
          <button type="submit" className="w-32 rounded-full py-2 px-4 mb-4">
            Sign Up
          </button>
        </div>
        {/* inputs */}
        <h1 className="text-sm">
          Do You Already have an account?
          <Link to="/login" className="sign_up_link text-md font-semibold">
            SIGN IN
          </Link>
        </h1>
      </form>
      {/* //toast container setting */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default RegisterForm;
