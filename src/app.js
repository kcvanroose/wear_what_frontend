class App {

  addListToPage (list) {
    return list.map(item => {
      return new Item(item)
    // mainList.innerHTML += newItem.renderListItem();
    })
  }

  addSingleItemToPage (itemObj) {
      let item = new Item(itemObj)
      mainList.innerHTML += item.renderListItem()
  }

  renderItems (list) {
    list.forEach(item => {
      // const newItem = new Item(item);
      mainList.innerHTML += item.renderListItem()
    })
  }

  addCategory (categorySelect) {
    let listItem = "<option value=''>--Please choose an option--</option>"
    getAvailableCategoriesFromItems(Item.all).forEach(item => {
      listItem += `<option value="${item.name}">${item.name}</option>`
    })
    categorySelect.innerHTML = listItem
  }

  addCategoryMenu (theId, categories) {
    categories.forEach(category => {
      theId.innerHTML += `<li id="category-${category.id}"><a>${category.name}</a></li>`
    })
    categories.forEach(category => {
      document.querySelector(`#category-${category.id}`).addEventListener('click', event => {
        mainList.innerHTML = ''
        let filter = Item.all
        let filteredItems = ''
        filteredItems = (filter.filter(item => item.category.id === category.id))
        this.renderItems(filteredItems)
        console.log(filteredItems)
      })
    })
  }

  addNewItemListener (form) {
    function encodeImageFileAsURL(element) {
      var file = element.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise(resolve => {
        reader.onloadend = function() {
          // console.log('RESULT', reader.result)
          resolve(reader.result)
        }
      })
    }
    form.addEventListener('submit', event => {
      event.preventDefault()
      encodeImageFileAsURL(form.elements.image)
        .then(imgData => {
          Item.postNewItem({
            user_id: user.id,
            color: form.elements.color.value,
            brand: form.elements.brand.value,
            image: imgData,
            category_id: form.elements.category.value
          })
          .then(res =>
            // hide the form,
            // show the new item

            res.json())
          .then(json => {
            console.log(json)
            $(form).foundation('close');

            this.addSingleItemToPage(json);


          })
        })
    })
  }


    addColorMenu(theId, colors) {
      colors.forEach(color => {
        theId.innerHTML += `<li id="color-${color.replace(/\s+/g, '')}"><a>${color}</a></li>`
      })

      colors.forEach(color => {
        let colorMenuItem = document.querySelector(`#color-${color.replace(/\s+/g, '')}`)
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


  refreshButton (list) {
    const refreshButton = document.querySelector('#refresh-button')
    refreshButton.addEventListener('click', (event) => {
      mainList.innerHTML = ''
      this.renderItems(list)
    })
  }


  selectItem (itemIds) {
    mainList.addEventListener('click', (event) =>{
      let item = this.getOutfit(event.target.id)

      itemIds.push(item.id)
      let html = this.appendItemToOutfit(item)

      newOutfitList.innerHTML += html
      // if newO
      //newOutfitList.remove('button')
      if (newOutfitList.innerHTML.includes('addButton')) {

      } else {
      newOutfitList.prepend(this.appendNewButton())
      // newOutfitList.insertAdjacentHTML('beforeend', this.appendNewButton())
      }
    console.log(itemIds)
    return itemIds
    })
  }

  getOutfit(itemid) {
    return Item.all.find(item => `item-${item.id}` === itemid)
  }

  appendItemToOutfit(item) {
    return `<img id="item-${item.id}" class="image" src="${item.image}">`
  }

  appendNewButton () {
    const form = document.createElement('form')
    form.setAttribute('method', "post")
    form.setAttribute('action', "submit")
    form.setAttribute('id', "occasionForm")

    const label = document.createElement('label')
    label.setAttribute('for', "input")
    label.innerText = 'Name of occasion:'

    form.appendChild(label)

    const input = document.createElement('input')
    input.setAttribute('type',"text")
    input.setAttribute('name',"occasion");


    form.appendChild(input)

    const button = document.createElement('button')
    button.className = 'button addButton'
    button.innerText = 'Save outfit'

    form.appendChild(button)

    form.addEventListener('submit', event => {
      event.preventDefault()
      this.submitOutfit({
        user_id: user.id,
        occasion: form.elements.occasion.value,
        items: itemIds
      })
      newOutfitList.innerHTML = ""
      itemIds.length = 0;
    })
    return form
  }

  submitOutfit(itemData) {
    return fetch('http://localhost:3000/outfits', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData)
    })
    console.log(itemData)
  }

  clearOutfitList(button) {
    button.addEventListener('click', () => {
      newOutfitList.innerHTML = ""
      itemIds.length = 0;
    })
  }




}

$(document).foundation()
