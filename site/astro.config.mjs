// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { remarkAlert } from 'remark-github-blockquote-alert';
import rehypeMermaid from 'rehype-mermaid';
import rehypeGlossaryTooltip from './src/plugins/rehype-glossary-tooltip.ts';

export default defineConfig({
  // TODO: Replace with your production domain
  site: 'https://www.example.com',
  output: 'static',
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    remarkPlugins: [remarkAlert],
    rehypePlugins: [
      // CRITICAL: Use 'img-svg' strategy, NOT 'inline-svg'
      // inline-svg conflicts with Astro's built-in rehype-raw and causes silent empty article bodies
      [rehypeMermaid, {
        strategy: 'img-svg',
        dark: true,
        mermaidConfig: {
          theme: 'dark',
          themeVariables: {
            // TODO: Adjust colors to match your design system
            primaryColor: '#141D30',
            primaryTextColor: '#F1F5F9',
            primaryBorderColor: '#F59E0B',
            lineColor: '#8B5CF6',
            secondaryColor: '#1A2540',
            tertiaryColor: '#0E1525',
            noteBkgColor: '#141D30',
            noteTextColor: '#94A3B8',
            noteBorderColor: '#1E2A45',
          },
        },
      }],
      rehypeGlossaryTooltip,
    ],
  },
  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
