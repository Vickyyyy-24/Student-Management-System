import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import StudentList from './pages/StudentList';
import StudentForm from './pages/StudentForm';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-violet-500 selection:text-white">
        {/* Header/Navbar */}
        <Header />
        
        {/* Content Wrapper */}
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/records" element={<StudentList />} />
            <Route path="/create" element={<StudentForm />} />
            <Route path="/edit/:id" element={<StudentForm />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={
              <div className="text-center py-20">
                <span className="text-5xl block mb-4">🔍</span>
                <h2 className="text-2xl font-bold text-slate-200">404 - Page Not Found</h2>
                <p className="text-slate-400 mt-2">The route or page you are requesting does not exist.</p>
              </div>
            } />
          </Routes>
        </main>

        {/* Footer with links */}
        <Footer />
      </div>
    </Router>
  );
}
