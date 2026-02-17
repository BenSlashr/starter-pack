/**
 * Programmatic internal linking system.
 * Returns contextual cross-link groups based on the current page's branch/category.
 *
 * Usage in a page:
 *   import { getLinksForGuide } from '@/data/internal-links';
 *   const crossLinks = getLinksForGuide(entry.data.branch);
 *   <CrossLinks groups={crossLinks} />
 */

export interface InternalLink {
  href: string;
  label: string;
}

export interface LinkGroup {
  title: string;
  links: InternalLink[];
}

// ── Static link pools ────────────────────────────────────────
// TODO: Update these as you add content to your site

const GLOSSARY_LINKS: InternalLink[] = [
  { href: '/glossaire', label: 'Tous les termes' },
  // TODO: Add your most important glossary terms
  // { href: '/glossaire/seo', label: 'SEO' },
];

const TOOLS_LINKS: InternalLink[] = [
  { href: '/outils', label: 'Tous les outils' },
  // TODO: Add links to your specific tools
];

const GUIDE_LINKS: InternalLink[] = [
  { href: '/guides', label: 'Tous les guides' },
  // TODO: Add links to your most popular guides
  // { href: '/guides/getting-started', label: 'Bien demarrer' },
];

const REVIEW_LINKS: InternalLink[] = [
  { href: '/avis', label: 'Tous les avis' },
  // TODO: Add links to your most popular reviews
];

const COMPARISON_LINKS: InternalLink[] = [
  { href: '/comparer', label: 'Tous les comparatifs' },
  // TODO: Add links to your most popular comparisons
];

// ── Branch-specific overrides ────────────────────────────────
// Map branch names to extra relevant links
// TODO: Customize per branch as your content grows

const BRANCH_LINKS: Record<string, InternalLink[]> = {
  // Example:
  // 'getting-started': [
  //   { href: '/guides/getting-started/first-steps', label: 'Premiers pas' },
  // ],
};

// ── Public API ───────────────────────────────────────────────

/**
 * Returns cross-link groups for a guide article based on its branch.
 */
export function getLinksForGuide(branch?: string): LinkGroup[] {
  const groups: LinkGroup[] = [
    { title: 'Guides', links: GUIDE_LINKS },
    { title: 'Avis', links: REVIEW_LINKS },
    { title: 'Comparatifs', links: COMPARISON_LINKS },
    { title: 'Glossaire', links: GLOSSARY_LINKS },
    { title: 'Outils', links: TOOLS_LINKS },
  ];

  // Add branch-specific links if available
  if (branch && BRANCH_LINKS[branch]) {
    groups.unshift({
      title: 'Dans cette section',
      links: BRANCH_LINKS[branch],
    });
  }

  return groups.filter(g => g.links.length > 0);
}

/**
 * Returns cross-link groups for a blog article.
 */
export function getLinksForBlog(): LinkGroup[] {
  return [
    { title: 'Guides', links: GUIDE_LINKS },
    { title: 'Avis', links: REVIEW_LINKS },
    { title: 'Comparatifs', links: COMPARISON_LINKS },
    { title: 'Glossaire', links: GLOSSARY_LINKS },
    { title: 'Outils', links: TOOLS_LINKS },
  ].filter(g => g.links.length > 0);
}

/**
 * Returns cross-link groups for a review page.
 */
export function getLinksForReview(): LinkGroup[] {
  return [
    { title: 'Comparatifs', links: COMPARISON_LINKS },
    { title: 'Guides', links: GUIDE_LINKS },
    { title: 'Outils', links: TOOLS_LINKS },
    { title: 'Glossaire', links: GLOSSARY_LINKS },
  ].filter(g => g.links.length > 0);
}

/**
 * Returns cross-link groups for a comparison page.
 */
export function getLinksForComparison(): LinkGroup[] {
  return [
    { title: 'Avis', links: REVIEW_LINKS },
    { title: 'Guides', links: GUIDE_LINKS },
    { title: 'Outils', links: TOOLS_LINKS },
    { title: 'Glossaire', links: GLOSSARY_LINKS },
  ].filter(g => g.links.length > 0);
}
