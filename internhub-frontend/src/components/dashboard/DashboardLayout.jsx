import { FiBriefcase, FiFileText, FiHome, FiSettings, FiUser, FiUsers } from "react-icons/fi";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
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
    </div>
)
export default DashboardLayout