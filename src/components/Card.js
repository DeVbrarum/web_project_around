import { PopupWithImage } from "./PopupWithImage.js";
import { api } from "./utils.js";



export default class Card {
  constructor(data, currentUserId, openDeleteConfirmationPopup) {
    this._namePhoto = data.name;
    this._urlPhoto = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._openDeleteConfirmationPopup = openDeleteConfirmationPopup;

    this._currentUserId = currentUserId;
    this._likes = data.likes;

    //Determines if the current user liked it
    this._userHasLiked = this._likes.some(user => user._id === this._currentUserId);

  }

  _getTemplate() {
    const photosTemplate = document.querySelector(".photos__template").content;
    const photoElement = photosTemplate
      .querySelector(".photos__content")
      .cloneNode(true);

    return photoElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".photos__img").src = this._urlPhoto;
    this._element.querySelector(".photos__img").alt = this._namePhoto;
    this._element.querySelector(".photos__title").textContent = this._namePhoto;

    this._element.querySelector(".photos__template");

    //Enable the delete button if the current user is the creator of the card
    if (this._ownerId !== this._currentUserId) {
      this._element.querySelector(".photos__trash-button").style.display = 'none';
    }
    this._setEventListeners();

    //Update if the current user liked it
    this.updateLikes(this._likes);

    return this._element;
  }

  _handleImageClick() {
    const urlImage = this._urlPhoto;
    const titleImage = this._namePhoto;
    const popupImage = new PopupWithImage(".imgPopup");
    popupImage.open({ srcElement: { src: urlImage, alt: titleImage } });
  }

  _setEventListeners() {
    this._element.querySelector(".photos__trash-button").addEventListener("click", (event) => {
      event.preventDefault();

      this._openDeleteConfirmationPopup(() => {

        document.querySelector(".deletePopup__button").textContent = "Guardando...";

        api.deleteCard(this._id).then(() => {
          this._element.remove();
        }).catch(error => {
          console.error('Error al eliminar la tarjeta:', error);
        })
          .finally(() => {
            document.querySelector(".deletePopup__button").textContent = "Si";
          });
      });
    });


    const likeButton = this._element.querySelector(".icon_like-heart");

    likeButton.addEventListener("click", () => {
      const action = this._userHasLiked ? () => api.unlikeCard(this._id) : () => api.likeCard(this._id);

      action(this._id, this._currentUserId).then(updatedCard => {

        this._likes = updatedCard.likes;
        this._userHasLiked = !this._userHasLiked;
        this.updateLikes(this._likes); 

      }).catch(error => {
        console.error('Error al actualizar el "me gusta":', error);
      });
    });

    this._element.querySelector(".photos__imgPopup-button").addEventListener("click", () => {
      this._handleImageClick();
    });

  }

  updateLikes(likes) {
    const likeCountElement = this._element.querySelector('.photos__like-count'); 
    const likeIconElement = this._element.querySelector('.icon_like-heart');
    
    likeCountElement.textContent = likes.length > 0 ? likes.length : '';

    likeCountElement.style.display = likes.length > 0 ? 'block' : 'none';

    this._userHasLiked = likes.some(like => like._id === this._currentUserId);

    likeIconElement.classList.toggle('icon_like-heart_activated', this._userHasLiked);
  }
}