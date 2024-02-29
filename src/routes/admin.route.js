import express from "express";
import {
  createCategory,
  createJob,
  getCandidateAppliedJobs,
  getCategories,
  getMyJobs,
  updateAppliedJobStatus,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/createcategory", createCategory);
router.post("/createjob", createJob);
router.get("/getcategories/:id", getCategories);
router.get("/getjobs/:id", getMyJobs);
router.get("/getcandidateappliedjobs/:id", getCandidateAppliedJobs);
router.put("/updateapplicationstatus/:id", updateAppliedJobStatus);

export default router;
