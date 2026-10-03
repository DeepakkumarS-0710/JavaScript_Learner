import { Link } from 'react-router-dom';
import type { Lesson } from '../data/curriculum';

const icons: Record<string, string> = {
  JavaScript: 'JS', TypeScript: 'TS', 'React basics': '⚛', 'React state': '◉', 'Routing & styling': '✳', 'Advanced practice': '⌘',
};

export function LessonCard({ lesson, done }: { lesson: Lesson; done: boolean }) {
  return (
    <Link to={`/lessons/${lesson.slug}`} className={`lesson-card ${done ? 'is-done' : ''}`}>
      <div className={`lesson-icon track-${lesson.track.toLowerCase().replaceAll(/[^a-z]+/g, '-')}`}>{icons[lesson.track] ?? '✦'}</div>
      <div className="lesson-copy"><div className="lesson-topline"><span>{lesson.track}</span><span>{lesson.hours} hr</span></div><h3>{lesson.title}</h3><p>{lesson.summary}</p>
        <div className="lesson-card-bottom"><span>{done ? '✓ Completed' : 'View lesson'} <span aria-hidden="true">→</span></span><span className="task-count">3 tasks</span></div>
      </div>
    </Link>
  );
}
