import axios from 'axios';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';

function InternshipDetails() {
    const { token, email } = useSelector((state) => state.user)

    const [internship, setInternship] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { id } = useParams();
    console.log("internshipId =", id);

    const navigate = useNavigate()
    useEffect(() => {
        const fetchInternship = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/internship/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                const data = response.data;

                setInternship(data.internships || null);

            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to fetch internship"
                );

                setInternship(null);
            } finally {
                setLoading(false);
            }
        };

        fetchInternship();
    }, [id, token]);
    return (

        <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto mt-20 ">

                {/* <h1 className="mb-8 text-3xl font-bold text-slate-900">Search Company  </h1> */}

                {loading && (
                    <p className="py-10 text-center text-sm font-medium text-blue-600"> Loading...</p>
                )}

                {error && (<p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"> {error} </p>)}

                {!loading && !error && internship && (

                    <div className="grid grid-rows gap-6 ">
                        {/*  company */}
                        <div key={internship._id}
                            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <div className="mb-4 flex items-center gap-3">
                                <img
                                    src={internship.company?.logo}
                                    alt={internship.company?.companyName || "Company logo"}
                                    className="h-12 w-12 rounded-full border border-slate-200 "
                                />

                                <div>
                                    <p className="text-xl font-bold text-blue-600">
                                        {internship.company?.companyName}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Internship Opportunity
                                    </p>
                                </div>
                            </div>
                            <h2 className="mb-3 text-xl font-semibold text-slate-900">{internship.title}</h2>
                            <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600">{internship.description}</p>
                            <div className="space-y-3 border-t border-slate-100 pt-4">
                                <p className="text-sm text-slate-600">
                                    <span className="font-semibold text-slate-800">Location:</span>{" "}{internship.location}
                                </p>
                                <p className="text-sm text-slate-600">
                                    <span className="font-semibold text-slate-800">Type:</span>{" "}{internship.type}
                                </p>
                                <p className="text-sm text-slate-600">
                                    <span className="font-semibold text-slate-800">Duration:</span>{" "}{internship.duration}
                                </p>

                                <p className="text-sm text-slate-600">
                                    <span className="font-semibold text-slate-800">Stipend:</span>{" "}
                                    <span className="font-medium text-green-600">{internship.stipend}</span>
                                </p>
                                <div className="mt-4">
                                    <h3 className="mb-2 text-sm font-semibold text-slate-800">
                                        Required Skills
                                    </h3>

                                    <div className="flex flex-wrap gap-2">
                                        {(Array.isArray(internship.skills)? internship.skills: internship.skills ? [internship.skills]: [])
                                        .map((skill, index) => (
                                            <span key={index}  className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {(!internship.skills || (Array.isArray(internship.skills) && internship.skills.length === 0)) && (
                                            <p className="text-sm text-slate-500">No skills specified</p>
                                        )}
                                </div>
                    
                                    <Button type="submit" loading={loading} className="items-center"
                                    onClick={() => navigate(`/application/${internship._id}`)}>Apply Now</Button>

                            </div>
                        </div>

                    </div>
                )};
            </div>
        </div>
    )
}

export default InternshipDetails
