

export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      job: this._userJobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = job;
  }

  setUserAvatar(avatar) {
    this._userAvatarElement.src = avatar;
  }
}
