import { popImgAct } from "./utils.js";

export default class Card {
  constructor(data) {
    this._namePhoto = data.title;
    this._urlPhoto = data.link;
  }

  _getTemplate() {
    const photosTemplate = document.querySelector(".photos__template").content;
    const photoElement = photosTemplate
      .querySelector(".photos__content")
      .cloneNode(true);

    return photoElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".photos__img").src = this._urlPhoto;
    this._element.querySelector(".photos__img").alt = this._namePhoto;
    this._element.querySelector(".photos__title").textContent = this._namePhoto;
    this._element.querySelector(".photos__template");

    this._setEventListeners(this._element);

    return this._element;
  }

  _setEventListeners(element) {
    // Set option to delete for each new photo added
    element
      .querySelector(".photos__trash-button")
      .addEventListener("click", function () {
        element.remove();
      });

    // Set show popup for each new photo added
    let photoButton = element.querySelector(".photos__imgPopup-button");
    popImgAct(photoButton);

    // Set like button for each new photo added
    this._element
      .querySelector(".icon_like-heart")
      .addEventListener("click", (evt) =>
        evt.target.classList.toggle("icon_like-heart_activated")
      );
  }
}
