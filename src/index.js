const categorySelect = document.querySelector('#category-select')
const outfitSelect = document.querySelector('#oufit-select')
const newItemForm = document.querySelector('#new-item')
let user
const categoryMenu = document.querySelector('#categoryMenu')
const mainList = document.querySelector('#notes-list')
const colorMenu = document.querySelector('#colorMenu')
const brandMenu = document.querySelector('#brandMenu')
const outfitsMenu = document.querySelector('#outfitsMenu')
const newOutfitList = document.querySelector('#newOutfitList')

function getAvailableCategoriesFromItems (items) {
  const categories = items.map(item => item.category)
  return categories.reduce((uniqueArray, category) => {
    if (uniqueArray.map(category => category.id).includes(category.id)) return uniqueArray
    uniqueArray.push(category)

    return uniqueArray
  }, [])
}

  function getAvailableOutfitsFromItems (items) {
    outfitList = []
    items.map(item => {
      outfitList.push(item.outfits)
    })
    return outfitList
  }

function getAvailableColorsFromItems (items) {
  const colors = items.map(item => item.color)
  return colors.reduce((uniqueArray, color) => {
    if (uniqueArray.map(color => color).includes(color)) return uniqueArray
    uniqueArray.push(color)
    return uniqueArray
    }, [])
  }

  function getAvailableBrandsFromItems (items) {
    const brands = items.map(item => item.brand)
    return brands.reduce((uniqueArray, brand) => {
      if (uniqueArray.map(brand => brand).includes(brand)) return uniqueArray
      uniqueArray.push(brand)
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
      app.addColorMenu(colorMenu, getAvailableColorsFromItems(Item.all))
      app.addBrandMenu(brandMenu, getAvailableBrandsFromItems(Item.all))
      app.addOutfitsMenu(outfitsMenu, user.outfits)
      app.refreshButton(Item.all)
      app.selectItem()
    });

});
