import { generateDeletionKey, generatePhoneticId, isURL, prisma } from '../helpers/index.js';

/**
 * Finds an url by its slug.
 */
async function fromShort(slug: string) {
  const result = await prisma.url.findUnique({ where: { slug } });
  if (!result) throw new Error('url not found');

  return result;
}

/**
 * Shortens an url.
 */
async function toShort(url: string, custom?: string) {
  if (!url) throw new Error('url is required');
  if (!isURL(url)) throw new Error('url is invalid');

  if (!custom)
    return prisma.url.create({ data: { slug: generatePhoneticId(8), deletionKey: generateDeletionKey(), url } });

  const result = await prisma.url.findUnique({ where: { slug: custom } });
  if (result) throw new Error('slug is already taken');

  return prisma.url.create({ data: { slug: custom, deletionKey: generateDeletionKey(), url } });
}

/**
 * Deletes an url by its slug if the deletion key matches.
 */
async function deleteShort(slug: string, key: string) {
  const result = await prisma.url.findUnique({ where: { slug } });
  if (!result) throw new Error('url not found');
  if (result.deletionKey !== key) throw new Error('deletion key is invalid');

  return prisma.url.delete({ where: { slug } });
}

export { fromShort, toShort, deleteShort };
