import React, { useEffect, useState } from 'react';
import Card from "../components/Card.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import ai from '../assets/SearchAi.png'
import { useSelector } from 'react-redux';

function AllCourses() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate()
  const [category, setCategory] = useState([])
  const [filterCourses, setFilterCourses] = useState([])
  const { courseData } = useSelector(state => state.course)

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let courseCopy = courseData.slice();
    if (category.length > 0) {
      courseCopy = courseCopy.filter(item => category.includes(item.category))
    }
    setFilterCourses(courseCopy)
  }

  useEffect(() => {
    setFilterCourses(courseData)
  }, [courseData])

  useEffect(() => {
    applyFilter()
  }, [category])

  const categories = [
    'App Development', 'AI/ML', 'AI Tools', 'Data Science', 
    'Data Analytics', 'Ethical Hacking', 'UI UX Designing', 
    'Web Development', 'Others'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-24 left-6 z-40">
        <button
          onClick={() => setIsSidebarVisible(prev => !prev)}
          className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold shadow-lg border border-gray-100 flex items-center gap-2"
        >
          {isSidebarVisible ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex gap-8 px-6 md:px-12 pt-32 pb-20">
        {/* Sidebar */}
        <aside className={`
          fixed inset-0 z-50 bg-white p-8 md:p-0 md:relative md:inset-auto md:bg-transparent md:z-auto
          w-full md:w-64 flex-shrink-0 transition-transform duration-300
          ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="bg-white md:sticky md:top-32 rounded-2xl border border-gray-100 p-6 md:shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button className="md:hidden" onClick={() => setIsSidebarVisible(false)}>
                <FaArrowLeftLong />
              </button>
            </div>

            <button 
              className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold hover:bg-blue-100 transition-colors"
              onClick={() => navigate("/searchwithai")}
            >
              <span>Search with AI</span>
              <img src={ai} className="w-6 h-6 rounded-full" alt="" />
            </button>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                      value={cat} 
                      onChange={toggleCategory}
                      checked={category.includes(cat)}
                    />
                    <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                {category.length > 0 ? `Results for ${category.join(', ')}` : 'All Courses'}
              </h1>
              <span className="text-sm font-medium text-gray-500">{filterCourses.length} courses found</span>
            </div>

            {filterCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filterCourses.map((item, index) => (
                  <Card 
                    key={item._id || index} 
                    thumbnail={item.thumbnail} 
                    title={item.title} 
                    price={item.price} 
                    category={item.category} 
                    id={item._id} 
                    reviews={item.reviews} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-4">
                <p className="text-gray-500 font-medium text-lg">No courses found matching your selection.</p>
                <button 
                  onClick={() => setCategory([])}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AllCourses;
