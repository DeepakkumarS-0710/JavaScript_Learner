import { Link, useParams } from 'react-router-dom';
import { lessons } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';

export function LessonPage() {
  const { slug } = useParams();
  const lesson = lessons.find((item) => item.slug === slug);
  const { completed, toggleCompleted } = useProgress();
  if (!lesson) return <div className="page-wrap"><Link className="text-link" to="/curriculum">← Back to curriculum</Link><h1>Lesson not found</h1></div>;
  const done = completed.includes(lesson.slug);
  return <div className="page-wrap lesson-detail"><header className="topbar"><div><Link className="back-link" to="/curriculum">← All lessons</Link><span className="breadcrumb">{lesson.track.toUpperCase()} <span>/</span> LESSON</span><h1>{lesson.title}</h1><p>{lesson.summary}</p></div><span className="duration-badge">◷ &nbsp;{lesson.hours} focused hours</span></header>
    <div className="lesson-layout"><article className="lesson-main"><section className="content-card"><span className="section-kicker">WHAT YOU WILL BUILD</span><h2>Three practical tasks</h2><p className="muted-copy">Complete these in order. The study guide in your project folder walks through each one step by step.</p><ol className="task-list">{lesson.tasks.map((task, index) => <li key={task}><span className="task-index">0{index + 1}</span><div><strong>{task}</strong><p>Implement this in the matching lab or add a small example of your own. Explain the result out loud as you work.</p></div></li>)}</ol><button className={`button ${done ? 'button-success' : 'button-primary'} completion-button`} onClick={() => toggleCompleted(lesson.slug)}>{done ? '✓ Marked complete' : 'Mark lesson complete'}</button></section>
      <section className="content-card"><span className="section-kicker">KEY IDEA</span><h2>What this lesson is about</h2><p>{lesson.definition}</p><div className="keyword-wrap">{lesson.keywords.map((keyword) => <span className="keyword" key={keyword}>{keyword}</span>)}</div></section>
      <section className="content-card interview-card"><span className="section-kicker">INTERVIEW PRACTICE</span><h2>{lesson.interview.question}</h2><p>{lesson.interview.answer}</p><button className="button button-outline" onClick={() => window.print()}>Print this lesson</button></section>
    </article><aside className="lesson-aside"><div className="content-card"><span className="section-kicker">REFERENCE</span><h3>Read the official docs</h3><p className="muted-copy">Use the original documentation for deeper examples and edge cases.</p><a className="reference-link" href={lesson.reference} target="_blank" rel="noreferrer">Open reference <span>↗</span></a></div><div className="content-card next-card"><span className="section-kicker">TRY IT NOW</span><h3>Open the practice lab</h3><p className="muted-copy">The interactive examples are ready to explore in your browser.</p><Link className="button button-primary button-full" to="/practice">Go to practice <span>→</span></Link></div></aside></div>
    <footer className="footer"><span>Frontend Learning Lab</span><span>Lesson {lessons.findIndex((item) => item.slug === lesson.slug) + 1} of {lessons.length}</span></footer>
  </div>;
}
