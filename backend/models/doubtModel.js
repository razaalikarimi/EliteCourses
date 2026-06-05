import mongoose from "mongoose"

const replySchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    authorRole: {
      type: String,
      enum: ["student", "ai", "educator"],
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const doubtSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "resolved", "escalated"],
      default: "open",
    },
    feedback: {
      type: String,
      enum: ["helpful", "not_helpful", null],
      default: null,
    },
    replies: [replySchema],
  },
  { timestamps: true }
)

const Doubt = mongoose.model("Doubt", doubtSchema)
export default Doubt
