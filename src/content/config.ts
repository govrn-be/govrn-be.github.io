import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    authorRole: z.string(),
    image: z.string(),
    category: z.enum(['Governance', 'Technology', 'Best Practices', 'Industry Insights', 'Regulatory']),
    tags: z.array(z.string()),
    featured: z.boolean().optional().default(false),
  }),
});

const research = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    institution: z.string(),
    date: z.string(),
    abstract: z.string(),
  }),
});

const podcast = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    duration: z.string(),
    spotifyUrl: z.string(),
    podcastAudioUrl: z.string(),
    image: z.string(),
    featured: z.boolean().optional().default(false),
    guests: z.array(z.object({
      name: z.string(),
      role: z.string(),
      company: z.string(),
      bio: z.string().optional(),
      image: z.string().optional(),
    })).optional(),
    topics: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog,
  research,
  podcast,
};