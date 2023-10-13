import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext.jsx";
import HashLoader from "react-spinners/HashLoader";

function Login() {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "wanjaumbatia@gmail.com",
    password: "123@Team",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`/auth/login`, formData)
      .then((response) => {
        if (response.status != 200) {
          throw new Error(response.message);
        }

        const result = response.data;
        dispatch({
          type: `LOGIN_SUCCESS`,
          payload: {
            user: result.data,
            token: result.token,
            role: result.role,
          },
        });
        
        setLoading(false);
        toast.success(result.message);
        navigate(`/`);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back
        </h3>
        <form onSubmit={submitHandler} className="py-4 md:py-0">
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff34] focus:outline-none
            focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff34] focus:outline-none
            focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
              required
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              disabled={loading && true}
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-l px-4 py-3"
            >
              {loading ? <HashLoader size={25} color="#ffffff" /> : `Login`}
            </button>

            <p className="mt-5 text-textColor text-center">
              Don&apos;t have an account?{" "}
              <Link
                className="text-primaryColor font-medium ml-1"
                to="/register"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
