//Open and close form profile
const profileForm = document.querySelector(".edit-profile");
const closeButton = document.querySelector(".form__close");
const edditProfileButton = document.querySelector(".profile__editButton");
const profileBackground = document.querySelector(".form__background");
const profileName = document.querySelector(".profile__info-name");
const profileAbout = document.querySelector(".profile__info-about");
const nameInput = document.querySelector(".edit-profile__name");
const aboutInput = document.querySelector(".edit-profile__about");
const saveButtonProfile = document.querySelector(".edit-profile__btn");
const inputsForm = document.querySelector(".edit-profile__inputs");

//Open and close add new image form
const formAddImg = document.querySelector(".addimg");
const addImgButton = document.querySelector(".profile__addButton");
const addImgBackground = document.querySelector(".addimg__background");
const addImgClose = document.querySelector(".addimg__close");
const addImgCreateButton = document.querySelector(".addimg__Btn");
const addImgInputs = document.querySelector(".addimg__inputs");
const photos = document.querySelector(".photos");
const likeButton = document.querySelectorAll(".photos__like-btn");

//Open and close Image popup
const imgPopup = document.querySelector(".img-popup");
const imgPopupBackground = document.querySelector(".img-popup__background");
const imgPopupClose = document.querySelector(".img-popup__close ");
const imgPopupPhotoButton = document.querySelectorAll(".photos__imgPopup-btn");

//Validacion del formulario y estado de boton submit
const userNameProfile = document.querySelector("[name=username]");
const userAboutProfile = document.getElementById("aboutInput");
const titleImgPost = document.getElementById("imgtitle");
const urlImgPost = document.getElementById("urlInput");
const profileButton = document.querySelector(".edit-profile__btn");
const createButton = document.querySelector(".addimg__Btn");

const profileActionList = [edditProfileButton, profileBackground, closeButton];

profileActionList.forEach((item) => {
  item.addEventListener("click", () => {
    toggleProfileForm();
  });
});

function toggleProfileForm() {
  profileForm.classList.toggle("edit-profile_open");
}

function resetProfile() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  saveButtonProfile.disabled = false;
  saveButtonProfile.classList.add("edit-profile__btn_activa");
}

resetProfile();

function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  toggleProfileForm(profileForm);
}

saveButtonProfile.addEventListener("click", saveProfile);
inputsForm.addEventListener("submit", saveProfile);

//Open and close add new image form
function openAddimg(form) {
  form.classList.add("addimage_is-opened");
}

const addImageList = [addImgButton, addImgBackground, addImgClose];

addImageList.forEach((item) => {
  item.addEventListener("click", () => {
    closeAddimg();
  });
});

function closeAddimg() {
  formAddImg.classList.remove("addimage_is-opened");
  resetform();
}

addImgButton.addEventListener("click", () => openAddimg(formAddImg));

likeButton.forEach(function (button) {
  likeAction(button);
});

function likeAction(evt) {
  evt.addEventListener("click", function () {
    const clickButton = evt.closest(".photos__like-btn");
    const likeImg = evt.querySelector(".photos__like-img");
    if (clickButton) {
      likeImg.classList.toggle("photos__like-btn_activated");
    }
  });
}

function addPhoto(urlPhoto, namePhoto) {
  const photosTemplate = document.querySelector(".photos__template").content;
  const photoElement = photosTemplate
    .querySelector(".photos__content")
    .cloneNode(true);

  photoElement.querySelector(".photos__img").src = urlPhoto;
  photoElement.querySelector(".photos__img").alt = namePhoto;
  photoElement.querySelector(".photos__title").textContent = namePhoto;

  photos.prepend(photoElement);

  // Delete new photo added
  const imgDeletBtn = photoElement.querySelector(".photos__trash-btn");
  imgDeletBtn.addEventListener("click", function () {
    photoElement.remove();
  });

  // Set show popup new photo added
  let photoButton = photoElement.querySelector(".photos__imgPopup-btn");
  setPopupImgAction(photoButton);

  // Set like button new photo added
  const photoLikeBtn = photoElement.querySelector(".photos__like-btn");
  likeAction(photoLikeBtn);
}

