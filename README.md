# Frontend Learning Lab

A responsive, hands-on learning project for the JavaScript, TypeScript, React, React Router, and Tailwind tasks in the supplied checklist.

## Run it

```sh
npm install
npm run dev
```

Then open the local URL Vite prints in the terminal.

## What is included

- **Overview and curriculum:** 27 lessons across JavaScript, TypeScript, React, routing/styling, and advanced practice. Filter or search lessons and save completion progress in localStorage.
- **Lesson pages:** each lesson lists its three tasks, a key definition, keywords, interview practice, and the official documentation link.
- **Practice lab:** live examples for DOM selection/events, modern JavaScript, Promises, props/callbacks, state, lists, forms, Effects, Context, custom Hooks, API states, routing, Tailwind utilities/layout, reducers, memoization, and Tic-Tac-Toe.
- **Study guide:** [STUDY_GUIDE.md](./STUDY_GUIDE.md) expands all 81 tasks with steps, definitions, interview questions and answers, compiler setup, and the time estimate.
- **Tailwind 3 reference:** `examples/tailwind-v3/` contains the older config-and-directives setup as a separate example.
- **Component examples:** `src/test/` contains interaction tests and an API test with a mocked response. This Vite project uses Vitest's Jest-style API with React Testing Library.

## Commands

```sh
npm run dev       # local development
npm run typecheck # TypeScript check
npm run compile:example # compile examples/typed-hello.ts into examples/compiled/
npm run build     # production build
npm test          # run component tests
```

The study guide is copied into `public/` automatically before development and production builds, so the in-app Study Guide link works in both modes.

## Time estimate

The 27 guided lesson estimates total 77 focused hours. Allow another 25–35 hours for review, debugging, repeating exercises, and interview practice: approximately 100–112 hours from the beginning. At two hours per day, five days each week, plan on about 10–12 weeks. Details and an eight-week pacing outline are in the study guide.

## Tailwind version note

The project uses Tailwind CSS 4 with `@tailwindcss/vite` and `@import "tailwindcss";`. The prompt's `tailwind.config.js` and `@tailwind base/components/utilities` instructions refer to Tailwind 3. The study guide explains both setups so the older pattern is recognizable.
