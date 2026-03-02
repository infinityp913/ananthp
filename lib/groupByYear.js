/**
 * Groups an array of projects by year, sorted newest-first.
 * @param {Array<{year: number}>} projects
 * @returns {Array<{year: number, projects: Array}>}
 */
export function groupByYear(projects) {
  const acc = {};
  for (const project of projects) {
    if (!acc[project.year]) acc[project.year] = [];
    acc[project.year].push(project);
  }
  return Object.keys(acc)
    .map(Number)
    .sort((a, b) => b - a)
    .map((year) => ({ year, projects: acc[year] }));
}