// Create new post photo
function addNewPhoto(evt) {
  evt.preventDefault();
  const titleInput = document.querySelector(".addimg__title");
  const urlInput = document.querySelector(".addimg__url");

  addPhoto(urlInput.value, titleInput.value);

  urlInput.value = "";
  titleInput.value = "";
  closeAddimg(formAddImg);
  resetform();
}

addImgInputs.addEventListener("submit", addNewPhoto);

const lista = [imgPopupClose, imgPopupBackground];

lista.forEach((item) => {
  item.addEventListener("click", () => {
    imgPopupCloseAct();
  });
});

function imgPopupCloseAct() {
  imgPopup.classList.toggle("img-popup_activated");
}

//Open photo in popup
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

//carga las imagenes preestablecidas por default al website
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

//update default images to website
photosDefault.forEach((item) => addPhoto(item.link, item.name));

const validateEmptyField = (message, evt) => {
  const field = evt.target;
  const fieldValue = evt.target.value;

  if (fieldValue.trim().length < 2) {
    field.classList.add("invalid");
    field.nextElementSibling.innerText = message;

    buttonState();
  } else {
    if (field.name == urlImgPost.name) {
      validarUrl(evt);
    } else {
      buttonState();
      field.classList.remove("invalid");
      field.nextElementSibling.innerText = "";
    }
  }
};

userNameProfile.addEventListener("blur", (evt) =>
  validateEmptyField("Escribe un nombre valido. Minimos 2 caracteres", evt)
);

userAboutProfile.addEventListener("blur", (evt) =>
  validateEmptyField("Escribe algo sobre ti. Minimos 2 caracteres", evt)
);

titleImgPost.addEventListener("blur", (evt) =>
  validateEmptyField("Escribe un titulo valido. Minimos 2 caracteres", evt)
);

urlImgPost.addEventListener("blur", (evt) =>
  validateEmptyField("Aporta una Url valida de una imagen", evt)
);

function validarUrl(evt) {
  field = evt.target;
  fieldValue = evt.target.value;
  var image = new Image();
  image.src = fieldValue;

  image.addEventListener("load", () => {
    field.classList.remove("invalid");
    field.nextElementSibling.innerText = "";
    buttonState();
  });

  image.addEventListener("error", () => {
    field.classList.add("invalid");
    field.nextElementSibling.innerText = "Url no valida. Por favor verificar";
    buttonDisabled();
  });
}

function buttonDisabled() {
  document.getElementById("btnCrear").disabled = true;
  createButton.classList.remove("addimg__Btn_activa");

  document.getElementById("btnProfile").disabled = true;
  profileButton.classList.remove("edit-profile__btn_activa");
}

function buttonState() {
  fieldtitle = titleImgPost.value;
  fieldUrl = urlImgPost.value;
  fieldName = userNameProfile.value;
  fieldAbout = userAboutProfile.value;

  if (fieldtitle.trim().length < 2 || fieldUrl.trim().length < 2) {
    document.getElementById("btnCrear").disabled = true;
    createButton.classList.remove("addimg__Btn_activa");
  } else {
    document.getElementById("btnCrear").disabled = false;
    createButton.classList.add("addimg__Btn_activa");
  }

  if (fieldName.trim().length < 2 || fieldAbout.trim().length < 2) {
    document.getElementById("btnProfile").disabled = true;
    profileButton.classList.remove("edit-profile__btn_activa");
  } else {
    document.getElementById("btnProfile").disabled = false;
    profileButton.classList.add("edit-profile__btn_activa");
  }
}

function resetform() {
  titleImgPost.classList.remove("invalid");
  titleImgPost.nextElementSibling.innerText = "";

  urlImgPost.classList.remove("invalid");
  urlImgPost.nextElementSibling.innerText = "";

  titleImgPost.value = "";
  urlImgPost.value = "";
  buttonDisabled();
  resetProfile();
}
