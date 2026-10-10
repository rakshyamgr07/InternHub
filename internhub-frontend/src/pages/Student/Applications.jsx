
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiBriefcase, FiFileText, FiCheckCircle, FiX, } from "react-icons/fi";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function Applications() {
    const { token, email, role } = useSelector((state) => state.user);
    console.log("Token:", token);
    console.log("Email:", email);
    console.log("Role:", role);
    const navigate = useNavigate();
    const { internshipId } = useParams();

    const [coverLetter, setCoverLetter] = useState("");
    const [resume, setResume] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!resume) {
            alert("Please upload your resume.");
            return;
        }

        if (!coverLetter.trim()) {
            alert("Please write a cover letter.");
            return;
        }

        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("coverLetter", coverLetter)
            formData.append("resume", resume)
            if (!token) {
                toast.error("Please log in before applying.");
                return;
            }
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/application/apply/${internshipId}`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success(res.data.message || "Application submitted successfully!")
            setCoverLetter("");
            setResume(null);
        } catch (error) {
            if (error.response?.status === 409) {
                toast.error("You have already applied for this internship.");
            } else {
                toast.error(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to submit application"
                );
            }

        }
        finally {
            setLoading(false)
        }
        console.log({ internshipId, coverLetter, resume, });
    };

    const handleFile = (file) => {
        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Please upload a PDF, DOC, or DOCX file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Resume must be smaller than 5 MB.");
            return;
        }

        setResume(file);
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl mt-20">

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600">
                    <FiArrowLeft /> Back to internship
                </button>

                <div className="mb-8">


                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Apply for Internship</h1>

                    <p className="mt-2 text-slate-500">
                        Submit your application and take the next step in your career.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className=" rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                        <p className="text-sm font-medium text-blue-700">
                            <FiBriefcase className="mr-2 inline" />Internship application</p>

                        <p className="mt-2 break-all text-sm text-slate-600">Internship ID: {internshipId}</p>
                    </div>
                    <br></br>
                    {/* Cover letter */}
                    <div>
                        <label htmlFor="coverLetter" className="mb-2 block text-sm font-semibold text-slate-800">Cover Letter
                            <span className="text-red-500">*</span>
                        </label>

                        <p className="mb-3 text-sm text-slate-500">Introduce yourself and explain why you are a good fit for this internship.</p>

                        <textarea
                            id="coverLetter"
                            name="coverLetter"
                            rows={7}
                            maxLength={3000}
                            required
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Dear Hiring Manager,&#10;&#10;I am interested in applying for this internship..."//&#10;&#10; it gives two new lines between paragraph
                            className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />

                        <p className="mt-2 text-right text-xs text-slate-400">
                            {coverLetter.length}/3000 characters
                        </p>
                    </div>

                    {/* Resume */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-800">
                            Upload Resume <span className="text-red-500">*</span>
                        </label>

                        <p className="mb-3 text-sm text-slate-500">Upload your latest resume in PDF, DOC, or DOCX format. Maximum size: 5 MB.</p>

                        {!resume ? (
                            <label onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setDragging(false);
                                    handleFile(e.dataTransfer.files[0]);
                                }}
                                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-5 py-10 text-center transition ${dragging
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50"
                                    }`}
                            >

                                <span className="text-sm font-semibold text-slate-800">
                                    Click to upload or drag and drop
                                </span>

                                <span className="mt-2 text-xs text-slate-500">
                                    PDF, DOC, DOCX (up to 5 MB)
                                </span>

                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={(e) => handleFile(e.target.files[0])}
                                />
                            </label>
                        ) : (
                            <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                                <FiFileText size={28} className="shrink-0 text-green-600" />

                                <div className="min-w-0 flex-1">
                                    <p className=" text-sm font-semibold text-slate-800">
                                        {resume.name}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        {(resume.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>
                                {/* for check */}
                                <FiCheckCircle className="shrink-0 text-green-600" />

                                {/* for cancel option */}
                                <button
                                    type="button"
                                    onClick={() => setResume(null)}
                                    aria-label="Remove resume"
                                    className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-red-600">
                                    <FiX size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                    <br></br>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm font-semibold text-slate-800">
                            Before submitting
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            Review your cover letter and make sure your resume contains
                            your latest education, skills, and project experience.
                        </p>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                        {/* for cancel option  */}
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancel
                        </button>

                        {/* for submit button  */}
                        <button type="submit"
                            onClick={handleSubmit}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200">
                            <FiCheckCircle size={18} />
                            Submit Application
                        </button>
                    </div>
                </form>

                <p className="mt-5 text-center text-xs text-slate-400">
                    Your application details will be submitted to the employer.
                </p>
            </div>
        </div>
    );
}

export default Applications;