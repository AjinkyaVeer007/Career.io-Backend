import express from "express";
import {
  applyjob,
  candidateInformation,
  getAllJobs,
  getAppliedJobs,
} from "../controllers/candidate.controller.js";
import { updateAppliedJobStatus } from "../controllers/admin.controller.js";
import { uploadStorage } from "../middlewares/multer.js";

const router = express.Router();

router.post("/applyjob", applyjob);
router.get("/getjobs", getAllJobs);
router.get("/getappliedjobs/:id", getAppliedJobs);
router.get("/updatestatus", updateAppliedJobStatus);
router.post("/userinfo", uploadStorage.single("file"), candidateInformation);

export default router;
