const Resume = require('../models/Resume');
const summaryGenerator = require('../utils/summaryGenerator');

exports.getMyResume = async (req, res) => {
  const userId = req.user.id;
  try {
    let resume = await Resume.findOne({ user: userId });
    if (!resume) {
      // create empty resume
      resume = new Resume({ user: userId, skills: [], projects: [], courses: [], achievements: []});
      await resume.save();
    }
    res.json(resume);
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
};

exports.updateResume = async (req, res) => {
  const userId = req.user.id;
  const payload = req.body;
  try {
    let resume = await Resume.findOneAndUpdate({ user: userId }, { ...payload, lastUpdated: new Date() }, { new: true, upsert: true });
    res.json(resume);
  } catch (err) { res.status(500).json({ msg: 'Server error' }); }
};

exports.generateSummary = async (req, res) => {
  const userId = req.user.id;
  try {
    const resume = await Resume.findOne({ user: userId });
    if (!resume) return res.status(404).json({ msg: 'Resume not found' });
    const summary = summaryGenerator(resume);
    resume.summary = summary;
    resume.lastUpdated = new Date();
    await resume.save();
    res.json({ summary, resume });
  } catch (err) { console.error(err); res.status(500).json({ msg: 'Server error' }); }
};
