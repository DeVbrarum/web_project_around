import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import Card from "./Card.js";
import { PopupWithImage } from "./PopupWithImage.js";
import Validate from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForms.js";


//Expressions to validate input fields and error messages
const validationConfig = {
  username: {
    expression: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
    errorMessage: 'Por favor, ingresa un nombre de usuario válido.'
  },
  job: {
    expression: /^[a-zA-ZÀ-ÿ\s]{2,200}$/,
    errorMessage: 'Por favor, ingresa una descripción válida.'
  },
  title: {
    expression: /^[a-zA-ZÀ-ÿ\s0-9\_\-]{2,30}$/,
    errorMessage: 'Por favor, ingresa un título válido.'
  },
  urlImagen: {
    expression: /^https?:\/\/.*$/,
    errorMessage: 'Por favor, ingresa una URL de imagen válida.'
  }
};

const photosDefaults = [
  {
    title: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
  {
    title: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    title: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    title: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },

  {
    title: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },

  {
    title: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
];

const formProperties = {
  profileButton: document.querySelector(".profile__editUserButton"),
  profileForm: document.querySelector(".profileForm__popup"),
  formAddNewImage: document.querySelector(".addNewImage__popup"),
  addNewImageButton: document.querySelector(".profile__addCardButton"),
};


const popupWithFormUser = new PopupWithForm('.profileForm', {
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo(inputValues);
  },
  fields: {
    name: 'name',
    job: 'job'
  }
});

const popupWithFormNewImage = new PopupWithForm('.addNewImage', {
  handleFormSubmit: (inputValues) => {
    const newCard = new Section({
      items: inputValues,
      addNewPhoto
    },
      ".photos"
    );
    newCard.addItem(addNewPhoto(inputValues));

    popupWithFormNewImage.close();
  },
  fields: {
    title: 'title',
    link: 'link'
  }
});

const formProfileValidate = new Validate(formProperties.profileForm, validationConfig);
const formNewCardValidate = new Validate(formProperties.formAddNewImage, validationConfig);


const userInfo = new UserInfo({
  userNameSelector: ".profile__info-name",
  userJobSelector: ".profile__info-about",
});


const renderPage = new Section(
  {
    items: photosDefaults,
    renderer: addNewPhoto,
  },
  ".photos"
);

function addNewPhoto(item) {
  const card = new Card(item);
  const newCard = card.generateCard();
  return newCard;
}

function setPopupImgAction(element) {
  /*const photoImg = element.querySelector(".photos__img");
  const photoTitle = element
    .closest(".photos__content")
    .querySelector(".photos__title");*/

  // Set open and close popup for each new photo added
  element.addEventListener("click", function (evt) {
    const popupImage = new PopupWithImage(".imgPopup");
    popupImage.open(evt);
  });
}

renderPage.renderItems();
popupWithFormUser.setEventListeners();
popupWithFormNewImage.setEventListeners();

export { setPopupImgAction as popImgAct, popupWithFormUser, popupWithFormNewImage, userInfo, formProperties };