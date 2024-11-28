import { defineCollection, z } from 'astro:content';

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

export const collections = {
  research,
};