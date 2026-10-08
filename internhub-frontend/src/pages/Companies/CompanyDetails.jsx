import axios from 'axios';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function CompanyDetails() {
     const { token, email, id } = useSelector((state) => state.user)

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
     const { companyId } = useParams();
     console.log("companyId =", companyId);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/company/${companyId}`,
                    {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    }
               )
        const data = response.data;

        setCompany(data.company || null);

      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch internships"
        );

        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId,token]);
  return (

    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto mt-20 ">

        {/* <h1 className="mb-8 text-3xl font-bold text-slate-900">Search Company  </h1> */}

        {loading && (
          <p className="py-10 text-center text-sm font-medium text-blue-600"> Loading...</p>
        )}

        {error && (<p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"> {error} </p>)}

        {!loading && !error && company && (
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div key={company?._id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={company?.logo}
                  alt={company?.companyName || "Company logo"}
                  className="h-12 w-12 rounded-full border border-slate-200 "
                />

                 <div>
      <h1 className="text-2xl font-bold text-blue-600">
        {company?.companyName}
      </h1>

      <p className="text-sm text-slate-500">
        {company?.internshipCount} Internships
      </p>
    </div>
              </div>
              <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600">{company?.description}</p>
              <div className="space-y-3 border-t border-slate-100 pt-4">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">Location:</span>{" "}{company?.location}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">Website:</span>{" "}{company?.website}
                </p>
                {/* <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-800">
                    Total Posted Internship: {company?.internshipCount !== 1 ? " " : ""}
                  </span>{" "}
                  {company?.internshipCount}
                </p> */}
              </div>
            </div>
        </div>
        )}
        
      </div>

    </div>
  );

}

export default CompanyDetails
