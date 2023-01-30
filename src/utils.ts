/**
 * Capitalizes a word.
 * @param word The word to capitalize.
 */
export function capitalizeWord(word: string): string;
/**
 * Capitalizes an array of words.
 * @param words The words to capitalize.
 */
export function capitalizeWord(...words: string[]): string[];
/**
 * Capitalizes an array of words.
 * @param words The words to capitalize.
 */
export function capitalizeWord(words: string[]): string[];
export function capitalizeWord(word: string | string[]) {
  if (typeof word === 'string') {
    let finalWord = '';

    word.split(' ').forEach((w) => {
      finalWord += w[0].toUpperCase() + w.slice(1).toLowerCase() + ' ';
    });

    return finalWord.trim();
  }

  return word.map((value) => capitalizeWord(value));
}
