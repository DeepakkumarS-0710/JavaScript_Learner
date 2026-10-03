import { createContext, memo, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState, type Dispatch, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useFetch } from '../hooks/useFetch';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useWindowSize } from '../hooks/useWindowSize';

type Person = { id: number; name: string; email: string };

function LabSection({ id, number, title, description, children }: { id: string; number: string; title: string; description: string; children: ReactNode }) {
  return <section className="lab-section" id={id}><div className="lab-heading"><span className="lab-number">{number}</span><div><h2>{title}</h2><p>{description}</p></div></div><div className="lab-body">{children}</div></section>;
}

function VanillaDomLab() {
  const [message, setMessage] = useState('The DOM is the page as a tree of browser objects.');
  useEffect(() => {
    const button = document.getElementById('dom-alert-button');
    const output = document.querySelector<HTMLElement>('#dom-output');
    if (!button || !output) return;
    const showMessage = () => window.alert('Button event listener fired!');
    const changeMessage = () => {
      output.textContent = 'Selected with querySelector, updated with textContent.';
      output.style.color = '#155eef';
      output.style.backgroundColor = '#eef4ff';
      setMessage(output.textContent);
    };
    button.addEventListener('click', showMessage);
    document.getElementById('dom-change-button')?.addEventListener('click', changeMessage);
    return () => {
      button.removeEventListener('click', showMessage);
      document.getElementById('dom-change-button')?.removeEventListener('click', changeMessage);
    };
  }, []);

  return <div className="demo-box"><p id="dom-output" className="dom-output">{message}</p><div className="button-row"><button className="button button-outline" id="dom-change-button" type="button">Change text and style</button><button className="button button-primary" id="dom-alert-button" type="button">Try alert listener</button></div><p className="hint">This isolated vanilla JavaScript example uses <code>getElementById</code>, <code>querySelector</code>, <code>textContent</code>, and <code>addEventListener</code>. React examples below use state instead.</p></div>;
}

function JavaScriptBasicsLab() {
  const person = { name: 'Asha', role: 'Frontend learner' };
  const scores = [82, 96, 91] as const;
  const greet = (name: string) => `Welcome, ${name}!`;
  const { name, role } = person;
  const [firstScore, secondScore] = scores;
  return <div className="demo-box"><div className="code-result"><code>const greet = (name) =&gt; `{'Welcome, ${name}!'}`;</code><code>{greet(name)}</code><code>{name} · {role} · scores: {firstScore}, {secondScore}</code></div><p className="hint">Arrow function, template literal, and object/array destructuring.</p></div>;
}

function AsyncLab() {
  const [output, setOutput] = useState('Click to start a two-second Promise.');
  const [busy, setBusy] = useState(false);
  const runPromise = async () => {
    setBusy(true);
    setOutput('Promise is pending…');
    const message = await new Promise<string>((resolve) => window.setTimeout(() => resolve('Promise resolved after two seconds.'), 2000));
    setOutput(message);
    console.log(message);
    setBusy(false);
  };
  return <div className="demo-box inline-demo"><div><strong>{output}</strong><p className="hint">The resolved message is also sent to the console.</p></div><button disabled={busy} className="button button-primary" onClick={() => void runPromise()}>{busy ? 'Waiting…' : 'Run Promise'}</button></div>;
}

function CounterChild({ count, onIncrement }: { count: number; onIncrement: () => void }) {
  return <button className="button button-primary" onClick={onIncrement}>Child increments parent: {count}</button>;
}

const starterPeople: Person[] = [
  { id: 1, name: 'Mina Patel', email: 'mina@example.com' },
  { id: 2, name: 'Leo Chen', email: 'leo@example.com' },
];

