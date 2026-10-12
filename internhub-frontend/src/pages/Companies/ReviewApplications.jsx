import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
    FiSearch,
    FiFileText,
    FiUser,
    FiCheckCircle,
    FiXCircle,
    FiClock
} from "react-icons/fi";
import { useSelector } from "react-redux";

function ReviewApplications() {
    const { token, id } = useSelector((state) => state.user);

    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function fetchApplications() {
            try {
                setLoading(true);

                // First get internships belonging to the company.
                const internshipRes = await axios.get(
                    `${API_URL}/internship/company/${id}/internships`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const internships = internshipRes.data.internships || [];

                // Then get applications for each internship.
                const results = await Promise.all(
                    internships.map((internship) =>
                        axios.get(
                            `${API_URL}/application/company-applications/${internship._id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        )
                    )
                );

                const allApplications = results.flatMap(
                    (result) => result.data.applications || []
                );

                allApplications.sort(
                    (a, b) =>
                        new Date(b.createdAt || 0) -
                        new Date(a.createdAt || 0)
                );

                setApplications(allApplications);
            } catch (error) {
                console.error("Fetch applications error:", error);
                toast.error(
                    error.response?.data?.message ||
                    "Failed to load applications"
                );
            } finally {
                setLoading(false);
            }
        }

        if (token && id) {
            fetchApplications();
        } else {
            setLoading(false);
        }
    }, [token, id, API_URL]);

    const updateStatus = async (applicationId, status) => {
        try {
            setUpdatingId(applicationId);

            // Ensure this URL matches your backend PUT route.
            const res = await axios.put(
                `${API_URL}/application/${applicationId}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setApplications((previous) =>
                previous.map((application) =>
                    application._id === applicationId
                        ? {
                              ...application,
                              status:
                                  res.data.application?.status || status
                          }
                        : application
                )
            );

            toast.success(
                res.data.message || "Application status updated"
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Could not update application status"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const getApplicant = (application) =>
        application.applicant || application.user || {};

    const filteredApplications = applications.filter((application) => {
        const applicant = getApplicant(application);
        const query = search.toLowerCase();

        const matchesSearch = [
            applicant.name,
            applicant.email,
            application.name,
            application.email,
            application.internship?.title,
            application.internshipTitle
        ].some((value) =>
            String(value || "").toLowerCase().includes(query)
        );

        const status = String(application.status || "pending").toLowerCase();

        return (
            matchesSearch &&
            (statusFilter === "all" || status === statusFilter)
        );
    });

    const countStatus = (status) =>
        applications.filter(
            (application) =>
                String(application.status || "pending").toLowerCase() === status
        ).length;

    const statusStyle = (status) => {
        switch (String(status || "pending").toLowerCase()) {
            case "shortlisted":
                return "bg-blue-100 text-blue-700";
            case "accepted":
                return "bg-green-100 text-green-700";
            case "rejected":
                return "bg-red-100 text-red-700";
            default:
                return "bg-amber-100 text-amber-700";
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-slate-600">Loading applications...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 pt-30 sm:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-sm font-semibold text-blue-600">
                        COMPANY DASHBOARD
                    </p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">
                        Review Applications
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Review candidates across all your posted internships.
                    </p>
                </div>

                </div>
                {/* Application list */}
                {filteredApplications.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
                        <FiFileText className="mx-auto text-4xl text-slate-300" />
                        <h2 className="mt-4 text-lg font-semibold text-slate-800">
                            No applications found
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Applications will appear here when students apply.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {filteredApplications.map((application) => {
                            const applicant = getApplicant(application);
                            const status = String(
                                application.status || "pending"
                            ).toLowerCase();

                            const internshipTitle =
                                application.internship?.title ||
                                application.internshipTitle ||
                                "Internship";

                            return (
                                <div
                                    key={application._id}
                                    className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
                                >
                                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                                        <div className="flex gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                                <FiUser className="text-xl" />
                                            </div>

                                            <div>
                                                <h2 className="text-lg font-bold text-slate-900">
                                                    {applicant.name ||
                                                        application.name ||
                                                        "Applicant"}
                                                </h2>
                                                <p className="text-sm text-slate-500">
                                                    {applicant.email ||
                                                        application.email ||
                                                        "Email unavailable"}
                                                </p>
                                                <p className="mt-2 text-sm font-medium text-blue-700">
                                                    {internshipTitle}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-400">
                                                    Applied on{" "}
                                                    {application.createdAt
                                                        ? new Date(
                                                              application.createdAt
                                                          ).toLocaleDateString()
                                                        : "Unknown date"}
                                                </p>
                                            </div>
                                        </div>

                                        <span
                                            className={`h-fit w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyle(status)}`}
                                        >
                                            {status}
                                        </span>
                                    </div>

                                    <div className="mt-5 border-t border-slate-100 pt-5">
                                        <h3 className="mb-2 text-sm font-semibold text-slate-800">
                                            Cover Letter
                                        </h3>
                                        <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                                            {application.coverLetter ||
                                                "No cover letter provided."}
                                        </p>
                                    </div>

                                    {application.resume && (
                                        <a
                                            href={application.resume}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                                        >
                                            <FiFileText />
                                            View Resume
                                        </a>
                                    )}

                                    <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                                        <button
                                            disabled={
                                                updatingId === application._id ||
                                                status === "shortlisted"
                                            }
                                            onClick={() =>
                                                updateStatus(
                                                    application._id,
                                                    "shortlisted"
                                                )
                                            }
                                            className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 disabled:opacity-50"
                                        >
                                            Shortlist
                                        </button>

                                        <button
                                            disabled={
                                                updatingId === application._id ||
                                                status === "accepted"
                                            }
                                            onClick={() =>
                                                updateStatus(
                                                    application._id,
                                                    "accepted"
                                                )
                                            }
                                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                                        >
                                            Accept
                                        </button>

                                        <button
                                            disabled={
                                                updatingId === application._id ||
                                                status === "rejected"
                                            }
                                            onClick={() =>
                                                updateStatus(
                                                    application._id,
                                                    "rejected"
                                                )
                                            }
                                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        
    );
}

export default ReviewApplications
