import mongoose from "mongoose";

const candidateInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  currentCtc: {
    type: Number,
    required: true,
  },
  expectedCtc: {
    type: Number,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
});

const CandidateInfo = mongoose.model("CandidateInfo", candidateInfoSchema);

export default CandidateInfo;
