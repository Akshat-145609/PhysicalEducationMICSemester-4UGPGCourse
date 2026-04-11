if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/PhysicalEducationMICSemester-4UGPGCourse/service-worker.js")
      .then(reg => console.log("Service Worker Registered"))
      .catch(err => console.log("SW Error:", err));
  });
}