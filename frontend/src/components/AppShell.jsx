import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import logo from "../assets/logo.jpg";
import {
  HiHome,
  HiAcademicCap,
  HiBookOpen,
  HiChartBar,
  HiLogout,
  HiSearch,
  HiMenu,
  HiX,
  HiPlus,
  HiLightningBolt,
  HiUser
} from 'react-icons/hi';

const AppShell = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const navItems = [
    { id: 'home', icon: HiHome, label: 'Dashboard', path: '/' },
    { id: 'courses', icon: HiAcademicCap, label: 'Explore', path: '/allcourses' },
    { id: 'learning', icon: HiBookOpen, label: 'My Learning', path: '/enrolledcourses' },
    ...(userData?.role === 'educator'
      ? [{ id: 'studio', icon: HiChartBar, label: 'Studio', path: '/dashboard' }]
      : []),
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-inter">
      {/* Side Navigation */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 260 }}
        className="fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-40 flex flex-col shadow-[1px_0_10px_rgba(0,0,0,0.02)]"
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-50">
          {!sidebarCollapsed && (
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={logo} alt="Logo" className="w-9 h-9 rounded-xl object-cover shadow-sm" />
              <span className="text-lg font-black text-slate-900 tracking-tight">
                Elite Courses
              </span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"
          >
            {sidebarCollapsed ? <HiMenu className="w-5 h-5" /> : <HiX className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                isActive(item.path)
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive(item.path) ? 'text-white' : 'text-slate-400'}`} />
              {!sidebarCollapsed && <span className="truncate tracking-tight">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom Profile Section */}
        <div className="p-4 border-t border-slate-50 space-y-2">
          {userData && (
            <button
              onClick={() => navigate('/profile')}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all border border-transparent ${
                sidebarCollapsed ? 'justify-center' : 'hover:bg-slate-50 hover:border-slate-100'
              } group`}
            >
              {userData.photoUrl ? (
                <img src={userData.photoUrl} className="w-10 h-10 rounded-xl object-cover shadow-sm" alt="" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold uppercase border border-slate-200">
                  {userData.name?.charAt(0)}
                </div>
              )}
              {!sidebarCollapsed && (
                <div className="flex-1 text-left truncate">
                  <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{userData.name}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{userData.role}</div>
                </div>
              )}
            </button>
          )}

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all font-bold text-sm group ${sidebarCollapsed && 'justify-center'}`}
          >
            <HiLogout className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div
        className="flex-1 min-h-screen flex flex-col overflow-x-hidden"
        style={{ marginLeft: sidebarCollapsed ? 80 : 260, transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 md:px-12 sticky top-0 z-30">
          <div className="flex-1 max-w-xl">
            <div 
              onClick={() => setShowCommandPalette(true)}
              className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all cursor-pointer group border border-slate-100/50"
            >
              <HiSearch className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              <span className="text-slate-400 font-medium text-sm">Quick search...</span>
              <kbd className="ml-auto px-2 py-1 bg-white rounded text-[10px] text-slate-400 font-bold border border-slate-200">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {userData?.role === 'educator' && (
              <button
                onClick={() => navigate('/createcourses')}
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all text-sm"
              >
                <HiPlus className="w-4 h-4" />
                <span>Create Course</span>
              </button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 md:p-12 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Command Palette */}
      <AnimatePresence>
        {showCommandPalette && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCommandPalette(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 px-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border border-slate-100"
            >
              <div className="p-5 border-b border-slate-50">
                <input
                  type="text"
                  placeholder="Go to page..."
                  className="w-full px-4 py-3 bg-slate-50 rounded-2xl border-none outline-none text-slate-900 font-bold placeholder-slate-400 text-lg"
                  autoFocus
                />
              </div>
              <div className="p-3 max-h-[400px] overflow-y-auto space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { navigate(item.path); setShowCommandPalette(false); }}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-slate-600 font-bold group-hover:text-slate-900">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppShell;
