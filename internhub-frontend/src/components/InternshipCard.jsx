import axios from 'axios';
import { useEffect, useState } from 'react'
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function InternshipCard() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/internship`);

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
  }, []);
  return (

    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto ">

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
               
                
                  <Button type="submit" 
                   onClick={() => {
                    navigate(`/internship/${internship._id}`)
                  }
                  }loading={loading}>View Internship</Button>
                

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );

}

export default InternshipCard
