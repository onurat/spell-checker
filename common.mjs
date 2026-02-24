import words from "./words.json" with { type: "json" };

export function spellCheck(text, customWords = []) {
  const dictionary = [...words, ...customWords];
  const cleanedText = text.replace(/[.,?!":;]/g, "");
  const wordList = cleanedText.split(/\s+/);
  const mistakes = [];

  for (const word of wordList) {
    if (!word) continue;
    if (word[0] === word[0].toUpperCase()) continue;
    if (!dictionary.includes(word.toLowerCase())) {
      const hyphenWords = word.split("-").filter(Boolean);
      hyphenWords.forEach(hWord => {
        if (!dictionary.includes(hWord.toLowerCase())) {
          mistakes.push(hWord);
        }
      });
    }
  }

  return mistakes;
}