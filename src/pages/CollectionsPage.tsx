import { Section } from '../components/Section';

const collections = [
  {
    name: 'Sudan',
    copy: 'From ancient kingdoms to modern conflict, Sudan reveals how power shapes what is preserved and what is lost.',
    focus: [
      'Regional historical overview',
      'Cultural and social history',
      'Archival materials and documentation',
      'Access to the Sudan collection in the database'
    ]
  },
  {
    name: 'Palestine',
    copy: 'Palestinian memory is preserved through oral testimony, cultural practice, and community knowledge across generations.',
    focus: [
      'Historical context and timelines',
      'Cultural heritage and expression',
      'Archival materials and documentation',
      'Access to the Palestine collection in the database'
    ]
  }
];

export function CollectionsPage() {
  return (
    <Section title="Regional Collections" subtitle="Each place holds its own history. Each history speaks to another.">
      <p>
        Each collection is an entry point into regional history through archival material, oral testimony,
        cultural documentation, and contextual scholarship.
      </p>
      <div className="card-grid">
        {collections.map((item) => (
          <article className="card" key={item.name}>
            <h3>{item.name}</h3>
            <p>{item.copy}</p>
            <ul>
              {item.focus.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p>Additional collections will continue to expand the living archive.</p>
    </Section>
  );
}
