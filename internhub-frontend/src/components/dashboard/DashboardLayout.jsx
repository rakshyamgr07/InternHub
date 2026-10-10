import { FiBriefcase, FiFileText, FiHome, FiLogOut, FiSettings, FiUser, FiUsers } from "react-icons/fi";
import { useDispatch } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom";
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
    async function handleLayout() {
        dispatch(logout());
        navigate("/login", { replace: true });
    }
    const links = menus[role] || []
};
return (
    <div>
    <aside className="">
        <NavLink to ="/">
        <span>
            Intern</span>
            Hub
            </NavLink>
            <p>
                {role || "user"}Dashboard
            </p>
            <nav>
                {links.amp(({label,path,icon:Icon})=>{
                    <NavLink
                    key = {path}
                    to ={path}
                    end = {path.endsWith("/dashboard")}
                    className={({isActive})=> `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }>
                <Icon size ={18}/>
                {label}                        
                    </NavLink>
                })}
            </nav>
            <button
            onClick={handleLogout}>
                <FiLogOut size ={18}/>
                Logout
            </button>
    </aside>
    {/* main */}
    <main>
        <header>
            <div>
                <h1>Dashboard</h1>
                <p>Welcome back, {name || "User"}!</p>
            </div>

            <NavLink
            to="/profile"
            className=""
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
export default DashboardLayout