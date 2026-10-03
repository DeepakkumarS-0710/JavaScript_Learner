import { Link } from 'react-router-dom';
import { LessonCard } from '../components/LessonCard';
import { lessons, estimatedHours, tracks } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';

export function HomePage() {
  const { completed } = useProgress();
  const firstLesson = lessons.find((lesson) => !completed.includes(lesson.slug)) ?? lessons[0];
  const featured = lessons.filter((lesson) => ['javascript', 'react-start', 'use-state'].includes(lesson.slug));
  const progress = Math.round((completed.length / lessons.length) * 100);

  return (
    <div className="page-wrap">
      <header className="topbar"><div><span className="breadcrumb">LEARNING PATH <span>/</span> OVERVIEW</span><h1>Good to see you, learner <span className="wave">✦</span></h1><p>Build your frontend skills one hands-on lesson at a time.</p></div><div className="topbar-actions"><a className="text-link" href="/STUDY_GUIDE.md" target="_blank" rel="noreferrer">Study guide ↗</a><Link className="button button-primary" to="/curriculum">Browse curriculum <span>→</span></Link></div></header>
      <section className="hero-card">
        <div className="hero-content"><div className="eyebrow"><span className="eyebrow-dot" /> YOUR LEARNING PATH</div><h2>From JavaScript basics<br />to a complete React app.</h2><p>27 focused lessons. Real examples. One capstone to bring it all together.</p><div className="hero-actions"><Link className="button button-white" to={`/lessons/${firstLesson.slug}`}>{completed.length ? 'Continue learning' : 'Start learning'} <span>→</span></Link><span className="hero-time">◷ &nbsp;About {estimatedHours} focused hours</span></div></div>
        <div className="hero-visual" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-code"><span className="code-muted">01</span> <b>const</b> ideas = <i>"UI"</i>;<br /><span className="code-muted">02</span> <b>function</b> <em>build</em>() {'{'}<br /><span className="code-muted">03</span> &nbsp;&nbsp;<b>return</b> <strong>progress</strong>;<br /><span className="code-muted">04</span> {'}'}</div><div className="float-chip chip-js">JS</div><div className="float-chip chip-react">⚛ React</div><div className="float-chip chip-check">✓ &nbsp; In progress</div></div>
        <div className="hero-dots">•••</div>
      </section>
      <section className="stats-grid" aria-label="Learning statistics">
        <div className="stat-card"><span className="stat-icon purple">▤</span><div><small>Lessons</small><strong>{lessons.length}</strong><span>across {tracks.length} learning tracks</span></div></div>
        <div className="stat-card"><span className="stat-icon green">✓</span><div><small>Completed</small><strong>{completed.length} <em>/ {lessons.length}</em></strong><span>lessons checked off</span></div></div>
        <div className="stat-card"><span className="stat-icon orange">◷</span><div><small>Learning time</small><strong>{estimatedHours}<em> hrs</em></strong><span>estimated focused study</span></div></div>
        <div className="stat-card"><span className="stat-icon blue">↗</span><div><small>Course progress</small><strong>{progress}<em>%</em></strong><span>keep your momentum going</span></div></div>
      </section>
      <section className="section-heading"><div><span className="section-kicker">A CLEAR PATH FORWARD</span><h2>Learning tracks</h2><p>Work through each track in order, then use the practice lab to apply what you learned.</p></div><Link className="text-link" to="/curriculum">View all 27 lessons <span>→</span></Link></section>
      <section className="track-grid">
        {tracks.map((track, index) => <Link className="track-card" to="/curriculum" key={track}><span className={`track-number n-${index + 1}`}>0{index + 1}</span><div><strong>{track}</strong><small>{lessons.filter((lesson) => lesson.track === track).length} lessons</small></div><span className="track-arrow">↗</span></Link>)}
      </section>
      <section className="section-heading featured-heading"><div><span className="section-kicker">PICK UP WHERE YOU LEFT OFF</span><h2>Popular starting points</h2></div><Link className="text-link" to="/practice">Go to practice lab <span>→</span></Link></section>
      <section className="lesson-grid">{featured.map((lesson) => <LessonCard key={lesson.slug} lesson={lesson} done={completed.includes(lesson.slug)} />)}</section>
      <section className="bottom-callout"><div className="callout-mark">✦</div><div><strong>Learn by building, not just reading.</strong><p>Every lesson has three practical tasks and key ideas to review.</p></div><Link className="button button-outline" to="/practice">Explore practice lab <span>→</span></Link></section>
      <footer className="footer"><span>Frontend Learning Lab</span><span>Learn at your own pace · React + TypeScript</span></footer>
    </div>
  );
}
