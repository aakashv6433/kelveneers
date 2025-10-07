import { defineCollection } from 'astro:content';
import { cldAssetsLoader } from 'astro-cloudinary/loaders';

export const collections = {
  assets: defineCollection({
    loader: cldAssetsLoader({
      limit: 4,
      folder: 'kelveneers'
    })
  }),
}

