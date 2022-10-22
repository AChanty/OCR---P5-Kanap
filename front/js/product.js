fetch("http://localhost:3000/api/products") // appelle l'API
    .then(function (response) {
        if (response.ok) {
            return response.json(); // si la requête s'est bien passée, retourne le résultat de la requête au format .json
        }
    })
    .then(function (product) {

        const currenttUrl = window.location.href // récupère l'URL de la page actuelle
        const url = new URL(currenttUrl)
        const idUrl = url.searchParams.get("id") // récupère l'id dans l'URL actuel

        const myProduct = product.find((sofa) => { // fonction qui va vérifier dans la liste des produits si on a un id correspondant à l'id contenu dans l'url de la page
            return sofa._id === idUrl
        })

        if (myProduct) { // donne des instructions lorsque l'url correspond bien à l'id du produit, pour bien faire correspondre les deux
            const { name, description, altTxt, imageUrl, _id: id, price, colors } = myProduct

            // créé un nouvel élément <img> dans la classe "item__img"'
            let imgContainer = document.querySelector(".item__img")
            let newImg = document.createElement('img')
            newImg.setAttribute("src", imageUrl)
            newImg.setAttribute("alt", altTxt)
            imgContainer.appendChild(newImg)

            // ajoute la description du produit correspondant
            let itemDescription = document.getElementById('description')
            itemDescription.textContent = description

            // ajoute le nom du produit correspondant
            let itemName = document.getElementById('title')
            itemName.textContent = name

            // ajoute le prix du produit correspondant
            let itemPrice = document.getElementById('price')
            itemPrice.textContent = price

            insertOptions(colors)
            function insertOptions(colorList) { // insère les options de couleurs
                let itemOptions = document.getElementById('colors')

                for (let i = 0; i < colorList.length; i++) { // pour chaque option de couleur disponible pour le produit, créé une balise HTML "option" avec la valeur de la couleur
                    let newOption = document.createElement('option')
                    itemOptions.appendChild(newOption)
                    newOption.setAttribute("value", colorList[i])
                    newOption.textContent = colorList[i]
                }
            }

            // panier où sont stockés les articles via localstorage
            let cartArray = localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem("cart")) : [] // récupère les informations de localstorage "cart" s'il en contient, sinon, créé un array "cartArray" vide

            let addButton = document.getElementById('addToCart')
            let quantityTotal = 0

            // mise en place des événements (ajout des produits, quantité, couleurs) lors du clic sur le bouton "ajout au panier"
            addButton.addEventListener('click', function () {
                let quantity = document.getElementById('quantity')
                let quantityChosen = quantity.value
                let colorsList = document.getElementById('colors')
                let colorChosen = colorsList.options[colorsList.selectedIndex].value // cible la couleur choisie parmi les options disponibles dans la balise HTML select.colors

                // fonction permettant d'ajouter l'article dans le panier et le localstorage
                function pushNewItem() {
                    cartArray.push({ "id": id, "color": colorChosen, "amount": Number(quantityChosen) })
                }

                if (colorChosen == false || quantityChosen == 0 || quantityChosen > 100) { // si une couleur ou un nombre d'article n'est pas indiqué, renvoie une alerte d'erreur
                    alert("Veuillez choisir une couleur et un nombre d'article valide à ajouter au panier")

                } else if (!cartArray.includes(myProduct) && !cartArray.includes(colorChosen) && !cartArray.find(product => product.id === id)) { // si le produit et la couleur ne sont pas déjà présents dans le panier
                    quantityTotal += Number(quantityChosen)
                    pushNewItem()
                    console.log("1. ni le produit ni la couleur ne sont pas déjà présents dans le panier")

                } else if (cartArray.find(product => product.id === id) && !cartArray.find(product => product.color === colorChosen)) { // si le produit est déjà présent mais pas la variation de couleur, on ajoute un nouvel array
                    pushNewItem()
                    console.log("2. produit présent mais nouvelle couleur")

                } else if (cartArray.find(product => product.id === id) && cartArray.find(product => product.color === colorChosen)) { // si le produit et la couleur sont déjà présents dans le panier, on ajoute la quantité à la couleur choisie
                    const newAmount = cartArray.findIndex((obj => obj.id == id && obj.color == colorChosen))
                    cartArray[newAmount].amount += Number(quantityChosen) // cible la propriété "amount" de l'article dane le localstorage et la met à jour
                    console.log("3. produit et couleur déjà présents, actualisation du montant")
                }

                // stocke les données du panier dans le localstorage en les convertissant en chaîne JSON
                let cartStorage = JSON.stringify(cartArray)
                localStorage.setItem("cart", cartStorage)

                console.log(cartArray)
            })

        }

    }
    )