import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const VOWELS = 'aeiou';
const CONSONANTS = 'bcdfghjklmnpqrstvwxyz';

/**
 * Generates an IPA phonetic ID
 */
function generatePhoneticId(length: number) {
  let id = '';

  for (let i = 0; i < length; i++) {
    i % 2 === 0
      ? (id += CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)])
      : (id += VOWELS[Math.floor(Math.random() * VOWELS.length)]);
  }

  return id;
}

/**
 * Generates a deletion key
 */
function generateDeletionKey() {
  let key = '';

  for (let i = 0; i < 2; i++) {
    key += Math.random().toString(36).substring(2);
  }

  return key;
}

/**
 * Checks if a string is a valid URL
 */
function isURL(input: string) {
  let url;

  try {
    url = new URL(input);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

/**
 * Replies to a request
 */
function reply(response: Response, status: StatusCodes, data: Record<string, unknown>) {
  return response.status(status).json(data);
}

/**
 * Redirects to an URL
 */
function redirect(response: Response, url: string) {
  response.status(StatusCodes.PERMANENT_REDIRECT).redirect(url);
}

export { isURL, reply, redirect, generatePhoneticId, generateDeletionKey };
