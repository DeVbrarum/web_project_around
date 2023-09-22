//Open and close form profile
const profileForm = document.querySelector(".edit-profile");
const closeButton = document.querySelector(".form__close");
const editProfileButton = document.querySelector(".profile__editButton");
const profileBackground = document.querySelector(".form__background");
const profileName = document.querySelector(".profile__info-name");
const profileAbout = document.querySelector(".profile__info-about");
const saveButtonProfile = document.querySelector(".edit-profile__btn");
const inputsProfileForm = document.querySelector(".edit-profile__inputs");

//Variables of the form for adding images and the variables of the photos on the web page
const formAddImg = document.querySelector(".addimg");
const addNewImageButton = document.querySelector(".profile__addButton");
const addImgBackground = document.querySelector(".addimg__background");
const addImgClose = document.querySelector(".addimg__close");
const addImgInputs = document.querySelector(".addimg__inputs");
const photos = document.querySelector(".photos");
const likeButton = document.querySelectorAll(".photos__like-btn");
const postNewImageButton = document.querySelector(".addimg__btn");

//Variables of the Image popup
const imgPopup = document.querySelector(".img-popup");
const imgPopupBackground = document.querySelector(".img-popup__background");
const imgPopupClose = document.querySelector(".img-popup__close");
const imgPopupPhotoButton = document.querySelectorAll(".photos__imgPopup-btn");

//Variables for form validation fields
const nameInput = document.querySelector(".edit-profile__name");
const aboutInput = document.querySelector(".edit-profile__about");
const titleInput = document.querySelector(".addimg__title");
const urlUserImage = document.querySelector(".addimg__url");
const inputs = document.querySelectorAll(".form__input");

const fields = {
  username: false,
  about: false,
  title: false,
  urlImagen: false,
};

function toggleProfileForm() {
  profileForm.classList.toggle("edit-profile_open");
  resetProfile();
}

function resetProfile() {
  let fieldsReset = [nameInput, aboutInput];
  fieldsReset.forEach((item) => {
    item.classList.remove("invalid");
    item.classList.remove("correct");
    item.nextElementSibling.classList.remove("empty-field_error");
    fields[item.name] = false;
  });
  nameInput.value = profileName.textContent.trim();
  aboutInput.value = profileAbout.textContent.trim();
  buttonActivated();
}

const profileActionList = [editProfileButton, profileBackground, closeButton];

profileActionList.forEach((item) => {
  item.addEventListener("click", () => {
    toggleProfileForm();
  });
});

function buttonDisabled() {
  postNewImageButton.disabled = true;
  postNewImageButton.classList.remove("addimg__btn_activa");

  saveButtonProfile.disabled = true;
  saveButtonProfile.classList.remove("edit-profile__btn_activa");
}

function buttonActivated() {
  postNewImageButton.disabled = false;
  postNewImageButton.classList.add("addimg__btn_activa");

  saveButtonProfile.disabled = false;
  saveButtonProfile.classList.add("edit-profile__btn_activa");
}

resetProfile();

function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  toggleProfileForm();
}

saveButtonProfile.addEventListener("click", saveProfile);
inputsProfileForm.addEventListener("submit", saveProfile);

//Open the form to add a new image to the website
const openAddImageForm = () => {
  formAddImg.classList.add("addimage_is-opened");
  buttonDisabled();
};

function closeAddImageForm() {
  let fieldsReset = [titleInput, urlUserImage];

  fieldsReset.forEach((item) => {
    item.value = "";
    item.classList.remove("invalid");
    item.classList.remove("correct");
    item.nextElementSibling.classList.remove("empty-field_error");
  });
  postNewImageButton.disabled = true;
  formAddImg.classList.remove("addimage_is-opened");
}

const addImageList = [addNewImageButton, addImgBackground, addImgClose];

addImageList.forEach((item) => {
  item.addEventListener("click", () => {
    closeAddImageForm();
  });
});

addNewImageButton.addEventListener("click", () => openAddImageForm());

likeButton.forEach(function (button) {
  likeAction(button);
});

