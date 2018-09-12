const categorySelect = document.querySelector('#category-select')
const outfitSelect = document.querySelector('#oufit-select')
const newItemForm = document.querySelector('#new-item')
let user
const categoryMenu = document.querySelector('#categoryMenu')
const mainList =   document.querySelector('#notes-list')

function getAvailableCategoriesFromItems (items) {
  const categories = items.map(item => item.category)
  return categories.reduce((uniqueArray, category) => {
    if (uniqueArray.map(category => category.id).includes(category.id)) return uniqueArray
    uniqueArray.push(category)
    return uniqueArray
  }, [])
}

document.addEventListener('DOMContentLoaded', () => {

  const endPoint = 'http://localhost:3000/users/1/';
  fetch(endPoint)
    .then(res => res.json())
    .then(json => {
      user = json
      console.log(json);
      const app = new App();

      let items = app.addListToPage(json.items)
      app.renderItems(items)
      app.addCategory(categorySelect)
      app.addNewItemListener(newItemForm)
      app.addCategoryMenu(categoryMenu, getAvailableCategoriesFromItems(Item.all))
      //app.addColorMenu(colorMenu, getAvailableCategoriesFromItems(Item.all))
    });

});
