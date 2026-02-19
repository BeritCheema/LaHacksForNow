import { Section } from '../components/Section';
import { gallery, inspirationLinks } from '../data/content';

export function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="hero-kicker">A living record shaped by memory, community, and continuity.</p>
        <p>
          History does not disappear when archives do not exist. It moves through people, language, culture,
          and inheritance. Riwaya Archives preserves these living histories and connects them across places
          shaped by displacement, war, and archival loss.
        </p>
      </section>

      <Section title="Living Histories" subtitle="Memory persists beyond borders and beyond institutions.">
        <p>
          Through oral histories, archival research, and cultural documentation, the project examines how
          memory survives when institutions fail to preserve it. Communities find continuity, while students,
          scholars, and the public encounter knowledge grounded in lived experience.
        </p>
      </Section>

      <Section title="Visual Moodboard">
        <div className="gallery-grid">
          {gallery.map((image) => (
            <img key={image} src={image} alt="Riwaya archives moodboard" loading="lazy" />
          ))}
        </div>
      </Section>

      <Section title="Research and Design References">
        <ul>
          {inspirationLinks.map((link) => (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
