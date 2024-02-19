import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector(".deletePopup__content");
  }

  
  setSubmitAction(action) {
   this._submitAction = action;
  }

  setEventListeners(id) {
    this._popupSelector
      .querySelector(".deletePopup__close-icon")
      .addEventListener('click', (event) => {
        event.preventDefault();
        super.close();
      });

    this._popupSelector
      .querySelector(".deletePopup__background")
      .addEventListener("click", () => {
        super.close();
      });

      this._form.addEventListener('submit', (event) => {
        event.preventDefault();
        this._submitAction();
        super.close();
      })
  }
}

export { PopupWithConfirmation };