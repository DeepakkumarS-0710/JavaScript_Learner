# Frontend Learning Lab — Complete Study Guide

This guide follows the 27 topics in the learning portal. Each topic explains what the tasks teach, how to complete them, the terms to know, and interview questions with sample answers. Read the official reference linked at the start of each topic, try the three tasks, then explain the code in your own words.

## Start the project

You need Node.js and npm. From this folder:

```sh
npm install
npm run dev
```

Open the local address printed by Vite. The app is a Vite + React + TypeScript project. Tailwind CSS 4 is connected through its Vite plugin. The study portal itself uses responsive CSS as well as Tailwind utilities in the styling lab.

Useful project commands:

```sh
npm run typecheck    # ask TypeScript to check the app without emitting files
npm run compile:example # compile examples/typed-hello.ts into examples/compiled/
npm run build        # type-check and create the production bundle
npm test             # run the component examples with Vitest and React Testing Library
```

The app does not need a backend. The API lesson requests sample users from JSONPlaceholder, so that particular example needs an internet connection. Other lessons work locally.

### TypeScript compiler exercise

The project keeps TypeScript installed locally so every learner uses the version recorded by the project. To practice the original global-install task, you can also install the compiler for your own account:

```sh
npm install --global typescript
tsc --version
tsc examples/typed-hello.ts --target ES2022 --module ESNext --moduleResolution bundler --skipLibCheck --outDir dist-example
```

The last command writes JavaScript into `dist-example/`. For day-to-day project work, prefer `npm run typecheck` or the local compiler through `npx tsc` so the project uses its pinned toolchain. The `examples/typed-hello.ts` file contains explicit `string`, `number`, and `boolean` values plus a typed function.

### Project map

- `src/data/curriculum.ts` — the complete lesson list, tasks, references, time estimates, and review questions.
- `src/pages/` — overview, curriculum, lesson, practice, and dynamic user-route screens.
- `src/hooks/` — `useFetch`, `useLocalStorage`, and `useWindowSize`.
- `src/context/` — shared theme and saved lesson progress.
- `src/types/models.ts` — a `User` type alias, `Product` interface, and extended `DigitalProduct` interface.
- `src/test/` — component interaction and mocked API tests.
- `src/styles.css` — responsive theme, layout, components, and mobile styles.

## How long will it take?

The lesson estimates below add up to **77 focused hours** for the listed tasks. Add roughly **25–35 hours** for rereading, debugging, repeating exercises without looking at the solution, interview practice, and polishing the capstone: plan for about **100–112 hours** if you are learning these topics from the beginning.

At two focused hours a day, five days a week, that is around **10–12 weeks**. If you already know JavaScript and basic HTML/CSS, a steady **6–8 weeks** may be enough. Treat the estimate as a planning guide: spend extra time on JavaScript, state, and async work if those ideas are new to you.

Suggested pacing at about 10 hours per week:

| Week | Focus | Guided hours |
|---|---|---:|
| 1 | DOM, modern JavaScript, asynchronous JavaScript | 7 |
| 2 | TypeScript basics, object shapes, React setup and JSX | 8 |
| 3 | Props, state, events, conditionals, lists | 12 |
| 4 | Forms, useState, useEffect | 10 |
| 5 | Context, custom Hooks, API states | 10 |
| 6 | Routing, Tailwind setup/utilities/layout/responsive design, React TypeScript | 15 |
| 7 | Reducers, performance, component testing | 11 |
| 8 | Tic-Tac-Toe capstone and review | 6 |

Keep a small learning log: write down one thing that became clearer, one bug you fixed, and one question to revisit after each study session.

---

## 1. DOM & browser events — 2 hours

