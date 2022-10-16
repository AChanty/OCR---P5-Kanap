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


            // -------------------------------------------------------------------
            // ---------------- Mise en place de la structure HTML ---------------

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

            // fonction pour calculer le total des articles dans le panier
            itemsCalculation()

            // modifie la valeur de "value" ( = la quantité de produits de cette couleur), si on change la quantité manuellement dans l'input
            // puis recalcule le total d'articles dans le panier
            productQuantityInput.addEventListener("change", function () {
                productQuantityInput.setAttribute("value", productQuantityInput.value)
                itemsCalculation()
            })

            // fonction qui calcule/recalcule le nombre d'articles total dans le panier
            function itemsCalculation() {
                let allInputs = document.getElementsByClassName("itemQuantity")
                let total = 0
                for (let i = 0; i < allInputs.length; i++) {
                    total += parseInt(allInputs[i].value)
                    console.log("mise à jour du nombre total d'articles dans le panier")
                }
                totalQuantity.innerText = parseInt(total)
            }


            // créer un élément div.cart__item__content__settings__delete dans le parent div.cart__item__content__settings
            let contentSettingsDelete = document.createElement('div')
            contentSettingsDelete.classList.add("cart__item__content__settings__delete")
            contentSettings.appendChild(contentSettingsDelete)

            // créer un élément p dans le parent div.cart__item__content__settings__delete
            let contentSettingsDeleteItem = document.createElement('p')
            contentSettingsDeleteItem.classList.add("deleteItem")
            contentSettingsDelete.appendChild(contentSettingsDeleteItem)
            contentSettingsDeleteItem.innerText = "Supprimer"

            // supprime l'article au clic du bouton "supprimer"
            contentSettingsDeleteItem.addEventListener('click', function () {
                newArticle.remove() // supprime du DOM
                itemsCalculation() // recalcule le total d'articles dans le panier

                // removeLocalStorage() // supprime du localstorage
                // console.log(cartStorage)
                // function removeLocalStorage() {
                //     localStorage.removeItem(id)
                // }
            })
        }


        // affiche le prix total
        let totalPrice = document.getElementById("totalPrice")
        let allInputs = document.querySelectorAll(".cart__item__content__description p:last-child")
        totalCalculation()

        function totalCalculation() {
            let total = 0
            for (let i = 0; i < allInputs.length; i++) {
                total += parseInt(allInputs[i])
                console.log("mise à jour du calcul du total")
            }
            totalPrice.innerText = 65
        }
        // console.log(parseFloat(allInputs[0]) + parseFloat(allInputs[1]))
        // console.log(parseFloat(allInputs))


        // -------------------------------------------------------------------
        // --------------------- Formulaire de commmande ---------------------


        let contactArray = []

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

        let firstNameInput = document.getElementById("firstName")
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
        errorMsgContainsNumber(firstNameInput, firstNameErrorMsg)

        let lastNameInput = document.getElementById("lastName")
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
        errorMsgContainsNumber(lastNameInput, lastNameErrorMsg)

        let addressInput = document.getElementById("address")

        let cityInput = document.getElementById("city")

        let emailInput = document.getElementById("email")
        let emailErrorMsg = document.getElementById("emailErrorMsg")
        // message d'erreur si le champ ne contient ni "@" ni "."
        emailInput.addEventListener('input', function (e) {
            let value = e.target.value
            if (!value.includes('@') || !value.includes('.')) {
                emailErrorMsg.innerText = "Champ non valide"
            } else {
                emailErrorMsg.innerText = ""
            }
        console.log(firstNameInput.value)

        })

        let orderButton = document.getElementById("order")
        orderButton.addEventListener('click', function () {
            // fonction qui push les informations de contact dans le localstorage, si tous les champs sont remplis
            function pushContactInfo() {
                if (firstNameInput.value && lastNameInput.value && addressInput.value && cityInput.value && emailInput.value)
                    contactArray.push({ "firstName": firstNameInput.value, "lastName": lastNameInput.value, "address": addressInput.value, "city": cityInput.value, "email": emailInput.value })

                let contactStorage = JSON.stringify(contactArray)
                localStorage.setItem("contact", contactStorage)

            }
            pushContactInfo()
            console.log(contactArray)
        })


    }) // fermeture fetch