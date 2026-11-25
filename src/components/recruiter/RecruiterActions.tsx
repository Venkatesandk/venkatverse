"use client";

import { Calendar, Download, Mail } from "lucide-react";
import { developer } from "@/data/portfolio";
import { ResumeDownloadButton, ResumeDownloadModal } from "@/components/sections/ResumeDownloadModal";
import { RequestInterviewButton, InterviewRequestModal } from "@/components/sections/InterviewRequestModal";
import { LinkedInIcon } from "@/components/ui/SocialIcons";

export function RecruiterActions({ variant = "header" }: { variant?: "header" | "cta" }) {
  return (
    <>
      <div className={`flex flex-wrap gap-2 ${variant === "cta" ? "justify-center" : ""}`}>
        <ResumeDownloadButton className="btn btn-primary !w-auto">
          <Download size={15} />
          Download Resume
        </ResumeDownloadButton>
        <RequestInterviewButton className="btn btn-glass !w-auto">
          <Calendar size={15} />
          Request Interview
        </RequestInterviewButton>
        <a
          href={`mailto:${developer.email}?subject=${encodeURIComponent(`Interview Opportunity — ${developer.name}`)}`}
          className="btn btn-glass !w-auto"
        >
          <Mail size={15} />
          {variant === "cta" ? "Send Opportunity Email" : `Email ${developer.email}`}
        </a>
        <a
          href={developer.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-glass !w-auto"
        >
          <LinkedInIcon width={14} height={14} />
          LinkedIn
        </a>
      </div>

      {variant === "header" && (
        <>
          <ResumeDownloadModal />
          <InterviewRequestModal />
        </>
      )}
    </>
  );
}

