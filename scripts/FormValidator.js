export default class Validate {
  constructor(data, infovalid) {
    this._data = data;
    this._infovalidar = infovalid;
  }

  setEventListeners(e) {
    e = this._data[0];
    const inputList = Array.from(e.querySelectorAll(".form__input"));
    this._toggleButtonState();

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._validateForm(inputElement);
      });
    });
  }

  _validateForm(e) {
    switch (e.name) {
      case "username":
        this._validateField(this._infovalidar.username, e, nameInput);

        break;
      case "about":
        this._validateField(this._infovalidar.about, e, aboutInput);
        break;
      case "title":
        this._validateField(this._infovalidar.title, e, titleInput);
        break;
      case "urlImagen":
        this._validateUrl(e);
        break;
    }
  }

  _validateField(expresion, input, field) {
    const errorMessage = input.validationMessage;
    if (expresion.test(input.value.trim())) {
      //const errorMessage = input.validationMessage;
      field.classList.remove("invalid");
      //input.nextElementSibling.textContent = errorMessage;
      input.nextElementSibling.classList.remove("empty-field_error");
      this._data[1][field.name] = true;
      this._toggleButtonState();
    } else {
      field.classList.add("invalid");
      //input.nextElementSibling.textContent = errorMessage;
      input.nextElementSibling.classList.add("empty-field_error");
      this._data[1][field.name] = false;
      this._toggleButtonState();
    }
  }

  _buttonDisabled(formElement) {
    formElement.disabled = true;
    formElement.classList.remove("addimg__btn_activa");
  }

  _buttonActivated(formElement) {
    formElement.disabled = false;
    formElement.classList.add("addimg__btn_activa");
  }

  _toggleButtonState() {
    if (this._data[1].username && this._data[1].about) {
      this._buttonActivated(this._data[1].saveButtonProfile);
    } else {
      this._buttonDisabled(this._data[1].saveButtonProfile);
    }

    if (this._data[1].title && this._data[1].urlImagen) {
      this._buttonActivated(this._data[1].postNewImageButton);
    } else {
      this._buttonDisabled(this._data[1].postNewImageButton);
    }
  }

  _validateUrl(field) {
    if (field.validity.valid) {
      const errorMessage = urlInput.validationMessage;
      urlInput.nextElementSibling.textContent = errorMessage;
      urlInput.classList.remove("invalid");
      urlInput.nextElementSibling.classList.remove("empty-field_error");
      this._data[1].urlImagen = true;
      this._toggleButtonState();
    } else {
      const errorMessage = urlInput.validationMessage;
      urlInput.nextElementSibling.textContent = errorMessage;
      urlInput.classList.add("invalid");
      urlInput.nextElementSibling.classList.add("empty-field_error");
      this._data[1].urlImagen = false;
      this._toggleButtonState();
    }
  }
}
