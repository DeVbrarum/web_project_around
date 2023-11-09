import Validate from "./FormValidator.js";
import {
  setToggleProfile as setProfi,
  setTogglePost as setPost,
} from "./utils.js";

const expresiones = {
  username: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras, numeros, guion y guion_bajo
  about: /^[a-zA-ZÀ-ÿ\s]{2,200}$/, // Letras y espacios, pueden llevar acentos.
  title: /^[a-zA-ZÀ-ÿ\s0-9\_\-]{2,30}$/,
};

const formProperties = {
  profileButton: document.querySelector(".profile__editButton"),
  profileForm: document.querySelector(".edit-profile"),
  formAddImg: document.querySelector(".addimg"),
  addNewImageButton: document.querySelector(".profile__addButton"),
  postNewImageButton: document.querySelector(".addimg__btn"),
  saveButtonProfile: document.querySelector(".edit-profile__btn"),
  profileName: document.querySelector(".profile__info-name"),
  profileAbout: document.querySelector(".profile__info-about"),
  username: true,
  about: true,
  title: false,
  urlImagen: false,
};

formProperties.profileButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formAValidar = new Validate(
    [formProperties.profileForm, formProperties],
    expresiones
  );
  formAValidar.enableValidation();
});

formProperties.addNewImageButton.addEventListener("click", function (e) {
  e.preventDefault();
  //setTogglePost();
  const formAValidar = new Validate(
    [formProperties.formAddImg, formProperties],
    expresiones
  );
  formAValidar.enableValidation();
});

setProfi();
setPost();

export { formProperties };
