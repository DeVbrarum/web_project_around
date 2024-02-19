
import { Popup } from "./Popup.js";
import { userInfo } from "./utils.js";


class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit, fields, formValidator }) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._fields = fields;
      this._formValidator = formValidator;
      this._submitButton = this._popupSelector.querySelector(".form__submit");
      this._form = this._popupSelector.querySelector(".form");
    }
  
  
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (event) => {
        event.preventDefault();
        const values = this._getInputsValues();
        this._handleFormSubmit(values);
        this.close();
      });
      
    }
  
    open() {
      if (this._popupSelector.id === "profileForm") {
        this._submitButton.classList.add("form__submit_actived");
        const currentUserInfo = userInfo.getUserInfo(); 
  
        //Set the current values in the form input fields
        const nameInput = this._popupSelector.querySelector('#name');
        const jobInput = this._popupSelector.querySelector('#job');
  
        nameInput.value = currentUserInfo.name;
        jobInput.value = currentUserInfo.job;
      };
  
      super.open();
    }
  
    close() {
      if(this._popupSelector.id === "addNewImage") {
        this._submitButton.classList.remove("form__submit_actived");
        this._submitButton.disabled = true;
        this._formValidator.resetValidation();
      }

      if (this._formValidator) {
        this._formValidator.resetValidation();
      }
      this._form.reset();
      super.close();
    }
  
    _getInputsValues() {
      const formValues = {};
  
      //Iterates over specific fields
      for (const key in this._fields){
        if  (Object.hasOwnProperty.call(this._fields, key)) {
          const fieldName = this._fields[key];
          const fieldInput = this._popupSelector.querySelector(`#${fieldName}`);
          formValues[key] = fieldInput.value;
        }
      }

      return formValues;
    }
  }

  export { PopupWithForm };