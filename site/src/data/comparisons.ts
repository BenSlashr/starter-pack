// ============================================================
// comparisons.ts — Data structure for item-vs-item comparisons
// Adapt the specs and items to your domain
// ============================================================

export type ItemCategory = 'category-a' | 'category-b' | 'category-c';
// TODO: Replace with your real categories (e.g. 'saas', 'hardware', 'open-source')

export interface ItemSpec {
  name: string;        // Display name
  slug: string;        // URL-safe identifier
  tagline: string;     // One-line description
  category: ItemCategory;
  image?: string;      // Logo or product image path

  // Key specifications (customize per domain)
  specs: Record<string, string>;
  // Example specs:
  // { "Prix": "29 €/mois", "Utilisateurs": "Illimite", "Stockage": "100 Go" }
}

export interface ComparisonRow {
  label: string;              // Spec name (e.g. "Prix mensuel")
  itemA: string;              // Value for item A
  itemB: string;              // Value for item B
  winner: 'a' | 'b' | 'tie'; // Which has advantage
}

export interface ComparisonPair {
  itemA: string;  // Slug of item A
  itemB: string;  // Slug of item B
  slug: string;   // URL slug (e.g. "product-a-vs-product-b")
  specA: ItemSpec;
  specB: ItemSpec;
}

export interface ComparisonPage {
  slug: string;
  specA: ItemSpec;
  specB: ItemSpec;
  metaTitle: string;
  metaDescription: string;
  keyTakeaways: string[];
  techComparison: ComparisonRow[];
  whatIsA: string;
  whatIsB: string;
  useCases: string;
  verdict: string;
  faq: Array<{ q: string; a: string }>;
}

// ============================================================
// Example items — Replace with your real data
// ============================================================

export const ITEMS: Record<string, ItemSpec> = {
  'product-a': {
    name: 'Product A',
    slug: 'product-a',
    tagline: 'La solution simple pour les petites equipes',
    category: 'category-a',
    image: '/images/comparisons/product-a.svg',
    specs: {
      'Prix': '29 €/mois',
      'Utilisateurs': 'Jusqu\'a 10',
      'Stockage': '50 Go',
      'API': 'Non',
      'Support': 'Chat + email',
      'Application mobile': 'Oui',
      'Essai gratuit': '14 jours',
    },
  },
  'product-b': {
    name: 'Product B',
    slug: 'product-b',
    tagline: 'L\'outil complet pour les entreprises',
    category: 'category-a',
    image: '/images/comparisons/product-b.svg',
    specs: {
      'Prix': '49 €/mois',
      'Utilisateurs': 'Illimite',
      'Stockage': '200 Go',
      'API': 'Oui (REST + GraphQL)',
      'Support': '24/7 telephone + chat',
      'Application mobile': 'Oui',
      'Essai gratuit': '30 jours',
    },
  },
  'product-c': {
    name: 'Product C',
    slug: 'product-c',
    tagline: 'L\'alternative open-source',
    category: 'category-b',
    image: '/images/comparisons/product-c.svg',
    specs: {
      'Prix': 'Gratuit (self-hosted)',
      'Utilisateurs': 'Illimite',
      'Stockage': 'Selon serveur',
      'API': 'Oui (REST)',
      'Support': 'Communaute',
      'Application mobile': 'Non',
      'Essai gratuit': 'N/A',
    },
  },
};

// ============================================================
// Pair generation
// ============================================================

export function generateAllPairs(): ComparisonPair[] {
  const slugs = Object.keys(ITEMS);
  const pairs: ComparisonPair[] = [];

  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      const a = ITEMS[slugs[i]];
      const b = ITEMS[slugs[j]];
      pairs.push({
        itemA: slugs[i],
        itemB: slugs[j],
        slug: `${slugs[i]}-vs-${slugs[j]}`,
        specA: a,
        specB: b,
      });
    }
  }

  return pairs;
}

// Popular pairs shown first on the hub page
// TODO: Replace with your most-searched comparisons
export const POPULAR_PAIRS = [
  'product-a-vs-product-b',
  'product-a-vs-product-c',
  'product-b-vs-product-c',
];

// ============================================================
// Comparison page generation
// ============================================================

function generateTechComparison(specA: ItemSpec, specB: ItemSpec): ComparisonRow[] {
  // Merge all spec keys from both items
  const allKeys = new Set([...Object.keys(specA.specs), ...Object.keys(specB.specs)]);

  return Array.from(allKeys).map((key) => ({
    label: key,
    itemA: specA.specs[key] ?? '-',
    itemB: specB.specs[key] ?? '-',
    winner: 'tie' as const, // TODO: Implement your comparison logic
  }));
}

export function generateComparisonPage(pair: ComparisonPair): ComparisonPage {
  const { specA, specB } = pair;

  return {
    slug: pair.slug,
    specA,
    specB,

    metaTitle: `${specA.name} vs ${specB.name} : Comparatif detaille ${new Date().getFullYear()}`,
    metaDescription: `Comparaison ${specA.name} et ${specB.name}. Fonctionnalites, tarifs, avantages et inconvenients. Quel est le meilleur choix pour vous ?`,

    keyTakeaways: [
      // TODO: Replace with generated or hand-written takeaways
      `${specA.name} : ${specA.tagline}`,
      `${specB.name} : ${specB.tagline}`,
      `Le choix depend de vos besoins specifiques et de votre budget.`,
    ],

    techComparison: generateTechComparison(specA, specB),

    whatIsA: `${specA.name} est ${specA.tagline.toLowerCase()}. C'est une solution de la categorie ${specA.category} qui se distingue par ses fonctionnalites et son positionnement.`,

    whatIsB: `${specB.name} est ${specB.tagline.toLowerCase()}. C'est une solution de la categorie ${specB.category} avec une approche differente du marche.`,

    useCases: `${specA.name} convient aux equipes qui cherchent ${specA.tagline.toLowerCase()}. ${specB.name} est plus adapte pour ceux qui ont besoin de ${specB.tagline.toLowerCase()}.`,

    verdict: `Le choix entre ${specA.name} et ${specB.name} depend de votre contexte. Pour une mise en place rapide et un budget limite, ${specA.name} est un bon point de depart. Pour des besoins plus avances, ${specB.name} offre plus de flexibilite.`,

    faq: [
      {
        q: `Quel est le meilleur entre ${specA.name} et ${specB.name} ?`,
        a: `Les deux outils ont leurs forces. ${specA.name} excelle par ${specA.tagline.toLowerCase()}, tandis que ${specB.name} se distingue par ${specB.tagline.toLowerCase()}.`,
      },
      {
        q: `Peut-on migrer de ${specA.name} vers ${specB.name} ?`,
        a: `La plupart des outils proposent des fonctionnalites d'import/export. Verifiez la documentation de chaque produit pour les details de migration.`,
      },
      {
        q: `${specA.name} ou ${specB.name} pour un debutant ?`,
        a: `Pour un debutant, nous recommandons de tester les deux avec leurs offres d'essai et de choisir celui dont l'interface vous convient le mieux.`,
      },
    ],
  };
}
