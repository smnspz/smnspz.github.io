import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { Routes } from "./routes";

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: `./src/content${Routes.Blog}` }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
  }),
});

export const collections = { blog };
