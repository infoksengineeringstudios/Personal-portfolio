---
title: Engineering Portfolio Website
summary: Designed and built this content-driven portfolio from scratch with Next.js, Tailwind, and Framer Motion, deployed on Vercel.
period: July 2026 – Present
featured: true
cover: preview-home.png
technologies:
  - Next.js 16
  - React 19
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Vercel
learnings:
  - Built a content-driven architecture that generates pages from markdown and asset folders.
  - Implemented SEO, an adaptive image gallery, and an engineering-drawing visual system.
  - Shipped a fast, accessible, statically-rendered site to production on Vercel.
---

## Overview

This portfolio is itself an engineering project: a fast, content-driven website that turns plain markdown and image folders into fully rendered project, internship, and leadership pages. It pairs a considered "engineering drawing" visual language — blueprint grids, dimension lines, and title blocks — with a modern React stack.

## Key contributions

- Architected a content pipeline that reads markdown with YAML frontmatter and co-located assets, so new work is added by dropping files into a folder rather than writing code.
- Built a secure media route to serve images and downloadable reports, with path-traversal protection and long-lived caching.
- Designed a responsive, accessible image gallery with a lightbox and an adaptive stage that fits both portrait and landscape photos.
- Implemented SEO end to end: OpenGraph and Twitter cards, a generated sitemap and robots file, and canonical metadata driven by a single site-URL source.
- Created a custom visual system with hand-built SVG technical drawings, motion, reduced-motion support, and keyboard navigation.

## Outcome

A statically-rendered site that loads quickly, scales to new content without code changes, and presents engineering work with a distinctive, professional identity — deployed and maintained on Vercel.
