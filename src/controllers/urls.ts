import { generatePhoneticId, isURL, prisma } from '../lib/index.js';

/**
 * Finds an url by its slug.
 */
async function fromShort(slug: string) {
  const result = await prisma.url.findUnique({ where: { slug } });
  if (!result) throw new Error('url not found');

  return result.url;
}

/**
 * Shortens an url.
 */
async function toShort(url: string) {
  if (!url) throw new Error('url is required');
  if (!isURL(url)) throw new Error('url is invalid');

  const slug = generatePhoneticId(8);
  await prisma.url.create({ data: { slug, url } });

  return slug;
}

export { fromShort, toShort };
