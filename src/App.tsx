import { AboutPage } from './pages/AboutPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { DatabasePage } from './pages/DatabasePage';
import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';

const sections = [
  { id: 'home', title: 'Home', component: <HomePage /> },
  { id: 'about', title: 'About', component: <AboutPage /> },
  { id: 'collections', title: 'Regional Collections', component: <CollectionsPage /> },
  { id: 'library', title: 'Learning Library', component: <LibraryPage /> },
  { id: 'database', title: 'Database', component: <DatabasePage /> }
];

export function App() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">A Living Record</p>
          <h1>Riwaya Archives</h1>
        </div>
        <nav>
          {sections.map((section) => (
            <a key={section.id} className="nav-link" href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>
      </header>
      <main>
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="page-anchor">
            {section.component}
          </section>
        ))}
      </main>
      <footer className="footer">Engage in record. Participate in preservation.</footer>
    </div>
  );
}