export function ReactBasicsLab() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Learner');
  const [items, setItems] = useState(starterPeople);
  const nextId = useRef(3);
  const addPerson = () => {
    const id = nextId.current++;
    setItems((previous) => [...previous, { id, name: `New learner ${id}`, email: `learner${id}@example.com` }]);
  };
  return <div className="demo-box demo-stack"><div className="split-demo"><div><span className="demo-label">PROP + PARENT CALLBACK</span><p>Hello, <strong>{name}</strong>. This input is the parent’s state.</p><input className="text-input" value={name} onChange={(event) => setName(event.target.value)} aria-label="Your name" /><div className="spacer" /><CounterChild count={count} onIncrement={() => setCount((previous) => previous + 1)} /></div><div><span className="demo-label">KEYED LIST + ADD</span><ul className="compact-list">{items.map((person) => <li key={person.id}><span className="tiny-avatar">{person.name.slice(0, 1)}</span><span>{person.name}<small>{person.email}</small></span><span className="key-label">key {person.id}</span></li>)}</ul><button className="button button-outline" onClick={addPerson}>+ Add a keyed item</button></div></div><p className="hint">State updates use functional setters; the list uses stable IDs as React keys.</p></div>;
}

type FormValues = { name: string; email: string; subscribed: boolean; role: string };
function FormsLab() {
  const [values, setValues] = useState<FormValues>({ name: '', email: '', subscribed: false, role: 'learner' });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState('');
  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => setValues((previous) => ({ ...previous, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.name.trim()) { setError('Please enter your name before continuing.'); setSubmitted(''); return; }
    setError('');
    setSubmitted(`Saved profile for ${values.name} (${values.role}${values.subscribed ? ', subscribed' : ''}).`);
  };
  return <form className="demo-box form-demo" onSubmit={submit} noValidate><div className="form-grid"><label>Display name<input className="text-input" value={values.name} onChange={(event) => update('name', event.target.value)} placeholder="e.g. Sam" /></label><label>Email<input className="text-input" type="email" value={values.email} onChange={(event) => update('email', event.target.value)} placeholder="sam@example.com" /></label><label className="checkbox-row"><input type="checkbox" checked={values.subscribed} onChange={(event) => update('subscribed', event.target.checked)} /> Send me the weekly practice note</label><label>Learning level<select className="text-input" value={values.role} onChange={(event) => update('role', event.target.value)}><option value="learner">Learner</option><option value="reviewer">Reviewer</option><option value="mentor">Mentor</option></select></label></div><button className="button button-primary" type="submit">Save profile</button>{error && <p className="form-error" role="alert">{error}</p>}{submitted && <p className="form-success" role="status">{submitted}</p>}<p className="hint">Text, checkbox, and select values share one typed state object. Submit prevents default navigation.</p></form>;
}

function StateAndEffectsLab() {
  const [count, setCount] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [profile, setProfile] = useState({ name: 'Jordan', city: 'Pune' });
  const [seconds, setSeconds] = useState(0);
  useEffect(() => { document.title = `Practice counter: ${count}`; }, [count]);
  useEffect(() => {
    const interval = window.setInterval(() => setSeconds((previous) => previous + 1), 1000);
    return () => window.clearInterval(interval);
  }, []);
  return <div className="demo-box demo-stack"><div className="button-row"><button className="button button-primary" onClick={() => setCount((previous) => previous + 1)}>Functional update · {count}</button><button className={`toggle ${enabled ? 'on' : ''}`} role="switch" aria-checked={enabled} onClick={() => setEnabled((previous) => !previous)}><span />{enabled ? 'On' : 'Off'}</button><span className="small-note">Title updates with counter; interval runs for {seconds}s.</span></div><div className="inline-edit"><strong>Object state (copy, then edit):</strong><input className="text-input" value={profile.city} aria-label="City" onChange={(event) => setProfile((previous) => ({ ...previous, city: event.target.value }))} /><span>{profile.name} lives in {profile.city}.</span></div><p className="hint">The interval is cleared by the Effect cleanup when this component unmounts.</p></div>;
}

function ThemeLab() {
  const { theme, toggleTheme } = useTheme();
  return <div className="demo-box inline-demo"><div><span className="demo-label">VALUE READ DEEP IN THE TREE</span><strong className="theme-readout">{theme === 'light' ? '☀ Light theme' : '☾ Dark theme'}</strong><p className="hint">This nested child reads ThemeContext with useContext.</p></div><button className="button button-primary" onClick={toggleTheme}>Toggle provider theme</button></div>;
}

type User = { id: number; name: string; email: string };
export function ApiLab() {
  const { data, loading, error } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users?_limit=4');
  return <div className="demo-box">{loading && <div className="loading-row"><span className="spinner" />Loading sample users…</div>}{error && <div className="error-panel" role="alert">{error}</div>}{data && <div className="user-grid">{data.map((user) => <div className="user-chip" key={user.id}><span className="tiny-avatar">{user.name[0]}</span><span><strong>{user.name}</strong><small>{user.email}</small></span></div>)}</div>}<p className="hint">useFetch uses async/await, checks response.ok, reports loading/error states, and aborts the request during cleanup.</p></div>;
}

function BrowserHooksLab() {
  const [nickname, setNickname] = useLocalStorage('frontend-lab-nickname', 'Mina');
  const size = useWindowSize();
  return <div className="demo-box split-demo"><div><label className="field-label">Saved in localStorage<input className="text-input" value={nickname} onChange={(event) => setNickname(event.target.value)} /></label><p className="hint">Refresh the page: this value stays in this browser.</p></div><div className="size-card"><span className="demo-label">CURRENT WINDOW SIZE</span><strong>{size.width}<small> px wide</small></strong><span>{size.height} px tall</span><p className="hint">Resize to see the hook update.</p></div></div>;
}

type CartItem = { id: number; name: string; price: number };
type CartAction = { type: 'add'; item: CartItem } | { type: 'remove'; id: number };
function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'add': return [...state, action.item];
    case 'remove': return state.filter((item) => item.id !== action.id);
    default: return state;
  }
}
const CartContext = createContext<{ items: CartItem[]; dispatch: Dispatch<CartAction> } | null>(null);
function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, [{ id: 1, name: 'React notes', price: 12 }]);
  return <CartContext.Provider value={{ items, dispatch }}>{children}</CartContext.Provider>;
}
function CartContents() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('CartContents needs CartProvider.');
  const total = cart.items.reduce((sum, item) => sum + item.price, 0);
  return <div className="demo-box split-demo"><div><span className="demo-label">ACTIONS FLOW THROUGH A REDUCER</span><div className="button-row"><button className="button button-outline" onClick={() => cart.dispatch({ type: 'add', item: { id: Date.now(), name: 'TypeScript guide', price: 18 } })}>+ Add guide · $18</button>{cart.items.length > 0 && <button className="button button-quiet" onClick={() => cart.dispatch({ type: 'remove', id: cart.items[cart.items.length - 1].id })}>Remove last</button>}</div></div><div className="cart-summary"><strong>{cart.items.length} items</strong><span>{cart.items.map((item) => item.name).join(', ') || 'Your cart is empty'}</span><b>Total ${total}</b></div><p className="hint full-span">The reducer is local to this demo and its Provider shares state with nested cart UI.</p></div>;
}

