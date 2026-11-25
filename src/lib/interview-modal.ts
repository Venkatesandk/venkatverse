export function openInterviewRequest() {
  window.dispatchEvent(new CustomEvent("open-interview-request"));
}

