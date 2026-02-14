/**
 * Single source of truth for glossary terms.
 * Used by:
 * - rehype-glossary-tooltip plugin (build-time tooltips)
 * - Glossary pages
 * - Internal linking
 *
 * TODO: Replace with your domain's terminology
 */

export interface GlossaryTerm {
  slug: string;
  title: string;
  shortDefinition: string;
  /** Text variations to match (case-insensitive, word boundary) */
  matches: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // === EXAMPLE TERMS — Replace with your domain vocabulary ===
  {
    slug: 'seo',
    title: 'SEO',
    shortDefinition: 'Search Engine Optimization : ensemble de techniques pour ameliorer la visibilite d\'un site dans les moteurs de recherche.',
    matches: ['SEO', 'referencement naturel'],
  },
  {
    slug: 'cms',
    title: 'CMS',
    shortDefinition: 'Content Management System : logiciel qui permet de creer et gerer du contenu web sans coder.',
    matches: ['CMS'],
  },
  {
    slug: 'api',
    title: 'API',
    shortDefinition: 'Application Programming Interface : interface qui permet a deux logiciels de communiquer entre eux.',
    matches: ['API', 'APIs'],
  },
  {
    slug: 'responsive',
    title: 'Responsive Design',
    shortDefinition: 'Approche de conception web qui adapte automatiquement l\'affichage a la taille de l\'ecran.',
    matches: ['responsive', 'responsive design'],
  },
  {
    slug: 'framework',
    title: 'Framework',
    shortDefinition: 'Cadre de travail logiciel qui fournit une structure et des outils pour developper des applications.',
    matches: ['framework', 'frameworks'],
  },
];

// Pre-sorted by longest match first (for correct greedy matching)
GLOSSARY_TERMS.sort((a, b) => {
  const maxA = Math.max(...a.matches.map(m => m.length));
  const maxB = Math.max(...b.matches.map(m => m.length));
  return maxB - maxA;
});

/** Flat list of { match, slug } for autoLink compatibility */
export function getGlossaryMatchEntries(): Array<{ match: string; slug: string }> {
  const entries: Array<{ match: string; slug: string }> = [];
  for (const term of GLOSSARY_TERMS) {
    for (const m of term.matches) {
      entries.push({ match: m, slug: term.slug });
    }
  }
  entries.sort((a, b) => b.match.length - a.match.length);
  return entries;
}
