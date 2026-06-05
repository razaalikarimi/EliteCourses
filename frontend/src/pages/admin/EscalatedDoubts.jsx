import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { motion } from "framer-motion"
import AppShell from "../../components/AppShell"
import { serverUrl } from "../../App"

const statusConfig = {
  escalated: { label: "Escalated", color: "bg-amber-100 text-amber-700" },
  resolved:  { label: "Resolved",  color: "bg-green-100 text-green-700" },
  open:      { label: "Open",      color: "bg-blue-100 text-blue-700"   },
}

const EscalatedDoubts = () => {
  const { userData } = useSelector((state) => state.user)
  const [doubts, setDoubts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeDoubt, setActiveDoubt] = useState(null)
  const [reply, setReply] = useState("")
  const [replyLoading, setReplyLoading] = useState(false)

  useEffect(() => {
    fetchEscalated()
  }, [])

  const fetchEscalated = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${serverUrl}/api/doubt/escalated`, { withCredentials: true })
      setDoubts(res.data.doubts || [])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchThread = async (doubtId) => {
    try {
      const res = await axios.get(`${serverUrl}/api/doubt/${doubtId}`, { withCredentials: true })
      setActiveDoubt(res.data.doubt)
    } catch (err) {
      console.log(err)
    }
  }

  const handleReply = async (markResolved = false) => {
    if (!reply.trim() || replyLoading) return
    try {
      setReplyLoading(true)
      const res = await axios.post(
        `${serverUrl}/api/doubt/${activeDoubt._id}/educatorreply`,
        { message: reply.trim(), markResolved },
        { withCredentials: true }
      )
      setActiveDoubt(res.data.doubt)
      setReply("")
      if (markResolved) {
        setDoubts((prev) => prev.filter((d) => d._id !== activeDoubt._id))
        setActiveDoubt(null)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setReplyLoading(false)
    }
  }

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
              style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)" }}>
              ⚡
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Escalated Doubts</h1>
              <p className="text-slate-500 text-sm">Students need your help — AI couldn't fully resolve these</p>
            </div>
          </div>

          {!loading && (
            <div className="flex items-center gap-4 mt-4">
              <div className="bg-white border border-slate-100 rounded-2xl px-5 py-3 shadow-sm">
                <p className="text-2xl font-black text-amber-600">{doubts.length}</p>
                <p className="text-xs text-slate-500 font-bold mt-0.5">Awaiting Reply</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left — Doubt List */}
          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-28 bg-white rounded-2xl border border-slate-100 animate-pulse" />
              ))
            ) : doubts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-slate-100">
                <span className="text-5xl mb-4">✅</span>
                <p className="text-slate-700 font-bold text-lg">All caught up!</p>
                <p className="text-slate-400 text-sm mt-1">No escalated doubts right now.</p>
              </div>
            ) : (
              doubts.map((doubt, i) => (
                <motion.button
                  key={doubt._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => fetchThread(doubt._id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all hover:shadow-md group ${
                    activeDoubt?._id === doubt._id
                      ? "bg-amber-50 border-amber-200 shadow"
                      : "bg-white border-slate-100 hover:border-amber-200"
                  }`}
                >
                  <div className="flex items-start gap-3 justify-between">
                    <p className={`font-bold text-sm line-clamp-2 group-hover:text-amber-700 transition-colors ${
                      activeDoubt?._id === doubt._id ? "text-amber-700" : "text-slate-800"
                    }`}>
                      {doubt.title}
                    </p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${statusConfig[doubt.status]?.color}`}>
                      {statusConfig[doubt.status]?.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {doubt.userId?.photoUrl ? (
                      <img src={doubt.userId.photoUrl} className="w-6 h-6 rounded-full object-cover" alt="" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                        {doubt.userId?.name?.charAt(0)}
                      </div>
                    )}
                    <span className="text-xs text-slate-500 font-bold">{doubt.userId?.name}</span>
                    {doubt.courseId && (
                      <span className="text-xs text-slate-400 ml-auto truncate max-w-[120px]">📚 {doubt.courseId.title}</span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mt-1">
                    {doubt.replies?.length || 0} messages · {new Date(doubt.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </motion.button>
              ))
            )}
          </div>

          {/* Right — Thread + Reply */}
          <div className="sticky top-24">
            {!activeDoubt ? (
              <div className="h-[520px] bg-white rounded-3xl border border-slate-100 flex flex-col items-center justify-center gap-4 text-center p-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)" }}>
                  ⚡
                </div>
                <p className="text-slate-600 font-bold">Select a doubt to review</p>
                <p className="text-slate-400 text-sm">You'll see the full conversation thread and can reply directly.</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-100 flex flex-col overflow-hidden" style={{ height: "620px" }}>
                {/* Thread Header */}
                <div className="px-6 py-4 border-b border-slate-50 flex-shrink-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-slate-900 text-sm truncate">{activeDoubt.title}</p>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full flex-shrink-0 ${statusConfig[activeDoubt.status]?.color}`}>
                      {statusConfig[activeDoubt.status]?.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-slate-400">Student:</span>
                    <span className="text-xs font-bold text-slate-600">{activeDoubt.userId?.name}</span>
                    {activeDoubt.courseId && (
                      <>
                        <span className="text-slate-200">·</span>
                        <span className="text-xs text-slate-400">📚 {activeDoubt.courseId.title}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {activeDoubt.replies?.map((reply, i) => (
                    <div
                      key={i}
                      className={`flex flex-col gap-1 ${
                        reply.authorRole === "student" ? "items-end" :
                        reply.authorRole === "educator" ? "items-start" : "items-start"
                      }`}
                    >
                      <span className="text-[10px] font-bold text-slate-400 px-1">
                        {reply.authorRole === "student" ? `👤 ${reply.authorName}` :
                         reply.authorRole === "ai" ? "🤖 AI Tutor" :
                         `🎓 ${reply.authorName} (You)`}
                      </span>
                      <div
                        className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          reply.authorRole === "student"
                            ? "bg-slate-100 text-slate-800 rounded-tr-sm"
                            : reply.authorRole === "educator"
                            ? "bg-amber-500 text-white rounded-tl-sm"
                            : "bg-violet-50 text-slate-800 border border-violet-100 rounded-tl-sm"
                        }`}
                      >
                        {reply.message}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Box */}
                {activeDoubt.status === "escalated" && (
                  <div className="p-4 border-t border-slate-50 flex-shrink-0 space-y-3">
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Write your reply to the student..."
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 resize-none outline-none focus:border-amber-400 transition-all"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReply(false)}
                        disabled={!reply.trim() || replyLoading}
                        className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                      >
                        {replyLoading ? "Sending..." : "Reply"}
                      </button>
                      <button
                        onClick={() => handleReply(true)}
                        disabled={!reply.trim() || replyLoading}
                        className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-green-600 text-white hover:bg-green-700 transition-all disabled:opacity-50"
                      >
                        Reply & Resolve ✅
                      </button>
                    </div>
                  </div>
                )}

                {activeDoubt.status === "resolved" && (
                  <div className="p-4 border-t border-slate-50 flex-shrink-0">
                    <p className="text-center text-xs text-green-600 font-bold bg-green-50 py-3 rounded-xl">
                      ✅ This doubt has been resolved
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export default EscalatedDoubts
