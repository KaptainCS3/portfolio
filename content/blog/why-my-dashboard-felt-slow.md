---
title: "Why my dashboard felt slow (and it wasn't the database)"
date: 2026-11-13
summary: "Navigation in DevFlow felt sluggish. The server and the database were fast. The delay came from a loading skeleton React keeps on screen for at least 300 ms."
tags: [nextjs, react, performance, devflow]
draft: true
---

DevFlow is my Next.js project dashboard. For a while, moving between pages felt slow. Not broken, just heavy: click a nav item, wait, then see content.

My first suspect was the database. Dashboards query a lot, and that is usually where time goes. Before changing anything, I measured.

## How I measured

I ran a production build and timed real clicks in headless Chrome, from the click until the page's content was on screen. I also looked at each stage separately: how long the server took to answer, and what the database did for each page.

## What the numbers said

- **Server:** answered in 15–50 ms.
- **Database:** 6–19 queries per page, the slowest taking 1–5 ms.
- **Content on screen:** about 330 ms after the click, on every list page.

The backend was not the problem. Something between "the server has answered" and "the user sees content" was costing close to 300 ms, and it was the same on every list page.

## The cause: a loading skeleton with a minimum display time

The app had a shared route `loading.tsx` with a skeleton. In the App Router, `loading.tsx` wraps the page in a Suspense boundary, so that skeleton was shown on every click.

React keeps a Suspense fallback on screen for at least 300 ms once it has shown it, so the content does not flash in and out. That is a good default for slow loads. For a page that is ready in tens of milliseconds, it means every navigation takes at least about 300 ms, however fast the server is.

## The fix

I removed the shared `loading.tsx` skeleton. To still give feedback when a navigation really is slow, the clicked nav icon shows a small spinner, but only if the navigation takes more than 150 ms. Fast clicks show no loading state at all.

## Results

| Setup | Before | After |
| --- | --- | --- |
| Local | ~330 ms | ~50 ms |
| 150 ms simulated network latency | ~330 ms | ~180 ms |

Click-to-content, measured the same way as before.

## Lesson

Measure each stage before optimising the obvious suspect. The database answered in a few milliseconds; the time went to a loading skeleton the pages didn't need.
