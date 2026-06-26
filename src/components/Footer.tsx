import { Link } from 'react-router-dom';

// Premium SVG Icons matching Lucide
const GraduationCapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-white"
  >
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.91a2 2 0 0 0 1.66 0z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const FolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ZapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3 w-3 text-emerald-400"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900/60 text-slate-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCapIcon />
              </div>
              <span className="text-lg font-bold text-slate-200">EduManager</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              A responsive Student Profile Management dashboard for student record keeping and administrative tracking.
            </p>
          </div>

          {/* Quick Links with Admin link */}
          <div>
            <h4 className="text-slate-200 font-bold text-sm tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/records" className="hover:text-violet-400 transition-colors flex items-center gap-2">
                  <FolderIcon />
                  Student Records
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-violet-400 transition-colors flex items-center gap-2">
                  <PlusIcon />
                  Student Create
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-2 transition-colors">
                  <ShieldIcon />
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology & Status */}
          <div>
            <h4 className="text-slate-200 font-bold text-sm tracking-wider uppercase mb-4">Core Tech Stack</h4>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              TypeScript React, Tailwind CSS (v4), Express REST API, MongoDB Database.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <ZapIcon />
              Backend Connected
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-900 text-center text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} EduManager. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Security Standards</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Admin Dashboard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
