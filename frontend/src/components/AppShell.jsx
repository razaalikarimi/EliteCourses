import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
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

  // Command palette keyboard shortcut
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
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Side Navigation */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className="fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-40 flex flex-col shadow-sm"
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                <HiLightningBolt className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
                Elite Courses
              </span>
            </motion.div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            {sidebarCollapsed ? <HiMenu className="w-6 h-6" /> : <HiX className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-semibold ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-200 translate-x-1'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive(item.path) ? 'text-white' : 'text-slate-400'}`} />
              {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          {userData && (
            <div className="mb-4">
              <button
                onClick={() => navigate('/profile')}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200 group"
              >
                {userData.photoUrl ? (
                  <img src={userData.photoUrl} className="w-10 h-10 rounded-lg object-cover" alt="" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold uppercase">
                    {userData.name?.charAt(0)}
                  </div>
                )}
                {!sidebarCollapsed && (
                  <div className="flex-1 text-left truncate">
                    <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{userData.name}</div>
                    <div className="text-xs text-slate-400 font-medium capitalize">{userData.role}</div>
                  </div>
                )}
              </button>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-600 hover:bg-red-50 transition-all font-bold group"
          >
            <HiLogout className="w-5 h-5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div
        className="flex-1 min-h-screen flex flex-col overflow-x-hidden"
        style={{ marginLeft: sidebarCollapsed ? 80 : 280, transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-30 shadow-sm">
          <button
            onClick={() => setShowCommandPalette(true)}
            className="flex items-center gap-3 px-5 py-2.5 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all min-w-[320px] group border border-slate-200/50"
          >
            <HiSearch className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            <span className="text-slate-400 font-medium text-sm">Quick navigation search...</span>
            <kbd className="ml-auto px-2 py-1 bg-white rounded text-[10px] text-slate-400 font-bold border border-slate-300 shadow-sm">⌘K</kbd>
          </button>

          <div className="flex items-center gap-6">
            {userData?.role === 'educator' && (
              <button
                onClick={() => navigate('/createcourses')}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-xl transition-all"
              >
                <HiPlus className="w-5 h-5" />
                <span>Create Course</span>
              </button>
            )}
          </div>
        </header>

        {/* Page Content Holder */}
        <main className="flex-1 p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Command Palette (Navigation Only) */}
      <AnimatePresence>
        {showCommandPalette && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCommandPalette(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 px-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-slate-200"
            >
              <div className="p-4 border-b border-slate-100">
                <input
                  type="text"
                  placeholder="Go to page..."
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border-none outline-none text-slate-900 font-medium placeholder-slate-400 text-lg"
                  autoFocus
                />
              </div>
              <div className="p-3 max-h-[400px] overflow-y-auto space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { navigate(item.path); setShowCommandPalette(false); }}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-slate-700 font-bold group-hover:text-slate-900">{item.label}</span>
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
