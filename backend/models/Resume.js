const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  link: String,
  startDate: Date,
  endDate: Date,
  verified: { type: Boolean, default: false },
});

const CourseSchema = new mongoose.Schema({
  title: String,
  provider: String,
  certificateUrl: String,
  completedOn: Date,
  verified: { type: Boolean, default: false }
});

const AchievementSchema = new mongoose.Schema({
  title: String,
  details: String,
  date: Date,
  verified: { type: Boolean, default: false }
});

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  headline: String,
  summary: String,
  skills: [String],
  projects: [ProjectSchema],
  courses: [CourseSchema],
  achievements: [AchievementSchema],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);
