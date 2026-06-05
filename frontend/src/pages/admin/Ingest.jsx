import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import AppShell from "../../components/AppShell"
import { serverUrl } from "../../App"
import {
  HiLightningBolt,
  HiPlus,
  HiTrash,
  HiBookOpen,
  HiChevronDown,
  HiChevronUp,
  HiClipboardCopy,
  HiGlobeAlt,
  HiTag,
  HiCheckCircle,
} from "react-icons/hi"

const resourceTypes = [
  { value: "text", label: "Text / Article" },
  { value: "video", label: "Video Lecture / Transcript" },
  { value: "documentation", label: "Official Documentation" },
  { value: "article", label: "Blog Post" },
  { value: "pdf_notes", label: "PDF Notes" },
  { value: "playlist", label: "Video Playlist" },
  { value: "course", label: "Full Course Material" },
]

const Ingest = () => {
  const { userData } = useSelector((state) => state.user)

  // Mode: 'youtube' | 'manual'
  const [mode, setMode] = useState("youtube")

  // Manual Form States
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [url, setUrl] = useState("")
  const [type, setType] = useState("text")
  const [tags, setTags] = useState("")

  // YouTube Ingest States
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [youtubeMetadata, setYoutubeMetadata] = useState(null)
  const [previewChunks, setPreviewChunks] = useState([])
  const [rawTranscript, setRawTranscript] = useState("")

  // Loading States
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)
  const [listLoading, setListLoading] = useState(false)

  // Ingested Content List States
  const [ingestedList, setIngestedList] = useState([])
  const [expandedItem, setExpandedItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchIngestedList()
  }, [])

  const fetchIngestedList = async () => {
    try {
      setListLoading(true)
      const res = await axios.get(`${serverUrl}/api/ingest/all`, { withCredentials: true })
      setIngestedList(res.data.contents || [])
    } catch (err) {
      console.error(err)
      toast.error("Failed to fetch knowledge base documents.")
    } finally {
      setListLoading(false)
    }
  }

  // --- MANUAL INGESTION ---
  const handleManualSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in both title and content.")
      return
    }
    setLoading(true)

    try {
      const res = await axios.post(
        `${serverUrl}/api/ingest/create`,
        {
          title: title.trim(),
          content: content.trim(),
          url: url.trim() || undefined,
          type,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        },
        { withCredentials: true }
      )

      toast.success("✅ Content ingested successfully into local Knowledge Base!")
      setTitle("")
      setContent("")
      setUrl("")
      setTags("")
      fetchIngestedList()
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || "Failed to ingest content.")
    } finally {
      setLoading(false)
    }
  }

  // --- YOUTUBE PREVIEW ---
  const handleYoutubePreview = async () => {
    if (!youtubeUrl.trim()) {
      toast.error("Please enter a YouTube video URL.")
      return
    }
    setFetchLoading(true)
    setPreviewChunks([])
    setYoutubeMetadata(null)

    try {
      const res = await axios.post(
        `${serverUrl}/api/ingest/youtube-preview`,
        { url: youtubeUrl.trim() },
        { withCredentials: true }
      )

      setYoutubeMetadata(res.data.data.metadata)
      setPreviewChunks(res.data.data.chunks || [])
      setRawTranscript(res.data.data.rawTranscript || "")
      toast.success("✅ Transcript retrieved and chunked successfully!")
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || "Failed to retrieve transcript. Ensure it has captions.")
    } finally {
      setFetchLoading(false)
    }
  }

  // --- YOUTUBE APPROVE ---
  const handleYoutubeApprove = async () => {
    if (!youtubeMetadata || previewChunks.length === 0) return
    setLoading(true)

    try {
      const res = await axios.post(
        `${serverUrl}/api/ingest/create`,
        {
          title: youtubeMetadata.title,
          content: rawTranscript,
          url: youtubeMetadata.videoId ? `https://youtube.com/watch?v=${youtubeMetadata.videoId}` : youtubeUrl,
          type: "video",
          tags: ["youtube", youtubeMetadata.channelName.replace(/\s+/g, "").toLowerCase()],
          youtubeMetadata: youtubeMetadata,
          preChunkedData: previewChunks,
        },
        { withCredentials: true }
      )

      toast.success("✅ YouTube video embedded and stored in Knowledge Base!")
      setYoutubeUrl("")
      setYoutubeMetadata(null)
      setPreviewChunks([])
      setRawTranscript("")
      fetchIngestedList()
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || "Failed to store YouTube content.")
    } finally {
      setLoading(false)
    }
  }

  // --- DELETE CONTENT ---
  const handleDeleteContent = async (id, e) => {
    e.stopPropagation()
    if (!window.confirm("Are you sure you want to delete this document from the Knowledge Base? This cannot be undone.")) return

    try {
      await axios.delete(`${serverUrl}/api/ingest/${id}`, { withCredentials: true })
      toast.success("Document removed successfully.")
      setIngestedList((prev) => prev.filter((item) => item._id !== id))
      if (expandedItem === id) setExpandedItem(null)
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || "Failed to delete document.")
    }
  }

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  const filteredList = ingestedList.filter((doc) => {
    const term = searchTerm.toLowerCase()
    return (
      doc.title?.toLowerCase().includes(term) ||
      doc.type?.toLowerCase().includes(term) ||
      doc.tags?.some((t) => t.toLowerCase().includes(term))
    )
  })

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧠</span>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">AI Knowledge Base</h1>
            </div>
            <p className="text-slate-500 text-sm">
              Add lectures, code docs, and YouTube videos. The AI Tutor uses this data to answer doubts instantly.
            </p>
          </div>
          <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
            <button
              onClick={() => setMode("youtube")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                mode === "youtube" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-950"
              }`}
            >
              <HiLightningBolt className="w-4 h-4 text-amber-500" />
              YouTube Auto-Ingest
            </button>
            <button
              onClick={() => setMode("manual")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                mode === "manual" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-950"
              }`}
            >
              <HiPlus className="w-4 h-4 text-blue-600" />
              Manual Entry
            </button>
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          {mode === "youtube" ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">YouTube URL</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                    disabled={fetchLoading || loading || previewChunks.length > 0}
                  />
                  {!previewChunks.length ? (
                    <button
                      onClick={handleYoutubePreview}
                      disabled={fetchLoading || !youtubeUrl.trim()}
                      className="px-8 py-3.5 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-violet-100 hover:shadow-violet-200"
                    >
                      {fetchLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Fetch & Analyze"
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setYoutubeUrl("")
                        setYoutubeMetadata(null)
                        setPreviewChunks([])
                        setRawTranscript("")
                      }}
                      className="px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-sm transition-all"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <p className="text-slate-400 text-xs">
                  We'll download captions, clean the transcript with Gemini, and split it into semantic knowledge chunks.
                </p>
              </div>

              {/* Preview Cards */}
              <AnimatePresence>
                {youtubeMetadata && previewChunks.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="space-y-6 pt-6 border-t border-slate-100"
                  >
                    <div className="flex flex-col sm:flex-row gap-5 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                      {youtubeMetadata.thumbnailUrl && (
                        <img
                          src={youtubeMetadata.thumbnailUrl}
                          alt="Thumbnail"
                          className="w-full sm:w-44 rounded-xl shadow-sm object-cover aspect-video"
                        />
                      )}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold w-fit uppercase tracking-widest">
                          🎥 Video Preview
                        </div>
                        <h3 className="font-extrabold text-slate-800 text-lg leading-snug">{youtubeMetadata.title}</h3>
                        <p className="text-xs font-bold text-slate-400">Channel: {youtubeMetadata.channelName}</p>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full w-fit">
                          ✨ {previewChunks.length} Semantic Chunks Created
                        </div>
                      </div>
                    </div>

                    {/* Chunk List Scroll */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Semantic Chunks Preview</h4>
                      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                        {previewChunks.map((chunk, idx) => (
                          <div key={idx} className="p-4 bg-white border border-slate-100 rounded-2xl space-y-2 hover:border-slate-200 transition-colors">
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] font-bold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-lg">
                                {chunk.topic}
                              </span>
                              {chunk.startTime && (
                                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                                  ⏱️ {chunk.startTime} {chunk.endTime ? `- ${chunk.endTime}` : ""}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">{chunk.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleYoutubeApprove}
                      disabled={loading}
                      className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-sm transition-all disabled:opacity-50 shadow-lg shadow-green-100 hover:shadow-green-200 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Saving Chunks & Syncing...
                        </>
                      ) : (
                        "Approve & Ingest Content ✅"
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Document Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Asynchronous JavaScript & Promises"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Resource Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                    disabled={loading}
                  >
                    {resourceTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">External Link / Reference URL (Optional)</label>
                <div className="relative flex items-center">
                  <HiGlobeAlt className="absolute left-4 w-5 h-5 text-slate-400" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://developer.mozilla.org/..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Knowledge Content / Notes</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste study guide content, lecture notes, or textbook materials. The AI will refer to this when answering student queries."
                  className="w-full min-h-[180px] px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all resize-none"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tags (Comma-separated)</label>
                <div className="relative flex items-center">
                  <HiTag className="absolute left-4 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="javascript, promises, async, week-2"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-black text-sm transition-all disabled:opacity-50 shadow-lg shadow-violet-100 hover:shadow-violet-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Processing Content & Ingesting...
                  </>
                ) : (
                  "Ingest into Knowledge Base 🧠"
                )}
              </button>
            </form>
          )}
        </div>

        {/* Directory Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Active Knowledge Documents</h2>
              <p className="text-slate-400 text-xs font-bold">Manage documents indexed in your tutor's brain</p>
            </div>
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search database..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 outline-none focus:border-slate-400 transition-all"
              />
            </div>
          </div>

          <div className="space-y-3">
            {listLoading ? (
              <div className="flex items-center justify-center p-12 bg-white rounded-3xl border border-slate-100">
                <span className="w-8 h-8 border-3 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
              </div>
            ) : filteredList.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-16 text-center bg-white rounded-3xl border border-slate-100 space-y-3">
                <span className="text-5xl">📖</span>
                <p className="text-slate-700 font-bold">Knowledge Base is Empty</p>
                <p className="text-slate-400 text-xs">Ingest some documents above to help the AI Tutor get started.</p>
              </div>
            ) : (
              filteredList.map((doc) => {
                const isExpanded = expandedItem === doc._id
                return (
                  <div
                    key={doc._id}
                    className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                      isExpanded ? "border-violet-200 shadow-sm" : "border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => toggleExpand(doc._id)}
                      className="p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 text-lg">
                          {doc.type === "video" ? "🎥" : "📝"}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-extrabold text-slate-800 truncate leading-snug">{doc.title}</h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase">
                              {doc.type}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                              • {doc.chunks?.length || 0} chunks
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                              • {new Date(doc.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleDeleteContent(doc._id, e)}
                          className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-50 transition-colors"
                          title="Delete Document"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                        {isExpanded ? (
                          <HiChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <HiChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Expandable Section */}
                    {isExpanded && (
                      <div className="bg-slate-50/50 border-t border-slate-100 p-5 space-y-4">
                        {doc.url && (
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <span className="text-slate-400">Source URL:</span>
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-violet-600 hover:underline flex items-center gap-1"
                            >
                              {doc.url}
                            </a>
                          </div>
                        )}

                        {doc.tags?.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-bold text-slate-400">Tags:</span>
                            {doc.tags.map((tag, i) => (
                              <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Chunk Grid */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Database Chunks</h4>
                          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                            {doc.chunks && doc.chunks.length > 0 ? (
                              doc.chunks.map((chunk, idx) => (
                                <div key={idx} className="p-4 bg-white border border-slate-100 rounded-xl space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                                      {chunk.topic}
                                    </span>
                                    {chunk.startTime && (
                                      <span className="text-[9px] font-mono text-slate-400 font-bold bg-slate-50 px-1.5 py-0.5 rounded">
                                        ⏱️ {chunk.startTime} {chunk.endTime ? `- ${chunk.endTime}` : ""}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                    {chunk.text}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <div className="col-span-2 p-4 bg-white border border-slate-100 rounded-xl">
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                  {doc.rawContent}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export default Ingest