function addPhoto(urlPhoto, namePhoto) {
  let photosTemplate = document.querySelector(".photos__template").content;
  let photoElement = photosTemplate
    .querySelector(".photos__content")
    .cloneNode(true);

  photoElement.querySelector(".photos__img").src = urlPhoto;
  photoElement.querySelector(".photos__img").alt = namePhoto;
  photoElement.querySelector(".photos__title").textContent = namePhoto;

  photos.prepend(photoElement);

  // Set option to delete for each new photo added
  let imgDeletBtn = photoElement.querySelector(".photos__trash-btn");
  imgDeletBtn.addEventListener("click", function () {
    photoElement.remove();
  });

  // Set show popup for each new photo added
  let photoButton = photoElement.querySelector(".photos__imgPopup-btn");
  setPopupImgAction(photoButton);

  // Set like button for each new photo added
  let photoLikeButton = photoElement.querySelector(".photos__like-img");
  photoLikeButton.addEventListener("click", (evt) =>
    evt.target.classList.toggle("photos__like-btn_activated")
  );
}

function addNewPhoto(evt) {
  evt.preventDefault();

  addPhoto(urlUserImage.value, titleInput.value);

  titleInput.value = "";
  urlUserImage.value = "";
  closeAddImageForm(formAddImg);
}

addImgInputs.addEventListener("submit", addNewPhoto);

let list = [imgPopupClose, imgPopupBackground];

list.forEach((item) => {
  item.addEventListener("click", () => {
    imgPopupCloseAct();
  });
});

function imgPopupCloseAct() {
  imgPopup.classList.toggle("img-popup_activated");
}

//open popup window selected image in larger size
const imgPopupPhoto = document.querySelector(".img-popup__photo");
const imgPopupTitle = document.querySelector(".img-popup__title");

imgPopupPhotoButton.forEach(function (btn) {
  setPopupImgAction(btn);
});

function setPopupImgAction(btn) {
  const photoImg = btn.querySelector(".photos__img");
  const photoTitle = btn
    .closest(".photos__content")
    .querySelector(".photos__title");

  btn.addEventListener("click", function () {
    imgPopupPhoto.src = photoImg.src;
    imgPopupTitle.textContent = photoTitle.textContent;
    imgPopupCloseAct(imgPopup);
  });
}

//images to upload to the website
const photosDefault = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

//upload preset default images to website
photosDefault.forEach((item) => addPhoto(item.link, item.name));

const expresiones = {
  username: /^[a-zA-ZÀ-ÿ\s]{2,20}$/, // Letras, numeros, guion y guion_bajo
  about: /^[a-zA-ZÀ-ÿ\s]{2,22}$/, // Letras y espacios, pueden llevar acentos.
  title: /^[a-zA-ZÀ-ÿ\s0-9\_\-]{2,30}$/,
};

const fieldsValidate = {
  username: nameInput,
  about: aboutInput,
  title: titleInput,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "username":
      validarCampo(expresiones.username, e.target, fieldsValidate.username);
      break;
    case "about":
      validarCampo(expresiones.about, e.target, fieldsValidate.about);
      break;
    case "title":
      validarCampo(expresiones.title, e.target, fieldsValidate.title);
      break;
    case "urlImagen":
      validateUrl(e.target);
      break;
  }
};

const validarCampo = (expresion, input, field) => {
  if (expresion.test(input.value.trim())) {
    field.classList.remove("invalid");
    field.classList.add("correct");
    input.nextElementSibling.classList.remove("empty-field_error");
    fields[field.name] = true;
    submitValidate();
  } else {
    field.classList.add("invalid");
    field.classList.remove("correct");
    input.nextElementSibling.classList.add("empty-field_error");
    fields[field.name] = false;
    submitValidate();
  }
};

function validateUrl() {
  let urlfield = urlUserImage.value;
  var image = new Image();
  image.src = urlfield;

  image.addEventListener("load", () => {
    urlUserImage.classList.remove("invalid");
    urlUserImage.classList.add("correct");
    urlUserImage.nextElementSibling.classList.remove("empty-field_error");
    fields.urlImagen = true;
    submitValidate();
  });
  image.addEventListener("error", () => {
    urlUserImage.classList.add("invalid");
    urlUserImage.classList.remove("correct");
    urlUserImage.nextElementSibling.classList.add("empty-field_error");
    fields.urlImagen = false;
    submitValidate();
  });
}

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

function submitValidate() {
  if ((fields.username && fields.about) || (fields.title && fields.urlImagen)) {
    buttonActivated();
  } else {
    buttonDisabled();
  }
}
