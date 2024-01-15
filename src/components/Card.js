import { PopupWithImage } from "./PopupWithImage.js";

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

    this._setEventListeners();

    return this._element;
  }

  _handleImageClick() {
    const urlImage = this._urlPhoto;
    const titleImage = this._namePhoto;
    const popupImage = new PopupWithImage(".imgPopup");
    popupImage.open({ srcElement: { src: urlImage, alt: titleImage } });
  }

  _setEventListeners() {
    
    this._element.querySelector(".photos__trash-button").addEventListener("click", () => {
      this._element.remove();
    });

    this._element.querySelector(".photos__imgPopup-button").addEventListener("click", () => {
      this._handleImageClick();
    });

    this._element.querySelector(".icon_like-heart").addEventListener("click", (evt) => {
      evt.target.classList.toggle("icon_like-heart_activated");
    });
  }
}