**Reference:** [MDN: Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

**What the tasks teach:** The browser exposes an HTML document as objects. JavaScript can find an element, read or change its content and styles, and listen for user events. The practice lab isolates this vanilla JavaScript example; React UI should normally update through state.

**Tasks and how to do them:**

1. Select an element with `document.getElementById("message")` and another with `document.querySelector(".notice")`. Check for `null` before using a result.
2. Set `element.textContent = "Updated"`; change a style through `element.style.color = "rebeccapurple"` or set a class with `classList.add()`.
3. Select a button and use `addEventListener("click", handler)`. In a component Effect, remove the same handler during cleanup.

**Key terms:** **DOM** — browser object tree for a document. **Element** — an HTML/SVG node in that tree. **Selector** — a CSS pattern used to find an element. **Event listener** — a function registered to respond to an event.

**Interview practice**

- **Q: Is the DOM part of the JavaScript language?** A: No. It is a browser Web API that JavaScript can call.
- **Q: What does `querySelector` return when there is no match?** A: `null`; code should check before reading or changing the result.

## 2. Modern JavaScript syntax — 2 hours

**Reference:** [MDN: JavaScript language overview](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Language_overview)

**What the tasks teach:** This lesson makes compact JavaScript syntax readable: arrow functions for callbacks, template literals for composed strings, and destructuring for pulling values out of data.

**Tasks and how to do them:**

1. Rewrite `function double(value) { return value * 2; }` as `const double = (value) => value * 2;`.
2. Use backticks: `` `Hello, ${name}. You have ${count} lessons.` ``. Expressions inside `${...}` are evaluated.
3. Read `{ name, age }` from a `user` object and `[first, second]` from an array. Rename a property with `{ name: displayName }` if useful.

**Key terms:** **Arrow function** — concise function syntax with lexical `this`. **Template literal** — backtick string that can interpolate expressions. **Destructuring** — binding values from an array or object pattern. **Callback** — a function passed to another function to run later.

**Interview practice**

- **Q: How does `this` differ in an arrow function?** A: An arrow function does not create its own `this`; it captures `this` from the surrounding scope.
- **Q: Can object destructuring provide a default?** A: Yes: `const { role = "learner" } = user` uses the default when the property is `undefined`.

## 3. Promises, fetch, and async/await — 3 hours

**Reference:** [MDN: Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS)

**What the tasks teach:** Network and timer work finish later. Promises represent those results; `async`/`await` makes the sequence easier to read, and `try/catch` handles failures.

**Tasks and how to do them:**

1. Return `new Promise(resolve => setTimeout(() => resolve("Finished"), 2000))`; call `.then(console.log)` or await it in an `async` function.
2. Call `fetch("https://jsonplaceholder.typicode.com/users")`, check `response.ok`, then call `response.json()`.
3. Put the request in `try/catch`. Store a useful error message in state and show loading while the request is pending.

**Key terms:** **Promise** — a future result in pending, fulfilled, or rejected state. **`async`** — declares a function that returns a Promise. **`await`** — waits for a Promise inside an async function. **HTTP status** — response code; `fetch` does not reject just because it is 404.

**Interview practice**

- **Q: Why check `response.ok`?** A: HTTP error statuses still produce a fulfilled `fetch` Promise; `ok` is true only for successful 2xx statuses.
- **Q: What does `await` do with a rejected Promise?** A: It throws the rejection reason at that line, so a surrounding `try/catch` can handle it.

## 4. TypeScript setup and primitive types — 2 hours

**Reference:** [TypeScript documentation](https://www.typescriptlang.org/docs/)

**What the tasks teach:** The TypeScript compiler catches mismatches while you write code and emits JavaScript. Type annotations describe intended values; the compiler does not add runtime checks to the browser.

**Tasks and how to do them:**

1. Create `hello.ts`, then run the global installation and `tsc` commands in the setup section. Compare `hello.ts` with emitted `.js`.
2. Write `let title: string`, `let total: number`, and `let published: boolean`. Try `total = "many"` and read the compiler diagnostic; remove the invalid assignment afterward.
3. Define `function formatPrice(amount: number): string { return `$${amount.toFixed(2)}`; }`.

**Key terms:** **Static type checking** — checking value compatibility before execution. **Type annotation** — an explicit type, such as `age: number`. **Inference** — a type TypeScript derives from an initializer. **Compiler (`tsc`)** — tool that checks TypeScript and can emit JavaScript.

**Interview practice**

- **Q: Does TypeScript stop invalid data from arriving at runtime?** A: No. Types are erased when JavaScript is emitted; validate untrusted input at runtime.
- **Q: Should every variable always be annotated?** A: No. Type inference handles many obvious values; annotate function boundaries and places where it improves clarity.

## 5. Type aliases and interfaces — 2 hours

**Reference:** [TypeScript Handbook: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

**What the tasks teach:** Named object shapes give data a readable contract. This project defines a `User` alias, a `Product` interface, and a `DigitalProduct` interface that extends `Product`.

**Tasks and how to do them:**

1. Define `type User = { name: string; age: number; email?: string }`. The `?` makes email optional.
2. Define `interface Product { id: number; name: string; price: number }`, then create an object with all three required fields.
3. Declare `interface DigitalProduct extends Product { downloadUrl: string }`; a matching object needs both the inherited and new fields.

**Key terms:** **Type alias** — a name for any type expression. **Interface** — an extendable object contract. **Optional property** — property that may be absent. **Structural typing** — compatibility based on the members an object has.

**Interview practice**

- **Q: What is a structural type system?** A: Two values are compatible when their shapes have the required members, even if they were declared with different names.
- **Q: Can an interface inherit more than one interface?** A: Yes. An interface can extend multiple compatible interfaces, for example `interface Admin extends User, Permissions {}`.

## 6. Create a React app — 2 hours

**Reference:** [React: Quick Start](https://react.dev/learn)

**What the tasks teach:** A React app is composed from reusable components. Vite provides the local development server and build; the entry point mounts the root component.

**Tasks and how to do them:**

1. The current project was scaffolded for Vite with React and TypeScript. For a new folder, use `npm create vite@latest my-app -- --template react-ts`, then `cd my-app` and `npm install`.
2. Write `function Hello() { return <h1>Hello, world!</h1>; }` and render `<Hello />` from `App`.
3. Find `src/main.tsx`, `src/App.tsx`, `index.html`, and `package.json`; change the visible App text and save to see Vite refresh it.

**Key terms:** **Component** — reusable UI function. **Root** — DOM element where React attaches the app. **Vite** — development server and frontend build tool. **Hot update** — development refresh after source changes.

**Interview practice**

- **Q: Why do React component names start with a capital letter?** A: JSX treats capitalized names as component references and lowercase names as HTML tags.
- **Q: What is the role of `main.tsx`?** A: It creates a React root and renders the top-level app into the HTML root element.

## 7. JSX and styling — 2 hours

**Reference:** [React: Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)

**What the tasks teach:** JSX describes UI in a component. Braces insert JavaScript expressions; lists map data to elements, and React uses `className` and camelCase style properties.

**Tasks and how to do them:**

1. Render a value with `<p>Hello, {name}</p>` or an expression such as `{price * quantity}`.
2. Convert `items.map(item => <li key={item.id}>{item.label}</li>)` into a `<ul>`. Use stable IDs as keys.
3. Add `className="card"` and a stylesheet rule; try `style={{ color: accentColor, fontSize: 18 }}` for a value-driven style.

**Key terms:** **JSX** — JavaScript syntax extension for UI markup. **Expression** — a value-producing JavaScript form usable inside braces. **`className`** — JSX property for an HTML class. **Key** — sibling identity used by React when reconciling lists.

**Interview practice**

- **Q: Why is `class` written as `className` in JSX?** A: JSX uses JavaScript property naming, and `class` is a reserved word in JavaScript syntax.
- **Q: Can JSX render a `for` loop directly inside braces?** A: Statements such as `for` cannot be embedded as an expression; build an array first or use `map()`.

## 8. Props and component state — 3 hours

**Reference:** [React: State: A Component's Memory](https://react.dev/learn/state-a-components-memory)

**What the tasks teach:** Props flow from parent to child. State stores values that change over time. When a child interaction changes parent-owned information, the parent passes a callback down.

**Tasks and how to do them:**

1. Render `<Greeting name="Mina" />`; inside `Greeting`, display the `name` prop.
2. Use `const [count, setCount] = useState(0)` and show `count` next to an increment button.
3. Keep the count in a parent and pass `onIncrement={() => setCount(c => c + 1)}` to a child button.

**Key terms:** **Props** — read-only values supplied by a parent. **State** — component memory that affects rendering. **Lifting state** — moving shared state to a common parent. **Callback prop** — function passed to let a child request parent work.

**Interview practice**

- **Q: Can a component directly modify its props?** A: No. Props are inputs; ask the owner to update its state through a callback.
- **Q: Where should shared state live?** A: In the closest common ancestor that needs to read or update it.

## 9. Events and forms — 3 hours

**Reference:** [React: Responding to Events](https://react.dev/learn/responding-to-events)

**What the tasks teach:** Event props connect user actions to component functions. Controlled inputs keep their displayed value synchronized with React state; form submit handlers can stop browser navigation.

**Tasks and how to do them:**

1. Write `function handleClick() { console.log("Clicked"); }`, then pass it as `<button onClick={handleClick}>`.
2. Set input `value={name}` and `onChange={event => setName(event.target.value)}`.
3. Handle `<form onSubmit={handleSubmit}>`; inside `handleSubmit`, call `event.preventDefault()` before validation.

**Key terms:** **Event handler** — function run for an event. **Controlled input** — input value owned by React state. **Synthetic event** — React’s cross-browser event interface. **`preventDefault`** — cancels the browser’s built-in action for an event.

**Interview practice**

- **Q: Why pass a handler instead of calling it in JSX?** A: Passing keeps it for the click; calling it would execute while rendering.
- **Q: Why call `preventDefault()` for a client-side form?** A: It prevents a full-page form navigation so the component can validate and update state itself.

## 10. Conditional rendering — 2 hours

**Reference:** [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)

**What the tasks teach:** Use JavaScript control flow to return different UI or include optional parts. Keep complex conditions readable rather than nesting many shortcuts.

**Tasks and how to do them:**

1. Before `return`, use `if (isLoggedIn) return <Dashboard />; return <SignIn />;`.
2. Add `{isOnline && <span>Online</span>}` to render a status only when true.
3. Use `{isOpen ? <p>Details</p> : <p>Hidden</p>}` for two alternatives.

**Key terms:** **Conditional rendering** — selecting UI from a condition. **Ternary** — expression shaped as condition `?` result A `:` result B. **Logical AND** — returns the right operand when the left is truthy. **Falsy value** — value treated as false in a condition.

**Interview practice**

- **Q: What is the difference between `&&` and a ternary in JSX?** A: `&&` conditionally includes one result; a ternary chooses between two results.
- **Q: Why is `items.length && <List />` risky?** A: An empty list has length zero, and React renders the numeric `0`; use `items.length > 0 && <List />`.

## 11. Lists and stable keys — 2 hours

**Reference:** [React: Rendering Lists](https://react.dev/learn/rendering-lists)

**What the tasks teach:** Arrays of data can become repeated components through `map()`. Stable keys help React preserve the identity of each rendered item when the list changes.

**Tasks and how to do them:**

1. Make an array such as `[{id: 1, title: "DOM"}]`, then map it to `<li>` or a `LessonCard` component.
2. Put `key={lesson.id}` on the top-level element returned by the map callback.
3. Add a new object with a unique ID using `setItems(previous => [...previous, newItem])`.

**Key terms:** **`map()`** — transforms every array element and returns a new array. **Key** — stable ID among siblings. **Immutable update** — creates a new array/object instead of changing the old one. **Reconciliation** — React matching the next UI description with the previous one.

**Interview practice**

- **Q: Must keys be globally unique across the whole app?** A: No. They must be unique among siblings in the rendered list.
- **Q: When is an array index acceptable as a key?** A: For a static list that will not be reordered, inserted into, or deleted from; a stable data ID is safer for changing lists.

## 12. Controlled inputs and validation — 3 hours

**Reference:** [React: `<input>`](https://react.dev/reference/react-dom/components/input)

**What the tasks teach:** Inputs, checkboxes, and selects can all be controlled by state. A single object can store related values; submit-time validation should make mistakes clear.

**Tasks and how to do them:**

1. Use state for the text value and connect it to the input's `value` and `onChange`.
2. Use one object for `name`, `subscribed`, and `role`; update one field with `{ ...form, role: event.target.value }`.
3. In submit, prevent default, check `name.trim()`, display an error when empty, and clear the error after a valid submission.

**Key terms:** **`value`** — controlled text/select value. **`checked`** — controlled checkbox value. **Validation** — checking whether input meets rules. **Spread syntax** — copies enumerable fields into a new object.

**Interview practice**

- **Q: What is a common controlled-input bug?** A: Supplying `value` without an `onChange` update makes it effectively read-only.
- **Q: Why trim a required text field?** A: A value containing only spaces should not count as meaningful input.

## 13. useState patterns — 3 hours

**Reference:** [React API: `useState`](https://react.dev/reference/react/useState)

**What the tasks teach:** State is a render snapshot, so updates should produce new objects and use an updater function when based on the previous value.

**Tasks and how to do them:**

1. Update `{ name, city }` with `setProfile(previous => ({ ...previous, city: nextCity }))`; do not assign to `profile.city`.
2. Increment with `setCounter(previous => previous + 1)`.
3. Store a boolean and toggle it with `setEnabled(previous => !previous)`; expose the control as a button or switch with an accessible label.

**Key terms:** **State snapshot** — value for one render. **Updater function** — function receiving queued previous state. **Immutability** — treating prior state as unchanged. **Toggle** — flip a boolean between true and false.

**Interview practice**

- **Q: Why should state objects be replaced instead of mutated?** A: React compares state values and rendering relies on treating previous snapshots as unchanged; mutation can hide updates and create bugs.
- **Q: Why can two `setCount(count + 1)` calls produce only one increment?** A: Both expressions may use the same render snapshot. Two functional updates compose reliably.

## 14. useEffect and cleanup — 4 hours

**Reference:** [React API: `useEffect`](https://react.dev/reference/react/useEffect)

**What the tasks teach:** Effects synchronize UI with external systems such as `document.title`, network requests, timers, or browser events. Dependencies describe values used by the Effect; cleanup reverses its setup.

**Tasks and how to do them:**

1. Use `useEffect(() => { document.title = `Count ${count}`; }, [count])`.
2. Put a fetch in an Effect with `[]` when the URL is fixed; track loading/data/error, and cancel or ignore obsolete work during cleanup.
3. For a timer, return `() => clearInterval(id)`. For an event, remove the exact same handler you added.

**Key terms:** **Effect** — synchronization with an external system. **Dependency array** — reactive values that trigger resynchronization when changed. **Cleanup** — function that disconnects or undoes setup. **Strict Mode check** — an extra development setup/cleanup cycle that exposes incomplete cleanup.

**Interview practice**

- **Q: What is the difference between `[]` and no dependency argument?** A: `[]` means no changing dependencies; no argument reruns after every commit.
- **Q: Should every derived value be computed in an Effect?** A: No. If a value can be calculated during render from props/state, calculate it directly instead of duplicating it in state.

## 15. Context for shared theme — 3 hours

**Reference:** [React API: `useContext`](https://react.dev/reference/react/useContext)

**What the tasks teach:** Context makes a shared value available to descendants without threading props through every intermediate component. A provider can pair the value with an update function.

**Tasks and how to do them:**

1. Create a `ThemeContext` with a light/dark value and wrap the relevant tree with its Provider.
2. In a nested component, call `useContext(ThemeContext)` and choose a class or style for the selected theme.
3. Keep `theme` in Provider state and pass a `toggleTheme` callback so one button updates every consumer.

**Key terms:** **Context** — a channel for a value in a component subtree. **Provider** — supplies a context value to descendants. **Consumer** — component reading the value. **Prop drilling** — passing data through components that do not use it themselves.

**Interview practice**

- **Q: Does Context make a value global to every React app?** A: No. It is scoped to descendants of a matching Provider.
- **Q: Should all application state go into Context?** A: No. Keep local state local; Context is useful for values many parts of a subtree need.

## 16. Custom Hooks — 4 hours

**Reference:** [React: Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

**What the tasks teach:** A custom Hook extracts reusable stateful logic. It does not create shared state between callers by itself; each caller owns a Hook instance.

**Tasks and how to do them:**

1. Move the loading/data/error/fetch Effect into `useFetch<T>(url)` and return those three pieces of state. Abort the request in cleanup.
2. Implement `useLocalStorage(key, initialValue)` with a safe lazy initializer and persist future state changes.
3. Implement `useWindowSize()` with a resize listener and return `{ width, height }`; remove the listener in cleanup.

**Key terms:** **Custom Hook** — function beginning with `use` that can call React Hooks. **Reuse** — sharing logic while each caller retains independent state. **Browser storage** — persistent key/value storage such as localStorage. **Subscription** — registration to receive future external events.

**Interview practice**

- **Q: Why must a custom Hook name start with `use`?** A: The naming convention lets React tooling identify Hook usage and enforce the Rules of Hooks.
- **Q: Does `useLocalStorage` automatically share the same React state between components?** A: No. Each Hook call has its own React state; coordinating live changes across components needs a shared owner such as Context.

## 17. Declarative routing — 3 hours

**Reference:** [React Router: Declarative Routing](https://reactrouter.com/start/declarative/routing)

**What the tasks teach:** Routes select page components from a URL. Links navigate within the client app, and route parameters carry changing values such as user IDs.

**Tasks and how to do them:**

1. Wrap the app in `BrowserRouter`; define `Routes` with `Route` children.
2. Create `/` and `/about` routes; use `<Link to="/about">About</Link>` for navigation.
3. Define `/users/:id`, then call `useParams()` inside the route component and display its `id`.

**Key terms:** **BrowserRouter** — router that uses browser history and the URL. **Route** — mapping between a path pattern and UI. **Link** — client-side navigation element. **Route parameter** — named dynamic path segment such as `:id`.

**Interview practice**

- **Q: Why use a router Link instead of an anchor for internal pages?** A: It navigates through the router without requesting a full new HTML document.
- **Q: What does `/users/:id` match?** A: A path such as `/users/42`; `useParams()` exposes the matched segment as `id`.

## 18. Tailwind CSS setup — 2 hours

**Reference:** [Tailwind CSS: Installation with Vite](https://tailwindcss.com/docs/installation/using-vite)

**What the tasks teach:** Tailwind scans source for utility class names and generates the CSS needed by the app. The project uses the current Tailwind 4 Vite plugin setup. The `tailwind.config.js` and three `@tailwind` directives from the prompt are the older Tailwind 3 workflow.

**Tasks and how to do them:**

1. Install `tailwindcss` and `@tailwindcss/vite`; add `tailwindcss()` to `vite.config.ts`.
2. Add `@import "tailwindcss";` to the main CSS file. To see the older setup as copyable code, open `examples/tailwind-v3/tailwind.config.cjs` and `examples/tailwind-v3/input.css`; those files are intentionally not connected to this Tailwind 4 app.
3. Put `text-red-500` on a visible element and start Vite; verify the utility appears in the browser.

**Key terms:** **Utility class** — one small styling rule encoded in a class. **Vite plugin** — hooks Tailwind into Vite’s build pipeline. **Source scanning** — finding used utility names in project files. **Generated CSS** — output styles compiled from the utilities used.

**Interview practice**

- **Q: Does Tailwind add a large runtime styling engine to the page?** A: No. It generates static CSS during development/build from class names in source files.
- **Q: Which setup does this project use?** A: Tailwind 4’s Vite plugin and `@import "tailwindcss"`; the older config/directive approach is covered for migration knowledge.

## 19. Utility-first styling — 2 hours

**Reference:** [Tailwind CSS: Styling with Utility Classes](https://tailwindcss.com/docs/styling-with-utility-classes)

**What the tasks teach:** Compose a component’s styling with small class names. State variants like hover and focus add interaction feedback; typography utilities establish readable hierarchy.

**Tasks and how to do them:**

1. Use classes such as `bg-indigo-600 text-white px-4 py-2 rounded-lg` on a button.
2. Add `hover:bg-blue-700` and a visible keyboard focus style such as `focus-visible:outline-2`.
3. Combine `font-sans text-lg font-semibold text-center` and compare the visual result.

**Key terms:** **Utility-first** — composing styles from small classes. **Variant** — conditionally applied utility for a state or breakpoint. **Focus-visible** — keyboard-oriented focus styling. **Typography utility** — class controlling font family, size, weight, or alignment.

**Interview practice**

- **Q: How do you keep focus styling accessible?** A: Ensure keyboard focus is clearly visible and do not remove outlines without an equivalent indicator.
- **Q: Why use a design system for utility values?** A: Consistent colors, spacing, and type create predictable interfaces and make changes easier to maintain.

## 20. Flexbox and Grid — 3 hours

**Reference:** [Tailwind CSS: Flex](https://tailwindcss.com/docs/flex)

**What the tasks teach:** Flexbox is useful for one-dimensional alignment such as a navigation row. Grid is useful for two-dimensional layouts such as an image gallery.

**Tasks and how to do them:**

1. Make a container `flex items-center justify-center gap-4` and observe cross-axis versus main-axis alignment.
2. Build a navigation bar with a brand and links; use `flex items-center justify-between`.
3. Use `grid grid-cols-3 gap-4` for three gallery columns; change to fewer columns on small screens.

**Key terms:** **Flex container** — parent with `display: flex`. **Main axis** — axis selected by flex direction. **Cross axis** — perpendicular flex axis. **Grid tracks** — rows/columns created by CSS Grid.

**Interview practice**

- **Q: What do `justify-*` and `items-*` usually control in a row flex container?** A: `justify-*` aligns along the horizontal main axis; `items-*` aligns along the vertical cross axis.
- **Q: Why choose Grid for a gallery?** A: Grid coordinates both rows and columns, making repeated two-dimensional placement natural.

## 21. Responsive design — 2 hours

**Reference:** [Tailwind CSS: Responsive Design](https://tailwindcss.com/docs/responsive-design)

**What the tasks teach:** Start with a mobile-friendly base layout and add breakpoint variants when the available space changes. Check the result at several widths, not only on one desktop monitor.

**Tasks and how to do them:**

1. Use `bg-slate-100 sm:bg-blue-100 md:bg-violet-100 lg:bg-emerald-100` to observe responsive backgrounds.
2. Start with `grid grid-cols-1 md:grid-cols-2` to stack columns on mobile and place them side by side on wider screens.
3. Use `hidden md:block` to hide an item below the medium breakpoint and show it above it.

**Key terms:** **Responsive design** — layout adapting to device/view width. **Breakpoint** — width threshold at which a variant applies. **Mobile-first** — base styles target narrow screens, then larger breakpoints add changes. **`md:` variant** — utility active at the configured medium breakpoint and above.

**Interview practice**

- **Q: Are Tailwind breakpoints mobile-first or desktop-first?** A: Mobile-first; unprefixed classes are the base and prefixed classes apply from a breakpoint upward.
- **Q: How can you test a responsive layout?** A: Resize the browser or use device emulation and inspect narrow, medium, and wide viewport sizes.

## 22. TypeScript with React — 3 hours

**Reference:** [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

**What the tasks teach:** Types can describe component props, state collections, and event objects. Inference handles many values, while explicit types help at component boundaries and complex state.

**Tasks and how to do them:**

1. Declare `interface GreetingProps { name: string }`, then type `function Greeting({ name }: GreetingProps)`.
2. Use `const [users, setUsers] = useState<User[]>([])` so the empty initial array still has a useful element type.
3. Annotate an input event as `React.ChangeEvent<HTMLInputElement>` when a named handler needs an explicit event type.

**Key terms:** **Props interface** — contract for component inputs. **Generic** — type parameter such as `User[]` supplied to a reusable API. **Event type** — TypeScript description of the browser/React event. **Type inference** — compiler-derived type.

**Interview practice**

- **Q: Why type an initially empty state array?** A: Without context, TypeScript cannot infer which object shape will be added later; `User[]` documents and checks the element contract.
- **Q: Is `React.FC` required to type a function component?** A: No. Typing the props parameter directly is common and keeps the component signature explicit.

## 23. API loading and error UI — 3 hours

**Reference:** [React: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)

**What the tasks teach:** A request UI should describe its current lifecycle instead of leaving a blank region. It should also guard against failed or obsolete requests.

**Tasks and how to do them:**

1. Request a user list, convert JSON, and map the records to keyed components.
2. Start with `loading = true`; show a spinner or status while awaiting the request, then switch to success.
3. Catch request/HTTP errors and display a plain-language error. Abort the request or ignore results during cleanup.

**Key terms:** **Loading state** — request is still pending. **Error state** — request could not provide usable data. **AbortController** — browser API that cancels supported requests. **Race condition** — older request resolves after a newer request and overwrites its result.

**Interview practice**

- **Q: What states should a simple fetch UI model?** A: Pending/loading, successful data, and failure; an empty successful result may deserve its own message too.
- **Q: Why cancel or ignore a request in cleanup?** A: It prevents updates from obsolete work after the component unmounts or its request inputs change.

## 24. Reducer and Context cart — 4 hours

**Reference:** [React: Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)

**What the tasks teach:** A reducer collects related state transitions in one pure function. Components dispatch actions describing what happened, and Context makes the shared cart available to descendants.

**Tasks and how to do them:**

1. Model cart state as an array and replace scattered setters with `useReducer(cartReducer, initialCart)`.
2. Define discriminated actions such as `{ type: "add", product }` and `{ type: "remove", id }`; return a new array from each reducer case.
3. Put `{ cart, dispatch }` in Context and wrap the parts of the app that need it in a Provider.

**Key terms:** **Reducer** — pure `(state, action) => nextState` function. **Action** — object describing an event/change request. **Dispatch** — function that sends an action to the reducer. **Pure function** — same inputs produce same output without changing external state.

**Interview practice**

- **Q: Should a reducer perform network requests or mutate its current state?** A: No. Keep it pure and immutable; perform side effects in event handlers or an appropriate external layer.
- **Q: Why combine Context with a reducer?** A: The reducer defines transitions and Context shares the resulting state/dispatch to many descendants.

## 25. Performance patterns — 3 hours

**Reference:** [React: Optimizing Performance](https://react.dev/learn/optimizing-performance)

**What the tasks teach:** Memoization may skip recalculating or re-rendering work when inputs are unchanged. Profile first and use it where the saved work matters; memoization adds complexity and is not a correctness requirement.

**Tasks and how to do them:**

1. Wrap a child in `memo(Child)` and keep its props unchanged while updating unrelated parent state.
2. Wrap an expensive calculation in `useMemo(() => calculate(input), [input])`.
3. Use `useCallback(() => doSomething(id), [id])` when a function prop would otherwise change identity on every parent render.

**Key terms:** **Render** — component function computes UI. **Memoization** — reuse of a prior result for equivalent inputs. **Referential equality** — whether two values/functions are the same object identity. **Profiler** — tool for measuring render costs.

**Interview practice**

- **Q: Does `useMemo` make the calculation correct?** A: No. It is an optimization; code should remain correct if React recomputes the value.
- **Q: When can `memo` still allow a child to render?** A: When its props change, its own state changes, or context it reads changes.

## 26. Component testing — 4 hours

**Reference:** [React: Testing](https://react.dev/learn/testing)

**What the tasks teach:** Component tests render real UI and interact through user-visible controls. This Vite project uses Vitest, whose test API is Jest-style, with React Testing Library. The same `render`, `screen`, and `userEvent` approach can be used with Jest.

**Tasks and how to do them:**

1. Render a component and assert an accessible heading or button with `screen.getByRole(...)`.
2. Use `userEvent.setup()` and `await user.click(button)`; assert the result a user sees, not an implementation detail.
3. Mock `fetch` with a predictable JSON response; render the API UI and assert the loading result changes to the expected user.

**Key terms:** **React Testing Library** — helpers for rendering and querying UI. **Accessible query** — query based on role/name users and assistive technology use. **Mock** — controlled substitute for an external dependency. **Assertion** — statement checked by a test.

**Interview practice**

- **Q: What is the benefit of testing through `getByRole`?** A: It encourages accessible UI and tests controls the way users identify them.
- **Q: Why mock a network request?** A: Tests become repeatable and fast; they do not depend on the public API or an internet connection.

## 27. Tic-Tac-Toe capstone — 6 hours

**Reference:** [React Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe)

**What the tasks teach:** A small game combines components, props, state, lists, derived values, and CSS. Keeping move history makes state snapshots tangible and lets you revisit earlier turns.

**Tasks and how to do them:**

1. Plan `Game`, `Board`, and `Square` components. Keep the board state in the component that coordinates the game.
2. On a square click, ignore occupied squares, place the current mark in a copied board, alternate the player, and check the eight winning lines. Show draw when the board is full and no winner exists.
3. Store each board in a history array, render a keyed list of move buttons, and set the selected move index when one is clicked. Style the three-by-three board and responsive surrounding layout.

**Key terms:** **Derived value** — computed from source state, such as the winner from the board. **History snapshot** — saved state at a point in time. **Immutable move** — new board array with one square changed. **Capstone** — final project that combines lessons from earlier modules.

**Interview practice**

- **Q: Why copy the board before changing a square?** A: It preserves old history snapshots and gives React a new state reference to render.
- **Q: Why calculate the winner from the board instead of keeping separate winner state?** A: The board is the source of truth; deriving the winner avoids storing a second value that can become inconsistent.

---

## Final review checklist

- Explain the difference between browser DOM updates and React state updates.
- Build and type-check a small component without copying it from the guide.
- Handle a form, a list, a failed request, and an Effect cleanup.
- Explain why keys, immutable updates, and stable dependencies matter.
- Describe when you would use local state, Context, or a reducer.
- Run the component tests and explain what each test protects.
- Finish a Tic-Tac-Toe game with winner, draw, and move-history behavior.

If you can complete those steps and explain your choices, you have moved beyond memorizing syntax: you can build and reason about a small frontend application.
