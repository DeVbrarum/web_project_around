import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    this.setEventListeners();
    const urlImage = data.srcElement.src;
    const titleImage = data.srcElement.alt;
    document.querySelector(".imgPopup__photo").src = urlImage;
    document.querySelector(".imgPopup__photo").alt = titleImage;
    document.querySelector(".imgPopup__title").textContent = titleImage;
    super.open();
  }

  setEventListeners() {
    this._popupSelector
      .querySelector(".imgPopup__close-icon")
      .addEventListener('click', () => {
        super.close();
      });

    this._popupSelector
      .querySelector(".imgPopup__background")
      .addEventListener("click", () => {
        super.close();
      });
  }
}

export { PopupWithImage };