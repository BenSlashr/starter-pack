// ============================================================
// reviews.ts — Data structure for product/service reviews
// Adapt the fields below to your domain (SaaS, hardware, etc.)
// ============================================================

export interface PricingTier {
  name: string;        // e.g. "Gratuit", "Pro", "Enterprise"
  price: string;       // e.g. "0 €/mois", "29 €/mois", "Sur devis"
  highlight?: boolean; // Mark the most popular tier
}

export interface RatingCriterion {
  label: string;  // e.g. "Facilite d'utilisation", "Rapport qualite-prix"
  score: number;  // 0-10
}

export interface EditorialSection {
  id: string;     // Anchor ID (e.g. "fonctionnalites")
  title: string;  // Section heading
  content: string; // HTML or plain text
}

export interface Review {
  // --- Identity ---
  slug: string;
  name: string;
  logo: string;           // Path to logo image (e.g. "/images/reviews/product.svg")
  url: string;            // Official website or affiliate URL

  // --- SEO ---
  metaTitle: string;       // 60-70 characters
  metaDescription: string; // 150-160 characters

  // --- Summary ---
  overallScore: number;    // 0-10
  verdict: string;         // 1-2 sentence summary
  lastUpdated: string;     // ISO date YYYY-MM-DD

  // --- Quick Facts ---
  facts: Array<{ label: string; value: string }>;
  // Example facts:
  // { label: "Annee de creation", value: "2018" }
  // { label: "Siege social", value: "Paris, France" }
  // { label: "Offre gratuite", value: "Oui" }

  // --- Ratings ---
  ratings: RatingCriterion[];

  // --- Pricing ---
  pricing: PricingTier[];

  // --- Pros & Cons ---
  pros: string[];
  cons: string[];

  // --- Key Takeaways ---
  keyTakeaways: string[];

  // --- Editorial Content ---
  editorialSections: EditorialSection[];

  // --- How-to / Getting Started ---
  howToSteps: Array<{ title: string; description: string }>;

  // --- Alternatives ---
  alternatives: string[]; // Slugs of related reviews

  // --- FAQ ---
  faq: Array<{ q: string; a: string }>;

  // --- Feature flags (customize per domain) ---
  features: Record<string, boolean>;
  // Example: { freeTier: true, mobileApp: true, apiAccess: false }
}

// ============================================================
// Example reviews — Replace with your real data
// ============================================================

