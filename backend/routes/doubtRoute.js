import express from "express"
import isAuth from "../middlewares/isAuth.js"
import {
  createDoubt,
  getMyDoubts,
  getDoubtById,
  sendFollowUp,
  escalateDoubt,
  submitFeedback,
  getEscalatedDoubts,
  educatorReply,
  deleteDoubt,
} from "../controllers/doubtController.js"

const doubtRouter = express.Router()

// Student routes
doubtRouter.post("/create", isAuth, createDoubt)
doubtRouter.get("/mine", isAuth, getMyDoubts)
doubtRouter.get("/escalated", isAuth, getEscalatedDoubts)   // educator
doubtRouter.get("/:doubtId", isAuth, getDoubtById)
doubtRouter.post("/:doubtId/reply", isAuth, sendFollowUp)
doubtRouter.post("/:doubtId/escalate", isAuth, escalateDoubt)
doubtRouter.post("/:doubtId/feedback", isAuth, submitFeedback)
doubtRouter.post("/:doubtId/educatorreply", isAuth, educatorReply)
doubtRouter.delete("/:doubtId", isAuth, deleteDoubt)

export default doubtRouter
