import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import toast from "react-hot-toast";

function SearchInternships() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q") || "";
    const selectedLocation = searchParams.get("location") || "";

    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                setLoading(true);
                setError("");

                const params = new URLSearchParams();

                if (query) {
                    params.append("q", query);
                }

                if (selectedLocation) {
                    params.append("location", selectedLocation);
                }

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/internship/search-internship?${params.toString()}`
                );

                const data = response.data;

                setInternships(data.internships || []);

            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to fetch internships"
                );

                setInternships([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInternships();
    }, [query, selectedLocation]);

    return (

        <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                <h1 className="mb-8 text-3xl font-bold text-slate-900">Search Internships  </h1>

                {loading && (
                    <p className="py-10 text-center text-sm font-medium text-blue-600"> Loading...</p>
                )}

                {error && (<p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"> {error} </p>)}

                {!loading && !error && internships.length === 0 && (
                    <p className="rounded-xl border border-slate-200 bg-white px-6 py-10 text-center text-slate-500 shadow-sm">  No internships found.</p>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {internships.map((internship) => (
                        <div key={internship._id}
                            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <h2 className="mb-3 text-xl font-bold text-slate-900">{internship.title}</h2>
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
               <a href="/application">
                <Button type="submit"  loading={loading}>Apply Now</Button>
                </a>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}
export default SearchInternships;