/**
 * Resume Data Types and Utilities
 *
 * Provides TypeScript types and utility functions for handling resume data,
 * including validation, formatting, and export functionality.
 */

// Core resume data types
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current?: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: number | null;
  description?: string;
  achievements?: string[];
  coursework?: string[];
}

export interface Skill {
  name: string;
  level: "Basic" | "Intermediate" | "Advanced" | "Expert";
  years: number;
}

export interface SkillCategory {
  frontend: Skill[];
  backend: Skill[];
  database?: Skill[];
  tools?: Skill[];
  other?: Skill[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string | null;
  github?: string | null;
  featured: boolean;
  startDate?: string;
  endDate?: string;
  status: "In Progress" | "Completed" | "On Hold";
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  description?: string;
}

export interface Language {
  name: string;
  proficiency: "Basic" | "Conversational" | "Fluent" | "Native";
  level: string;
}

export interface ResumeMeta {
  version: string;
  lastUpdated: string;
  format: string;
  generator?: string;
}

export interface Resume {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory;
  projects: Project[];
  certifications?: Certification[];
  languages?: Language[];
  interests?: string[];
  meta: ResumeMeta;
}

// Resume data import and utilities
import resumeData from "@/data/resume.json";

/**
 * Get the complete resume data with type safety
 */
export function getResumeData(): Resume {
  return resumeData as Resume;
}

/**
 * Get personal information section
 */
export function getPersonalInfo(): PersonalInfo {
  return resumeData.personal as PersonalInfo;
}

/**
 * Get work experience with optional filtering
 */
export function getExperience(currentOnly = false): Experience[] {
  const experience = resumeData.experience as Experience[];
  return currentOnly ? experience.filter((exp) => exp.current) : experience;
}

/**
 * Get education history
 */
export function getEducation(): Education[] {
  return resumeData.education as Education[];
}

/**
 * Get skills by category or all skills
 */
export function getSkills(
  category?: keyof SkillCategory,
): Skill[] | SkillCategory {
  const skills = resumeData.skills as SkillCategory;
  return category ? skills[category] || [] : skills;
}

/**
 * Get projects with optional filtering
 */
export function getProjects(featuredOnly = false): Project[] {
  const projects = resumeData.projects as Project[];
  return featuredOnly ? projects.filter((proj) => proj.featured) : projects;
}

/**
 * Format date for display (YYYY-MM to Month Year)
 */
export function formatDate(dateString: string): string {
  try {
    const [year, month] = dateString.split("-") as [string, string];
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

/**
 * Calculate years of experience from start date to present
 */
export function calculateExperience(
  startDate: string,
  endDate?: string | null,
): number {
  const start = new Date(startDate + "-01");
  const end = endDate ? new Date(endDate + "-01") : new Date();
  const diffInMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  return Math.round((diffInMonths / 12) * 10) / 10; // Round to 1 decimal place
}

/**
 * Get total years of professional experience
 */
export function getTotalExperience(): number {
  const experience = getExperience();
  if (experience.length === 0) return 0;

  const earliest = experience
    .map((exp) => new Date(exp.startDate + "-01"))
    .sort((a, b) => a.getTime() - b.getTime())[0] as Date;

  const now = new Date();
  const diffInMonths =
    (now.getFullYear() - earliest.getFullYear()) * 12 +
    (now.getMonth() - earliest.getMonth());
  return Math.round((diffInMonths / 12) * 10) / 10;
}

/**
 * Validate resume data structure
 */
export function validateResumeData(data: any): data is Resume {
  return !!(
    data &&
    data.personal &&
    data.personal.name &&
    data.personal.email &&
    Array.isArray(data.experience) &&
    Array.isArray(data.education) &&
    data.skills &&
    Array.isArray(data.projects) &&
    data.meta
  );
}

/**
 * Get resume summary statistics
 */
export function getResumeStats() {
  const resume = getResumeData();
  const totalExperience = getTotalExperience();
  const skillCount = Object.values(resume.skills).flat().length;

  return {
    totalExperience,
    projectCount: resume.projects.length,
    skillCount,
    certificationCount: resume.certifications?.length || 0,
    languageCount: resume.languages?.length || 0,
    lastUpdated: resume.meta.lastUpdated,
  };
}
