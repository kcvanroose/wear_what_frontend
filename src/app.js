class App {

  addListToPage(list) {
    return list.map(item => {
      return new Item(item);
    // mainList.innerHTML += newItem.renderListItem();
    });
  }

  renderItems(list) {
    list.forEach(item => {
      // const newItem = new Item(item);
      mainList.innerHTML += item.renderListItem();
    });
  }

  addCategory(categorySelect) {
    let listItem = "<option value=''>--Please choose an option--</option>"
    getAvailableCategoriesFromItems(Item.all).forEach(item => {
      listItem += `<option value="${item.name}">${item.name}</option>`
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
        let filteredItems = ''
        filteredItems = (filter.filter(item => item.category.id === category.id))
        this.renderItems(filteredItems)
        console.log(filteredItems)

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
        theId.innerHTML += `<li id="color-${color.replace(' ', '')}"><a>${color}</a></li>`
      })

      colors.forEach(color => {
        let colorMenuItem = document.querySelector(`#color-${color.replace(' ', '')}`)
        colorMenuItem.addEventListener('click', (event) => {
          mainList.innerHTML = ""
          let filter = Item.all
          let uniqueColor = color
          let filteredItems = filter.filter(color => color.color === uniqueColor)

          this.renderItems(filteredItems)
        })
      })
    }

    addBrandMenu(theId, brands) {
      brands.forEach(brand => {
        theId.innerHTML += `<li id="brand-${brand.replace(/\s+/g, '')}"><a>${brand}</a></li>`
      })

      brands.forEach(brand => {
        let brandMenuItem = document.querySelector(`#brand-${brand.replace(/\s+/g, '')}`)

        brandMenuItem.addEventListener('click', (event) => {
          mainList.innerHTML = ""
          let filter = Item.all
          let uniqueBrand = brand
          let filteredItems = filter.filter(color => color.brand === uniqueBrand)

          this.renderItems(filteredItems)
        })
      })
    }

    addOutfitsMenu(theId, outfits) {
      outfits.forEach(outfit => {
        theId.innerHTML += `<li id="outfit-${outfit.id}"><a>${outfit.occasion}</a></li>`
      })
      outfits.forEach(outfit => {
        document.querySelector(`#outfit-${outfit.id}`).addEventListener('click', event => {
          mainList.innerHTML = ""
          let idsOfItemsThatAreInThisOutfit = outfit.items.map(item => item.id)
          let filteredItems = Item.all.filter(item => idsOfItemsThatAreInThisOutfit.includes(item.id))
          this.renderItems(filteredItems)
          console.log(filteredItems)

        })
      })
    }









}



$(document).foundation()
