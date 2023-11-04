import Card from "./card.js";
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
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Good vibes",
    link: "https://plus.unsplash.com/premium_photo-1677851913233-0758697643c7?auto=format&fit=crop&q=80&w=1471&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

const openPopupImage = () => {
  popuPropitaries.imgPopup.classList.add("img-popup_activated");
};

const openPostForm = () => {
  formprop.formAddImg.classList.add("addimage_is-opened");
};

const openProfileForm = () => {
  nameInput.value = formprop.profileName.textContent.trim();
  aboutInput.value = formprop.profileAbout.textContent.trim();
  formprop.profileForm.classList.add("edit-profile_open");
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
  aboutInput.value = aboutInput.textContent.trim();
};

const closePopupImage = () => {
  popuPropitaries.imgPopup.classList.remove("img-popup_activated");
};

const closePostForm = () => {
  const fieldPost = document.querySelector(".addimg__inputs");
  fieldPost.reset();
  formprop.formAddImg.classList.remove("addimage_is-opened");
  resetPostForm();
};

const closeProfileForm = () => {
  formprop.profileForm.classList.remove("edit-profile_open");
  resetProfile();
};

function setPopupImgAction(btn) {
  const photoImg = btn.querySelector(".photos__img");
  const photoTitle = btn
    .closest(".photos__content")
    .querySelector(".photos__title");

  // Set open and close popup for each new photo added
  btn.addEventListener("click", function () {
    popuPropitaries.imgPopupPhoto.src = photoImg.src;
    popuPropitaries.imgPopupTitle.textContent = photoTitle.textContent;
    openPopupImage();

    window.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        closePopupImage();
      }
    });
  });
}

function setToggleProfile() {
  formprop.profileButton.addEventListener("click", () => {
    openProfileForm();
  });

  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeProfileForm();
    }
  });

  const saveNewProfile = document.querySelector(".edit-profile__inputs");
  saveNewProfile.addEventListener("submit", saveProfile);
}

function setTogglePost() {
  formprop.addNewImageButton.addEventListener("click", () => {
    openPostForm();
  });

  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePostForm();
    }
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
  let card = new Card(info);
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
