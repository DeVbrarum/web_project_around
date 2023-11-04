import { popImgAct } from "./utils.js";

export default class Card {
  constructor(data) {
    this._namePhoto = data.name;
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

    this._addNewCard(this._element);

    return this._element;
  }

  _addNewCard(template) {
    document.querySelector(".photos").prepend(template);
  }

  _setEventListeners(element) {
    const photoImg = element.querySelector(".photos__img");
    const photoTitle = element
      .closest(".photos__content")
      .querySelector(".photos__title");

    // Set option to delete for each new photo added
    element
      .querySelector(".photos__trash-btn")
      .addEventListener("click", function () {
        element.remove();
      });

    // Set show popup for each new photo added
    let photoButton = element.querySelector(".photos__imgPopup-btn");
    popImgAct(photoButton);

    // Set like button for each new photo added
    this._element
      .querySelector(".photos__like-img")
      .addEventListener("click", (evt) =>
        evt.target.classList.toggle("photos__like-btn_activated")
      );
  }
}
