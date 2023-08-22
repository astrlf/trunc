import { generateDeletionKey, generatePhoneticId, isURL, prisma } from '../lib/index.js';

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
async function toShort(url: string) {
  if (!url) throw new Error('url is required');
  if (!isURL(url)) throw new Error('url is invalid');

  return prisma.url.create({ data: { slug: generatePhoneticId(8), deletionKey: generateDeletionKey(), url } });
}

/**
 * Deletes an url by its slug if the deletion key matches.
 */
async function deleteShort(slug: string, deletionKey: string) {
  const result = await prisma.url.findUnique({ where: { slug } });
  if (!result) throw new Error('url not found');
  if (result.deletionKey !== deletionKey) throw new Error('deletion key is invalid');

  return prisma.url.delete({ where: { slug } });
}

export { fromShort, toShort, deleteShort };
