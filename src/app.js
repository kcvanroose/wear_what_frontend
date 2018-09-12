class App {

  addListToPage(list) {
    list.forEach(item => {
      const newItem = new Item(item);
    mainList.innerHTML += newItem.renderListItem();
    });
  }

  addCategory(categorySelect) {
    let listItem = "<option value=''>--Please choose an option--</option>"
    Item.all.forEach(item => {
      listItem += `<option value="${item.category.id}">${item.category.name}</option>`
    })
    categorySelect.innerHTML = listItem
  }

  addCategoryMenu(theId, categories) {
    categories.forEach(category => {
      theId.innerHTML += `<li id="category-${category.id}"><a>${category.name}</a></li>`
    })
    categories.forEach(category => {
      document.querySelector(`#category-${category.id}`).addEventListener('click', event => {
        mainList.innerHTML = ""
        let filter = Item.all
        let filteredItems = filter.filter(item => item.category.id === category.id)
        this.addListToPage(filteredItems)
      })
    })
  }

  addNewItemListener(form){
    form.addEventListener('submit', event => {
      event.preventDefault()
      Item.postNewItem({
          user_id: user.id,
          color: form.elements.color.value,
          brand: form.elements.brand.value,
          image: form.elements.image.value,
          category_id: form.elements.category.value
      })
      .then(res =>
        // hide the form,
        // show the new item
        res.json())
      .then(json => {
        console.log(json)
      })
      })
    }


    addColorMenu(theId, colors) {
      colors.forEach(color => {
        theId.innerHTML += `<li id="color${item.color}"><a>${item.color}</a></li>`
      })
      colors.forEach(color => {
        document.querySelector(`#color-${item.id}`).addEventListener('click', event => {
          mainList.innerHTML = ""
          let filter = Item.all
          let filteredItems = filter.filter(color => color.id === item.id)
          this.addListToPage(filteredItems)
        })
      })
    }











}



$(document).foundation()
