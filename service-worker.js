const CACHE_NAME = "health-edu-v2";

const urlsToCache = [
  "/",
  "https://akshat-145609.github.io/PhysicalEducationMICSemester-4UGPGCourse/",
  "style.css",
  "pwa.js",
  "database.js",
  "script.js",
  "robots.txt",
  "`manifest.json",
  "/PhysicalEducationMICSemester-4UGPGCourse/Assets/icons/PE_icon-192.png",
  "/PhysicalEducationMICSemester-4UGPGCourse/Assets/icons/PE_icon-512.png",
  "/PhysicalEducationMICSemester-4UGPGCourse/Assets/icons/PE_icon-48.png",
  "/PhysicalEducationMICSemester-4UGPGCourse/Assets/icons/PE_icon-32.png"
];

/* INSTALL */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

/* FETCH */
self.addEventListener("fetch", event => {

  const url = new URL(event.request.url);

  // ✅ Handle SPA routing (?topic=)
  if (url.pathname.endsWith("index.htm") || url.pathname === "/") {
    event.respondWith(
      caches.match("/index.htm")
        .then(response => response || fetch("/index.htm"))
    );
    return;
  }

  // ✅ Ignore query params for caching
  const cleanRequest = new Request(url.origin + url.pathname);

  event.respondWith(
    caches.match(cleanRequest)
      .then(response => {
        return response || fetch(event.request)
          .then(networkResponse => {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(cleanRequest, networkResponse.clone());
              return networkResponse;
            });
          })
          .catch(() => {
            // fallback
            if (event.request.destination === "document") {
              return caches.match("/index.htm");
            }
          });
      })
  );
});

/* ACTIVATE */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});