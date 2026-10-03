import { Link, useParams } from 'react-router-dom';

export function UserRoutePage() {
  const { id } = useParams();
  return <div className="page-wrap route-result"><Link className="back-link" to="/practice">← Back to practice lab</Link><div className="route-card"><span className="route-avatar">{id?.slice(0, 1) ?? '?'}</span><span className="section-kicker">DYNAMIC ROUTE · useParams()</span><h1>User profile {id}</h1><p>The router read <code>{id}</code> from the <code>/users/:id</code> URL segment and passed it to this component.</p><Link className="button button-primary" to="/users/42">Try another profile</Link></div></div>;
}
