import { Section } from '../components/Section';

const recordTypes = ['Oral Testimony', 'Historical Documentation', 'Cultural Record', 'Community Knowledge'];

export function DatabasePage() {
  return (
    <Section title="Database" subtitle="A living record in preservation.">
      <p>
        The Riwaya Database houses preserved and stewarded materials, providing structured access to historical
        documentation, oral testimony, cultural material, and contextual records.
      </p>
      <h3>Scope of the Collection</h3>
      <ul>
        {recordTypes.map((type) => (
          <li key={type}>{type}</li>
        ))}
      </ul>
      <h3>Organization</h3>
      <p>Entries are cataloged by region, material type, theme, cultural context, and date/place where available.</p>
    </Section>
  );
}
