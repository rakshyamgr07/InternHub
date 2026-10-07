import { GraduationCap, Building2, Rocket, Search, Send, ArrowRight, } from "lucide-react";
const features = [
  {
    icon: GraduationCap,
    title: "For Students",
    description: "Find the right internship and gain real-world experience to build your future.",
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Building2,
    title: "For Companies",
    description: "Discover skilled and motivated emerging talent who bring fresh ideas and perspectives to your team.",
    bg: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Rocket,
    title: "Career Growth",
    description: "Learn, experience and grow towards your dream career with the right opportunities and support.",
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

const steps = [
  {
    number: "1",
    icon: Search,
    title: "Discover",
    description: "Browse internships and find opportunities that match your skills.",
  },
  {
    number: "2",
    icon: Send,
    title: "Apply",
    description: "Submit applications and showcase your skills and potential.",
  },
  {
    number: "3",
    icon: Rocket,
    title: "Grow",
    description: "Gain experience, build your network and move towards your career goals.",
  },
];

function About() {
  return (
    <div className="min-h-screen bg-white">

      <section className="w-full bg-gradient-to-r text-center from-blue-50 to-white">
        <div className="mx-auto  px-6 py-16 lg:px-10 lg:py-20 ">
          <div className="mt-20">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600"> About InternHub</p>
            <h1 className="text-4xl font-bold leading-tight text-[#001B3D] sm:text-5xl lg:text-6xl"> Where Careers{" "}
              <span className="text-blue-600"> Begin.</span>
            </h1>
            <p className="mt-6  text-base leading-7 text-gray-600 sm:text-lg">InternHub is a dedicated platform that connects students with real internship opportunities and helps companies find tal   ented, motivated interns.</p>
          </div>
        </div>
      </section>


      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_2fr]">
          {/* Mission Text */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">  Our Mission</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#001B3D] sm:text-4xl">Connecting Talent With Opportunity</h2>
            <p className="mt-6 leading-7 text-gray-600"> We believe that every student has the potential to build a great future. InternHub bridges the gap between talented students and forward-thinking companies, creating opportunities for learning, growth and long-term success.</p>
          </div>
          {/* Feature Cards */}
          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title}
                  className={`group rounded-2xl border border-blue-100 ${feature.bg} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`} >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-full ${feature.iconBg}`}>
                    <Icon className={`h-7 w-7 ${feature.iconColor}`} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-[#001B3D]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{feature.description} </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600"> How It Works </p>
            <h2 className="mt-3 text-3xl font-bold text-[#001B3D] sm:text-4xl"> Simple Steps to Your Dream </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-500"> Getting started is easy. Follow these simple steps and start your journey today.</p>
          </div>


          {/* Steps */}
          <div className="mt-12 grid gap-8 md:grid-cols-3 transition duration:300 hover:scale-105">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative flex gap-5 rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_0_25px_rgba(37,99,235,0.06)]" >
                  {/* Number */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-blue-600"> {step.number} </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-bold text-[#001B3D]"> {step.title} </h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-gray-500"> {step.description} </p>
                  </div>
                  {/* Arrow between cards */}
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute -right-6 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-blue-500 md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;