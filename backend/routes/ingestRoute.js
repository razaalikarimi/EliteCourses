import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  previewYoutube,
  ingestContent,
  getIngestedContent,
  deleteIngestedContent,
} from "../controllers/ingestController.js";

const ingestRouter = express.Router();

ingestRouter.post("/youtube-preview", isAuth, previewYoutube);
ingestRouter.post("/create", isAuth, ingestContent);
ingestRouter.get("/all", isAuth, getIngestedContent);
ingestRouter.delete("/:contentId", isAuth, deleteIngestedContent);

export default ingestRouter;