const MemoChild = memo(function MemoChild({ onPing }: { onPing: () => void }) {
  const renders = useRef(0);
  renders.current += 1;
  return <button className="button button-outline" onClick={onPing}>Memo child · rendered {renders.current} times</button>;
});
function PerformanceLab() {
  const [unrelated, setUnrelated] = useState(0);
  const [limit, setLimit] = useState(15000);
  const [pings, setPings] = useState(0);
  const expensive = useMemo(() => {
    let total = 0;
    for (let value = 1; value <= limit; value += 1) total += Math.sqrt(value);
    return Math.round(total);
  }, [limit]);
  const handlePing = useCallback(() => setPings((previous) => previous + 1), []);
  return <div className="demo-box demo-stack"><div className="button-row"><button className="button button-outline" onClick={() => setUnrelated((value) => value + 1)}>Unrelated parent update · {unrelated}</button><MemoChild onPing={handlePing} /><span className="small-note">Pings: {pings}</span></div><label className="range-label">Calculation size: {limit.toLocaleString()}<input type="range" min="1000" max="30000" step="1000" value={limit} onChange={(event) => setLimit(Number(event.target.value))} /></label><p className="calc-result">Memoized result <strong>{expensive.toLocaleString()}</strong></p><p className="hint">useMemo caches the calculation; useCallback stabilizes the callback passed to a memoized child. Measure before optimizing a real app.</p></div>;
}

