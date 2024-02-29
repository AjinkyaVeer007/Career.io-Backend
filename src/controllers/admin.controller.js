import mongoose from "mongoose";
import Category from "../models/category.model.js";
import Job from "../models/job.model.js";
import JobApply from "../models/jobapply.model.js";

const ObjectId = mongoose.Types.ObjectId;

export const createCategory = async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({
        message: "Category name is mandatory",
        status: false,
      });
    }

    await Category.create({
      name,
      userId,
    });

    return res.status(200).json({
      message: "Category created successfully",
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Fail to create category",
      status: false,
    });
  }
};

export const createJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      location,
      skills,
      category,
      experience,
      description,
      salary,
      createdBy,
    } = req.body;

    if (
      !title ||
      !companyName ||
      !location ||
      !skills ||
      !category ||
      !experience ||
      !description ||
      !salary ||
      !createdBy
    ) {
      return res.status(400).json({
        message: "All fields mandatory",
        status: false,
      });
    }

    await Job.create({
      title,
      companyName,
      location,
      skills,
      category,
      experience,
      description,
      salary,
      createdBy,
    });

    return res.status(200).json({
      message: "Job uploaded successfully",
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Fail to create job",
      status: false,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $match: {
          userId: new ObjectId(req.params.id),
        },
      },
    ]);

    return res.status(200).json({
      data: categories,
      message: "Categories fetch successfully",
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Fail to fetch categories",
      status: false,
    });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.aggregate([
      {
        $match: {
          createdBy: new ObjectId(req.params.id),
        },
      },
    ]);

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

export const getCandidateAppliedJobs = async (req, res) => {
  try {
    const appliedJobs = await JobApply.aggregate([
      {
        $match: {
          adminId: new ObjectId(req.params.id),
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
        $lookup: {
          from: "candidateinfos",
          localField: "userId._id",
          foreignField: "userId",
          as: "userInfo",
        },
      },
      {
        $unwind: {
          path: "$userId",
        },
      },
      {
        $unwind: {
          path: "$userInfo",
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

export const updateAppliedJobStatus = async (req, res) => {
  try {
    await JobApply.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).json({
      message: "application status updated",
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Fail to fetch applied jobs",
      status: false,
    });
  }
};
