class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add(`${this._popupSelector.id}_open`);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {

    this._popupSelector.classList.remove(`${this._popupSelector.id}_open`);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector
      .querySelector(".form__close-icon")
      .addEventListener('click', () => {
        this.close();
      });

    this._popupSelector
      .querySelector(`.${this._popupSelector.id}__background`)
      .addEventListener("click", () => {
        this.close();
      });
  }
}



export { Popup };
