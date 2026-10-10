import React from 'react'
import { FiCheckCircle, FiClock, FiFileText } from 'react-icons/fi';

function StudentDashboard() {
     const stats = [
    {
      label: "Total Applications",
      value: "—",
      icon: FiFileText,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Pending",
      value: "—",
      icon: FiClock,
      color: "bg-amber-100 text-amber-600",
    },
    {
      label: "Shortlisted",
      value: "—",
      icon: FiCheckCircle,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-slate-800">
          Student Overview
        </h2>
        <p className="mt-1 text-slate-500">
          Track your internship applications and discover new opportunities.
        </p>
      </section>

      {/* Statistics */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {label}
              </p>
              <div className={`rounded-lg p-3 ${color}`}>
                <Icon size={22} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-800">
              {value}
            </p>
          </div>
        ))}
      </section>

      {/* Quick actions */}
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold text-slate-800">
          Quick Actions
        </h3>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Link
            to="/internships"
            className="flex items-center justify-between rounded-xl border border-slate-200 p-5 transition hover:border-blue-400 hover:bg-blue-50"
          >
            <div>
              <FiSearch className="mb-3 text-xl text-blue-600" />
              <h4 className="font-semibold text-slate-800">
                Find Internships
              </h4>
              <p className="mt-1 text-sm text-slate-500">
                Explore opportunities that match your skills.
              </p>
            </div>
            <FiArrowRight className="text-blue-600" />
          </Link>

          <Link
            to="/student/dashboard/applications"
            className="flex items-center justify-between rounded-xl border border-slate-200 p-5 transition hover:border-blue-400 hover:bg-blue-50"
          >
            <div>
              <FiFileText className="mb-3 text-xl text-blue-600" />
              <h4 className="font-semibold text-slate-800">
                My Applications
              </h4>
              <p className="mt-1 text-sm text-slate-500">
                Review your submitted applications.
              </p>
            </div>
            <FiArrowRight className="text-blue-600" />
          </Link>
        </div>
      </section>
    </div>
  )
  
}

export default StudentDashboard
