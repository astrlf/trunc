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

export { isURL, generatePhoneticId };
