// Service Worker for Performance Optimization
// Handles caching strategies and offline functionality

const CACHE_NAME = "dr-pierrot-portfolio-v1";
const STATIC_CACHE = "static-cache-v1";
const DYNAMIC_CACHE = "dynamic-cache-v1";

// Resources to cache immediately
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/offline.html",
  // Add critical CSS and JS files here
];

// Cache first strategy for static assets
const CACHE_FIRST = [
  /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
  /\.(?:woff|woff2|ttf|eot)$/,
  /\.(?:css|js)$/,
];

// Network first strategy for dynamic content
const NETWORK_FIRST = [/\/api\//, /\.(?:json)$/];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

// Activate event - clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== CACHE_NAME &&
              cacheName !== STATIC_CACHE &&
              cacheName !== DYNAMIC_CACHE
            ) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Cache first strategy
  if (CACHE_FIRST.some((pattern) => pattern.test(request.url))) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Network first strategy
  if (NETWORK_FIRST.some((pattern) => pattern.test(request.url))) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Default: Stale while revalidate
  event.respondWith(staleWhileRevalidate(request));
});

// Cache first strategy implementation
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());

    return networkResponse;
  } catch (error) {
    console.warn("Cache first failed:", error);
    return new Response("Resource unavailable", { status: 503 });
  }
}

// Network first strategy implementation
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());

    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return (
      cachedResponse || new Response("Network unavailable", { status: 503 })
    );
  }
}

// Stale while revalidate strategy implementation
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      cache.put(request, networkResponse.clone());
      return networkResponse;
    })
    .catch(() => cachedResponse);

  return cachedResponse || fetchPromise;
}
