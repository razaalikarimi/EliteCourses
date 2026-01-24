import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { HiMail, HiAcademicCap, HiPencilAlt } from 'react-icons/hi';

function Profile() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl font-black text-slate-900 mb-2">My Profile</h1>
          <p className="text-slate-500 font-medium">Manage your professional identity and workspace settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                <div className="relative group">
                  {userData.photoUrl ? (
                    <img
                      src={userData.photoUrl}
                      className="w-32 h-32 rounded-3xl object-cover ring-4 ring-indigo-50 shadow-2xl"
                      alt=""
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl">
                      {userData.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-black text-slate-900 mb-1">{userData.name}</h2>
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-4">
                    {userData.role}
                  </div>
                  <p className="text-slate-500 font-medium max-w-sm">
                    {userData.description || 'No bio available yet. Add one in settings!'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <HiMail size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</div>
                    <div className="text-slate-900 font-bold">{userData.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <HiAcademicCap size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Courses Enrolled</div>
                    <div className="text-slate-900 font-bold">{userData.enrolledCourses?.length || 0} active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Quick Actions */}
          <div className="space-y-6">
            <button 
              onClick={() => navigate('/editprofile')}
              className="w-full flex items-center justify-center gap-3 p-6 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all group"
            >
              <HiPencilAlt size={20} className="group-hover:rotate-12 transition-transform" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default Profile;
