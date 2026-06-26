import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { studentAPI } from '../services/api';

// Premium SVG Icons matching Lucide
const ZapIcon = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} viewBox="0 0 24 24">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5 text-blue-300">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
  </svg>
);

const BarChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5 text-blue-300">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5 text-blue-300">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5 text-blue-300">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const GraduationCapIcon = ({ className = "h-5 w-5 text-blue-500" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.91a2 2 0 0 0 1.66 0z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

export default function MainPage() {
  const [totalStudents, setTotalStudents] = useState<number>(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await studentAPI.getAll();
        setTotalStudents(res.data?.length || 0);
      } catch (err) {
        console.error("Failed to fetch students count", err);
      }
    };
    fetchCount();
  }, []);

  return (
    <div className="w-full animate-fadeIn">
      {/* HERO BANNER: Educaa blue grid theme */}
      <section className="relative w-full bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 bg-grid-pattern py-16 px-4 sm:px-6 lg:px-8 border-b border-blue-900/60 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-12 relative z-10">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 text-blue-300 border border-blue-800/40 text-xs font-semibold uppercase tracking-wider">
            <ZapIcon className="h-3 w-3 text-lime-400" /> #1 Student Management Platform 2026
          </div>

          {/* Heading */}
          <div className="text-center max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Launch Careers with <br />
              <span className="bg-gradient-to-r from-yellow-200 to-lime-200 bg-clip-text text-transparent">
                Ready Online Registry
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-blue-100/80 max-w-2xl mx-auto font-medium">
              Join thousands of administrators worldwide accessing cutting-edge profiles designed for modern institutional records.
            </p>
          </div>

          {/* Call To Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/create"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#bef264] hover:bg-[#a3e635] text-black font-bold text-sm shadow-xl shadow-lime-950/20 hover:shadow-lime-950/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 animate-pulse hover:animate-none"
            >
              Register Student Now
              <span className="ml-1.5 text-base">↗</span>
            </Link>
            <Link
              to="/records"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0b1b3d]/90 hover:bg-[#0b1b3d]/50 text-white border border-blue-800/40 font-bold text-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Explore Records ⬇
            </Link>
          </div>

          {/* Layout Split: Quote (Left) | Student Image & Circle (Center) | Review (Right) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 items-center justify-items-center mt-12 gap-8 lg:gap-4">
            
            {/* Quote & Count (Left) */}
            <div className="hidden lg:block max-w-[220px] text-left self-center justify-self-start">
              <div className="text-3xl text-blue-300 font-serif leading-none font-bold">“</div>
              <p className="text-xs text-blue-100/80 mt-1">
                From profile records creation to real-time administrative stats, our platform empowers digital transformation.
              </p>
              <div className="mt-6">
                <span className="block text-4xl font-extrabold text-white">
                  {totalStudents > 0 ? `${totalStudents}00+` : '100+'}
                </span>
                <span className="text-[10px] text-blue-300 uppercase font-bold tracking-wider">
                  Active Enrollment
                </span>
              </div>
            </div>

            {/* Mockup Circle & Portrait (Center) */}
            <div className="relative flex items-end justify-center w-full max-w-[340px] md:max-w-[380px]">
              
              {/* Navy Arc/Circle */}
              <div className="absolute bottom-0 w-full aspect-square rounded-full bg-[#071330]/90 border border-blue-900/35 -z-10 shadow-2xl"></div>
              
              {/* Main Student Image */}
              <img
                src="/imgbin_b93368169a843dc7795700abe98ddc61.png"
                alt="Representative Student Profile"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=500';
                }}
                className="w-[85%] object-cover object-top h-[320px] md:h-[370px] rounded-b-full scale-105 transform hover:scale-110 transition-transform duration-500 z-10 drop-shadow-2xl"
              />
              
              {/* Floating Indicator Symbols */}
              <div className="absolute top-1/4 left-0 -translate-x-1/2 p-2.5 bg-[#0b1b3d]/90 rounded-full border border-blue-800/40 shadow-lg select-none">
                <LightbulbIcon />
              </div>
              <div className="absolute top-1/3 right-0 translate-x-1/2 p-2.5 bg-[#0b1b3d]/90 rounded-full border border-blue-800/40 shadow-lg select-none">
                <BarChartIcon />
              </div>
              <div className="absolute bottom-1/4 right-3 translate-x-1/2 p-2.5 bg-[#0b1b3d]/90 rounded-full border border-blue-800/40 shadow-lg select-none">
                <TargetIcon />
              </div>
              <div className="absolute bottom-1/3 left-3 -translate-x-1/2 p-2.5 bg-[#0b1b3d]/90 rounded-full border border-blue-800/40 shadow-lg select-none">
                <SettingsIcon />
              </div>
            </div>

            {/* Testimonial & Review (Right) */}
            <div className="hidden lg:block max-w-[220px] text-left self-center justify-self-end">
              <div className="flex gap-1 text-yellow-400 text-sm mb-2">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-xs text-blue-100/80">
                "Modern, sleek, and focused on real metrics. I loved the CRUD search engine and responsive file upload handling."
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-blue-900 border border-blue-700 flex items-center justify-center">
                  <GraduationCapIcon className="h-3 w-3 text-white" />
                </div>
                <div className="text-[10px]">
                  <span className="block font-bold text-white leading-none">Jason Kim</span>
                  <span className="text-slate-400">Lead Registrar</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ACCREDITATION/PARTNER LOGOS (White Bar) */}
      <section className="bg-white py-8 border-b border-slate-200 flex flex-wrap justify-center items-center gap-10 sm:gap-16 px-4">
        {/* Microsoft */}
        <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors duration-200">
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4 shrink-0">
            <span className="bg-[#f25022] w-1.5 h-1.5"></span>
            <span className="bg-[#7fba00] w-1.5 h-1.5"></span>
            <span className="bg-[#00a4ef] w-1.5 h-1.5"></span>
            <span className="bg-[#ffb900] w-1.5 h-1.5"></span>
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-700 font-sans select-none">Microsoft Partner</span>
        </div>
      </section>
    </div>
  );
}
