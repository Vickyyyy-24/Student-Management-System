import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { studentAPI, Student, getImageUrl } from '../services/api';

// Premium SVG Icons matching Lucide
const FolderOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-12 w-12 text-slate-300 mx-auto mb-4"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    <path d="M2 10h20" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3.5 w-3.5 text-slate-400"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3.5 w-3.5 text-slate-400"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3.5 w-3.5 mr-1"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3.5 w-3.5 mr-1"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const MaleSymbolIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3 w-3 mr-1 text-blue-550"
  >
    <circle cx="10" cy="14" r="5" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="15" y1="9" x2="21" y2="3" />
  </svg>
);

const FemaleSymbolIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3 w-3 mr-1 text-pink-550"
  >
    <circle cx="12" cy="9" r="5" />
    <line x1="12" y1="14" x2="12" y2="22" />
    <line x1="9" y1="18" x2="15" y2="18" />
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
    className="h-4 w-4 mr-2"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await studentAPI.getAll();
      setStudents(res.data || []);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError('Could not establish database sync. Please make sure MongoDB and server are running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete the profile of student ${name}?`)) {
      try {
        await studentAPI.delete(id);
        setStudents(prev => prev.filter(s => s._id !== id));
      } catch (err: any) {
        console.error(err);
        alert('Failed to delete student record. Please try again.');
      }
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.mobileNo.toString().includes(searchTerm) ||
      student.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 border-b border-slate-200 pb-8">
          <div>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
              Registry Database
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-3 tracking-tight">
              Student Records Registry
            </h2>
            <p className="mt-2 text-sm text-slate-500 max-w-lg">
              Central database for querying, modifying, and maintaining active student enrollment profiles.
            </p>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shrink-0 self-start md:self-center"
          >
            <PlusIcon /> Add Student Profile
          </Link>
        </div>

        {/* Search Input */}
        <div className="mb-10 max-w-lg relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search registry records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-slate-250 rounded-2xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 shadow-sm hover:border-slate-350 transition-all duration-200"
          />
        </div>

        {/* States rendering */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Syncing student database...</p>
          </div>
        ) : error ? (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 flex flex-col md:flex-row items-center gap-4 py-6 max-w-2xl mx-auto shadow-sm">
            <span className="text-xl">⚠️</span>
            <div>
              <h4 className="font-bold text-base mb-1">Database Connection Timeout</h4>
              <p className="text-xs text-rose-600/90">{error}</p>
            </div>
            <button
              onClick={fetchStudents}
              className="mt-4 md:mt-0 md:ml-auto px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-colors text-xs"
            >
              Retry Sync
            </button>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl max-w-md mx-auto px-4 shadow-sm animate-fadeIn">
            <FolderOpenIcon />
            <h3 className="text-base font-bold text-slate-800">No student profiles loaded</h3>
            <p className="text-slate-400 text-sm mt-1 mb-6">
              {searchTerm ? 'No registry records match your keywords.' : 'Add your first student profile to populate the registry database.'}
            </p>
            {!searchTerm && (
              <Link
                to="/create"
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors text-xs shadow-md"
              >
                Register Student
              </Link>
            )}
          </div>
        ) : (
          /* Student Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {filteredStudents.map((student) => (
              <div
                key={student._id}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Avatar & Title */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={getImageUrl(student.profileImage)}
                    alt={student.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';
                    }}
                    className="h-14 w-14 rounded-xl object-cover ring-2 ring-slate-100 group-hover:ring-blue-500/30 transition-all duration-300"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {student.name}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 mt-0.5 rounded-full text-[10px] font-bold ${
                        student.gender === 'Male'
                          ? 'bg-blue-50 text-blue-600 border border-blue-100'
                          : 'bg-pink-50 text-pink-600 border border-pink-100'
                      }`}
                    >
                      {student.gender === 'Male' ? <MaleSymbolIcon /> : <FemaleSymbolIcon />}
                      {student.gender}
                    </span>
                  </div>
                </div>

                {/* Fields Contact */}
                <div className="mt-2 space-y-2.5 text-xs text-slate-500 border-t border-slate-100 pt-4 flex-1">
                  <div className="flex items-center gap-2.5">
                    <MailIcon />
                    <span className="truncate font-medium">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <PhoneIcon />
                    <span className="font-medium">{student.mobileNo}</span>
                  </div>
                </div>

                {/* Actions buttons */}
                <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-50 pt-4">
                  <Link
                    to={`/edit/${student._id}`}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all flex items-center gap-1"
                  >
                    <EditIcon /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(student._id, student.name)}
                    className="px-3.5 py-1.5 rounded-xl border border-rose-105 bg-rose-50/50 hover:bg-rose-50 text-[11px] font-bold text-rose-600 hover:text-rose-700 transition-all flex items-center gap-1"
                  >
                    <TrashIcon /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
