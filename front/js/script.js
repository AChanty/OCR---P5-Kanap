fetch("http://localhost:3000/api/products") // appelle l'API
    .then(function (response) {
        if (response.ok) {
            return response.json(); // si la requête s'est bien passée, retourne le résultat de la requête au format .json
        }
    })
    .then(function (product) {
        // document
        //     .querySelector("#items img")
        //      met à jour les valeurs "src" et "alt"
        //     .setAttribute("src", product[0].imageUrl)
        //     .setAttribute("alt", product[0].altTxt);

        // document
        //     .querySelector("#items .productName")
        //     .innerText = product[0].name;

        // document
        //     .querySelector("#items .productDescription")
        //     .innerText = product[0].description;

        // suppression de l'élément HTML contenant le canapé type, afin qu'ils soient tous générés via la boucle ci-dessous
        // const supp = document.querySelector("#items a")
        // supp.remove()

        // création d'une boucle qui va recréer le template HTML du canapé tant que la condition est valide (= longueur du tableau des produits), puis la boucle va
        // parcourir les infos du tableau pour les insérer dans les différentes valeurs [i]
        // i = 1 si je laisse le premier canapé en HTML
        for (let i = 0; i < product.length; i++) {

            // // créé un nouvel élément <a> dans la <section> #items
            // let itemsSection = document.getElementById("items")
            // let newLink = document.createElement('a');
            // newLink.setAttribute("href", `./product.html?id=${product[i]._id}`)
            // itemsSection.appendChild(newLink);

            // // créé un nouvel élément <article> dans le nouvel élément <a>
            // let newArticle = document.createElement('article');
            // newLink.appendChild(newArticle);

            // // créé un nouvel élément <img> dans le nouvel élément <article>
            // let newImg = document.createElement('img');
            // newImg.setAttribute("src", product[i].imageUrl)
            // newImg.setAttribute("alt", product[i].altTxt);
            // newArticle.appendChild(newImg);

            // // créé un nouvel élément <h3> dans le nouvel élément <article>
            // let newTitle = document.createElement('h3');
            // newTitle.textContent = product[i].name;
            // newArticle.appendChild(newTitle);

            // // créé un nouvel élément <p> dans le nouvel élément <article>
            // let newParagraph = document.createElement('p');
            // newParagraph.textContent = product[i].description;
            // newArticle.appendChild(newParagraph);

            //////////////////////////////////////////////////////////////
            
            const { name, description, altTxt, imageUrl, _id: id } = product[i]

            // créé un nouvel élément <a> dans la <section> #items
            let itemsSection = document.getElementById("items")
            let newLink = document.createElement('a')
            newLink.setAttribute("href", `./product.html?id=${id}`)
            itemsSection.appendChild(newLink)

            // créé un nouvel élément <article> dans le nouvel élément <a>
            let newArticle = document.createElement('article');
            newLink.appendChild(newArticle)

            // créé un nouvel élément <img> dans le nouvel élément <article>
            let newImg = document.createElement('img')
            newImg.setAttribute("src", imageUrl)
            newImg.setAttribute("alt", altTxt)
            newArticle.appendChild(newImg)

            // créé un nouvel élément <h3> dans le nouvel élément <article>
            let newTitle = document.createElement('h3');
            newTitle.textContent = name
            newArticle.appendChild(newTitle)

            // créé un nouvel élément <p> dans le nouvel élément <article>
            let newParagraph = document.createElement('p')
            newParagraph.textContent = description
            newArticle.appendChild(newParagraph)

        }
    })