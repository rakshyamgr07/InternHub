import { FiBriefcase, FiFileText, FiHome, FiLogOut, FiSettings, FiUser, FiUsers } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../utils/userSlice";

function DashboardLayout() {
    const { name, role } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menus = {
        student: [
            { label: "Overview", path: "/student/dashboard", icon: FiHome },
            { label: "Browse Internships", path: "/internships", icon: FiBriefcase },
            { label: "My Applications", path: "/student/dashboard/applications", icon: FiFileText },
            { label: "My Profile", path: "/profile", icon: FiUser },
        ]
        ,
        company: [
            { label: "Overview", path: "/company/dashboard", icon: FiHome },
            { label: "My Internships", path: "/company/dashboard/internships", icon: FiBriefcase },
            { label: "Applicants", path: "/company/dashboard/applicants", icon: FiUsers },
            { label: "Company Profile", path: "/profile", icon: FiSettings },
        ],
        admin: [
            { label: "Overview", path: "/admin/dashboard", icon: FiHome },
            { label: "Users", path: "/admin/dashboard/users", icon: FiUsers },
            { label: "Internships", path: "/admin/dashboard/internships", icon: FiBriefcase },
            { label: "Applications", path: "/admin/dashboard/applications", icon: FiFileText },
        ],
    };
    async function handleLogout() {
        dispatch(logout());
        navigate("/login", { replace: true });
    }
    const links = menus[role] || []

return (
    <div className="min-h-screen  bg-slate-50 md:flex ">
        
        <aside className="flex flex-col mt-20 bg-slate-900 p-5 text-white ">
            <NavLink to="/" className="mb-8 text-2xl font-bold">
                <span className="text-blue-400">
                    Intern</span>
                Hub
            </NavLink>
            <p className="mb-3 text-xs uppercase tracking-widest text-slate-400">
                {role || "user"}Dashboard
            </p>
            <nav className="flex flex-col gap-2">
                {links.map(({ label, path, icon: Icon }) => {
                    <NavLink
                        key={path}
                        to={path}
                        end={path.endsWith("/dashboard")}
                        className={({ isActive }) => `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-slate-300 hover:bg-slate-800"
                            }`
                        }>
                        <Icon size={18} />
                        {label}
                    </NavLink>
                })}
            </nav>
            <button
                onClick={handleLogout}
                className="mt-6 flex items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800">
                <FiLogOut size={18} />
                Logout
            </button>
        </aside>
        {/* main */}
        <main className="min-w-0 flex-1">
            <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
                    <p  className="text-sm text-slate-500">Welcome back, {name || "User"}!</p>
                </div>

                <NavLink
                    to="/profile"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700"
                    title="My profile">
                    {(name || "U").charAt(0).toUpperCase()}
                </NavLink>
            </header>
            <div className="p-5 md:p-8">
                <Outlet />
            </div>
        </main>
    </div>
    
)
};
export default DashboardLayout