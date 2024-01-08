import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
    }
  
    open(data) {
      super.setEventListeners();
      const urlImage = data.srcElement.src;
      const titleImage = data.srcElement.alt;
      document.querySelector(".imgPopup__photo").src = urlImage;
      document.querySelector(".imgPopup__photo").alt = titleImage;
      document.querySelector(".imgPopup__title").textContent = titleImage;
      super.open();
    }
  }

  export { PopupWithImage };