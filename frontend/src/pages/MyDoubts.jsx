import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import AppShell from "../components/AppShell"
import { serverUrl } from "../App"
import { setDoubts, setActiveDoubt, updateDoubt, addDoubt } from "../redux/doubtSlice"
import { toast } from "react-toastify"

const statusConfig = {
  open:      { label: "Open",      color: "bg-blue-100 text-blue-700",   dot: "bg-blue-500"  },
  resolved:  { label: "Resolved",  color: "bg-green-100 text-green-700", dot: "bg-green-500" },
  escalated: { label: "Escalated", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
}

// Renders message — detects all "Source: <url>" lines and shows styled clickable resource buttons
const renderMessage = (text) => {
  const sourceRegex = /Source:\s*(https?:\/\/[^\s]+)/gi
  const allSources = [...text.matchAll(sourceRegex)].map((m) => m[1])
  const mainText = text.replace(/Source:\s*https?:\/\/[^\s]+/gi, "").trim()

  return (
    <>
      <span style={{ whiteSpace: "pre-wrap" }}>{mainText}</span>
      {allSources.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {allSources.map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-100 hover:bg-red-100 transition-all group"
            >
              <span className="text-sm">▶️</span>
              <span className="text-xs font-bold text-red-600 group-hover:text-red-700">
                View Resource {allSources.length > 1 ? i + 1 : ""}
              </span>
              <span className="text-red-400 text-xs">↗</span>
            </a>
          ))}
        </div>
      )}
    </>
  )
}

