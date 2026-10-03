import { useMemo, useState } from 'react';
import { LessonCard } from '../components/LessonCard';
import { lessons, tracks } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';

export function CurriculumPage() {
  const [activeTrack, setActiveTrack] = useState('All lessons');
  const [search, setSearch] = useState('');
  const { completed } = useProgress();
  const filtered = useMemo(() => lessons.filter((lesson) => (activeTrack === 'All lessons' || lesson.track === activeTrack)
    && `${lesson.title} ${lesson.summary} ${lesson.keywords.join(' ')}`.toLowerCase().includes(search.toLowerCase())), [activeTrack, search]);

  return <div className="page-wrap"><header className="topbar"><div><span className="breadcrumb">LEARNING PATH <span>/</span> CURRICULUM</span><h1>The full learning path</h1><p>27 lessons, from your first DOM selector to a complete React game.</p></div><label className="search-box"><span>⌕</span><input aria-label="Search lessons" placeholder="Search lessons" value={search} onChange={(event) => setSearch(event.target.value)} /></label></header>
    <div className="filter-row"><div className="filter-pills"><button className={activeTrack === 'All lessons' ? 'filter-pill selected' : 'filter-pill'} onClick={() => setActiveTrack('All lessons')}>All lessons <span>{lessons.length}</span></button>{tracks.map((track) => <button key={track} className={activeTrack === track ? 'filter-pill selected' : 'filter-pill'} onClick={() => setActiveTrack(track)}>{track}</button>)}</div><span className="results-count">{filtered.length} lessons</span></div>
    {filtered.length ? <div className="lesson-grid curriculum-grid">{filtered.map((lesson) => <LessonCard key={lesson.slug} lesson={lesson} done={completed.includes(lesson.slug)} />)}</div> : <div className="empty-state"><strong>No matching lessons</strong><p>Try another search or select a different learning track.</p></div>}
    <footer className="footer"><span>Progress is saved in this browser.</span><span>{completed.length} of {lessons.length} complete</span></footer>
  </div>;
}
