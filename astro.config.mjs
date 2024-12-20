import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';


export default defineConfig({
  integrations: [tailwind(), react(), sitemap()],
  site: 'https://govrn.com',
  i18n: {
    locales: ["en", {
      path: "fr",
      codes: ["fr", "fr-FR", "fr-CA", "fr-BE", "fr-CH", "fr-DZ", "fr-FR", "fr-GF", "fr-GP", "fr-MQ", "fr-RE", "fr-YT"]
    }],   
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false
    }
  },
  redirects: {
    '/blog/tips-tricks-12/what-does-abstained-mean-understanding-the-meaning-and-implications-152': '/blog/what-does-abstained-mean',
    '/blog/our-blog-1/what-does-abstained-mean-understanding-the-meaning-and-implications-152': '/blog/what-does-abstained-mean',
    '/blog/board-roles-11/the-role-of-an-advisor-to-the-board-responsibilities-and-benefits-198': '/blog/role-advisor-board-responsability-benefits',
    '/blog/board-roles-11/understanding-the-functions-of-the-executive-importance-and-examples-172': '/blog/understanding-functions-of-the-executive',
    '/blog/esg-10/the-ultimate-guide-to-non-profit-board-of-directors-roles-responsibilities-and-best-practices-202': '/blog/non-profit-board-roles-responsibilities-best-practices',
    '/blog/our-blog-1/understanding-the-role-of-board-of-directors-for-non-profits-192': '/blog/role-board-directors-non-profits',
    '/blog/ai-in-the-boardroom-8/what-is-a-board-portal-in-an-ai-world-meeting-management-226': '/blog/ai-board-portal-meeting-management',
    '/blog/ai-in-the-boardroom-8/ai-in-the-boardroom-the-next-evolution-in-board-management-software-222': '/blog/ai-board-management-software',
    '/blog/board-roles-11/what-is-a-steering-committee-definition-roles-and-responsibilities-196': '/blog/steering-committee-definition-roles-responsibilities',
    '/blog/board-portal-tech-13/what-s-a-board-book-and-how-board-management-software-can-help-158': '/blog/board-pack-management-software',
    '/blog/our-blog-1/understanding-the-risks-of-strategic-management-what-you-need-to-know-179': '/blog/strategic-management-risks',
    '/blog/ai-in-the-boardroom-8/ai-in-the-boardroom-how-ai-is-transforming-board-meetings-governance-230': '/blog/ai-boardroom-transformation',
    '/blog/ai-in-the-boardroom-8/what-is-a-board-portal-in-an-ai-world-a-true-board-intelligence-platform-227': '/blog/ai-board-portal-intelligence-platform',
    '/blog/board-portal-tech-13/streamlining-board-meetings-with-board-meeting-software-112': '/blog/streamlining-board-meetings-software',
    '/blog/our-blog-1/from-slow-to-swift-how-board-management-software-is-revolutionizing-board-decision-making-209': '/blog/revolutionizing-board-decision-making',
    '/blog/tips-tricks-12/productive-board-meetings-maximising-engagement-and-successful-outcomes-224': '/blog/productive-board-meetings-maximising-engagement',
    '/blog/board-portal-tech-13/the-benefits-of-using-decision-logs-for-businesses-and-organizations-116': '/blog/benefits-of-decision-logs-for-businesses',
    '/blog/board-portal-tech-13/using-a-decision-log-to-track-and-document-decisions-135': '/blog/benefits-of-decision-logs-for-businesses',
    '/blog/ai-in-the-boardroom-8/ai-in-the-boardroom-a-board-grc-platform-233': '/blog/ai-boardroom-grc-platform',
    '/board-private-chat': '/features/secure-communication',
    '/news-feed': '/features/secure-communication',
    '/legal': '/terms',
    '/document-management-library': '/features/document-management-library',
  },
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  }
});