const MyDoubts = () => {
  const dispatch = useDispatch()
  const { doubts } = useSelector((state) => state.doubt)
  const { userData } = useSelector((state) => state.user)

  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [activeDoubt, setLocalActiveDoubt] = useState(null)
  const [followUpInput, setFollowUpInput] = useState("")
  const [replyLoading, setReplyLoading] = useState(false)

  // ChatGPT-style state
  const [isCreatingNewDoubt, setIsCreatingNewDoubt] = useState(false)
  const [newDoubtInput, setNewDoubtInput] = useState("")
  const [newDoubtCourse, setNewDoubtCourse] = useState("")
  const [newDoubtLoading, setNewDoubtLoading] = useState(false)

  const handleCreateNewDoubt = async () => {
    if (!newDoubtInput.trim() || newDoubtLoading) return
    try {
      setNewDoubtLoading(true)
      const res = await axios.post(
        `${serverUrl}/api/doubt/create`,
        {
          description: newDoubtInput.trim(),
          courseId: newDoubtCourse || null,
        },
        { withCredentials: true }
      )
      const newDoubt = res.data.doubt
      dispatch(addDoubt(newDoubt))
      setLocalActiveDoubt(newDoubt)
      setIsCreatingNewDoubt(false)
      setNewDoubtInput("")
      setNewDoubtCourse("")
    } catch (err) {
      console.log(err)
    } finally {
      setNewDoubtLoading(false)
    }
  }

  useEffect(() => {
    fetchDoubts()
  }, [])

  const fetchDoubts = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${serverUrl}/api/doubt/mine`, { withCredentials: true })
      dispatch(setDoubts(res.data.doubts || []))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchThread = async (doubtId) => {
    try {
      const res = await axios.get(`${serverUrl}/api/doubt/${doubtId}`, { withCredentials: true })
      setLocalActiveDoubt(res.data.doubt)
    } catch (err) {
      console.log(err)
    }
  }

  const handleFollowUp = async () => {
    const messageText = followUpInput.trim()
    if (!messageText || replyLoading) return

    // Immediately clear input box and show loading state
    setFollowUpInput("")
    setReplyLoading(true)

    // Optimistically add the student's message to the UI thread list instantly
    const tempReply = {
      message: messageText,
      authorRole: "student",
      authorName: userData?.name || "Student",
      createdAt: new Date().toISOString()
    }
    
    setLocalActiveDoubt(prev => {
      if (!prev) return prev
      return {
        ...prev,
        replies: [...(prev.replies || []), tempReply]
      }
    })

    try {
      const res = await axios.post(
        `${serverUrl}/api/doubt/${activeDoubt._id}/reply`,
        { message: messageText },
        { withCredentials: true }
      )
      setLocalActiveDoubt(res.data.doubt)
      dispatch(updateDoubt(res.data.doubt))
    } catch (err) {
      console.log(err)
      toast.error("Failed to get answer. Please try again.")
      // Rollback on failure
      fetchThread(activeDoubt._id)
    } finally {
      setReplyLoading(false)
    }
  }

  const handleEscalate = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/doubt/${activeDoubt._id}/escalate`,
        {},
        { withCredentials: true }
      )
      setLocalActiveDoubt(res.data.doubt)
      dispatch(updateDoubt(res.data.doubt))
    } catch (err) {
      console.log(err)
    }
  }

  const handleFeedback = async (type) => {
    if (!activeDoubt || activeDoubt.feedback) return
    try {
      await axios.post(
        `${serverUrl}/api/doubt/${activeDoubt._id}/feedback`,
        { feedback: type },
        { withCredentials: true }
      )
      setLocalActiveDoubt((prev) => ({ ...prev, feedback: type }))
    } catch (err) {
      console.log(err)
    }
  }

  const filtered = filter === "all" ? doubts : doubts.filter((d) => d.status === filter)

  return (
    <AppShell noPadding={true}>
      <div className="flex flex-col lg:flex-row bg-white overflow-hidden h-[calc(100vh-80px)] w-full">
        
        {/* Left Panel — Sleek Chat History Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0 flex flex-col h-full border-r border-slate-200 bg-slate-50/50 p-5 pb-6 lg:pb-5">
            {/* Header Title */}
            <div className="mb-4">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Doubts</h1>
              <p className="text-slate-500 text-xs mt-0.5">Your AI doubt solving history</p>
            </div>

            {/* Ask a Doubt Button */}
            <button
              onClick={() => {
                setLocalActiveDoubt(null)
                setIsCreatingNewDoubt(true)
                setNewDoubtInput("")
                setNewDoubtCourse("")
              }}
              className="w-full py-3.5 mb-3 rounded-xl font-bold flex items-center justify-center gap-2 border border-dashed border-violet-300 bg-violet-50/50 hover:bg-violet-50 text-violet-700 transition-all shadow-sm group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">➕</span> Ask a Doubt
            </button>

            {/* Compact Filters */}
            <div className="grid grid-cols-4 bg-slate-50 border border-slate-100 rounded-xl p-0.5 mb-4 text-center">
              {["all", "open", "resolved", "escalated"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all capitalize truncate ${
                    filter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Scrollable Doubt List */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 bg-slate-50 rounded-xl border border-slate-100/50 animate-pulse" />
                ))
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <span className="text-3xl mb-2">💬</span>
                  <p className="text-slate-500 font-bold text-xs">No doubts found</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">
                    {filter === "all" ? "Create a doubt to get started!" : `No ${filter} doubts.`}
                  </p>
                </div>
              ) : (
                filtered.map((doubt) => (
                  <motion.button
                    key={doubt._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => {
                      fetchThread(doubt._id)
                      setIsCreatingNewDoubt(false)
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all hover:bg-slate-50 group flex flex-col gap-1.5 ${
                      activeDoubt?._id === doubt._id
                        ? "bg-violet-50 border-violet-200"
                        : "bg-white border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className={`font-bold text-xs line-clamp-1 group-hover:text-violet-700 transition-colors ${
                        activeDoubt?._id === doubt._id ? "text-violet-700" : "text-slate-700"
                      }`}>
                        {doubt.title}
                      </p>
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${statusConfig[doubt.status]?.dot}`} title={statusConfig[doubt.status]?.label} />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{doubt.replies?.length || 0} msgs</span>
                      <span>{new Date(doubt.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </div>

          {/* Right Panel — Main ChatGPT Workspace Area */}
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/20 rounded-2xl border border-slate-100/50">
            {isCreatingNewDoubt ? (
              <div className="flex-1 flex flex-col justify-center items-center p-6 h-full overflow-y-auto">
                <div className="max-w-md w-full text-center space-y-6">
                  <div>
                    <span className="text-5xl">✨</span>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-4">Ask a New Doubt</h2>
                    <p className="text-slate-500 text-xs mt-1.5">Ask anything — our AI Tutor will check course lectures and resources to answer you instantly.</p>
                  </div>

                  <div className="space-y-4 text-left">
                    {/* Question input */}
                    <div className="flex flex-col gap-3">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Question</label>
                      <textarea
                        value={newDoubtInput}
                        onChange={(e) => setNewDoubtInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleCreateNewDoubt())}
                        placeholder="Type your question here... e.g. 'How does async/await work?'"
                        className="w-full h-36 resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all font-medium"
                      />
                      
                      <button
                        onClick={handleCreateNewDoubt}
                        disabled={!newDoubtInput.trim() || newDoubtLoading}
                        className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        style={{ background: newDoubtLoading ? "#a78bfa" : "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                      >
                        {newDoubtLoading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            AI is thinking...
                          </>
                        ) : (
                          "Ask AI Tutor ✨"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : !activeDoubt ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-4"
                  style={{ background: "linear-gradient(135deg, #ede9fe, #e0e7ff)" }}>
                  💬
                </div>
                <h3 className="text-lg font-black text-slate-800 tracking-tight">AI Doubt Solver</h3>
                <p className="text-slate-400 text-sm mt-1 max-w-sm">Select a question from the sidebar history, or start a new one.</p>
                <button
                  onClick={() => {
                    setLocalActiveDoubt(null)
                    setIsCreatingNewDoubt(true)
                    setNewDoubtInput("")
                    setNewDoubtCourse("")
                  }}
                  className="mt-5 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 shadow-md"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                >
                  Start New Doubt
                </button>
              </div>
            ) : (
              <div className="flex-grow flex flex-col h-full overflow-hidden bg-white">
                {/* Thread Header */}
                <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between flex-shrink-0 bg-slate-50/50">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm truncate">{activeDoubt.title}</p>
                    {activeDoubt.courseId && (
                      <p className="text-xs text-slate-400 mt-0.5">📚 {activeDoubt.courseId.title}</p>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ml-3 flex-shrink-0 ${statusConfig[activeDoubt.status]?.color}`}>
                    {statusConfig[activeDoubt.status]?.label}
                  </span>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
                  {activeDoubt.replies?.map((reply, i) => (
                    <div
                      key={i}
                      className={`flex flex-col gap-1 ${
                        reply.authorRole === "student" ? "items-end" : reply.authorRole === "educator" ? "items-center" : "items-start"
                      }`}
                    >
                      {reply.authorRole !== "student" && (
                        <span className="text-[10px] font-bold text-slate-400 px-1">
                          {reply.authorRole === "ai" ? "🤖 AI Tutor" : `🎓 ${reply.authorName} (Mentor)`}
                        </span>
                      )}
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          reply.authorRole === "student"
                            ? "bg-slate-900 text-white rounded-tr-sm"
                            : reply.authorRole === "educator"
                            ? "bg-amber-50 border border-amber-200 text-amber-900"
                            : "bg-gradient-to-br from-violet-50 to-indigo-50 text-slate-800 border border-violet-100 rounded-tl-sm"
                        }`}
                      >
                        {renderMessage(reply.message)}
                      </div>
                      <span className="text-[9px] text-slate-300 px-1">
                        {new Date(reply.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  ))}

                  {replyLoading && (
                    <div className="flex items-start">
                      <div className="bg-violet-50 border border-violet-100 rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex gap-1">
                          {[0, 150, 300].map((delay, i) => (
                            <span key={i} className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Feedback */}
                  {activeDoubt.replies?.length > 1 && activeDoubt.replies[activeDoubt.replies.length - 1]?.authorRole === "ai" && activeDoubt.status !== "escalated" && (
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs text-slate-400">Was this helpful?</span>
                      <button
                        onClick={() => handleFeedback("helpful")}
                        className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all ${activeDoubt.feedback === "helpful" ? "bg-green-100 text-green-700" : "bg-slate-50 text-slate-400 hover:bg-green-50 hover:text-green-600"}`}
                      >👍 Yes</button>
                      <button
                        onClick={() => handleFeedback("not_helpful")}
                        className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all ${activeDoubt.feedback === "not_helpful" ? "bg-red-100 text-red-700" : "bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600"}`}
                      >👎 No</button>
                      {activeDoubt.feedback === "not_helpful" && (
                        <button
                          onClick={handleEscalate}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all ml-1"
                        >⚡ Ask a Teacher</button>
                      )}
                    </div>
                  )}
                </div>

                {/* Follow-up Input at the Bottom */}
                {activeDoubt.status !== "escalated" ? (
                  <div className="p-4 border-t border-slate-100 flex gap-3 flex-shrink-0 bg-slate-50/50">
                    <input
                      value={followUpInput}
                      onChange={(e) => setFollowUpInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleFollowUp())}
                      placeholder="Ask a follow-up question..."
                      className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-violet-400 transition-all"
                    />
                    <button
                      onClick={handleFollowUp}
                      disabled={!followUpInput.trim() || replyLoading}
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white disabled:opacity-50 flex-shrink-0 transition-all"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                    >
                      {replyLoading ? (
                        <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : "↑"}
                    </button>
                  </div>
                ) : (
                  <div className="p-4 border-t border-slate-100 flex-shrink-0 bg-slate-50/50">
                    <p className="text-center text-xs text-amber-600 font-bold bg-amber-50 py-3 rounded-xl">
                      ⚡ Sent to teacher — waiting for their reply
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

      </div>
    </AppShell>
  )
}

export default MyDoubts
