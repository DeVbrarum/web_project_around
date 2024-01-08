export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._rendererItems = renderer;
    this._container = document.querySelector(container);
  }

  renderItems() {
    this._items.forEach((item) => {
      
      this.addItem(this._rendererItems(item));
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
