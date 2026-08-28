/**
 * Resume Download API Endpoint
 *
 * Provides resume data in multiple formats (JSON, PDF) with proper
 * caching, security headers, and analytics tracking.
 */

import { NextRequest, NextResponse } from "next/server";
import { getResumeData, validateResumeData } from "@/lib/resume";

// Cache duration in seconds (1 hour)
const CACHE_DURATION = 3600;

/**
 * GET /api/resume - Download resume in various formats
 *
 * Query parameters:
 * - format: 'json' | 'pdf' (default: 'json')
 * - download: 'true' | 'false' (default: 'false')
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "json";
    const download = searchParams.get("download") === "true";

    // Validate format parameter
    if (!["json", "pdf"].includes(format)) {
      return NextResponse.json(
        { error: "Invalid format. Supported formats: json, pdf" },
        { status: 400 },
      );
    }

    // Get resume data
    const resumeData = getResumeData();

    // Validate resume data
    if (!validateResumeData(resumeData)) {
      return NextResponse.json(
        { error: "Invalid resume data structure" },
        { status: 500 },
      );
    }

    // Handle JSON format
    if (format === "json") {
      return handleJsonDownload(resumeData, download);
    }

    // Handle PDF format
    if (format === "pdf") {
      return handlePdfDownload(resumeData, download);
    }

    return NextResponse.json({ error: "Unsupported format" }, { status: 400 });
  } catch (error) {
    console.error("Resume API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * Handle JSON resume download
 */
function handleJsonDownload(resumeData: any, download: boolean) {
  const response = NextResponse.json(resumeData);

  // Set caching headers
  response.headers.set("Cache-Control", `public, max-age=${CACHE_DURATION}`);
  response.headers.set("ETag", `"resume-${resumeData.meta.lastUpdated}"`);

  // Set download headers if requested
  if (download) {
    response.headers.set(
      "Content-Disposition",
      `attachment; filename="jaycee-capulong-resume.json"`,
    );
    response.headers.set("Content-Type", "application/json");
  }

  return response;
}

/**
 * Handle PDF resume download
 * For now, returns a structured text version until PDF generation is implemented
 */
function handlePdfDownload(resumeData: any, download: boolean) {
  // Generate structured text resume
  const textResume = generateTextResume(resumeData);

  const response = new NextResponse(textResume, {
    headers: {
      "Content-Type": download ? "application/octet-stream" : "text/plain",
      "Cache-Control": `public, max-age=${CACHE_DURATION}`,
      ETag: `"resume-pdf-${resumeData.meta.lastUpdated}"`,
    },
  });

  // Set download headers if requested
  if (download) {
    response.headers.set(
      "Content-Disposition",
      `attachment; filename="jaycee-capulong-resume.txt"`,
    );
  }

  return response;
}

/**
 * Generate structured text resume
 */
function generateTextResume(resumeData: any): string {
  const { personal, experience, education, skills, projects } = resumeData;

  let resume = "";

  // Header
  resume += `${personal.name.toUpperCase()}\n`;
  resume += `${personal.title}\n`;
  resume += `${personal.email} | ${personal.phone} | ${personal.location}\n`;
  resume += `${personal.website}\n`;
  resume += `GitHub: ${personal.github} | LinkedIn: ${personal.linkedin}\n\n`;

  // Summary
  resume += `SUMMARY\n`;
  resume += `${"-".repeat(50)}\n`;
  resume += `${personal.summary}\n\n`;

  // Experience
  resume += `EXPERIENCE\n`;
  resume += `${"-".repeat(50)}\n`;
  experience.forEach((exp: any) => {
    resume += `${exp.position} | ${exp.company}\n`;
    resume += `${exp.location} | ${exp.startDate} - ${exp.endDate || "Present"}\n`;
    resume += `${exp.description}\n`;
    exp.achievements.forEach((achievement: string) => {
      resume += `• ${achievement}\n`;
    });
    resume += `Technologies: ${exp.technologies.join(", ")}\n\n`;
  });

  // Education
  resume += `EDUCATION\n`;
  resume += `${"-".repeat(50)}\n`;
  education.forEach((edu: any) => {
    resume += `${edu.degree} | ${edu.institution}\n`;
    resume += `${edu.location} | ${edu.startDate} - ${edu.endDate}\n`;
    if (edu.description) {
      resume += `${edu.description}\n`;
    }
    resume += `\n`;
  });

  // Skills
  resume += `SKILLS\n`;
  resume += `${"-".repeat(50)}\n`;
  Object.entries(skills).forEach(([category, skillList]: [string, any]) => {
    resume += `${category.toUpperCase()}:\n`;
    skillList.forEach((skill: any) => {
      resume += `• ${skill.name} (${skill.level}) - ${skill.years} years\n`;
    });
    resume += `\n`;
  });

  // Projects
  resume += `PROJECTS\n`;
  resume += `${"-".repeat(50)}\n`;
  projects.forEach((project: any) => {
    resume += `${project.name}${project.featured ? " (Featured)" : ""}\n`;
    resume += `${project.description}\n`;
    resume += `Technologies: ${project.technologies.join(", ")}\n`;
    if (project.url) resume += `URL: ${project.url}\n`;
    if (project.github) resume += `GitHub: ${project.github}\n`;
    resume += `Status: ${project.status}\n\n`;
  });

  return resume;
}