export const REVIEWS: Record<string, Review> = {
  'example-product': {
    slug: 'example-product',
    name: 'Example Product',
    logo: '/images/reviews/example-product.svg',
    url: 'https://example.com',

    metaTitle: 'Avis Example Product 2026 : Test complet et tarifs',
    metaDescription: 'Notre avis detaille sur Example Product. Fonctionnalites, tarifs, avantages et inconvenients. Le guide complet pour faire votre choix.',

    overallScore: 8.2,
    verdict: 'Example Product est une solution solide pour les debutants avec une interface claire et des tarifs competitifs.',
    lastUpdated: '2026-02-01',

    facts: [
      { label: 'Annee de creation', value: '2020' },
      { label: 'Siege social', value: 'Paris, France' },
      { label: 'Offre gratuite', value: 'Oui (limitee)' },
      { label: 'Application mobile', value: 'iOS et Android' },
      { label: 'Support', value: 'Chat + email' },
      { label: 'Langues', value: 'FR, EN, ES' },
    ],

    ratings: [
      { label: 'Facilite d\'utilisation', score: 9 },
      { label: 'Fonctionnalites', score: 8 },
      { label: 'Rapport qualite-prix', score: 8 },
      { label: 'Support client', score: 7 },
      { label: 'Fiabilite', score: 9 },
    ],

    pricing: [
      { name: 'Gratuit', price: '0 €/mois' },
      { name: 'Pro', price: '29 €/mois', highlight: true },
      { name: 'Enterprise', price: 'Sur devis' },
    ],

    pros: [
      'Interface intuitive et moderne',
      'Offre gratuite genereuse pour debuter',
      'Support reactif en francais',
      'Application mobile bien concue',
      'Mises a jour regulieres',
    ],

    cons: [
      'Fonctionnalites avancees reservees au plan Pro',
      'Pas d\'API sur le plan gratuit',
      'Documentation parfois incomplete',
    ],

    keyTakeaways: [
      'Ideal pour les debutants grace a son interface simple',
      'Le plan gratuit permet de tester sans engagement',
      'Le plan Pro offre un bon rapport qualite-prix a 29 €/mois',
      'Support client disponible en francais',
      'Manque de fonctionnalites pour les utilisateurs avances',
    ],

    editorialSections: [
      {
        id: 'presentation',
        title: 'Presentation d\'Example Product',
        content: 'Example Product est une solution lancee en 2020 qui vise a simplifier la gestion de projets pour les petites equipes. L\'outil se distingue par son interface epuree et sa prise en main rapide.',
      },
      {
        id: 'fonctionnalites',
        title: 'Fonctionnalites principales',
        content: 'Le produit propose la gestion de taches, le suivi de projet, la collaboration en equipe et des tableaux de bord personnalisables. Le plan Pro ajoute les automatisations et l\'acces API.',
      },
      {
        id: 'tarifs',
        title: 'Tarifs et plans',
        content: 'Trois formules sont disponibles : un plan gratuit limite a 3 projets, un plan Pro a 29 €/mois sans limitation, et un plan Enterprise sur devis avec support dedie.',
      },
      {
        id: 'interface',
        title: 'Interface et experience utilisateur',
        content: 'L\'interface est moderne et responsive. La navigation est logique et les actions principales sont accessibles en 2-3 clics. L\'application mobile reprend l\'essentiel des fonctionnalites.',
      },
    ],

    howToSteps: [
      { title: 'Creer un compte', description: 'Inscrivez-vous gratuitement sur le site officiel avec votre email.' },
      { title: 'Configurer votre espace', description: 'Creez votre premier projet et invitez votre equipe.' },
      { title: 'Personnaliser', description: 'Adaptez les tableaux de bord et les workflows a vos besoins.' },
      { title: 'Passer au Pro', description: 'Quand le plan gratuit ne suffit plus, passez au Pro pour debloquer toutes les fonctionnalites.' },
    ],

    alternatives: ['other-product'],

    faq: [
      { q: 'Example Product est-il gratuit ?', a: 'Oui, une offre gratuite est disponible avec des limitations (3 projets, pas d\'API). Le plan Pro demarre a 29 €/mois.' },
      { q: 'Existe-t-il une application mobile ?', a: 'Oui, des applications iOS et Android sont disponibles avec toutes les fonctionnalites du plan souscrit.' },
      { q: 'Le support est-il en francais ?', a: 'Oui, le support par chat et email est disponible en francais du lundi au vendredi.' },
      { q: 'Puis-je migrer mes donnees depuis un autre outil ?', a: 'Oui, un import CSV est disponible sur tous les plans. Le plan Enterprise inclut une migration assistee.' },
    ],

    features: {
      freeTier: true,
      mobileApp: true,
      apiAccess: false,
      teamCollab: true,
    },
  },

  'other-product': {
    slug: 'other-product',
    name: 'Other Product',
    logo: '/images/reviews/other-product.svg',
    url: 'https://other-example.com',

    metaTitle: 'Avis Other Product 2026 : Test et comparatif',
    metaDescription: 'Notre test complet de Other Product. Decouvrez les fonctionnalites, les tarifs et notre verdict detaille.',

    overallScore: 7.5,
    verdict: 'Other Product est une alternative interessante avec des fonctionnalites avancees mais une courbe d\'apprentissage plus raide.',
    lastUpdated: '2026-02-01',

    facts: [
      { label: 'Annee de creation', value: '2019' },
      { label: 'Siege social', value: 'Berlin, Allemagne' },
      { label: 'Offre gratuite', value: 'Non (essai 14 jours)' },
      { label: 'Application mobile', value: 'Android uniquement' },
      { label: 'Support', value: 'Email uniquement' },
      { label: 'Langues', value: 'EN, DE, FR' },
    ],

    ratings: [
      { label: 'Facilite d\'utilisation', score: 6 },
      { label: 'Fonctionnalites', score: 9 },
      { label: 'Rapport qualite-prix', score: 7 },
      { label: 'Support client', score: 6 },
      { label: 'Fiabilite', score: 8 },
    ],

    pricing: [
      { name: 'Starter', price: '19 €/mois' },
      { name: 'Business', price: '49 €/mois', highlight: true },
      { name: 'Enterprise', price: '99 €/mois' },
    ],

    pros: [
      'Fonctionnalites tres completes',
      'API puissante et bien documentee',
      'Integrations nombreuses (Slack, Jira, etc.)',
      'Personnalisation poussee',
    ],

    cons: [
      'Pas de plan gratuit',
      'Interface complexe pour les debutants',
      'Support uniquement par email',
      'Application mobile incomplete',
    ],

    keyTakeaways: [
      'Meilleur choix pour les equipes techniques',
      'API complete des le premier plan',
      'Essai gratuit de 14 jours sans carte bancaire',
      'Interface puissante mais complexe',
    ],

    editorialSections: [
      {
        id: 'presentation',
        title: 'Presentation d\'Other Product',
        content: 'Other Product est un outil de gestion de projet oriente vers les equipes techniques. Il se distingue par sa flexibilite et ses nombreuses integrations.',
      },
      {
        id: 'fonctionnalites',
        title: 'Fonctionnalites principales',
        content: 'L\'outil propose des sprints, un suivi de bugs, des pipelines CI/CD integres, et une API REST complete. Les automatisations sont disponibles des le plan Starter.',
      },
      {
        id: 'tarifs',
        title: 'Tarifs et plans',
        content: 'Trois plans payants : Starter a 19 €/mois, Business a 49 €/mois (le plus populaire), et Enterprise a 99 €/mois avec SSO et support prioritaire.',
      },
    ],

    howToSteps: [
      { title: 'Demarrer l\'essai', description: 'Inscrivez-vous pour un essai gratuit de 14 jours.' },
      { title: 'Importer vos donnees', description: 'Utilisez l\'import depuis Jira, Trello ou CSV.' },
      { title: 'Configurer les integrations', description: 'Connectez Slack, GitHub et vos autres outils.' },
      { title: 'Choisir votre plan', description: 'Selectionnez le plan adapte a la taille de votre equipe.' },
    ],

    alternatives: ['example-product'],

    faq: [
      { q: 'Y a-t-il un essai gratuit ?', a: 'Oui, 14 jours d\'essai sans carte bancaire avec acces complet au plan Business.' },
      { q: 'Peut-on importer depuis Jira ?', a: 'Oui, un import direct depuis Jira, Trello, Asana et Monday est disponible.' },
      { q: 'Le support est-il reactif ?', a: 'Le support par email repond sous 24h en semaine. Le plan Enterprise inclut un support prioritaire sous 4h.' },
    ],

    features: {
      freeTier: false,
      mobileApp: true,
      apiAccess: true,
      teamCollab: true,
    },
  },
};

// ============================================================
// Helper functions
// ============================================================

export function getReviewsSortedByScore(): Review[] {
  return Object.values(REVIEWS).sort((a, b) => b.overallScore - a.overallScore);
}

export function getReviewBySlug(slug: string): Review | undefined {
  return REVIEWS[slug];
}
