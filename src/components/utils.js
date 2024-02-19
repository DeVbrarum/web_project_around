import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import Card from "./Card.js";
import { PopupWithImage } from "./PopupWithImage.js";
import Validate from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForms.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import Api from "./Api.js";


//Expressions to validate input fields and error messages
const validationConfig = {
  username: {
    expression: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
    errorMessage: "Por favor, ingresa un nombre de usuario válido.",
  },
  job: {
    expression: /^[a-zA-ZÀ-ÿ\s]{2,200}$/,
    errorMessage: "Por favor, ingresa una descripción válida.",
  },
  title: {
    expression: /^[a-zA-ZÀ-ÿ\s0-9\_\-]{2,30}$/,
    errorMessage: "Por favor, ingresa un título válido.",
  },
  urlImagen: {
    expression: /^https?:\/\/.*$/,
    errorMessage: "Por favor, ingresa una URL de imagen válida.",
  },
  urlAvatar: {
    expression: /^https?:\/\/.*$/,
    errorMessage: "Por favor, ingresa una URL de imagen válida.",
  },
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

const authToken = "ba812068-4270-4077-a7da-dadcfc552381";
const groupId = "web_es_11";
let userCurrentId = "";

const formProperties = {
  profileButton: document.querySelector(".profile__editUserButton"),
  addNewImageButton: document.querySelector(".profile__addCardButton"),
  deleteCardButton: document.querySelector(".photos__trash-icon"),
  changeProfilePhoto: document.querySelector(".profile__edit-icon"),
  buttonNewCardSubmit: document.getElementById("newCardButton"),
  buttonUpdateProfile: document.getElementById("buttonSubmitProfile"),
};

const formElements = {
  profileForm: document.querySelector(".profileForm__popup"),
  newCardForm: document.querySelector(".addNewImage__popup"),
  changePhotoForm: document.querySelector(".avatarPopup__content"),
};

//Is created to save the new validations configured.
const validators = {};

Object.keys(formElements).forEach(key => {
  validators[key] = new Validate(formElements[key], validationConfig);
});

const popupEditProfileImage = new PopupWithForm(".avatarPopup", {
  handleFormSubmit: (inputValues) => {
    api.updateProfilePicture(inputValues);
    userInfo.setUserAvatar(inputValues.avatar);
  },
  fields: {
    avatar: "urlAvatar",
  },
  formValidator: validators.changePhotoForm,
})

const popupWithFormUser = new PopupWithForm(".profileForm", {
  handleFormSubmit: (inputValues) => {
    api.updateProfile(
      inputValues.name,
      inputValues.job,
      formProperties.buttonUpdateProfile
    )
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          job: data.about,
        });
      })
      .finally(() => {
        formProperties.buttonUpdateProfile.textContent = "Guardar";
      });
  },
  fields: {
    name: "name",
    job: "job",
  },
  formValidator: validators.profileForm,
});

const popupWithFormNewImage = new PopupWithForm(".addNewImage", {
  handleFormSubmit: (inputValues) => {
    api.updateNewCard(
      inputValues.title,
      inputValues.link,
      formProperties.buttonNewCardSubmit
    )
      .then((data) => {
        const newCard = new Section(
          {
            items: data,
            addNewPhoto,
          },
          ".photos"
        );
        newCard.addItem(
          addNewPhoto(data)
        );
      })
      .finally(() => {
        formProperties.buttonNewCardSubmit.textContent = "Crear";
      });
    formProperties.buttonNewCardSubmit.classList.remove("form__submit_actived");
  },

  fields: {
    title: "title",
    link: "link",
  },

  formValidator: validators.newCardForm,
});

const popupWithConfirmation = new PopupWithConfirmation(".deletePopup");

const userInfo = new UserInfo({
  userNameSelector: ".profile__info-name",
  userJobSelector: ".profile__info-about",
  userAvatarSelector: ".profile__avatar-image",
});

const renderPage = new Section(
  {
    items: [],
    renderer: addNewPhoto,
  },
  ".photos"
);

function addNewPhoto(item) {
  const card = new Card(item, userCurrentId, openDeleteConfirmationPopup
  );
  const newCard = card.generateCard();
  return newCard;
}

function openDeleteConfirmationPopup(action) {
  popupWithConfirmation.setSubmitAction(action);
  popupWithConfirmation.open();
}

const api = new Api({
  baseUrl: `https://around.nomoreparties.co/v1/${groupId}`,
  headers: {
    authorization: authToken,
    "Content-Type": "application/json"
  }
});

//Get and load all Cards on page
api.getInitialCards()
  .then((cardsData) => {
    cardsData.forEach((card) => {
      renderPage.addItem(renderPage._rendererItems(card));
    });
  });

//Get and load user's info
api.getUserData()
  .then((userData) => {
    userCurrentId = userData._id;
    userInfo.setUserAvatar(userData.avatar);
    return userInfo.setUserInfo({ name: userData.name, job: userData.about });
  })

popupWithFormUser.setEventListeners();
popupWithFormNewImage.setEventListeners();
popupWithConfirmation.setEventListeners();
popupEditProfileImage.setEventListeners();

export {
  popupWithFormUser,
  popupWithFormNewImage,
  userInfo,
  formProperties,
  popupWithConfirmation,
  userCurrentId,
  api,
  popupEditProfileImage
};
