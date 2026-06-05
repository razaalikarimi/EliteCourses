import mongoose from "mongoose";

const contentChunkSchema = new mongoose.Schema({
  text: { type: String, required: true },
  topic: { type: String, required: true },
  startTime: { type: String },
  endTime: { type: String },
  chunkIndex: { type: Number, required: true },
});

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    rawContent: {
      type: String,
      required: true,
    },
    chunks: {
      type: [contentChunkSchema],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    url: {
      type: String,
      trim: true,
    },
    videoId: { type: String },
    channelName: { type: String },
    thumbnailUrl: { type: String },
    type: {
      type: String,
      enum: ["text", "video", "article", "documentation", "pdf_notes", "playlist", "course"],
      default: "text",
    },
  },
  {
    timestamps: true,
  }
);

// FIX: Added chunks.text to text index so RAG search can find content inside video transcripts/chunks
contentSchema.index({ title: "text", rawContent: "text", "chunks.text": "text", tags: "text" });

const Content = mongoose.models.Content || mongoose.model("Content", contentSchema);

export default Content;
