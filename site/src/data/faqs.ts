export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * FAQ items keyed by page slug.
 * Add your FAQ content here — they will be rendered with Schema.org FAQPage markup.
 *
 * Example:
 *   'getting-started': [
 *     { question: 'How do I begin?', answer: 'Start with our beginner guide...' },
 *   ],
 */
export const FAQS: Record<string, FAQItem[]> = {
  // Homepage FAQ — TODO: Replace with your real questions
  'index': [
    {
      question: 'Le site est-il gratuit ?',
      answer: 'Oui, tous les guides et outils sont 100% gratuits, sans publicite et sans inscription obligatoire.',
    },
    {
      question: 'Par ou commencer ?',
      answer: 'Commencez par nos guides pour debutants qui couvrent les bases. Puis explorez les outils interactifs pour approfondir.',
    },
    {
      question: 'Les informations sont-elles fiables ?',
      answer: 'Chaque article est recherche avec des sources verifiees et mis a jour regulierement. En cas de doute, nous citons toujours nos sources.',
    },
    {
      question: 'Comment contacter l\'equipe ?',
      answer: 'Rendez-vous sur notre page contact pour nous envoyer un message. Nous repondons sous 48h.',
    },
  ],
  // TODO: Add FAQ items for other pages (guides, tools, etc.)
};
