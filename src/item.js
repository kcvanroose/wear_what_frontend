class Item {
  constructor(data) {
    this.id = data.id;
    this.brand = data.brand;
    this.color = data.color;
    this.image = data.image;
    this.category = data.category;
    this.outfits = data.outfits;
    Item.all.push(this);
  }

  renderListItem() {
    
    return `
      <img id="item-${this.id}" class="image" src="${this.image.url}">
  `;
  }
}

Item.postNewItem = function (itemData) {
  return fetch('http://localhost:3000/items', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData)
  })
  
  console.log(itemData)
}

Item.all = [];
