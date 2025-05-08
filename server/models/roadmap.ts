const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Month schema
const monthSchema = new Schema({
  month: { type: Number, required: true },
  focus: { type: String, required: true },
  topics: [String],
  project: { type: String, required: true },
  resources: [String],
  codingChallenges: [String],
});

// Define the main Roadmap schema
const roadmapSchema = new Schema({
  goal: { type: String, required: true },
  monthlyCommitment: { type: String, required: true },
  months: [monthSchema],
  student: { type: String, required: true },
  successTips: [String],
  timeline: { type: String, required: true },
});

// Create the Model
const Roadmap = mongoose.model('Roadmap', roadmapSchema);

export default Roadmap;
