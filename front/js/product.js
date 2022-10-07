fetch("http://localhost:3000/api/products") // appelle l'API
    .then(function (response) {
        if (response.ok) {
            return response.json(); // si la requête s'est bien passée, retourne le résultat de la requête au format .json
        }
    })
    .then(function (product) {


        for (let i = 0; i < product.length; i++) {

            const { name, description, altTxt, imageUrl, _id: id, price, colors } = product[i]

            const currenttUrl = window.location.href; // récupère l'URL de la page actuelle
            const url = new URL(currenttUrl);
            const idUrl = url.searchParams.get("id"); // récupère l'id dans l'URL actuel
            console.log(idUrl);

            if (idUrl === id) { // donne des instructions lorsque l'url correspond bien à l'id du produit, pour bien faire correspondre les deux
                console.log(id)

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

                // ajoute les options de couleurs
                for (let i = 0; i < product[i].colors.length; i++) {
                    let itemOptions = document.getElementById('colors')
                    let newOption = document.createElement('option')
                    newOption.setAttribute("value", product[i].colors[i])
                    newOption.textContent = product[i].colors[i]
                    itemOptions.appendChild(newOption)
                }


                break; // arrête la boucle lorsque l'id de l'url correspond à l'id du produit

            }

        }

    }
    )