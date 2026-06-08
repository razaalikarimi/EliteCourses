import axios from 'axios'
import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { MdCloudUpload } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../../App'
import { setLectureData } from '../../redux/lectureSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import Nav from '../../components/Nav'

function EditLecture() {
  // BUG-02 FIX: navigate declared at TOP before any use
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const { courseId, lectureId } = useParams()
  const { lectureData } = useSelector(state => state.lecture)

  // BUG-01 FIX: Safe optional chaining — won't crash if selectedLecture is undefined
  const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)
  const [videoFile, setVideoFile] = useState(null)
  const [lectureTitle, setLectureTitle] = useState(selectedLecture?.lectureTitle || '')
  const [isPreviewFree, setIsPreviewFree] = useState(selectedLecture?.isPreviewFree || false)

  // BUG-01 FIX: Guard if lecture not found in Redux (direct URL visit / hard refresh)
  if (!selectedLecture) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Nav />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-gray-500 font-medium">Lecture not found. Please go back and try again.</p>
            <button
              onClick={() => navigate(`/createlecture/${courseId}`)}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all"
            >
              ← Back to Curriculum
            </button>
          </div>
        </div>
      </div>
    )
  }

  const editLecture = async () => {
    setLoading(true)
    // BUG-03 FIX: FormData created INSIDE function so it captures current state values
    const formData = new FormData()
    formData.append('lectureTitle', lectureTitle)
    formData.append('isPreviewFree', isPreviewFree)
    if (videoFile) {
      formData.append('videoUrl', videoFile)
    }

    try {
      const result = await axios.post(
        serverUrl + `/api/course/editlecture/${lectureId}`,
        formData,
        { withCredentials: true }
      )
      // BUG-06 FIX: REPLACE the lecture in the array, not append to it
      dispatch(setLectureData(
        lectureData.map(l => l._id === lectureId ? result.data : l)
      ))
      toast.success('Lecture updated successfully')
      navigate(`/createlecture/${courseId}`)
    } catch (error) {
      // BUG-04/05 FIX: Safe optional chaining — won't crash on network error
      toast.error(error?.response?.data?.message || 'Failed to update lecture')
    } finally {
      setLoading(false)
    }
  }

  const removeLecture = async () => {
    if (!window.confirm('Are you sure you want to remove this lecture?')) return
    setLoading1(true)
    try {
      await axios.delete(
        serverUrl + `/api/course/removelecture/${lectureId}`,
        { withCredentials: true }
      )
      dispatch(setLectureData(lectureData.filter(l => l._id !== lectureId)))
      toast.success('Lecture removed')
      navigate(`/createlecture/${courseId}`)
    } catch (error) {
      // BUG-05 FIX: Safe optional chaining
      toast.error(error?.response?.data?.message || 'Failed to remove lecture')
    } finally {
      setLoading1(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center p-6 pt-32 pb-20">
        <div className="w-full max-w-xl bg-white rounded-3xl border border-gray-100 shadow-xl shadow-blue-50/50 p-8 md:p-12 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <button
              onClick={() => navigate(`/createlecture/${courseId}`)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm"
            >
              <FaArrowLeftLong /> Back to Curriculum
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Edit Lecture</h1>
            <p className="text-gray-500 font-medium">Update title, video, or preview settings.</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Lecture Title */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Lecture Title</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                placeholder="e.g. Introduction to React Hooks"
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
              />
            </div>

            {/* Video Upload */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Replace Video <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all">
                <MdCloudUpload size={28} className="text-gray-400 mb-2" />
                <span className="text-sm text-gray-500 font-medium">
                  {videoFile ? videoFile.name : 'Click to upload video'}
                </span>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                />
              </label>
              {selectedLecture?.videoUrl && !videoFile && (
                <p className="text-xs text-gray-400 ml-1">Current video will be kept if no new file is selected.</p>
              )}
            </div>

            {/* Free Preview Toggle */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <input
                type="checkbox"
                id="isPreviewFree"
                className="accent-blue-600 h-4 w-4"
                checked={isPreviewFree}
                onChange={() => setIsPreviewFree(prev => !prev)}
              />
              <label htmlFor="isPreviewFree" className="text-sm font-bold text-gray-700">
                Allow Free Preview
                <span className="block text-xs font-normal text-gray-400 mt-0.5">Visitors can watch this lecture without enrolling</span>
              </label>
            </div>
          </div>

          {/* Upload progress hint */}
          {loading && (
            <div className="text-center text-sm text-gray-500 font-medium animate-pulse">
              Uploading video… this may take a moment ⏳
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={editLecture}
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-100 flex items-center justify-center"
            >
              {loading ? <ClipLoader size={20} color="white" /> : 'Save Changes'}
            </button>
            <button
              onClick={removeLecture}
              disabled={loading1}
              className="w-full py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold hover:bg-red-100 transition-all flex items-center justify-center"
            >
              {loading1 ? <ClipLoader size={18} color="#dc2626" /> : 'Remove Lecture'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default EditLecture
