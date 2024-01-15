export default class Validate {
  constructor(formElement, validationConfig) {
    this._formElement = formElement;
    this._validationConfig = validationConfig;
    this._inputElements = Array.from(formElement.querySelectorAll('.form__input'));
    this._submitButton = formElement.querySelector('.form__submit');
    this._fieldValidity = {};

    this._inputElements.forEach(input => {
      input.addEventListener('input', () => {
        this._validateField(input);
      });
    });
  }

  _validateField(input) {
    const fieldName = input.name;
    const fieldConfig = this._validationConfig[fieldName];

    // Check if fieldConfig exists
    if (!fieldConfig) {
      console.error(`No se encontró la configuración de validación para el campo '${fieldName}'`);
      return;
    }

    const errorMessage = fieldConfig.errorMessage;

    const errorElement = this._formElement.querySelector(`[data-error="${fieldName}"]`);

    if (fieldConfig.expression.test(input.value.trim())) {
      input.classList.remove("invalid");
      errorElement.textContent = errorMessage;
      errorElement.classList.remove("empty-field_error");
      this._fieldValidity[fieldName] = true;
    } else {
      input.classList.add("invalid");
      errorElement.textContent = errorMessage;
      errorElement.classList.add("empty-field_error");
      this._fieldValidity[fieldName] = false;
    }

    this._toggleButtonState();
  }

  _toggleButtonState() {
    const isFormValid = Object.values(this._fieldValidity).every(valid => valid);
    this._submitButton.disabled = !isFormValid;

    if (isFormValid) {
      this._submitButton.classList.add("form__submit_actived");
    } else {
      this._submitButton.classList.remove("form__submit_actived");
    }
  }

  _isValidForm() {
    return Object.values(this._fieldValidity).every(valid => valid);
  }

  resetValidation() {
    this._inputElements.forEach((input) => {
      // Reset error messages
      input.classList.remove('invalid');
      input.nextElementSibling.textContent = '';
    });
  }
}