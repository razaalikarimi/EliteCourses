import React, { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { serverUrl } from "../App"
import { addDoubt, updateDoubt, setDoubts } from "../redux/doubtSlice"

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


const FloatingChat = () => {
  const location = useLocation()
  const pathMatch = location.pathname.match(/\/(viewlecture|viewcourse)\/([a-fA-F0-9]{24})/)
  const courseId = pathMatch ? pathMatch[2] : null

  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState("new") // 'new' | 'thread' | 'history'
  const [activeDoubt, setActiveDoubt] = useState(null)
  const [doubts, setLocalDoubts] = useState([])
  const [input, setInput] = useState("")
  const [followUpInput, setFollowUpInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isMaximized, setIsMaximized] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.user)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeDoubt?.replies])

  const fetchDoubts = async () => {
    try {
      setHistoryLoading(true)
      const res = await axios.get(`${serverUrl}/api/doubt/mine`, { withCredentials: true })
      setLocalDoubts(res.data.doubts || [])
      dispatch(setDoubts(res.data.doubts || []))
    } catch (err) {
      console.log(err)
    } finally {
      setHistoryLoading(false)
    }
  }

  const handleOpen = () => {
    setIsOpen(true)
    if (view === "history") fetchDoubts()
  }

  const handleSubmitDoubt = async () => {
    if (!input.trim() || loading) return
    try {
      setLoading(true)
      const res = await axios.post(
        `${serverUrl}/api/doubt/create`,
        { description: input.trim(), courseId },
        { withCredentials: true }
      )
      const newDoubt = res.data.doubt
      setActiveDoubt(newDoubt)
      dispatch(addDoubt(newDoubt))
      setLocalDoubts((prev) => [newDoubt, ...prev])
      setInput("")
      setView("thread")
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFollowUp = async () => {
    if (!followUpInput.trim() || loading) return
    try {
      setLoading(true)
      const res = await axios.post(
        `${serverUrl}/api/doubt/${activeDoubt._id}/reply`,
        { message: followUpInput.trim() },
        { withCredentials: true }
      )
      setActiveDoubt(res.data.doubt)
      dispatch(updateDoubt(res.data.doubt))
      setFollowUpInput("")
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEscalate = async () => {
    if (!activeDoubt) return
    try {
      const res = await axios.post(
        `${serverUrl}/api/doubt/${activeDoubt._id}/escalate`,
        {},
        { withCredentials: true }
      )
      setActiveDoubt(res.data.doubt)
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
      setActiveDoubt((prev) => ({ ...prev, feedback: type }))
    } catch (err) {
      console.log(err)
    }
  }

  const openThread = (doubt) => {
    setActiveDoubt(doubt)
    setView("thread")
  }

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      action()
    }
  }

  const statusColor = {
    open: "bg-blue-100 text-blue-700",
    resolved: "bg-green-100 text-green-700",
    escalated: "bg-amber-100 text-amber-700",
  }

  // BUG 6 FIX: FloatingChat is for students only — hide for educators
  // Only render on viewlecture or viewcourse pages where student is actively studying/browsing a course
  if (!userData || userData.role === "educator" || !pathMatch) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className={`bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden transition-all duration-300 ${
              isMaximized ? "w-[750px] max-w-[95vw]" : "w-[380px]"
            }`}
            style={{ height: isMaximized ? "650px" : "520px" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg">🎓</div>
                <div>
                  <p className="text-white font-bold text-sm">AI Tutor</p>
                  <p className="text-white/70 text-xs">Ask anything about your course</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {view === "thread" && (
                  <button
                    onClick={() => { setView("history"); fetchDoubts() }}
                    className="text-white/80 hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                  >
                    History
                  </button>
                )}
                {view === "history" && (
                  <button
                    onClick={() => setView("new")}
                    className="text-white/80 hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                  >
                    + New
                  </button>
                )}
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="text-white/70 hover:text-white w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all"
                  title={isMaximized ? "Minimize" : "Maximize"}
                >
                  {isMaximized ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9V4.5M15 9h4.5M15 9l5.25-5.25M15 15v4.5M15 15h4.5M15 15l5.25 5.25" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9m5.25 11.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all text-lg leading-none"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-hidden flex flex-col">

              {/* ── NEW DOUBT VIEW ── */}
              {view === "new" && (
                <div className="flex-1 flex flex-col p-5 gap-4">
                  <div className="bg-violet-50 rounded-2xl p-4 border border-violet-100">
                    <p className="text-violet-800 font-bold text-sm">Hi {userData.name?.split(" ")[0]}!</p>
                    <p className="text-violet-600 text-xs mt-1">
                      Ask me anything — I'll give you an instant AI answer. Still stuck? Escalate to your mentor.
                    </p>
                  </div>

                  <div className="flex-1 flex flex-col gap-3">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, handleSubmitDoubt)}
                      placeholder="What do you want to understand? e.g. 'How does async/await work?'"
                      className="flex-1 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                    />
                    <button
                      onClick={handleSubmitDoubt}
                      disabled={!input.trim() || loading}
                      className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      style={{ background: loading ? "#a78bfa" : "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          AI is thinking...
                        </>
                      ) : (
                        "Ask AI Tutor ✨"
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => { setView("history"); fetchDoubts() }}
                    className="text-slate-400 hover:text-violet-600 text-xs font-bold text-center transition-colors"
                  >
                    View my previous doubts →
                  </button>
                </div>
              )}

              {/* ── THREAD VIEW ── */}
              {view === "thread" && activeDoubt && (
                <div className="flex-1 overflow-y-auto flex flex-col">
                  {/* Status bar */}
                  <div className="px-4 py-2 border-b border-slate-50 flex items-center justify-between flex-shrink-0">
                    <p className="text-xs font-bold text-slate-500 truncate max-w-[200px]">{activeDoubt.title}</p>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${statusColor[activeDoubt.status]}`}>
                      {activeDoubt.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {activeDoubt.replies?.map((reply, i) => (
                      <div
                        key={i}
                        className={`flex flex-col gap-1 ${reply.authorRole === "student" ? "items-end" : reply.authorRole === "educator" ? "items-center" : "items-start"}`}
                      >
                        {reply.authorRole !== "student" && (
                          <span className="text-[10px] font-bold text-slate-400 px-1">
                            {reply.authorRole === "ai" ? "🤖 AI Tutor" : `🎓 ${reply.authorName}`}
                          </span>
                        )}
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                            reply.authorRole === "student"
                              ? "bg-slate-800 text-white rounded-tr-sm"
                              : reply.authorRole === "educator"
                              ? "bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl"
                              : "bg-gradient-to-br from-violet-50 to-indigo-50 text-slate-800 border border-violet-100 rounded-tl-sm"
                          }`}
                        >
                          <div className="prose prose-sm max-w-none prose-p:m-0 prose-ul:m-0 prose-li:m-0">
                            {renderMessage(reply.message)}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* AI Loading indicator */}
                    {loading && (
                      <div className="flex items-start gap-2">
                        <div className="bg-violet-50 border border-violet-100 rounded-2xl rounded-tl-sm px-4 py-3">
                          <div className="flex gap-1 items-center">
                            <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Feedback buttons after AI's last reply */}
                    {activeDoubt.replies?.length > 1 && activeDoubt.replies[activeDoubt.replies.length - 1]?.authorRole === "ai" && activeDoubt.status !== "escalated" && (
                      <div className="flex items-center gap-2 pl-1">
                        <span className="text-[10px] text-slate-400">Was this helpful?</span>
                        <button
                          onClick={() => handleFeedback("helpful")}
                          className={`text-sm px-2 py-1 rounded-lg transition-all ${activeDoubt.feedback === "helpful" ? "bg-green-100 text-green-700" : "hover:bg-slate-100 text-slate-400"}`}
                        >👍</button>
                        <button
                          onClick={() => handleFeedback("not_helpful")}
                          className={`text-sm px-2 py-1 rounded-lg transition-all ${activeDoubt.feedback === "not_helpful" ? "bg-red-100 text-red-600" : "hover:bg-slate-100 text-slate-400"}`}
                        >👎</button>
                        {activeDoubt.feedback === "not_helpful" && activeDoubt.status !== "escalated" && (
                          <button
                            onClick={handleEscalate}
                            className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg hover:bg-amber-100 transition-all ml-1"
                          >
                            Ask a Teacher
                          </button>
                        )}
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Follow-up input */}
                  {activeDoubt.status !== "escalated" && (
                    <div className="p-3 border-t border-slate-50 flex-shrink-0 flex gap-2">
                      <input
                        value={followUpInput}
                        onChange={(e) => setFollowUpInput(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, handleFollowUp)}
                        placeholder="Ask a follow-up..."
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-violet-400 transition-all"
                      />
                      <button
                        onClick={handleFollowUp}
                        disabled={!followUpInput.trim() || loading}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white disabled:opacity-50 transition-all flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                      >
                        {loading ? (
                          <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <span className="text-sm">↑</span>
                        )}
                      </button>
                    </div>
                  )}

                  {activeDoubt.status === "escalated" && (
                    <div className="p-3 border-t border-slate-50 flex-shrink-0">
                      <p className="text-center text-xs text-amber-600 font-bold bg-amber-50 py-2 rounded-xl">
                        ⚡ Sent to teacher — Waiting for their answer
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ── HISTORY VIEW ── */}
              {view === "history" && (
                <div className="flex-1 overflow-y-auto">
                  {historyLoading ? (
                    <div className="flex-1 flex items-center justify-center p-8">
                      <span className="w-6 h-6 border-2 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
                    </div>
                  ) : doubts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-3 p-8 text-center">
                      <span className="text-4xl">💬</span>
                      <p className="text-slate-500 font-bold text-sm">No doubts yet</p>
                      <p className="text-slate-400 text-xs">Ask your first doubt!</p>
                      <button
                        onClick={() => setView("new")}
                        className="mt-2 px-4 py-2 text-xs font-bold text-white rounded-xl"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                      >
                        Ask Now ✨
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 space-y-2">
                      {doubts.map((doubt) => (
                        <button
                          key={doubt._id}
                          onClick={() => openThread(doubt)}
                          className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-bold text-slate-800 group-hover:text-violet-700 line-clamp-2 transition-colors">
                              {doubt.title}
                            </p>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${statusColor[doubt.status]}`}>
                              {doubt.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            {doubt.replies?.length || 0} messages · {new Date(doubt.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="w-14 h-14 rounded-2xl shadow-xl text-white text-2xl flex items-center justify-center relative"
        style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}
        title="Ask AI Tutor"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} className="text-lg font-bold">✕</motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>💬</motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

export default FloatingChat
