import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function EditInternship() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        skills: "",
        location: "",
        type: "On-site",
        duration: "",
        stipend: "",
        deadline: ""
    });

    const API_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        async function fetchInternship() {
            try {
                const res = await axios.get(`${API_URL}/internship/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                const internship = res.data.internship || res.data.internships;

                if (!internship) {
                    toast.error("Internship details not found");
                    return;
                }

                setFormData({
                    title: internship.title || "",
                    description: internship.description || "",
                    skills: Array.isArray(internship.skills)
                        ? internship.skills.join(", ")
                        : internship.skills || "",
                    location: internship.location || "",
                    type: internship.type || "On-site",
                    duration: internship.duration || "",
                    stipend: internship.stipend ?? "",
                    deadline: internship.deadline
                        ? new Date(internship.deadline)
                            .toISOString()
                            .split("T")[0]
                        : ""
                });
            } catch (error) {
                toast.error(error.response?.data?.message);
            } finally {
                setLoading(false);
            }
        }

        if (id && token) {
            fetchInternship();
        } else {
            setLoading(false);
        }
    }, [id, token, API_URL]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim()) {
            toast.error("Title and description are required");
            return;
        }
        try {
            setSaving(true);
            const payload = {
                ...formData,
                skills: formData.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean)
            };

            const res = await axios.put(`${API_URL}/internship/${id}`, payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            toast.success("Internship updated successfully")
            navigate("/company/dashboard/internships")
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-slate-600">
                    Loading internship details...
                </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 pt-30 space-y-5">
            <div className="mx-auto max-w-3xl">
                <button
                    type="button"
                    onClick={() => navigate("/company/dashboard/internships")}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600">
                    <FiArrowLeft />
                    Back to Manage Internships
                </button>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Edit Internship
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Update your internship information below.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
                        {/* title  */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Internship Title *
                            </label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="e.g. MERN Stack Developer Intern"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                        </div>

                        {/* description */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={5}
                                placeholder="Describe the internship responsibilities..."
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>


                        {/* skilsl */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Skills
                            </label>
                            <input
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="React, Node.js, MongoDB"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />

                        </div>
                        {/* location */}
                        <div className="">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Location
                                </label>
                                <input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Kathmandu, Nepal or Remote"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                            </div>


                            {/* type */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Type
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                                    <option value="On-site">On-site</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>

                            {/* duration */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Duration
                                </label>
                                <input
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder="e.g. 3 months"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                            </div>

                            {/* stipend */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Stipend
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    name="stipend"
                                    value={formData.stipend}
                                    onChange={handleChange}
                                    placeholder="e.g. 10000"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                            </div>

                            {/* deadline */}
                            <div className="">
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Application Deadline
                                </label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/company/dashboard/internships")
                                }
                                disabled={saving}
                                className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                                <FiSave />
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditInternship;