function calculateWinner(squares: Array<string | null>) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (const [a, b, c] of lines) if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
  return null;
}
function TicTacToeLab() {
  const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const squares = history[step];
  const winner = calculateWinner(squares);
  const next = step % 2 === 0 ? 'X' : 'O';
  const status = winner ? `Winner: ${winner}` : squares.every(Boolean) ? 'A draw. Nice game!' : `Next player: ${next}`;
  const play = (index: number) => {
    if (squares[index] || winner) return;
    const updated = [...squares];
    updated[index] = next;
    const nextHistory = [...history.slice(0, step + 1), updated];
    setHistory(nextHistory);
    setStep(nextHistory.length - 1);
  };
  return <div className="demo-box game-layout"><div><div className="game-status"><span className="status-indicator" />{status}</div><div className="game-board" role="grid" aria-label="Tic-Tac-Toe board">{squares.map((square, index) => <button role="gridcell" aria-label={`Square ${index + 1}${square ? ` ${square}` : ''}`} className={`game-square ${square === 'X' ? 'square-x' : square === 'O' ? 'square-o' : ''}`} key={index} onClick={() => play(index)}>{square}</button>)}</div><button className="button button-outline" onClick={() => { setHistory([Array(9).fill(null)]); setStep(0); }}>Start new game</button></div><div className="history-panel"><span className="demo-label">MOVE HISTORY</span>{history.map((_, index) => <button key={index} className={index === step ? 'history-item current' : 'history-item'} onClick={() => setStep(index)}>{index === 0 ? 'Go to game start' : `Go to move #${index}`}<span>→</span></button>)}<p className="hint">Each move stores an immutable board snapshot. The winner is derived from the selected board.</p></div></div>;
}

function UtilityLayoutLab() {
  return (
    <div className="demo-box utility-demo">
      <div className="utility-toolbar">
        <span className="demo-label">TAILWIND 4 UTILITY PREVIEW</span>
        <button className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2">hover / focus me</button>
      </div>
      <div className="utility-nav flex items-center justify-between">
        <strong>Studio</strong>
        <nav><a href="#practice">Learn</a><a href="#practice">Build</a><a href="#practice">Review</a></nav>
        <span className="small-note">flex · justify-between · items-center</span>
      </div>
      <div className="centered-demo flex items-center justify-center"><span>Flexbox centers this item on both axes.</span></div>
      <div className="gallery-grid grid grid-cols-3"><div className="gallery-tile tile-purple">Grid 01</div><div className="gallery-tile tile-blue">Grid 02</div><div className="gallery-tile tile-green">Grid 03</div></div>
      <p className="font-sans text-lg font-semibold text-center">Typography utilities set this sentence.</p>
      <div className="responsive-preview">
        <div>Mobile: stacked columns</div><div>Desktop: side-by-side</div>
        <span>hidden on small screens → visible from md</span><span className="md:hidden"> · mobile label</span><span className="hidden md:block"> · desktop label</span>
      </div>
      <div className="responsive-columns grid grid-cols-1 md:grid-cols-2"><div>Column A · mobile stack</div><div>Column B · md side-by-side</div></div>
      <div className="responsive-colors bg-slate-100 sm:bg-blue-100 md:bg-violet-100 lg:bg-emerald-100">Background changes at sm, md, and lg.</div>
      <p className="hint">This project uses Tailwind 4’s Vite plugin and CSS layout examples. The guide includes the older Tailwind 3 setup so you can recognize it.</p>
    </div>
  );
}

