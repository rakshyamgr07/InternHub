import axios from 'axios'
import { Building2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FiUser } from 'react-icons/fi'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: "student"
  })
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleRoleChange = (role) => {
    setForm({
      ...form,
      role
    })
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, form);
      toast.success(res.data.message);
      Navigate("/login");

    } catch (error) {

      toast.error(error.response?.data?.message );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen  '>
      < div className="flex flex-col gap-3 w-fit  shadow-xl m-4 p-10 rounded-lg mt-23 ">

        {/* Heading */}
        <div className="mt-6 mb-4">
          <h2 className="text-3xl font-bold text-[#1E293B]">Create Your Account </h2>

          <p className="text-[#64748B] mt-2"> Join InternHub and start your journey towards a better future. </p>
        </div>
        <form onSubmit={handleSubmit} method="post" className='flex flex-col gap-5'>
          <div className="mb-6">

            <label className="block font-semibold text-[#1E293B] mb-3">
              Register as
            </label>

            <div className="grid grid-cols-2 gap-10">

              {/* Student */}
              <button
                type="button"
                onClick={() => handleRoleChange("student") }
                className={`p-4 rounded-xl border-2 transition ${form.role === "student" ? "border-[#2563EB] bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}
              >
                <FiUser className={`mx-auto text-2xl ${form.role === "student"  ? "text-[#2563EB]" : "text-[#64748B]" }`}/>

                <p className="mt-2 text-sm font-semibold text-[#1E293B]">Student </p>
              </button>

              {/* Company */}
              <button
                type="button"
                onClick={() => handleRoleChange("company")}
                className={`p-4 rounded-xl border-2 transition ${form.role === "company"? "border-[#2563EB] bg-blue-50": "border-slate-200 hover:border-blue-300"}`}>
                <Building2 className={`mx-auto text-2xl ${form.role === "student"  ? "text-[#2563EB]" : "text-[#64748B]" }`}/>

                <p className="mt-2 text-sm font-semibold text-[#1E293B]">Company </p>
              </button>
            </div>
          </div>
          <label htmlFor="name" className='font-semibold'>Name</label>
          <input type="text"
            onChange={handleChange}
            value={form.name}
            name="name"
            id="name"
            placeholder="eg. John Doe "
            className="border border-gray-900 rounded-sm text-gray-700 p-2"
          />

          <label htmlFor="email" className='font-semibold'>Email</label>
          <input type="email"
            onChange={handleChange}
            value={form.email}
            name="email"
            id="email" placeholder="example@example.com"
            className="border border-gray-900 rounded-sm text-gray-700 p-2"
          />

          <label htmlFor="password" className='font-semibold'>Password</label>
          <input type="password"
            onChange={handleChange}
            value={form.password}
            name="password"
            id="password"
            placeholder="Password"
            className="border border-gray-900 rounded-sm text-gray-700 p-2"
          />

          <label htmlFor="cpassword" className='font-semibold'>Confirm Password</label>
          <input type="password"
            onChange={handleChange}
            value={form.cpassword}
            name="cpassword"
            id="cpassword"
            placeholder="Re-type Password"
            className="border border-gray-900 rounded-sm  text-gray-700 p-2"
          />
                      <Button type="submit" loading={loading}>Register</Button>
          

          <p className="text-center flex justify-center gap-1">Already have an account?
            <a href="/login" className="hover:text-blue-800  hover:underline hover:decoration-solid">Log in</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
