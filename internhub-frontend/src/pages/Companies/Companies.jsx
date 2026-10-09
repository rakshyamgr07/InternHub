import axios from 'axios';
import { useEffect, useState } from 'react'
import Button from '../../components/Button';
import {  useNavigate } from 'react-router-dom';

function InternshipCard() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/company`);

        const data = response.data;

        setCompanies(data.companies || []);

      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch internships"
        );

        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);
  return (

    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-4">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-8 text-3xl font-bold text-slate-900">Search Internships  </h1>

        {loading && (
          <p className="py-10 text-center text-sm font-medium text-blue-600"> Loading...</p>
        )}

        {error && (<p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"> {error} </p>)}

        {!loading && !error && companies.length === 0 && (
          <p className="rounded-xl border border-slate-200 bg-white px-6 py-10 text-center text-slate-500 shadow-sm">  No internships found.</p>
        )}
        <h1 className='m-5 font-bold text-3xl '>Companies Registered in InternHub</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <div
              key={company._id}
              className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            > <div className="mb-4 flex items-center gap-3">
                <img
                  src={company?.logo}
                  alt={company?.companyName || "Company logo"}
                  className="h-12 w-12 rounded-full border border-slate-200 "
                />

                <div>
                  <p className="text-xl font-bold text-blue-600">
                    {company?.companyName}
                  </p>
                </div>
              </div>
              <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600">{company.description}</p>
              <div className="space-y-3 border-t border-slate-100 pt-4">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">Location:</span>{" "}{company.location}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">Website:</span>{" "}{company.website}
                </p>
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-800">
                    Total Posted Internship: {company.internshipCount !== 1 ? " " : ""}
                  </span>{" "}
                  {company.internshipCount}
                </p>



                <Button type="submit"
                  onClick={() => {
                    navigate(`/company/${company._id}`)
                  }
                  }
                  className="mb-2 ">
                  View Company</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );

}

export default InternshipCard
