// permet la lecture du localstorage en reconvertissant le contenu de chaîne de caractères en objets
let cartStorageLecture = localStorage.getItem("cart")
let cartStorage = JSON.parse(cartStorageLecture)

fetch("http://localhost:3000/api/products") // appelle l'API
    .then(function (response) {
        if (response.ok) {
            return response.json(); // si la requête s'est bien passée, retourne le résultat de la requête au format .json
        }
    })
    .then(function (product) {
        if (cartStorage !== null)
            for (i = 0; i < cartStorage.length; i++) { // effectue une boucle pour chaque article différent dans le panier en localStorage
                const { id, color, amount } = cartStorage[i]

                // -------------------------------------------------------------------
                // -- Faire correspondre le produit du panier au produit dans l'API --

                const myProduct = product.find((sofa) => { // fonction qui va vérifier dans la liste des produits si on a un id correspondant à l'id contenu dans le localstorage
                    return sofa._id === id
                })

                if (myProduct) {
                    myProduct[i] = product
                }

                const { name, altTxt, imageUrl, price } = myProduct

                displayProduct(id, name, color, price, amount, imageUrl, altTxt) // met en place la structure HTML
                cartItemsCalculation() // calcule le total d'articles dans le panier
            }

        else { // affiche 0 dans le total d'articles si le panier est vide
            totalQuantity.innerText = 0
        }
    })

// -------------------------------------------------------------------
// --------------------------- Prix total ----------------------------

// fonction qui calcule le prix total du panier
async function totalCalculation() {
    let total = 0
    let cartArray = localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem("cart")) : []
    const productList = await fetch("http://localhost:3000/api/products") // appelle l'API
        .then(function (response) {
            if (response.ok) {
                return response.json(); // si la requête s'est bien passée, retourne le résultat de la requête au format .json
            }
        })

    for (i = 0; i < cartArray.length; i++) {
        const myProduct = productList.find((product) => product._id === cartArray[i].id)
        cartArray[i].price = myProduct.price
    }

    for (i = 0; i < cartArray.length; i++) {
        total += cartArray[i].price * cartArray[i].amount
    }
    return total
}

// affiche le prix total du panier
const printTotalPrice = async () => {
    const totalCartPrice = await totalCalculation()
    totalPrice.innerText = totalCartPrice
}
printTotalPrice()

// -------------------------------------------------------------------

// fonction qui calcule/recalcule le nombre d'articles total dans le panier
function cartItemsCalculation() {
    let allInputs = document.getElementsByClassName("itemQuantity")
    let total = 0
    for (let i = 0; i < allInputs.length; i++) { // parcourt les éléments ayant la classe .itemQuantity, puis additionne leur valeurs pour donner un total (dans la variable "total")
        total += parseInt(allInputs[i].value) // convertit les caractères en nombre afin de pouvoir les additionner
    }
    totalQuantity.innerText = parseInt(total)
}

// fonction qui calculre/recalcule le nombre d'articles par référence dans le localstorage
function localStorageItemsCalculation(id, color, qty) {
    let cartArray = localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem("cart")) : [] // récupère les informations de localstorage "cart" s'il en contient, sinon, créé un array "cartArray" vide
    let newAmount = cartArray.findIndex((obj => obj.id == id && obj.color == color))
    cartArray[newAmount].amount = qty

    let cartStorage = JSON.stringify(cartArray)
    localStorage.setItem("cart", cartStorage)  // réassigne la key "cart" dans le localstorage avec les nouvelles valeurs
}

