// A deterministic template-based summary generator.
// Accepts a resume object and returns a short professional summary.
// Replace with LLM integration later if desired.

module.exports = function generateSummary(resume) {
  const headline = resume.headline || '';
  const skills = (resume.skills || []).slice(0, 8);
  const projects = resume.projects || [];
  const topProjects = projects.slice(0, 2).map(p => p.title).filter(Boolean);

  const skillPart = skills.length ? `Skilled in ${skills.join(', ')}.` : '';
  const projectPart = topProjects.length ? ` Notable projects include ${topProjects.join(' and ')}.` : '';
  const headlinePart = headline ? `${headline}.` : '';

  // Count verifications to show strength
  const verifiedCount = [
    ...(resume.projects || []).filter(p => p.verified).length,
    ...(resume.courses || []).filter(c => c.verified).length,
    ...(resume.achievements || []).filter(a => a.verified).length
  ].reduce((a, b) => a + b, 0);

  const verificationPart = verifiedCount > 0 ? ` ${verifiedCount} items verified.` : '';

  const base = `${headlinePart} ${skillPart}${projectPart}${verificationPart}`;
  // Trim and normalize spaces
  return base.replace(/\s+/g, ' ').trim();
};
