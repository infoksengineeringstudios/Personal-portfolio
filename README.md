# Engineering Portfolio

Premium personal engineering portfolio built with **Next.js 16**, **Tailwind CSS**, and **Framer Motion**.

## Content-driven pages

Project, internship, and leadership pages are generated from folders:

```
Assets/
  Profile/Description.md
  Projects/<Project Name>/
    Description.md
    *.png|*.jpg|*.webp   → gallery images
    *.pdf|*.docx         → downloadable reports
  Internships/<Name>/Description.md
  Leadership/<Name>/Description.md
Contents/
  About.md
  Projects.md
  Internships.md
  Leadership.md
```

Each `Description.md` supports YAML frontmatter (`title`, `summary`, `technologies`, `learnings`, `year`, `featured`, etc.).

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```


## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `npm run build` · Output: default.
5. Deploy.

`Assets/` is included in the serverless bundle via `outputFileTracingIncludes` so image and PDF downloads work in production through `/media/...`.

Content is read at build time for static pages — re-deploy after updating markdown or assets.
