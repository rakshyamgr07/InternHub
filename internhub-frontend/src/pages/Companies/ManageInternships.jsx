
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiBriefcase, FiEdit2, FiTrash2, FiUsers, FiPlus, FiMapPin, FiClock, } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ManageInternships() {
    const { id, token } = useSelector((state) => state.user);

    const [internships, setInternships] = useState([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState(null)

    const API_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        async function fetchInternships() {
            if (!token || !id) {
                setLoading(false)
                return;
            }

            try {
                const res = await axios.get(
                    `${API_URL}/internship/company/${id}/internships`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setInternships(res.data.internships || []);
            } catch (error) {
                console.error("Fetch internships error:", error);

                toast.error(error.response?.data?.message)
            } finally {
                setLoading(false);
            }
        }

        fetchInternships();
    }, [API_URL, id, token]);

    const handleDelete = async (internshipId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this internship?"
        );

        if (!confirmed) return;

        try {
            setDeletingId(internshipId);

            await axios.delete(`${API_URL}/internship/${internshipId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setInternships((previous) =>
                previous.filter(
                    (internship) => internship._id !== internshipId
                )
            );

            toast.success("Internship deleted successfully.")
        } catch (error) {
            console.error("Delete internship error:", error)

            toast.error("Failed to delete internship.")
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 px-4 pt-32 text-center text-slate-500">
                Loading internships...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 pt-28 md:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                            Manage Internships
                        </h1>

                        <p className="mt-2 text-slate-500">
                            View, update, and manage your internship opportunities.
                        </p>
                    </div>

                    <Link
                        to="/company/dashboard/internships/new"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
                        <FiPlus size={19} />
                        Post Internship
                    </Link>
                </div>

                <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                            <FiBriefcase size={24} />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Total Internships
                            </p>
                            <p className="text-2xl font-bold text-slate-800">
                                {internships.length}
                            </p>
                        </div>
                    </div>
                </div>

                {internships.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                        <FiBriefcase className="mx-auto mb-4 text-4xl text-slate-400" />

                        <h2 className="text-lg font-semibold text-slate-800">
                            No internships posted yet
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Create your first internship to start receiving applications.
                        </p>

                        <Link
                            to="/company/dashboard/internships/new"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            <FiPlus />
                            Create Internship
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-5 lg:grid-cols-2">
                        {internships.map((internship) => (
                            <div
                                key={internship._id}
                                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-800">
                                            {internship.title}
                                        </h2>

                                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                                            {internship.description}
                                        </p>
                                    </div>

                                    <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                        {internship.type}
                                    </span>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
                                    <span className="flex items-center gap-2">
                                        <FiMapPin />
                                        {internship.location}
                                    </span>

                                    <span className="flex items-center gap-2">
                                        <FiClock />
                                        {internship.duration}
                                    </span>
                                </div>

                                <div className="mt-4">
                                    <p className="text-sm font-medium text-slate-700">
                                        Required Skills
                                    </p>

                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {(Array.isArray(internship.skills)
                                            ? internship.skills
                                            : []
                                        ).map((skill, index) => (
                                            <span
                                                key={`${skill}-${index}`}
                                                className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                    <div>
                                        <p className="text-xs text-slate-500">
                                            Monthly stipend
                                        </p>
                                        <p className="mt-1 font-semibold text-slate-800">
                                            NPR {Number(internship.stipend || 0).toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            to={`/company/dashboard/internships/edit/${internship._id}`}
                                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                                            <FiEdit2 />
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            disabled={deletingId === internship._id}
                                            onClick={() => handleDelete(internship._id)}
                                            className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:opacity-50">
                                            <FiTrash2 />
                                            {deletingId === internship._id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </div>
                                </div>

                                <Link
                                    to={`/company/dashboard/applications?internshipId=${internship._id}`}
                                    className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100">
                                    <FiUsers />
                                    View Applicants
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageInternships;

