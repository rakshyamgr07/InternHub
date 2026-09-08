import React, { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("email", form.email);
    localStorage.setItem("password", form.password);

    toast.success("Login successful");

    setForm({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ">

      <div className="flex flex-col gap-3 shadow-xl m-4 p-4 rounded-lg">
        <div className="flex flex-col text-center  ">
          <h1 className="text-blue-600 text-2xl font-bold text-3xl m-4">
            Login
          </h1>
        </div>

        <div className="flex flex-col gap-4  p-5 bg-white rounded-sm w-sm">
          <h3 className="font-bold text-xl md:text-3xl text-blue- flex flex-col gap-2 ">Welcome back!
            <p className="text-sm text-gray-500 font-semibold">Sign into your account </p>
          </h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-sm"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className='font-semibold'>Email</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-900 rounded-sm  p-2 text-gray-700"
            />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className='font-semibold'>Password</label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border border-gray-900 rounded-sm text-gray-700 p-2"

            />
            <a href="" className=" text-sm hover:text-blue-800  hover:underline hover:decoration-solid">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2  rounded transition duration-300 hover:scale-105 hover:bg-blue-700"
            >
              Login
            </button>
            <p className="text-center flex justify-center gap-1">Don't have an account?
              <a href="/register" className="hover:text-blue-800  hover:underline hover:decoration-solid">Sign Up</a>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;