import { NavLink } from 'react-router-dom';
import { useState } from 'react';

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
    className="h-5 w-5 text-blue-600"
  >
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.91a2 2 0 0 0 1.66 0z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3.5 w-3.5 text-emerald-400"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('admin@edumanager.com');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      {/* Floating Pill Navbar */}
      <div className="max-w-7xl mx-auto w-full rounded-full bg-black/95 border border-slate-900/80 shadow-2xl px-4 py-2 sm:px-6 sm:py-3 flex items-center justify-between transition-all duration-300">
        
        {/* Left: Circular Logo Badge */}
        <NavLink to="/" className="flex items-center">
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-md transition-transform duration-300 hover:scale-110">
            <GraduationCapIcon />
          </div>
        </NavLink>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-10">
          <NavLink
            to="/records"
            className={({ isActive }) =>
              `text-sm font-semibold transition-all duration-200 relative py-1 ${
                isActive
                  ? 'text-white after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-blue-500 after:rounded-full'
                  : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            Student Records
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `text-sm font-semibold transition-all duration-200 relative py-1 ${
                isActive
                  ? 'text-white after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-blue-500 after:rounded-full'
                  : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            Student Create
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `text-sm font-semibold transition-all duration-200 relative py-1 ${
                isActive
                  ? 'text-white after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-blue-500 after:rounded-full'
                  : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            Admin Dashboard
          </NavLink>
        </nav>

        {/* Right: Email Button Badge (Desktop) & Menu Button (Mobile) */}
        <div className="flex items-center gap-3">
          {/* Copyable Email Badge */}
          <button
            onClick={handleCopyEmail}
            className={`font-semibold text-xs px-5 py-2 rounded-full shadow-md select-none cursor-pointer active:scale-95 transition-all duration-300 min-w-[145px] text-center flex items-center justify-center font-mono ${
              copied
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/35'
                : 'bg-white text-black hover:bg-slate-100 border border-transparent'
            }`}
          >
            {copied ? (
              <span className="flex items-center gap-1.5 animate-pulse">
                Copied <CheckIcon />
              </span>
            ) : (
              <span>admin@edumanager.com</span>
            )}
          </button>

          {/* Toggle Menu Button (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200 focus:outline-none shrink-0"
            aria-label="Toggle Menu"
          >
            {isOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto w-full rounded-[2rem] bg-black/95 border border-slate-900 shadow-2xl p-6 text-center animate-fadeIn flex flex-col items-center justify-center gap-4">
          <NavLink
            to="/records"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `w-full py-2.5 rounded-xl text-base font-semibold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white border-l-4 border-blue-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`
            }
          >
            Student Records
          </NavLink>
          <NavLink
            to="/create"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `w-full py-2.5 rounded-xl text-base font-semibold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white border-l-4 border-blue-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`
            }
          >
            Student Create
          </NavLink>
          <NavLink
            to="/admin"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `w-full py-2.5 rounded-xl text-base font-semibold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white border-l-4 border-blue-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`
            }
          >
            Admin Dashboard
          </NavLink>
        </div>
      )}
    </header>
  );
}
