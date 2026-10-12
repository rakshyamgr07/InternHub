
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {FiFileText,FiClock, FiCheckCircle, FiXCircle} from "react-icons/fi";

function MyApplications() {
  const { token } = useSelector((state) => state.user);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/application/my-applications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(res.data.applications || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load your applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  const getStatusStyle = (status) => {
    switch (String(status || "pending").toLowerCase()) {
      case "accepted":
      case "shortlisted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return <p className="p-6 text-slate-600">Loading applications...</p>;
  }

  return (
    <div className="space-y-6 p-30">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 ">
          My Applications
        </h1>
        <p className="mt-2 text-slate-500">
          Track the internships you have applied for.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <FiFileText className="mx-auto mb-4 text-4xl text-slate-400" />
          <h2 className="text-lg font-semibold text-slate-800">
            No applications yet
          </h2>
          <p className="mt-2 text-slate-500">
            Apply for an internship to see it listed here.
          </p>
          <Link
            to="/internship"
            className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
            Browse Internships
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application._id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    {application.internship?.title ||
                      application.internshipTitle ||
                      "Internship"}
                  </h2>

                  <p className="mt-3 text-sm text-slate-500">
                    Applied on:{" "}
                    {application.createdAt
                      ? new Date(application.createdAt).toLocaleDateString()
                      : "Date unavailable"}
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ${getStatusStyle(
                      application.status
                    )}`}>
                    {String(application.status || "Pending").toLowerCase() ===
                    "rejected" ? (
                      <FiXCircle />
                    ) : String(application.status || "pending").toLowerCase() ===
                      "accepted" ||
                      String(application.status || "").toLowerCase() ===
                        "shortlisted" ? (
                      <FiCheckCircle />
                    ) : (
                      <FiClock />
                    )}

                    {application.status || "Pending"}
                  </span>
                </div>
              </div>

              {application.coverLetter && (
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <h3 className="font-medium text-slate-700">
                    Cover Letter
                  </h3>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">
                    {application.coverLetter}
                  </p>
                </div>
              )}

              {application.resume && (
                <div className="mt-4">
                  <a
                    href={application.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-blue-600 hover:underline">
                    View Resume
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;