function displayProduct(id, name, color, price, amount, imageUrl, altTxt) {
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
    newImg.setAttribute("src", imageUrl)
    newImg.setAttribute("alt", altTxt)

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
    productName.innerText = name

    // créer un élément p dans le parent div.cart__item__content__description
    // contient la couleur du produit
    let productColor = document.createElement('p')
    itemContentDescription.appendChild(productColor)
    productColor.innerText = color

    // créer un élément p dans le parent div.cart__item__content__description
    // contient le prix du produit
    let productPrice = document.createElement('p')
    itemContentDescription.appendChild(productPrice)
    productPrice.innerText = (price * amount) + " €"

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
    productQuantity.innerText = "Qté:"

    // créer un élément input.itemQuantity dans le parent div.cart__item__content__settings__quantity
    let productQuantityInput = document.createElement('input')
    productQuantityInput.classList.add("itemQuantity")
    contentSettingsQuantity.appendChild(productQuantityInput)
    productQuantityInput.setAttribute("name", "itemQuantity")
    productQuantityInput.setAttribute("min", 1)
    productQuantityInput.setAttribute("max", 100)
    productQuantityInput.setAttribute("value", amount)

    // créer un élément div.cart__item__content__settings__delete dans le parent div.cart__item__content__settings
    let contentSettingsDelete = document.createElement('div')
    contentSettingsDelete.classList.add("cart__item__content__settings__delete")
    contentSettings.appendChild(contentSettingsDelete)

    // créer un élément p dans le parent div.cart__item__content__settings__delete
    let contentSettingsDeleteItem = document.createElement('p')
    contentSettingsDeleteItem.classList.add("deleteItem")
    contentSettingsDelete.appendChild(contentSettingsDeleteItem)
    contentSettingsDeleteItem.innerText = "Supprimer"


    // fonction qui calcule/recalcule le prix de l'article (par référence unique id/couleur)
    function itemPriceCalculation() {
        productPrice.innerText = (price * productQuantityInput.value) + " €"
    }

    // -------------------------------------------------------------------
    // ------------------------- Event listeners -------------------------

    productQuantityInput.addEventListener("change", function () {
        productQuantityInput.setAttribute("value", productQuantityInput.value)
        localStorageItemsCalculation(id, color, productQuantityInput.value)
        cartItemsCalculation() // recalcule le nombre d'articles total
        itemPriceCalculation() // recalcule le prix de l'article (par rapport à la quantité)
        printTotalPrice() // affiche le nouveau prix total du panier
    })

    // supprime l'article au clic du bouton "supprimer"
    contentSettingsDeleteItem.addEventListener('click', function () {
        newArticle.remove() // supprime l'élément du DOM
        cartItemsCalculation() // recalcule le total d'articles dans le panier
        deleteArticle(id, color) // supprime l'article dans le localstorage "cart"
        printTotalPrice() // affiche le nouveau prix total du panier
    })
} // fin fonction displayProduct


// fonction qui supprime l'article dans le localstorage
function deleteArticle(id, color) {
    let cartArray = localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem("cart")) : [] // récupère les informations de localstorage "cart" s'il en contient, sinon, créé un array "cartArray" vide
    let toDelete = cartArray.findIndex((obj => obj.id == id && obj.color == color)) // retourne le nombre correspondant à l'article à supprimer dans la key "cart" du localstorage
    index = toDelete
    cartArray.splice(toDelete, 1) // supprime 1 élément à partir de la valeur index de "toDelete"
    let cartStorage = JSON.stringify(cartArray)
    localStorage.setItem("cart", cartStorage) // réassigne la key "cart" dans le localstorage avec les nouvelles valeurs
}

// fonction qui récupère les id des produits et les réunit dans le localstorage sous la key "products"
// function getIds() {
//     let idList = []

//     for (i = 0; i < cartStorage.length; i++) { // parcourt chaque article du cartStorage (key "cart" du localstorage), puis récupère/push l'élément "id" de chaque article dans l'array idList
//         idList.push(cartStorage[i].id)
//     }

//     // push l'array idList dans le localstorage en tant que key "products"
//     let idListStorage = JSON.stringify(idList)
//     localStorage.setItem("products", idListStorage)
// }


// -------------------------------------------------------------------
// --------------------- Formulaire de commmande ---------------------

// let contactArray = []

let firstNameInput = document.getElementById("firstName")
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
errorMsgContainsNumber(firstNameInput, firstNameErrorMsg)

let lastNameInput = document.getElementById("lastName")
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
errorMsgContainsNumber(lastNameInput, lastNameErrorMsg)

let addressInput = document.getElementById("address")
let addressErrorMsg = document.getElementById("addressErrorMsg")

let cityInput = document.getElementById("city")
let cityMsg = document.getElementById("cityErrorMsg")

let emailInput = document.getElementById("email")
let emailErrorMsg = document.getElementById("emailErrorMsg")

