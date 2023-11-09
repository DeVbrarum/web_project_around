import Card from "./Card.js";
import { formProperties as formprop } from "./index.js";

const popuPropitaries = {
  imgPopup: document.querySelector(".img-popup"),
  imgPopupBackground: document.querySelector(".img-popup__background"),
  imgPopupClose: document.querySelector(".img-popup__close"),
  imgPopupPhoto: document.querySelector(".img-popup__photo"),
  imgPopupTitle: document.querySelector(".img-popup__title"),
};

// define for close form
const profileBackground = Array.from(
  document.querySelectorAll(".form__background")
);
const closeButton = Array.from(document.querySelectorAll(".form__close"));
const listClose = profileBackground.concat(closeButton);

//data to upload images from the website
const photosDefaults = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },

  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },

  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
];

const openPopupImage = () => {
  animateOpenPopup(popuPropitaries.imgPopup);

  window.addEventListener("keydown", closesWithEscape);
};

const openPostForm = () => {
  animateOpenPopup(formprop.formAddImg);

  window.addEventListener("keydown", closesWithEscape);
};

const openProfileForm = () => {
  nameInput.value = formprop.profileName.textContent.trim();
  aboutInput.value = formprop.profileAbout.textContent.trim();

  animateOpenPopup(formprop.profileForm);
  window.addEventListener("keydown", closesWithEscape);
};

const resetPostForm = () => {
  let fieldsReset = [titleInput, urlInput];

  fieldsReset.forEach((item) => {
    item.classList.remove("invalid");
    item.nextElementSibling.classList.remove("empty-field_error");
  });
  resetFieldstoFalse();
};

const resetFieldstoFalse = () => {
  formprop.title = false;
  formprop.urlImagen = false;
  formprop.username = true;
  formprop.about = true;
};

const resetProfile = () => {
  let fieldsReset = [nameInput, aboutInput];
  fieldsReset.forEach((item) => {
    item.classList.remove("invalid");
    item.classList.remove("correct");
    item.nextElementSibling.classList.remove("empty-field_error");
  });
  nameInput.value = formprop.profileName.textContent.trim();
  aboutInput.value = formprop.profileAbout.textContent.trim();
};

const closePopupImage = () => {
  animateClosePopup(popuPropitaries.imgPopup);

  window.removeEventListener("keydown", closesWithEscape);
};

const closePostForm = () => {
  const fieldPost = document.querySelector(".addimg__inputs");
  fieldPost.reset();

  animateClosePopup(formprop.formAddImg);

  window.removeEventListener("keydown", closesWithEscape);
  resetPostForm();
};

const closeProfileForm = () => {
  animateClosePopup(formprop.profileForm);
  window.removeEventListener("keydown", closesWithEscape);
  resetProfile();
};

function animateOpenPopup(e) {
  e.classList.remove(`${e.id}_hidden`);
  setTimeout(function () {
    e.classList.remove(`${e.id}_visuallyhidden`);
  }, 18);
}

function animateClosePopup(e) {
  e.classList.add(`${e.id}_visuallyhidden`);

  setTimeout(function () {
    e.classList.add(`${e.id}_hidden`);
  }, 800);
}

function closesWithEscape(evt) {
  if (evt.key === "Escape") {
    closePostForm();
    closeProfileForm();
    closePopupImage();
  }
}

function setPopupImgAction(btn) {
  const photoImg = btn.querySelector(".photos__img");
  const photoTitle = btn
    .closest(".photos__content")
    .querySelector(".photos__title");

  // Set open and close popup for each new photo added
  btn.addEventListener("click", function () {
    popuPropitaries.imgPopupPhoto.src = photoImg.src;
    popuPropitaries.imgPopupPhoto.alt = photoTitle.textContent;
    popuPropitaries.imgPopupTitle.textContent = photoTitle.textContent;
    openPopupImage();
  });
}

function setToggleProfile() {
  formprop.profileButton.addEventListener("click", () => {
    openProfileForm();
  });

  const saveNewProfile = document.querySelector(".edit-profile__inputs");
  saveNewProfile.addEventListener("submit", saveProfile);
}

function setTogglePost() {
  formprop.addNewImageButton.addEventListener("click", () => {
    openPostForm();
  });

  const addNewPost = document.querySelector(".addimg__inputs");
  addNewPost.addEventListener("submit", addNewPhoto);
}

function setCloseForm(listClose) {
  listClose.forEach((item) => {
    item.addEventListener("click", () => {
      closePopupImage();
      closePostForm();
      closeProfileForm();
    });

    popuPropitaries.imgPopupBackground.addEventListener(
      "click",
      closePopupImage
    );
    popuPropitaries.imgPopupClose.addEventListener("click", closePopupImage);
  });
}

function addNewPhoto(evt) {
  evt.preventDefault();
  let info = { name: titleInput.value, link: urlInput.value };
  const card = new Card(info);
  card.generateCard();

  closePostForm();
  resetPostForm();
}

function saveProfile(evt) {
  evt.preventDefault();
  formprop.profileName.textContent = nameInput.value;
  formprop.profileAbout.textContent = aboutInput.value;
  closeProfileForm();
}

setCloseForm(listClose);

//load defaults card on webpage
photosDefaults.forEach((item) => {
  const card = new Card(item);
  card.generateCard();
});

export { setPopupImgAction as popImgAct, setTogglePost, setToggleProfile };