export function PracticePage() {
  const [consoleMessage, setConsoleMessage] = useState('Ready for your first click.');
  const logMessage = () => { const text = 'React onClick handler ran.'; console.log(text); setConsoleMessage(text); };
  return <div className="page-wrap practice-page"><header className="topbar"><div><span className="breadcrumb">LEARNING PATH <span>/</span> PRACTICE LAB</span><h1>Try it, change it, learn it.</h1><p>Working examples for the core ideas in your curriculum. Open the code as you study each section.</p></div><Link className="button button-outline" to="/curriculum">View curriculum <span>→</span></Link></header>
    <div className="practice-intro"><span className="practice-spark">✦</span><div><strong>A note about the examples</strong><p>The DOM section intentionally demonstrates direct browser APIs. In normal React UI, update state and let React render the screen.</p></div></div>
    <div className="practice-columns"><div>
      <LabSection id="dom-lab" number="01" title="DOM & JavaScript" description="Selectors, events, modern syntax, and asynchronous work."><div className="stacked-demos"><VanillaDomLab /><JavaScriptBasicsLab /><AsyncLab /></div></LabSection>
      <LabSection id="react-lab" number="02" title="React fundamentals" description="Props, callbacks, state, lists, and controlled forms."><div className="stacked-demos"><ReactBasicsLab /><FormsLab /></div></LabSection>
      <LabSection id="state-lab" number="03" title="State, Effects & Context" description="Immutable updates, cleanup, shared values, and reusable Hooks."><div className="stacked-demos"><StateAndEffectsLab /><ThemeLab /><BrowserHooksLab /></div></LabSection>
      <LabSection id="api-lab" number="04" title="Fetch & async UI" description="A real request with loading, error, success, and cleanup states."><ApiLab /></LabSection>
      <LabSection id="routing-lab" number="05" title="Routing & Tailwind" description="Navigate between pages and inspect a route parameter in the URL."><div className="demo-box routing-demo"><div><span className="demo-label">DYNAMIC ROUTE</span><strong>/users/:id</strong><p className="hint">Visit one of these examples to read the id with useParams:</p></div><div className="button-row"><Link className="button button-outline" to="/users/42">User 42</Link><Link className="button button-outline" to="/users/105">User 105</Link></div><div className="full-span"><UtilityLayoutLab /></div></div></LabSection>
      <LabSection id="reducer-lab" number="06" title="Reducer & shared cart" description="Dispatch add/remove actions and share reducer state with Context."><CartProvider><CartContents /></CartProvider></LabSection>
      <LabSection id="performance-lab" number="07" title="Performance patterns" description="See memoization tools in a small interactive example."><PerformanceLab /></LabSection>
      <LabSection id="game-lab" number="08" title="Capstone: Tic-Tac-Toe" description="Play a game, inspect the winner logic, and jump through move history."><TicTacToeLab /></LabSection>
      <LabSection id="testing-lab" number="09" title="Testing checklist" description="The sample tests live in src/test and use Vitest with React Testing Library."><div className="demo-box testing-demo"><div className="test-icon">✓</div><div><strong>Test what a learner can see and do.</strong><p>Render a component, find its control by accessible name, click it with userEvent, then assert the visible result. The test folder also includes a mocked fetch response example.</p></div><Link className="button button-outline" to="/lessons/testing">Read testing tasks</Link></div></LabSection>
      <div className="console-note"><span>↳</span><div><strong>Event handler output</strong><small>{consoleMessage}</small></div><button onClick={logMessage} className="button button-quiet">Run onClick example</button></div>
    </div><aside className="practice-aside"><div className="sticky-card"><span className="section-kicker">ON THIS PAGE</span><nav>{[['dom-lab','DOM & JavaScript'],['react-lab','React fundamentals'],['state-lab','State & Hooks'],['api-lab','Fetch & async'],['routing-lab','Routing & Tailwind'],['reducer-lab','Reducer & cart'],['performance-lab','Performance'],['game-lab','Tic-Tac-Toe'],['testing-lab','Testing']].map(([id,label])=><a key={id} href={`#${id}`}>{label}<span>→</span></a>)}</nav><div className="aside-tip"><strong>Make it yours</strong><p>Try changing a value, adding an item, or resizing the window. Then explain what changed and why.</p></div><a href="/STUDY_GUIDE.md" target="_blank" rel="noreferrer" className="guide-link">Open the full study guide ↗</a></div></aside></div>
    <footer className="footer"><span>Hands-on practice</span><span>Try each example before reading its explanation</span></footer>
  </div>;
}
