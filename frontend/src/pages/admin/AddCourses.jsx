import React, { useEffect, useRef, useState } from 'react'
import img from "../../assets/empty.jpg"
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../../App';
import { MdEdit, MdCloudUpload } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { setCourseData } from '../../redux/courseSlice';
import Nav from '../../components/Nav';

function AddCourses() {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const dispatch = useDispatch()
  const { courseData } = useSelector(state => state.course)
  
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [price, setPrice] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const thumbInputRef = useRef()

  useEffect(() => {
    const getCourseById = async () => {
      try {
        const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}`, { withCredentials: true })
        setSelectedCourse(result.data)
      } catch (error) {
        console.error(error)
      }
    }
    getCourseById()
  }, [courseId])

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title || "")
      setSubTitle(selectedCourse.subTitle || "")
      setDescription(selectedCourse.description || "")
      setCategory(selectedCourse.category || "")
      setLevel(selectedCourse.level || "")
      setPrice(selectedCourse.price || "")
      setFrontendImage(selectedCourse.thumbnail || img)
      setIsPublished(selectedCourse?.isPublished)
    }
  }, [selectedCourse])

  const handleThumbnail = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
    }
  }

  const editCourseHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    if (backendImage) formData.append("thumbnail", backendImage);
    formData.append("isPublished", isPublished);

    try {
      const result = await axios.post(
        `${serverUrl}/api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true }
      );

      const updatedCourse = result.data;
      const updatedCourses = courseData.map(c => c._id === courseId ? updatedCourse : c);
      if (!courseData.some(c => c._id === courseId) && updatedCourse.isPublished) {
        updatedCourses.push(updatedCourse);
      }
      dispatch(setCourseData(updatedCourses));
      toast.success("Course details updated");
      navigate("/courses");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const removeCourse = async () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    setLoading(true)
    try {
      await axios.delete(serverUrl + `/api/course/removecourse/${courseId}`, { withCredentials: true })
      toast.success("Course deleted successfully")
      const filteredCourses = courseData.filter(c => c._id !== courseId);
      dispatch(setCourseData(filteredCourses));
      navigate("/courses")
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <main className="flex-1 max-w-5xl mx-auto w-full pt-32 pb-20 px-6">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <button 
                onClick={() => navigate("/courses")}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm mb-4"
              >
                <FaArrowLeftLong /> Back to courses
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Course Settings</h1>
              <p className="text-gray-500 font-medium">Fine-tune your course details and curriculum.</p>
            </div>
            <button 
              onClick={() => navigate(`/createlecture/${courseId}`)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              Manage Curriculum →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8">
              <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                <h3 className="text-xl font-bold text-gray-900">Basic Information</h3>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsPublished(!isPublished)}
                    className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-colors ${
                      isPublished 
                        ? "bg-green-100 text-green-700 hover:bg-green-200" 
                        : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    }`}
                  >
                    {isPublished ? "Published" : "Draft Mode"}
                  </button>
                </div>
              </div>

              <form className="space-y-6" onSubmit={editCourseHandler}>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Course Title</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Subtitle / Short Summary</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                      value={subTitle} 
                      onChange={(e) => setSubTitle(e.target.value)} 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Full Description</label>
                    <textarea 
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium h-32 resize-none"
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-gray-700 ml-1">Category</label>
                      <select 
                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium appearance-none"
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Web Development">Web Development</option>
                        <option value="App Development">App Development</option>
                        <option value="UI UX Designing">UI UX Designing</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="AI Tools">AI Tools</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Ethical Hacking">Ethical Hacking</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-gray-700 ml-1">Difficulty Level</label>
                      <select 
                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium appearance-none"
                        value={level} 
                        onChange={(e) => setLevel(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-gray-700 ml-1">Price (₹)</label>
                      <input 
                        type="number" 
                        className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-100"
                  >
                    {loading ? <ClipLoader size={20} color='white'/> : "Save All Changes"}
                  </button>
                  <button 
                    type="button"
                    onClick={() => navigate("/courses")}
                    className="px-8 py-4 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Thumbnail</h3>
                <div 
                  className="relative group aspect-video rounded-2xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all"
                  onClick={() => thumbInputRef.current.click()}
                >
                  <img src={frontendImage} alt="" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 text-blue-600">
                    <MdCloudUpload size={32} />
                    <span className="text-xs font-bold uppercase tracking-widest mt-2">Replace Image</span>
                  </div>
                  <input 
                    type="file" 
                    ref={thumbInputRef} 
                    hidden 
                    onChange={handleThumbnail} 
                    accept='image/*' 
                  />
                </div>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  Recommended size: 1280x720px. JPG, PNG or WebP.
                </p>
              </div>

              <div className="bg-red-50 rounded-3xl border border-red-100 p-8 space-y-4">
                <h3 className="text-xl font-bold text-red-900">Danger Zone</h3>
                <p className="text-sm text-red-700 leading-relaxed font-medium">
                  Deleting this course will remove all associated lectures and student enrollments. This action cannot be undone.
                </p>
                <button 
                  onClick={removeCourse}
                  className="w-full py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                >
                  Delete Course Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AddCourses;
