import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { studentAPI, Student, getImageUrl } from '../services/api';

// Premium SVG Icons matching Lucide
const ShieldIcon = ({ className = "h-5 w-5 text-white" }) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-rose-300"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const FolderIcon = ({ className = "h-4 w-4 text-blue-400" }) => (
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
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const MaleSymbolIcon = ({ className = "h-4 w-4 text-blue-400" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="10" cy="14" r="5" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="15" y1="9" x2="21" y2="3" />
  </svg>
);

const FemaleSymbolIcon = ({ className = "h-4 w-4 text-pink-400" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="9" r="5" />
    <line x1="12" y1="14" x2="12" y2="22" />
    <line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);

const ZapIcon = ({ className = "h-4 w-4 text-emerald-400" }) => (
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
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const GraduationCapIcon = ({ className = "h-5 w-5 text-slate-400" }) => (
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

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black mr-1"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function AdminPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        setLoading(true);
        const response = await studentAPI.getAll();
        setStudents(response.data || []);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch registration metrics. Ensure backend server is running.');
      } finally {
        setLoading(false);
      }
    };
    loadStatistics();
  }, []);

  // Compute metrics
  const totalCount = students.length;
  const maleCount = students.filter(s => s.gender === 'Male').length;
  const femaleCount = students.filter(s => s.gender === 'Female').length;
  const malePercent = totalCount > 0 ? Math.round((maleCount / totalCount) * 100) : 0;
  const femalePercent = totalCount > 0 ? Math.round((femaleCount / totalCount) * 100) : 0;

  // Get recent 4 students
  const recentStudents = [...students]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 bg-grid-pattern flex flex-col items-center justify-center py-20 px-4">
        <div className="h-10 w-10 rounded-full border-4 border-blue-900/60 border-t-white animate-spin mb-4"></div>
        <p className="text-blue-100 font-medium">Loading administrative metrics...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 bg-grid-pattern py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white">
      
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 animate-fadeIn">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <ShieldIcon className="h-7 w-7 text-white" /> Admin Panel Dashboard
            </h1>
            <p className="mt-2 text-sm text-blue-200/80">
              System overview, database statistics, and centralized student parameters.
            </p>
          </div>
          <div className="text-sm px-4 py-2 rounded-full bg-black/40 border border-white/10 text-slate-300 font-mono backdrop-blur-sm shadow-sm animate-fadeIn">
            System Time: {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-rose-500/15 border border-rose-500/25 text-rose-300 flex items-center gap-3">
            <AlertTriangleIcon />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* Overview Stat Cards (Glassmorphism style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Total Enrolled */}
          <div className="rounded-2xl border border-white/10 bg-black/75 p-6 relative overflow-hidden group backdrop-blur-sm shadow-lg">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 h-20 w-20 rounded-full bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors pointer-events-none"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Enrolled</span>
              <span className="p-2 rounded-lg bg-blue-500/15 text-blue-400">
                <FolderIcon className="h-5 w-5 text-blue-400" />
              </span>
            </div>
            <span className="block text-4xl font-extrabold text-white mb-1">{totalCount}</span>
            <span className="text-[10px] text-slate-500 font-medium">Registered Database Profiles</span>
          </div>

          {/* Male Count */}
          <div className="rounded-2xl border border-white/10 bg-black/75 p-6 relative overflow-hidden group backdrop-blur-sm shadow-lg">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 h-20 w-20 rounded-full bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors pointer-events-none"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Male Students</span>
              <span className="p-2 rounded-lg bg-blue-500/15 text-blue-400">
                <MaleSymbolIcon className="h-5 w-5 text-blue-400" />
              </span>
            </div>
            <span className="block text-4xl font-extrabold text-white mb-1">{maleCount}</span>
            <span className="text-[10px] text-blue-400 font-bold">{malePercent}% of registry</span>
          </div>

          {/* Female Count */}
          <div className="rounded-2xl border border-white/10 bg-black/75 p-6 relative overflow-hidden group backdrop-blur-sm shadow-lg">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 h-20 w-20 rounded-full bg-pink-500/5 group-hover:bg-pink-500/10 transition-colors pointer-events-none"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Female Students</span>
              <span className="p-2 rounded-lg bg-pink-500/15 text-pink-400">
                <FemaleSymbolIcon className="h-5 w-5 text-pink-400" />
              </span>
            </div>
            <span className="block text-4xl font-extrabold text-white mb-1">{femaleCount}</span>
            <span className="text-[10px] text-pink-400 font-bold">{femalePercent}% of registry</span>
          </div>

          {/* System Status */}
          <div className="rounded-2xl border border-white/10 bg-black/75 p-6 relative overflow-hidden group backdrop-blur-sm shadow-lg">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 h-20 w-20 rounded-full bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors pointer-events-none"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Server Status</span>
              <span className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400">
                <ZapIcon className="h-5 w-5 text-emerald-400" />
              </span>
            </div>
            <span className="block text-xl font-extrabold text-emerald-400 mb-1">ONLINE</span>
            <span className="text-[10px] text-slate-500 font-medium">DB Connection Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left / Center Sections: Analytics */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gender representation metrics */}
            <div className="rounded-2xl border border-white/10 bg-black/75 p-6 backdrop-blur-sm shadow-lg">
              <h3 className="text-lg font-bold text-slate-200 mb-6">Gender Representation</h3>
              {totalCount > 0 ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                      <span className="text-blue-400 flex items-center gap-1">
                        <MaleSymbolIcon className="h-4 w-4 text-blue-400" /> Male ({maleCount})
                      </span>
                      <span className="text-slate-300">{malePercent}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${malePercent}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                      <span className="text-pink-400 flex items-center gap-1">
                        <FemaleSymbolIcon className="h-4 w-4 text-pink-400" /> Female ({femaleCount})
                      </span>
                      <span className="text-slate-300">{femalePercent}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-pink-500 rounded-full transition-all duration-500" style={{ width: `${femalePercent}%` }}></div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">No registration profiles available to compute metrics.</p>
              )}
            </div>

            {/* Operations variables table */}
            <div className="rounded-2xl border border-white/10 bg-black/75 p-6 backdrop-blur-sm shadow-lg">
              <h3 className="text-lg font-bold text-slate-200 mb-4">Registry Configuration Parameters</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-xs text-slate-300">
                  <tbody className="divide-y divide-white/5">
                    <tr className="border-t border-white/5">
                      <td className="py-3.5 text-slate-400 flex items-center gap-1.5">
                        <GraduationCapIcon className="h-4 w-4 text-slate-400" />
                        <span>Mongoose Schema Model</span>
                      </td>
                      <td className="py-3.5 text-right font-mono text-blue-400">Student</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 text-slate-400">Profile Uploads Destination</td>
                      <td className="py-3.5 text-right font-mono text-[#bef264]">backend/uploads/</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 text-slate-400">Database Storage Format</td>
                      <td className="py-3.5 text-right font-mono text-slate-300">MongoDB BSON Object</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 text-slate-400">Node REST API Base Route</td>
                      <td className="py-3.5 text-right font-mono text-slate-400">/api/student</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right column: Recent profiles / actions */}
          <div className="space-y-8">
            
            {/* Recent Registrations */}
            <div className="rounded-2xl border border-white/10 bg-black/75 p-6 backdrop-blur-sm shadow-lg">
              <h3 className="text-lg font-bold text-slate-200 mb-4">Recent Profiles</h3>
              {recentStudents.length > 0 ? (
                <div className="space-y-4">
                  {recentStudents.map(student => (
                    <div key={student._id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
                      <img
                        src={getImageUrl(student.profileImage)}
                        alt={student.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';
                        }}
                        className="h-10 w-10 rounded-lg object-cover ring-1 ring-white/10"
                      />
                      <div className="min-w-0">
                        <span className="block text-xs font-bold text-slate-200 truncate">{student.name}</span>
                        <span className="block text-[10px] text-slate-500 font-mono">
                          {new Date(student.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No registrations logged yet.</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-white/10 bg-black/75 p-6 backdrop-blur-sm shadow-lg">
              <h3 className="text-lg font-bold text-slate-200 mb-4">Quick Shortcuts</h3>
              <div className="grid grid-cols-1 gap-3">
                <Link
                  to="/"
                  className="w-full text-center px-4 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-1.5"
                >
                  <FolderIcon className="h-3.5 w-3.5 text-slate-300" /> Open Records
                </Link>
                <Link
                  to="/create"
                  className="w-full text-center px-4 py-2.5 rounded-full bg-[#bef264] hover:bg-[#a3e635] text-xs font-bold uppercase tracking-wider text-black shadow-md shadow-lime-950/20 hover:shadow-lime-950/40 transition-all flex items-center justify-center gap-1"
                >
                  <PlusIcon /> Add Student
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
