//Set it to display a large popup image and close it
const photos = document.querySelector(".photos");
const imgPopup = document.querySelector(".img-popup");
const imgPopupBackground = document.querySelector(".img-popup__background");
const imgPopupClose = document.querySelector(".img-popup__close");

//open popup window selected image in larger size
const imgPopupPhoto = document.querySelector(".img-popup__photo");
const imgPopupTitle = document.querySelector(".img-popup__title");

//define variables to edit profile
const profileForm = document.querySelector(".edit-profile");
const editUserButton = document.querySelector(".profile__editButton");
const profileName = document.querySelector(".profile__info-name");
const profileAbout = document.querySelector(".profile__info-about");

//define variables to add a new post
const formAddImg = document.querySelector(".addimg");
const addNewImageButton = document.querySelector(".profile__addButton");
const addImgBackground = document.querySelector(".addimg__background");
const addImgClose = document.querySelector(".addimg__close");

const buttons = document.querySelectorAll(".form__submit");

// define for close form
const profileBackground = Array.from(
  document.querySelectorAll(".form__background")
);
const closeButton = Array.from(document.querySelectorAll(".form__close"));

//data to upload images from the website
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

const closePopupImage = () => {
  imgPopup.classList.remove("img-popup_activated");
};

const openPopupImage = () => {
  imgPopup.classList.add("img-popup_activated");
};

const setPopupImgAction = (btn) => {
  const photoImg = btn.querySelector(".photos__img");
  const photoTitle = btn
    .closest(".photos__content")
    .querySelector(".photos__title");

  btn.addEventListener("click", function () {
    imgPopupPhoto.src = photoImg.src;
    imgPopupTitle.textContent = photoTitle.textContent;
    openPopupImage();

    window.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        imgPopup.classList.remove("img-popup_activated");
      }
    });
  });
};

const openPostForm = () => {
  formAddImg.classList.add("addimage_is-opened");
};

const resetPostForm = () => {
  let fieldsReset = [titleInput, urlInput];

  fieldsReset.forEach((item) => {
    item.classList.remove("invalid");
    item.classList.remove("correct");
    item.nextElementSibling.classList.remove("empty-field_error");
  });
};

const closePostForm = () => {
  formAddImg.classList.remove("addimage_is-opened");
  resetPostForm();
  const fieldPost = document.querySelector(".addimg__inputs");
  fieldPost.reset();
};

const setTogglePost = () => {
  addNewImageButton.addEventListener("click", () => {
    openPostForm();
  });

  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePostForm();
    }
  });

  const addNewPost = document.querySelector(".addimg__inputs");
  addNewPost.addEventListener("submit", addNewPhoto);
};

const openProfileForm = () => {
  nameInput.value = profileName.textContent.trim();
  aboutInput.value = profileAbout.textContent.trim();
  profileForm.classList.add("edit-profile_open");
};

const resetProfile = () => {
  let fieldsReset = [nameInput, aboutInput];
  fieldsReset.forEach((item) => {
    item.classList.remove("invalid");
    item.classList.remove("correct");
    item.nextElementSibling.classList.remove("empty-field_error");
  });
  nameInput.value = profileName.textContent.trim();
  aboutInput.value = aboutInput.textContent.trim();
};

const closeProfileForm = () => {
  profileForm.classList.remove("edit-profile_open");
  resetProfile();
};

const setToggleProfile = () => {
  editUserButton.addEventListener("click", () => {
    openProfileForm();
  });

  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeProfileForm();
    }
  });

  const saveNewProfile = document.querySelector(".edit-profile__inputs");
  saveNewProfile.addEventListener("submit", saveProfile);
};

function setCloseForm(listClose) {
  listClose.forEach((item) => {
    item.addEventListener("click", () => {
      closePopupImage();
      closePostForm();
      closeProfileForm();
    });

    imgPopupBackground.addEventListener("click", closePopupImage);
    imgPopupClose.addEventListener("click", closePopupImage);
  });
}

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
  addPhoto(urlInput.value, titleInput.value);
  resetFieldstoFalse();
  closePostForm();
  resetPostForm();
  toggleButtonState();
}

function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  resetFieldstoFalse();
  closeProfileForm();
  toggleButtonState();
}

//upload preset default images to website
photosDefault.forEach((item) => addPhoto(item.link, item.name));

const listClose = profileBackground.concat(closeButton);
setCloseForm(listClose);

setTogglePost();
setToggleProfile();
