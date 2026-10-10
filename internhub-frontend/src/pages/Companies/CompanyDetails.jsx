import axios from 'axios';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function CompanyDetails() {
  const { token, email, id } = useSelector((state) => state.user)

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { companyId } = useParams();
  const [internships, setInternships] = useState([]);
  console.log("companyId =", companyId);

  const navigate = useNavigate()

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
          "Failed to fetch company"
        );

        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId, token]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/internship/company/${companyId}/internships`
        );

        setInternships(response.data.internships || []);
      } catch (error) {
        console.error("Error fetching internships:", error);
      }
    };

    if (companyId) fetchInternships();
  }, [companyId]);
  return (

    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto mt-20 ">

        {/* <h1 className="mb-8 text-3xl font-bold text-slate-900">Search Company  </h1> */}

        {loading && (
          <p className="py-10 text-center text-sm font-medium text-blue-600"> Loading...</p>
        )}

        {error && (<p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"> {error} </p>)}

        {!loading && !error && company && (

          <div className="grid grid-rows gap-6 ">
            {/*  company */}
            <div key={company?._id}
              className="rounded-xl w-full border border-slate-50 bg-white p-6 shadow-sm ">
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
              </div>
            </div>

            {/* about company */}
            <div className='flex flex-col gap-3 w-full rounded-xl w-full border border-slate-50 bg-white p-6 shadow-sm '>
              <h1 className='font-bold text-xl'>About Company:</h1>
              <p>{company?.description}</p>
            </div>

            {/* internship portion */}
            <div className=" flex flex-col gap-3 rounded-xl  border border-slate-50 bg-white p-6 shadow-sm ">
              <h2 className="mb-5 text-2xl font-bold text-slate-900">Internships at {company.companyName}</h2>


              {internships.length === 0 ? (
                <p className="text-slate-500"> No internships posted yet. </p>
              ) : (
                <div className="grid gap-5 md:grid-cols-2 ">
                  {internships.map((item) => (
                    <div key={item._id} className="rounded-xl border bg-white p-5 shadow-sm">
                      <h3 className="text-lg font-bold">  {item.title}</h3>

                      <p className="mt-2 text-sm text-slate-600">{item.description}</p>

                      <p className="mt-3 text-sm">Location: {item.location} </p>
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold text-slate-800">Type:</span>{" "}{item.type}
                      </p>
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold text-slate-800">Duration:</span>{" "}{item.duration}
                      </p>
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold text-slate-800">Stipend:</span>{" "}
                        <span className="font-medium text-green-600">{item.stipend}</span>
                      </p>
                      <button
                        onClick={() => navigate(`/internship/${item._id}`)}
                        className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        View Internship
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );

}

export default CompanyDetails
