export function openResumeDownload() {
  window.dispatchEvent(new CustomEvent("open-resume-download"));
}
