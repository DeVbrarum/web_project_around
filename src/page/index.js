import "../styles/index.css";
import { popupWithFormUser, formProperties, popupWithFormNewImage } from "../components/utils.js"


formProperties.profileButton.addEventListener("click", () => {
  popupWithFormUser.open();
});

formProperties.addNewImageButton.addEventListener('click', () => {
  popupWithFormNewImage.open();
});
