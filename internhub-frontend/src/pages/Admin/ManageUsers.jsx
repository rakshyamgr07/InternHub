import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiSearch, FiUsers, FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";

function ManageUsers() {
    const { token } = useSelector((state) => state.user);

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);


    const fetchUsers = async () => {
        try {
            setLoading(true);

            const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(res.data.users || [])
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (token) {
            fetchUsers()
        } else {
            setLoading(false)
        }
    }, [token])

    const handleDelete = async (userId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user? This action cannot be undone."
        )

        if (!confirmed) return;

        try {
            setDeletingId(userId);
            await axios.delete(`${import.meta.env.VITE_API_URL}/admin/users/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setUsers((previous) =>
                previous.filter((user) => user._id !== userId)
            );

            toast.success("User deleted successfully")
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally {
            setDeletingId(null);
        }
    }

    const filteredUsers = users.filter((user) => {
        const query = search.toLowerCase();

        const matchesSearch =
            String(user.name || "").toLowerCase().includes(query) ||
            String(user.email || "").toLowerCase().includes(query)

        const role = String(user.role || "student").toLowerCase()

        return (
            matchesSearch &&
            (roleFilter === "all" || role === roleFilter)
        )
    });

    const roleStyle = (role) => {
        switch (String(role || "student").toLowerCase()) {
            case "admin":
                return "bg-purple-100 text-purple-700"
            case "company":
                return "bg-blue-100 text-blue-700"
            default:
                return "bg-green-100 text-green-700"
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-slate-600">Loading users...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-30 bg-slate-50 px-4 py-8 sm:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm font-semibold text-blue-600">
                            ADMIN DASHBOARD
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-slate-900">
                            Manage Users
                        </h1>
                        <p className="mt-2 text-slate-500">
                            View and manage registered InternHub users.
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
                                Registered Users
                            </p>
                            <p className="text-2xl font-bold text-slate-900">
                                {users.length}
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
                            className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-blue-500"/>
                    </div>

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500">
                        <option value="all">All roles</option>
                        <option value="student">Students</option>
                        <option value="company">Companies</option>
                        <option value="admin">Admins</option>
                    </select>
                </div>


                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] text-left">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            {/* name  */}
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                                                    {(user.name || "U")
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <span className="font-semibold text-slate-800">
                                                    {user.name || "Unnamed"}
                                                </span>
                                            </div>
                                        </td>

                                        {/* email */}
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {user.email}
                                        </td>
                                        {/* role */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${roleStyle(user.role)}`}>
                                                {user.role || "student"}
                                            </span>
                                        </td>
                                        {/* join */}
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                                        </td>
                                        {/* delete */}
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                disabled={deletingId === user._id}
                                                className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50">
                                                <FiTrash2 />
                                                {deletingId === user._id ? "Deleting..." : "Delete"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="px-6 py-12 text-center">
                            <FiUsers className="mx-auto text-4xl text-slate-300" />
                            <h2 className="mt-3 font-semibold text-slate-800">
                                No users found
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Try changing your search or role filter.
                            </p>
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
}

export default ManageUsers;

