const cart = []

let cartStorageLecture = localStorage.getItem("cart");
let cartStorage = JSON.parse(cartStorageLecture);
// alert(cartStorageLecture)

console.log(cartStorage.length)

fetch("http://localhost:3000/api/products") // appelle l'API
    .then(function (response) {
        if (response.ok) {
            return response.json(); // si la requête s'est bien passée, retourne le résultat de la requête au format .json
        }
    })
    .then(function (product) {

for (i = 0; i < cartStorage.length; i++) { // effectue une boucle pour chaque article différent dans le panier en localStorage

    // mise en place de la structure HTML

    // créer un élément article.cart__item dans le parent section#cart__items
    let sectionContainer = document.getElementById("cart__items")
    let newArticle = document.createElement('article')
    newArticle.classList.add("cart__item")
    sectionContainer.appendChild(newArticle)

    // créer un élément div.cart__item__img dans le parent article.cart__item
    let imgContainer = document.createElement('div')
    imgContainer.classList.add("cart__item__img")
    newArticle.appendChild(imgContainer)

    // créer un élément img dans le parent div.cart__item__img
    // contient l'image du produit
    let newImg = document.createElement('img')
    imgContainer.appendChild(newImg)
    newImg.setAttribute("src", "https://via.placeholder.com/350")
    newImg.setAttribute("alt", "test")

    // créer un élément div.cart__item__content dans le parent article.cart__item
    let itemContent = document.createElement('div')
    itemContent.classList.add("cart__item__content")
    newArticle.appendChild(itemContent)

    // créer un élément div.cart__item__content__description dans le parent div.cart__item__content
    let itemContentDescription = document.createElement('div')
    itemContentDescription.classList.add("cart__item__content__description")
    itemContent.appendChild(itemContentDescription)

    // créer un élément h2 dans le parent div.cart__item__content__description
    // contient le nom du produit
    let productName = document.createElement('h2')
    itemContentDescription.appendChild(productName)
    productName.innerText = "productName"

    // créer un élément p dans le parent div.cart__item__content__description
    // contient la couleur du produit
    let productColor = document.createElement('p')
    itemContentDescription.appendChild(productColor)
    productColor.innerText = "productColor"

    // créer un élément p dans le parent div.cart__item__content__description
    // contient le prix du produit
    let productPrice = document.createElement('p')
    itemContentDescription.appendChild(productPrice)
    productPrice.innerText = 485 + " €"

    // créer un élément div.cart__item__content__settings dans le parent div.cart__item__content
    let contentSettings = document.createElement('div')
    contentSettings.classList.add("cart__item__content__settings")
    itemContent.appendChild(contentSettings)

    // créer un élément div.cart__item__content__settings__quantity dans le parent div.cart__item__content__settings
    let contentSettingsQuantity = document.createElement('div')
    contentSettingsQuantity.classList.add("cart__item__content__settings__quantity")
    contentSettings.appendChild(contentSettingsQuantity)

    // créer un élément p dans le parent div.cart__item__content__settings__quantity
    // contient la quantité du produit
    let productQuantity = document.createElement('p')
    contentSettingsQuantity.appendChild(productQuantity)
    productQuantity.innerText = "Qté: " + 15

    // créer un élément input.itemQuantity dans le parent div.cart__item__content__settings__quantity
    let productQuantityInput = document.createElement('input')
    productQuantityInput.classList.add("itemQuantity")
    contentSettingsQuantity.appendChild(productQuantityInput)
    productQuantityInput.setAttribute("name", "itemQuantity")
    productQuantityInput.setAttribute("min", 1)
    productQuantityInput.setAttribute("max", 100)
    productQuantityInput.setAttribute("value", 42)

    // créer un élément div.cart__item__content__settings__delete dans le parent div.cart__item__content__settings
    let contentSettingsDelete = document.createElement('div')
    contentSettingsDelete.classList.add("cart__item__content__settings__delete")
    contentSettings.appendChild(contentSettingsDelete)

    // créer un élément p dans le parent div.cart__item__content__settings__delete
    let contenteSettingsDeleteItem = document.createElement('p')
    contenteSettingsDeleteItem.classList.add("deleteItem")
    contentSettingsDelete.appendChild(contenteSettingsDeleteItem)
    contenteSettingsDeleteItem.innerText = "Supprimer"
}


// affiche le nombre total d'articles
let totalQuantity = document.getElementById("totalQuantity")
totalQuantity.innerText = "235"

// affiche le prix total
let totalPrice = document.getElementById("totalPrice")
totalPrice.innerText = "42025"


// affichage des messages d'erreur dans le formulaire
// if ()
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
firstNameErrorMsg.innerText = "test"

let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
lastNameErrorMsg.innerText = "test"

let addressErrorMsg = document.getElementById("addressErrorMsg")
addressErrorMsg.innerText = "test"

let cityErrorMsg = document.getElementById("cityErrorMsg")
cityErrorMsg.innerText = "test"

let emailErrorMsg = document.getElementById("emailErrorMsg")
emailErrorMsg.innerText = "test"




    }) // fermeture fetch