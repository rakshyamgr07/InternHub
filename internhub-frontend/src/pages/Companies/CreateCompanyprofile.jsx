
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import {  FiGlobe, FiMapPin, FiFileText, FiArrowLeft, FiLoader, } from "react-icons/fi";
import { Building2 } from "lucide-react";

function CreateCompanyProfile() {
    const { token } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        companyName: "",
        description: "",
        website: "",
        location: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error("Please log in to register your company");
            navigate("/login");
            return;
        }

        if (
            !formData.companyName.trim() ||
            !formData.description.trim() ||
            !formData.location.trim()
        ) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL;

            const response = await axios.post(
                `${API_URL}/company/create`,
                {
                    companyName: formData.companyName.trim(),
                    description: formData.description.trim(),
                    website: formData.website.trim(),
                    location: formData.location.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(
                response.data.message ||
                "Company profile created successfully!"
            );

            navigate("/company-dashboard");
        } catch (error) {
            console.error(
                "Create company error:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to create company profile"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 pt-25 sm:px-6">
            <div className="mx-auto max-w-3xl">

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
                >
                    <FiArrowLeft />
                    Go Back
                </button>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="bg-blue-600 px-6 py-8 sm:px-10">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/15">
                            <Building2 className="text-3xl text-white" />
                        </div>

                        <h1 className="text-2xl font-bold text-white sm:text-3xl">
                            Create Company Profile
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
                            Introduce your organization to students and start
                            sharing internship opportunities on InternHub Nepal.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 p-6 sm:p-10"
                    >
                        <div>
                            <label
                                htmlFor="companyName"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Company Name *
                            </label>

                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                <input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="e.g. Tech Solutions Nepal"
                                    required
                                    className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Company Description *
                            </label>

                            <div className="relative">
                                <FiFileText className="absolute left-4 top-4 text-slate-400" />

                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Tell students about your company, its work, and its mission..."
                                    rows={5}
                                    required
                                    className="w-full resize-y rounded-lg border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <p className="mt-1 text-xs text-slate-400">
                                Give students a clear understanding of your organization.
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="website"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Company Website
                            </label>

                            <div className="relative">
                                <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                <input
                                    id="website"
                                    name="website"
                                    type="url"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                    className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="location"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Company Location *
                            </label>

                            <div className="relative">
                                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Kathmandu, Nepal"
                                    required
                                    className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => navigate("/company-dashboard")}
                                disabled={loading}
                                className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                onClick={()=>navigate("/company")}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <FiLoader className="animate-spin" />
                                        Creating Profile...
                                    </>
                                ) : (
                                    <>
                                        <Building2 />
                                        Create Company Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-5 text-center text-sm text-slate-500">
                    Already registered your company? Return to your{" "}
                    <button
                        onClick={() => navigate("/company-dashboard")}
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        company dashboard
                    </button>
                    .
                </p>
            </div>
        </div>
    );
}

export default CreateCompanyProfile;
