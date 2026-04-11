const CACHE_NAME = "health-edu-v3";

const BASE = "/PhysicalEducationMICSemester-4UGPGCourse/";

const urlsToCache = [
  BASE,
  BASE + "index.htm",
  BASE + "style.css",
  BASE + "script.js",
  BASE + "database.js",
  BASE + "pwa.js",
  BASE + "manifest.json",
  BASE + "robots.txt",
  BASE + "404.htm",

  // Icons
  BASE + "Assets/icons/PE_icon-192.png",
  BASE + "Assets/icons/PE_icon-512.png",
  BASE + "Assets/icons/PE_icon-48.png",
  BASE + "Assets/icons/PE_icon-32.png"
];

/* INSTALL */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.log("Cache failed:", err))
  );
  self.skipWaiting();
});

/* ACTIVATE */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* FETCH */
self.addEventListener("fetch", event => {

  const url = new URL(event.request.url);

  // ✅ Handle SPA navigation (including ?topic=)
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match(BASE + "index.htm")
        .then(res => res || fetch(BASE + "index.htm"))
    );
    return;
  }

  // ✅ Cache-first for assets
  event.respondWith(
    caches.match(event.request)
      .then(res => res || fetch(event.request)
        .then(networkRes => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkRes.clone());
            return networkRes;
          });
        })
      )
      .catch(() => {
        // fallback for offline
        if (event.request.destination === "document") {
          return caches.match(BASE + "404.htm");
        }
      })
  );
});