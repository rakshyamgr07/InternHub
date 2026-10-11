import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {  FiBriefcase, FiCheckCircle, FiClock, FiFileText, FiPlus, FiSearch, FiUser, FiXCircle } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CompanyDashboard() {
    const { id, token } = useSelector((state) => state.user);
    const [applications, setApplications] = useState([]);
    const [internships, setInternships] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardData() {
            if (!token || !id) {
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/internship/company/${id}/internships`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                const companyInternships = res.data.internships || [];
                setInternships(companyInternships);

                const result = await Promise.all(companyInternships
                    .map((internship) =>
                        axios.get(`${import.meta.env.VITE_API_URL}/application/company-applications/${internship._id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        )
                    ));
                const allApplications = result.flatMap((res) => res.data.applications || []);

                allApplications.sort(
                    (a, b) =>
                        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
                )
                setApplications(allApplications)
            } catch (error) {
                toast.error(error.response?.data?.message);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboardData()
    }, [token, id]);

    const getStatus = (status) =>
        String(status || "pending").trim().toLowerCase();

    const countStatus = (status) =>
        applications.filter(
            (application) => getStatus(application.status) === status
        ).length;
    const stats = [
        {
            label: "Total Internships",
            value: internships.length,
            icon: FiBriefcase,
            color: "bg-amber-100 text-amber-600",
        },
        {
            label: "Total Applications",
            value: applications.length,
            icon: FiUser,
            color: "bg-blue-100 text-blue-600",
        },
        {
            label: "Shortlisted",
            value: countStatus("shortlisted"),
            icon: FiClock,
            color: "bg-green-100 text-green-600",
        },
        {
            label: "Hired",
            value: countStatus("accepted"),
            icon: FiCheckCircle,
            color: "bg-green-100 text-green-600",
        },
    ];

    return (
        <div className="min-h-screen space-y-8 bg-slate-50  md:p-8">

            <section className="flex flex-col justify-between pt-25 gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                        Company Overview </h1>
                    <p className="mt-2 text-sm text-slate-500 md:text-base">
                        Manage your internships and find the right talent.
                    </p>
                </div>
                <Link to="/company/dashboard/internships/new"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700" >
                    <FiPlus size={19} />
                    Post New Internship
                </Link>
            </section>

            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ label, value, icon: Icon, color }) => (
                    <div key={label}
                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md" >
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500">{label}</p>
                            <div className={`rounded-xl p-3 ${color}`}> <Icon size={22} />
                            </div>
                        </div>
                        <p className="mt-5 text-3xl font-bold text-slate-800">{value}</p>
                    </div>
                ))}
            </section>


            {/* company's internships */}
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">
                            Your Internships </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage your posted opportunities. </p>
                    </div>
                    <Link to="/company/dashboard/internships"
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700" >
                        View all </Link>
                </div>
                <div className="space-y-3">
                    {loading ? (
                        <p className="py-6 text-center text-slate-500">
                            Loading internships... </p>) :
                        internships.length === 0 ?
                            (
                                <p className="py-6 text-center text-slate-500"> You haven't posted any internships yet. </p>
                            ) : (
                                internships.map((internship) => {
                                    const applicantCount = applications.filter((application) =>
                                        String(application.internship?._id || application.internship) === String(internship._id))
                                        .length;



                                    <div key={internship._id}
                                        className="flex flex-col justify-between gap-3 rounded-lg border border-slate-100 p-4 sm:flex-row sm:items-center" >
                                        <div>
                                            <h3 className="font-semibold text-slate-800">
                                                {internship.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {applicantCount}
                                                applicants </p>
                                        </div>
                                        <Link to="/company/dashboard/applications"
                                            className="text-sm font-medium text-blue-600 hover:underline" >
                                            View Applicants
                                        </Link>
                                    </div>

                                }))}
                </div>
            </section>
            {/* quick actions */}
            <section className="grid gap-4 sm:grid-cols-2">
                <Link to="/company/dashboard/internships"
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:bg-blue-50" >
                    <div>
                        <FiBriefcase className="mb-3 text-xl text-blue-600" />
                        <h3 className="font-semibold text-slate-800">Manage Internships</h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Edit and manage your posted internships.
                        </p>
                    </div>
                </Link>
                <Link to="/company/dashboard/applications"
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:bg-blue-50" >
                    <div>
                        <FiFileText className="mb-3 text-xl text-blue-600" />
                        <h3 className="font-semibold text-slate-800">Review Applications</h3>
                        <p className="mt-1 text-sm text-slate-500"> Review candidates and update application statuses. </p>
                    </div>
                </Link>
            </section>
        </div>
    );
}

export default CompanyDashboard

