import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppShell from '../components/AppShell';
import { CompactCourseCard } from '../components/CourseCardVariants';
import { HiFilter, HiSearch, HiX } from 'react-icons/hi';
import ai from '../assets/SearchAi.png';

function AllCourses() {
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);
  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'App Development',
    'AI/ML',
    'AI Tools',
    'Data Science',
    'Data Analytics',
    'Ethical Hacking',
    'UI UX Designing',
    'Web Development',
    'Others',
  ];

  const toggleCategory = (cat) => {
    if (category.includes(cat)) {
      setCategory((prev) => prev.filter((item) => item !== cat));
    } else {
      setCategory((prev) => [...prev, cat]);
    }
  };

  const applyFilter = () => {
    let courseCopy = courseData.slice();

    if (category.length > 0) {
      courseCopy = courseCopy.filter((item) => category.includes(item.category));
    }

    if (searchTerm) {
      courseCopy = courseCopy.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilterCourses(courseCopy);
  };

  useEffect(() => {
    setFilterCourses(courseData);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category, searchTerm]);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-28 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HiFilter className="text-gray-400" size={20} />
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                </div>
                {(category.length > 0 || searchTerm) && (
                  <button 
                    onClick={() => { setCategory([]); setSearchTerm(''); }}
                    className="text-xs text-indigo-600 font-bold hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Search Courses</label>
                  <div className="relative">
                    <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Title or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:border-indigo-500 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                          category.includes(cat)
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-gray-600 border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Feature */}
                <div className="pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => navigate("/searchwithai")}
                    className="w-full flex items-center justify-center gap-2 p-3 bg-gray-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-all shadow-md active:scale-95"
                  >
                    <img src={ai} className="w-5 h-5 rounded-full ring-1 ring-white/20" alt="" />
                    AI Assistant
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Course Grid */}
          <main className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Access Courses</h1>
                <p className="text-gray-500 font-medium text-sm mt-1">{filterCourses.length} results found</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filterCourses.map((item) => (
                <CompactCourseCard
                  key={item._id}
                  course={{
                    ...item,
                    id: item._id,
                    duration: 'Self-Paced',
                  }}
                />
              ))}
            </div>

            {filterCourses.length === 0 && (
              <div className="py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <HiSearch className="text-gray-200" size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No courses match your search</h3>
                <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">Try clearing your filters or searching for something else.</p>
                <button 
                  onClick={() => { setCategory([]); setSearchTerm(''); }}
                  className="mt-6 text-indigo-600 font-bold text-sm hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </AppShell>
  );
}

export default AllCourses;
