import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { studentAPI, getImageUrl } from '../services/api';

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
    className="h-4.5 w-4.5 text-blue-400"
  >
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.91a2 2 0 0 0 1.66 0z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-10 w-10 text-slate-600"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
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
    className="h-4 w-4 text-black"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const MaleSymbolIcon = ({ className = "h-4 w-4 mr-1.5" }) => (
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

const FemaleSymbolIcon = ({ className = "h-4 w-4 mr-1.5" }) => (
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

export default function StudentForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  
  // Image states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  // Loading/Error states
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load student profile if in Edit Mode
  useEffect(() => {
    if (isEditMode && id) {
      const fetchStudentData = async () => {
        try {
          setFetching(true);
          setError(null);
          const response = await studentAPI.getById(id);
          const student = response.data;
          
          setName(student.name);
          setEmail(student.email);
          setMobileNo(student.mobileNo.toString());
          setGender(student.gender);
          setExistingImage(student.profileImage);
        } catch (err: any) {
          console.error(err);
          setError('Failed to fetch student details. Verify that the backend server is active.');
        } finally {
          setFetching(false);
        }
      };
      fetchStudentData();
    }
  }, [isEditMode, id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Form validation
    if (!name.trim()) return setError('Full name is required.');
    if (!email.trim()) return setError('Email address is required.');
    if (!mobileNo.trim() || isNaN(Number(mobileNo))) return setError('A valid mobile number is required.');
    if (!gender) return setError('Please select a gender.');
    if (!isEditMode && !imageFile) return setError('A profile picture is required to register a new student.');

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('email', email.trim().toLowerCase());
      formData.append('mobileNo', mobileNo.trim());
      formData.append('gender', gender);
      if (imageFile) {
        formData.append('profileImage', imageFile);
      }

      if (isEditMode && id) {
        await studentAPI.update(id, formData);
      } else {
        await studentAPI.create(formData);
      }

      navigate('/');
    } catch (err: any) {
      console.error("Submission failed:", err);
      const serverData = err.response?.data;
      const msg = 
        serverData?.message || 
        serverData?.error || 
        (typeof serverData === 'string' && serverData.length > 0 ? serverData.slice(0, 150) : null) || 
        err.message || 
        'Server error occurred during submission.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 bg-grid-pattern flex flex-col items-center justify-center py-20 px-4">
        <div className="h-10 w-10 rounded-full border-4 border-blue-900/60 border-t-white animate-spin mb-4"></div>
        <p className="text-blue-100 font-medium">Fetching registry details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 bg-grid-pattern py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative z-10 animate-fadeIn">
        
        {/* Back Pill Button */}
        <div className="mb-6 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center text-xs font-bold text-slate-300 hover:text-white bg-black/40 hover:bg-black/60 border border-white/10 px-4 py-2 rounded-full transition-all duration-200 backdrop-blur-sm gap-1.5 shadow animate-fadeIn"
          >
            <span>←</span> Back to Student Records
          </Link>
        </div>

        {/* Professional Registration Glass Card */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/80 backdrop-blur-md p-8 md:p-12 shadow-2xl">
          
          {/* Card ambient glow accents */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 h-72 w-72 rounded-full bg-blue-50/5 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-72 w-72 rounded-full bg-[#bef264]/5 blur-3xl pointer-events-none"></div>

          <div className="relative">
            
            {/* Header Description */}
            <div className="mb-8 border-b border-white/10 pb-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/25 text-[10px] font-bold uppercase tracking-wider mb-3">
                <GraduationCapIcon /> {isEditMode ? 'Update Module' : 'Registration Portal'}
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                {isEditMode ? 'Modify Student Profile' : 'Register New Student'}
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {isEditMode
                  ? 'Update registration fields and avatar files. Fields checked for backend database integrity.'
                  : 'Enter professional student records info and attach profile image to start synchronization.'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-semibold flex items-start gap-2.5">
                <span className="text-base shrink-0">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Profile Image Dropper Preview */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-2">
                <div className="relative group shrink-0">
                  <div
                    onClick={handleTriggerFileInput}
                    className="h-28 w-28 rounded-full bg-slate-950 border border-white/10 overflow-hidden ring-2 ring-white/5 group-hover:ring-[#bef264]/50 cursor-pointer transition-all duration-300 relative flex items-center justify-center group"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                    ) : existingImage ? (
                      <img src={getImageUrl(existingImage)} alt="Existing avatar" className="h-full w-full object-cover" />
                    ) : (
                      <div className="text-center text-[10px] text-slate-500 font-semibold px-2 flex flex-col items-center">
                        <UserIcon />
                        <span className="mt-1 block">Upload Photo</span>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <span className="text-[10px] text-[#bef264] font-bold uppercase tracking-wider">
                        {imagePreview || existingImage ? 'Replace' : 'Upload'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center sm:text-left space-y-1.5">
                  <span className="block text-sm font-bold text-slate-200">Avatar Image Attachment</span>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={handleTriggerFileInput}
                    className="px-4 py-2 text-xs font-semibold rounded-full bg-white text-black hover:bg-slate-100 transition-colors shadow-md flex items-center gap-1.5 mx-auto sm:mx-0"
                  >
                    <FolderIcon /> Select Picture File
                  </button>
                  <span className="block text-[10px] text-slate-500 font-medium">
                    Supports JPEG, PNG, or GIF format up to 5MB.
                  </span>
                </div>
              </div>

              {/* Form Input fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Vikas Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-slate-100 placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-[#bef264]/40 focus:border-[#bef264] transition-all text-sm font-medium"
                    required
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. vikas@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-slate-100 placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-[#bef264]/40 focus:border-[#bef264] transition-all text-sm font-medium"
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider" htmlFor="mobile">
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    className="block w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-slate-100 placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-[#bef264]/40 focus:border-[#bef264] transition-all text-sm font-medium"
                    required
                  />
                </div>

                {/* Gender select Custom Tiles */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Gender</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`flex items-center justify-center py-2.5 rounded-xl border cursor-pointer font-bold text-xs uppercase tracking-wide transition-all ${
                        gender === 'Male'
                          ? 'border-[#bef264] bg-[#bef264]/10 text-[#bef264]'
                          : 'border-white/10 bg-slate-950 text-slate-400 hover:text-slate-200 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={gender === 'Male'}
                        onChange={() => setGender('Male')}
                        className="sr-only"
                      />
                      <MaleSymbolIcon className={`h-4.5 w-4.5 mr-1.5 ${gender === 'Male' ? 'text-[#bef264]' : 'text-slate-400'}`} /> Male
                    </label>
                    <label
                      className={`flex items-center justify-center py-2.5 rounded-xl border cursor-pointer font-bold text-xs uppercase tracking-wide transition-all ${
                        gender === 'Female'
                          ? 'border-[#bef264] bg-[#bef264]/10 text-[#bef264]'
                          : 'border-white/10 bg-slate-950 text-slate-400 hover:text-slate-200 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={gender === 'Female'}
                        onChange={() => setGender('Female')}
                        className="sr-only"
                      />
                      <FemaleSymbolIcon className={`h-4.5 w-4.5 mr-1.5 ${gender === 'Female' ? 'text-[#bef264]' : 'text-slate-400'}`} /> Female
                    </label>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 border-t border-white/10 pt-6 mt-8">
                <Link
                  to="/"
                  className="px-6 py-2.5 rounded-full border border-white/10 bg-black/40 hover:bg-black/60 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-all"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center px-7 py-2.5 rounded-full bg-[#bef264] hover:bg-[#a3e635] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-lime-950/20 hover:shadow-lime-950/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
                >
                  {loading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  {isEditMode ? 'Save Changes' : 'Confirm Registration'}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
