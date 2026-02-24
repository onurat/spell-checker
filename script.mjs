import { spellCheck } from "./common.mjs";

const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-button");
const resultsDiv = document.getElementById("results");
let customWords = [];

checkButton.addEventListener("click", () => {
  const text = textInput.value;
  const mistakes = spellCheck(text, customWords);

  resultsDiv.innerHTML = "";

  if (mistakes.length === 0) {
    resultsDiv.innerText = "No spelling mistakes!";
  } else {
    mistakes.forEach((word) => {
      const mistakeDiv = document.createElement("div");
      mistakeDiv.innerHTML = `The word '<span class="mistake">${word}</span>' is misspelled. Would you like to add it to the dictionary? 
        <button class="add-word-button" data-word="${word}">Add '${word}'</button>`;
      resultsDiv.appendChild(mistakeDiv);
    });

    const addButtons = document.querySelectorAll(".add-word-button");
    addButtons.forEach(button => {
      button.addEventListener("click", () => {
        const wordToAdd = button.getAttribute("data-word").toLowerCase();
        customWords.push(wordToAdd);
        checkButton.click();
      });
    });
  }
});