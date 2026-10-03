import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return <div className="page-wrap not-found"><span>404</span><h1>That lesson has wandered off.</h1><p>Choose a lesson from the curriculum and keep moving forward.</p><Link className="button button-primary" to="/curriculum">Browse the curriculum →</Link></div>;
}
