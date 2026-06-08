import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { serverUrl } from '../../App';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setLectureData } from '../../redux/lectureSlice';
import Nav from '../../components/Nav';

function CreateLecture() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [lectureTitle, setLectureTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { lectureData } = useSelector(state => state.lecture);

  const createLectureHandler = async () => {
    if (!lectureTitle.trim()) return toast.error('Please enter a lecture title');
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + `/api/course/createlecture/${courseId}`,
        { lectureTitle },
        { withCredentials: true }
      );
      dispatch(setLectureData([...lectureData, result.data.lecture]));
      toast.success('Lecture added successfully');
      setLectureTitle('');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create lecture');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getLecture = async () => {
      try {
        const result = await axios.get(
          serverUrl + `/api/course/getcourselecture/${courseId}`,
          { withCredentials: true }
        );
        dispatch(setLectureData(result.data.lectures));
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load lectures');
      }
    };
    getLecture();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <main className="flex-1 max-w-3xl mx-auto w-full pt-32 pb-20 px-6">
        <div className="space-y-8">

          {/* Header */}
          <div className="space-y-2">
            <button
              onClick={() => navigate(`/addcourses/${courseId}`)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm mb-2"
            >
              <FaArrowLeftLong /> Back to Course Settings
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Manage Curriculum</h1>
            <p className="text-gray-500 font-medium">Add and organize video lectures for your course.</p>
          </div>

          {/* Add Lecture Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-50 pb-4">Add a New Lecture</h2>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Lecture Title</label>
              <input
                type="text"
                placeholder="e.g. Introduction to MERN Stack"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && createLectureHandler()}
              />
              <p className="text-xs text-gray-400 ml-1">Press Enter or click "Add Lecture" to save</p>
            </div>

            <button
              onClick={createLectureHandler}
              disabled={loading}
              className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-100 flex items-center justify-center gap-2"
            >
              {loading ? <ClipLoader size={18} color="white" /> : '+ Add Lecture'}
            </button>
          </div>

          {/* Lectures List */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">All Lectures</h2>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {lectureData.length} {lectureData.length === 1 ? 'lesson' : 'lessons'}
              </span>
            </div>

            {lectureData.length === 0 ? (
              <div className="py-16 text-center text-gray-400 space-y-2">
                <p className="text-3xl">🎬</p>
                <p className="font-medium text-sm">No lectures added yet.</p>
                <p className="text-xs">Add your first lecture above to get started.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {lectureData.map((lecture, index) => (
                  <div
                    key={lecture._id || index}
                    className="flex items-center justify-between px-8 py-5 hover:bg-gray-50/50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-sm font-black text-gray-500">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{lecture.lectureTitle}</p>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">
                          {lecture.isPreviewFree ? '🔓 Free Preview' : '🔒 Enrolled Only'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/editlecture/${courseId}/${lecture._id}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-500 rounded-xl text-xs font-bold transition-all opacity-0 group-hover:opacity-100"
                    >
                      <FaEdit size={12} /> Edit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default CreateLecture;
