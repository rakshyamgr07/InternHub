import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import { useSelector } from "react-redux"
import axios from "axios"

function PostInternships() {
    const { token } = useSelector((state) => state.user)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        skills: "",
        location: "",
        type: "Remote",
        duration: "",
        stipend: "",
        deadline: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!token) {
            toast.error("please login first.")
            return;
        }
        try {
            setLoading(true);

            const payload = {
                ...formData,
                skills: formData.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),
            };
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/internship/post`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success("Internship Posted Successfully")
            navigate("/company/dashboard/internships");
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }
    const inputClass = "w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 pt-28">
            <div className="mx-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-2xl font-bold text-slate-800">Post internships</h1>

                <p className="mb-8 mt-2 text-slate-500">
                    Share an opportunity and find the right talent.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* title  */}
                    <div className="">
                        <label className="mb-2 block font-medium">
                            Internship Title
                        </label>
                        <input
                            className={inputClass}
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. MERN Stack Developer Intern"
                            required>

                        </input>
                    </div>

                    {/* description */}
                    <div className="">
                        <label className="mb-2 block font-medium">
                            Description
                        </label>
                        <input
                            className={inputClass}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the role and responsibilties..."
                            required>

                        </input>
                    </div>

                    {/* skills  */}
                    <div className="">
                        <label className="mb-2 block font-medium">
                            Skills
                        </label>
                        <input
                            className={inputClass}
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            placeholder="React, Node.js, MongoDB"
                            required>

                        </input>
                    </div>


                    {/* location  */}
                    <div className="">
                        <label className="mb-2 block font-medium">
                            Location
                        </label>
                        <input
                            className={inputClass}
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Kathmandu or Remote"
                            required>

                        </input>
                    </div>
                    {/* type  */}
                    <div className="">
                        <label className="mb-2 block font-medium">
                            Internship Type
                        </label>
                        <select className={inputClass}
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required >
                            <option value="Remote">Remote</option>
                            <option value="On-site">On-site</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    {/* duration  */}
                    <div className="">
                        <label className="mb-2 block font-medium">
                            Duration
                        </label>
                        <input
                            className={inputClass}
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="e.g. 3-4 months"
                            required>

                        </input>
                    </div>

                    {/* stipend */}
                    <div className="">
                        <label className="mb-2 block font-medium">
                            Monthly Stipend
                        </label>
                        <input
                            type="number"
                            className={inputClass}
                            name="stipend"
                            value={formData.stipend}
                            onChange={handleChange}
                            placeholder="e.g. NPR 10000"
                            required>

                        </input>
                    </div>

                    {/* deadline  */}
                    <div className="">
                        <label className="mb-2 block font-medium">
                            Application Deadline
                        </label>
                        <input
                            className={inputClass}
                            type="date"
                            min={new Date().toLocaleDateString("en-CA")}
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            required>

                        </input>
                    </div>

                    <button type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60" >
                        {loading ? "Posting..." : "Post Internship"}
                    </button>
                </form>
            </div>
        </div>
    )
}
export default PostInternships