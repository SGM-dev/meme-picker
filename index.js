import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");

function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      emotionsArray.push(emotion);
    }
  }
  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  const emotions = getEmotionsArray(cats);
  let emotionRadioContent = "";
  for (let emotion of emotions) {
    emotionRadioContent += `<p>${emotion}</p>`;
  }
  emotionRadios.innerHTML += emotionRadioContent;
}

renderEmotionsRadios(catsData);
