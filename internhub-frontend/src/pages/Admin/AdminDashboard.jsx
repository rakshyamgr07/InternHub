import axios from 'axios';
import { Building2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FiBriefcase, FiCheckCircle, FiClock, FiFileText, FiSearch, FiUser, FiXCircle } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const { token } = useSelector((state) => state.user);
    const [applications, setApplications] = useState([]);
    const [internships, setInternships] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Token:", token);

        async function fetchDashboardData() {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const [userRes, companyRes, internshipRes, applicationRes] =
                    await Promise.all([
                        axios.get(`${import.meta.env.VITE_API_URL}/admin/users`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        ),
                        axios.get(`${import.meta.env.VITE_API_URL}/admin/companies`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        ),
                        axios.get(`${import.meta.env.VITE_API_URL}/admin/internships`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        ),
                        axios.get(`${import.meta.env.VITE_API_URL}/admin/applications`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        )
                    ])

                setUsers(userRes.data.users || [])
                setCompanies(companyRes.data.companies || [])
                setInternships(internshipRes.data.internships || []);
                setApplications(applicationRes.data.applications || [])

            } catch (error) {
                toast.error(error.response?.data?.message);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboardData()
    }, [token]);

    const getStatus = (status) =>
        String(status || "pending").trim().toLowerCase();

    const countStatus = (status) =>
        applications.filter(
            (application) => getStatus(application.status) === status
        ).length;

    const stats = [
        {
            label: "Total Users",
            value: users.length,
            icon: FiUser,
            color: "bg-amber-100 text-amber-600",
        },
        {
            label: "Total Companies",
            value: companies.length,
            icon: Building2,
            color: "bg-blue-100 text-blue-600",
        },
        {
            label: "Total Internships",
            value: internships.length,
            icon: FiBriefcase,
            color: "bg-green-100 text-green-600",
        },
        {
            label: "Total Applications",
            value: applications.length,
            icon: FiFileText,
            color: "bg-green-100 text-green-600",
        },
    ];

    if(loading){
        return(
            <div className='flex min-h-screen items-center justify-center'>
                <p className='text-slate-600'>
                    Loading main dashboard........
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-8 p-30">
            <section className=''>
                <h2 className="text-2xl font-bold text-slate-800  ">
                    Admin Overview
                </h2>
                <p className="mt-1 text-slate-500">
                    Track your internship applications and discover new opportunities.
                </p>
            </section>

            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map(({ label, value, icon: Icon, color }) => (
                    <div
                        key={label}
                        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500">
                                {label}
                            </p>
                            <div className={`rounded-lg p-3 ${color}`}>
                                <Icon size={22} />
                            </div>
                        </div>

                        <p className="mt-4 text-3xl font-bold text-slate-800">
                            {value}
                        </p>
                    </div>
                ))}
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold text-slate-800">
                    Quick Actions
                </h3>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                   

                    <Link
                        to="/admin/dashboard/manage-users"
                        className="flex items-center justify-between rounded-xl border border-slate-200 p-5 transition hover:border-blue-400 hover:bg-blue-50">
                        <div>
                            <FiUser className="mb-3 text-xl text-blue-600" />
                            <h4 className="font-semibold text-slate-800">
                                Show Users
                            </h4>
                            <p className="mt-1 text-sm text-slate-500">
                                Review your submitted applications.
                            </p>
                        </div>
                    </Link>
                     <Link
                        to="/admin/dashboard/manage-company"
                        className="flex items-center justify-between rounded-xl border border-slate-200 p-5 transition hover:border-blue-400 hover:bg-blue-50"
                    >
                        <div>
                            <Building2 className="mb-3 text-xl text-blue-600" />
                            <h4 className="font-semibold text-slate-800">
                                Show Companies
                            </h4>
                            <p className="mt-1 text-sm text-slate-500">
                                Review your submitted applications.
                            </p>
                        </div>
                    </Link>
                    
                     <Link
                        to="/internship"
                        className="flex items-center justify-between rounded-xl border border-slate-200 p-5 transition hover:border-blue-400 hover:bg-blue-50">
                        <div>
                            <FiSearch className="mb-3 text-xl text-blue-600" />
                            <h4 className="font-semibold text-slate-800">
                                Show Internships Posted
                            </h4>
                            <p className="mt-1 text-sm text-slate-500">
                                Explore opportunities that match your skills.
                            </p>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    )

}

export default AdminDashboard

