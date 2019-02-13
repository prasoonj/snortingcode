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
    "url": "webpack-runtime-f3dafac09b3bf8d1cf3e.js"
  },
  {
    "url": "app-c8f763d16c8ef2b7f5bb.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-75ac8e86c1cf4c1e89e8.js"
  },
  {
    "url": "index.html",
    "revision": "3f261a86f1144e581b9cbe33859910d7"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "2dfb11f4d47cfb1b0c7ee395a72c555e"
  },
  {
    "url": "component---src-pages-index-jsx.69a945a11e23dfafac91.css"
  },
  {
    "url": "2.e27118a4d1414124e626.css"
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
    "url": "2-313327479d60668eddb3.js"
  },
  {
    "url": "component---src-pages-index-jsx-b42389bb6649d222fbac.js"
  },
  {
    "url": "static/d/510/path---index-6a9-RCgKAnKVCH6Sqvhhwg4I4xGPfp0.json",
    "revision": "cbd01fa37e85563dccde9b524cdd6d97"
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

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
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