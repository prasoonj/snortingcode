/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.2/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.2"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-61168d2c9bb08b0602ae.js"
  },
  {
    "url": "app-8ab4cffe004882682eef.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-75ac8e86c1cf4c1e89e8.js"
  },
  {
    "url": "index.html",
    "revision": "56609f7b3195a0cbfff3dc8ed4f501fb"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "487e4be6901cc558f91ba5b6157ceda7"
  },
  {
    "url": "component---src-pages-index-jsx.69a945a11e23dfafac91.css"
  },
  {
    "url": "2.33aec6608a126ef65f48.css"
  },
  {
    "url": "0-67c09113654780576fac.js"
  },
  {
    "url": "1-deeb871e12479340903a.js"
  },
  {
    "url": "3-449755f3954bae9e5e9a.js"
  },
  {
    "url": "2-29472c7af05d506dbb4d.js"
  },
  {
    "url": "component---src-pages-index-jsx-b42389bb6649d222fbac.js"
  },
  {
    "url": "static/d/736/path---index-6a9-Jo33a94eWad5zQyfL5BIdf9RueA.json",
    "revision": "3b6efaa8a0c08e4489c3df155e21c796"
  },
  {
    "url": "component---src-pages-404-jsx-68f8d44b6c86c24cae96.js"
  },
  {
    "url": "static/d/681/path---404-html-516-62a-hZnkqwj2kWEVSxncc1ZV0b7zo0s.json",
    "revision": "0a7886db5f0448605a64797c186901e7"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/snortingcode/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https:/, workbox.strategies.networkFirst(), 'GET');
"use strict";

/* global workbox */
self.addEventListener("message", function (event) {
  var api = event.data.api;

  if (api === "gatsby-runtime-cache") {
    var resources = event.data.resources;
    var cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then(function (cache) {
      return Promise.all(resources.map(function (resource) {
        return cache.add(resource).catch(function (e) {
          // ignore TypeErrors - these are usually due to
          // external resources which don't allow CORS
          if (!(e instanceof TypeError)) throw e;
        });
      }));
    }));
  }
});