import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const getImageBtn = document.getElementById("get-image-btn");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);

// memeModalCloseBtn.addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  if (
    !(event.target == memeModal) &&
    !(
      event.target == getImageBtn ||
      event.target == memeModalInner ||
      event.target == this.document.querySelector(".cat-img")
    )
  ) {
    closeModal();
  }
});

getImageBtn.addEventListener("click", renderCats);

function highlightCheckedOption(e) {
  const radiosArray = document.getElementsByClassName("radio");

  for (let radio of radiosArray) {
    radio.classList.remove("highlight");
  }

  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function closeModal() {
  memeModal.style.display = "none";
}

function renderCats() {
  const catObjectsArray = getMatchingCatsArray();

  let memeGallery = ``;
  for (let catObject of catObjectsArray) {
    memeGallery += `
    
      <img class = "cat-img"
      src="./images/${catObject.image}"
      alt=${catObject.alt}
      />
    `;
  }
  memeModalInner.innerHTML = memeGallery;
  memeModal.style.display = "flex";
}

function getMatchingCatsArray() {
  if (document.querySelector("input[type=radio]:checked")) {
    const selectedEmotion = document.querySelector(
      "input[type=radio]:checked"
    ).value;
    const isGif = gifsOnlyOption.checked;

    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });

    return matchingCatsArray;
  }
}

function getEmotionsArray(cats) {
  const emotionsArray = [];

  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }

  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  let radioItems = ``;
  const emotions = getEmotionsArray(cats);

  for (let emotion of emotions) {
    radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`;
  }

  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
