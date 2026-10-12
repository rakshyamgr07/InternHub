import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiSearch, FiUsers, FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";

function ManageCompanies() {
    const { token } = useSelector((state) => state.user);
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);


    const fetchCompanies = async () => {
        try {
            setLoading(true);

            const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/companies`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCompanies(res.data.companies || [])
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (token) {
            fetchCompanies()
        } else {
            setLoading(false)
        }
    }, [token])

    const handleDelete = async (companyId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this company? This action cannot be undone."
        )

        if (!confirmed) return;

        try {
            setDeletingId(companyId);
            await axios.delete(`${import.meta.env.VITE_API_URL}/admin/companies/${companyId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setCompanies((previous) =>
                previous.filter((company) => company._id !== companyId)
            );

            toast.success("company deleted successfully")
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally {
            setDeletingId(null);
        }
    }
    const handleVerify = async (companyId) => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/admin/companies/${companyId}/verify`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success) {
                toast.success("Company verified successfully!");
                setCompanies((prevCompanies) =>
                    prevCompanies.map((company) =>
                        company._id === companyId ? { ...company, verify: true } : company))
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    };
    const filteredCompanies = companies.filter((company) => {
        const query = search.toLowerCase();

        return (
            String(company.companyName || "").toLowerCase().includes(query) ||
            String(company.location || "").toLowerCase().includes(query) ||
            String(company.website || "").toLowerCase().includes(query)
        )
    });
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-slate-600">Loading companies...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-30 bg-slate-50 px-4 py-8 sm:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm font-semibold text-blue-600">ADMIN DASHBOARD
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-slate-900">
                            Manage Companies
                        </h1>
                        <p className="mt-2 text-slate-500">
                            View and manage registered InternHub Companies.
                        </p>
                    </div>

                </div>


                <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                            <FiUsers size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">
                                Registered Companies
                            </p>
                            <p className="text-2xl font-bold text-slate-900">
                                {companies.length}
                            </p>
                        </div>
                    </div>
                </div>


                <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or email..."
                            className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-blue-500" />
                    </div>
                </div>


                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] text-left">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-6 py-4">Company</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Website</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4">Verification</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredCompanies.map((company) => (
                                    <tr
                                        key={company._id}
                                        className="hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {company.logo ? (
                                                    <img src={company.logo} alt={company.companyName} className="h-10 w-10 rounded-full border border-slate-200 object-cover" />
                                                ) : (
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                                                        {(company.companyName || "C").charAt(0).toUpperCase()}
                                                    </div>
                                                )}

                                                <span className="font-semibold text-slate-800">{company.companyName || "Unnamed Company"}</span>
                                            </div>
                                        </td>

                                        {/* location */}
                                        <td className="px-6 py-4 text-sm text-slate-600">{company.location}</td>
                                        {/* website */}
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize`}>{company.website ? (
                                                <a href={company.website} target="_blank"
                                                    rel="noreferrer"
                                                    className="text-blue-600 hover:underline">visit Website</a>
                                            ) : ("-")}
                                            </span>
                                        </td>
                                        {/* join */}
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {company.createdAt ? new Date(company.createdAt).toLocaleDateString() : "—"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${company.verify
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {company.verify ? "Verified" : "Pending"}
                                            </span>
                                        </td>
                                        {/* actions */}
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button
                                                onClick={() => handleVerify(company._id)} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                                                Verify
                                            </button>
                                            <button
                                                onClick={() => handleDelete(company._id)}
                                                disabled={deletingId === company._id}
                                                className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50">
                                                <FiTrash2 />{deletingId === company._id ? "Deleting..." : "Delete"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredCompanies.length === 0 && (
                        <div className="px-6 py-12 text-center">
                            <FiUsers className="mx-auto text-4xl text-slate-300" />
                            <h2 className="mt-3 font-semibold text-slate-800">
                                No Companies found
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Try changing your search.
                            </p>
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
}

export default ManageCompanies

