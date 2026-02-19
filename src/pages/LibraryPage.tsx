import { Section } from '../components/Section';

const themes = [
  'Sudan: Nile Valley civilizations, Islamic thought, colonial governance, diaspora and memory',
  'Palestine: social and political history, land and exile, cultural and intellectual life',
  'Archival and public history foundations: archives and power, oral history, decolonial methods'
];

export function LibraryPage() {
  return (
    <Section title="Learning Library" subtitle="A living record in scholarship.">
      <p>
        The Riwaya Learning Library brings together books and texts that support historical understanding,
        archival interpretation, and cultural knowledge across the regions represented in the archive.
      </p>
      <ul>
        {themes.map((theme) => (
          <li key={theme}>{theme}</li>
        ))}
      </ul>
      <p>
        This list is a working scholarly resource for students, researchers, educators, and community members.
      </p>
    </Section>
  );
}