// message d'erreur si le champ email ne contient ni "@" ni "."
emailInput.addEventListener('input', function (e) {
    let value = e.target.value
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (!regex.test(value)) {
        emailErrorMsg.innerText = "Champ non valide"
    } else {
        emailErrorMsg.innerText = ""
    }
})

// fonction qui affiche un message d'erreur si l'input contient un nombre
function errorMsgContainsNumber(input, textSelector) {
    input.addEventListener('input', function (e) {
        let value = e.target.value
        if (/[0-9]/.test(value)) {
            textSelector.innerText = "Champ non valide"
        } else {
            textSelector.innerText = ""
        }
    })
}

// fonction qui retire le message d'erreur lorsqu'un champ est rempli
function removeErrorMsgEmptyField(input, textSelector) {
    input.addEventListener('input', function (e) {
        let value = e.target.value
        if (value.length >= 1) {
            textSelector.innerText = ""
        }
    })
}

// -------------------------------------------------------------------
// ----------------- Event listener boutton commande -----------------
const orderForm = document.querySelector(".cart__order__form");
let orderButton = document.getElementById("order")
orderForm.addEventListener('submit', function (e) {
    e.preventDefault()
    let cartStorageLecture = localStorage.getItem("cart")
    let cartStorage = JSON.parse(cartStorageLecture)
    let okToSend = true

    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    // mise en place de conditions qui empêche l'envoi de la commande si le formulaire n'est pas bien rempli
    if (firstNameInput.value.length == 0) {
        firstNameErrorMsg.innerText = "Veuillez remplir ce champ"
        okToSend = false
    }
    if (/[0-9]/.test(firstNameInput.value)) {
        firstNameErrorMsg.innerText = "Merci de n'utiliser que des lettres"
        okToSend = false
    }
    if (lastNameInput.value.length == 0) {
        lastNameErrorMsg.innerText = "Veuillez remplir ce champ"
        okToSend = false
    }
    if (/[0-9]/.test(lastNameInput.value)) {
        lastNameErrorMsg.innerText = "Merci de n'utiliser que des lettres"
        okToSend = false
    }
    if (addressInput.value.length == 0) {
        addressErrorMsg.innerText = "Veuillez remplir ce champ"
        removeErrorMsgEmptyField(addressInput, addressErrorMsg)
        okToSend = false
    }
    if (cityInput.value.length == 0) {
        cityMsg.innerText = "Veuillez remplir ce champ"
        removeErrorMsgEmptyField(cityInput, cityMsg)
        okToSend = false
    }
    if (emailInput.value.length == 0) {
        emailErrorMsg.innerText = "Veuillez remplir ce champ"
        okToSend = false
    }
    else if (!regex.test(emailInput.value)) {
        emailErrorMsg.innerText = "Merci d'entrer une adresse email valide"
        okToSend = false
    }
    if (cartStorage.length === 0) { // empêche l'envoi de la commande si le panier est vide
        okToSend = false
    }
    else if (okToSend) { // permet l'envoi de la commande si le formulaire est bien rempli
        send()
    }
})

// envoie les informations au serveur via la requête POST 
async function send() {
    let idList = generateProductIdList();

    const toSend = {
        "contact": { // envoie l'objet contact
            "firstName": firstNameInput.value,
            "lastName": lastNameInput.value,
            "address": addressInput.value,
            "city": cityInput.value,
            "email": emailInput.value
        },
        "products": idList // envoie le tableau des produits
    }
    await fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(toSend)
    })

        .then(function (res) {
            if (res.ok) {
                return res.json()
            }
        })
        .then(function (result) { // dirige vers la page de validation de commande, en injectant l'id de la commande dans l'url
            document.location.href = `confirmation.html?orderId=${result.orderId}`
        })
}

// fonction qui récupère les ids uniques des produits dans le localstorage "cart", pour les réunir dans le tableau qui sera envoyé lors de la commande
function generateProductIdList() {
    const myCart = JSON.parse(localStorage.getItem("cart"))
    const idList = myCart.map((product) => product.id) // récupère les ids
    const noDuplicate = [...new Set(idList)] // créé un tableau des ids en supprimant les doublons
    return noDuplicate
}