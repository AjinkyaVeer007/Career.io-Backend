import mongoose from "mongoose";
import Job from "../models/job.model.js";
import JobApply from "../models/jobapply.model.js";
import CandidateInfo from "../models/candidateInfo.model.js";
import transporter from "../utils/nodemailer.js";

const ObjectId = mongoose.Types.ObjectId;

export const applyjob = async (req, res) => {
  try {
    const { jobId, userId, adminId, jobName, companyName } = req.body;

    if (!jobId || !userId || !adminId) {
      return res.status(400).json({
        message: "failed to apply job",
        status: false,
      });
    }

    const alreadyApplied = await JobApply.findOne({
      jobId,
      userId,
    });

    if (alreadyApplied) {
      return res.status(200).json({
        message: "Already applied",
        status: true,
      });
    }

    await JobApply.create({
      jobId,
      userId,
      adminId,
    });

    await transporter.sendMail({
      from: '"Test" <maddison53@ethereal.email>', // sender address
      to: "aveer@sapat.com", // list of receivers
      subject: "Job Application", // Subject line
      text: "You have applied for " + jobName + " at " + companyName, // plain text body
    });

    return res.status(200).json({
      message: "Job applied successfully",
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Fail to create job",
      status: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    return res.status(200).json({
      data: jobs,
      message: "Jobs fetch successfully",
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Fail to fetch jobs",
      status: false,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const appliedJobs = await JobApply.aggregate([
      {
        $match: {
          userId: new ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $unwind: {
          path: "$userId",
        },
      },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "jobId",
        },
      },
      {
        $unwind: {
          path: "$jobId",
        },
      },
    ]);

    return res.status(200).json({
      message: "applied job fetch successfully",
      data: appliedJobs,
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Fail to fetch applied jobs",
      status: false,
    });
  }
};

export const candidateInformation = async (req, res) => {
  try {
    const {
      userId,
      name,
      designation,
      experience,
      location,
      currentCtc,
      expectedCtc,
    } = req.body;

    if (
      !userId ||
      !name ||
      !designation ||
      !experience ||
      !location ||
      !currentCtc ||
      !expectedCtc
    ) {
      return res.status(400).json({
        message: "All fields are mandatory",
        status: false,
      });
    }

    const resumePathName = req.file?.path;

    if (!resumePathName) {
      return res.status(400).json({
        message: "Resume is mandatory",
        status: false,
      });
    }

    await CandidateInfo.create({
      userId,
      name,
      designation,
      experience,
      location,
      currentCtc,
      expectedCtc,
      resume: resumePathName,
    });

    res.status(200).json({
      message: "User Info updated successfully",
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Fail to save user info",
      status: false,
    });
  }
};
