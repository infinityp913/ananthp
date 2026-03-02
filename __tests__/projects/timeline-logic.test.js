import { groupByYear } from '@/lib/groupByYear';

const seedProjects = [
  { title: 'DonateIt', year: 2020, description: 'desc', tech: ['HTML5'], link: 'https://devpost.com/software/donateit-4il5tg' },
  { title: 'TampAlert!', year: 2019, description: 'desc', tech: ['Java'] },
  { title: 'Trashcan Finder', year: 2019, description: 'desc', tech: ['Java'] },
];

describe('groupByYear', () => {
  it('returns 2 groups for the 3-project seed data', () => {
    const result = groupByYear(seedProjects);
    expect(result).toHaveLength(2);
  });

  it('sorts groups newest-first (2020 before 2019)', () => {
    const result = groupByYear(seedProjects);
    expect(result[0].year).toBe(2020);
    expect(result[1].year).toBe(2019);
  });

  it('2019 group contains exactly 2 projects in declaration order', () => {
    const result = groupByYear(seedProjects);
    const group2019 = result.find((g) => g.year === 2019);
    expect(group2019.projects).toHaveLength(2);
    expect(group2019.projects[0].title).toBe('TampAlert!');
    expect(group2019.projects[1].title).toBe('Trashcan Finder');
  });

  it('returns empty array for empty input', () => {
    expect(groupByYear([])).toEqual([]);
  });
});
