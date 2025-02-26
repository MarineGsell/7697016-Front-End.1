// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = `${article.disponibilite === "oui" ? "En stock" : "Rupture de stock"}`;
        
        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
        // On rattache l’image à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        //Ajout des éléments au DOM pour l'exercice
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
    
     }
}

genererPieces(pieces)

// Bouton trier par prix croissant
const boutonTrierCroissant = document.querySelector(".btn-trier-croissant");
boutonTrierCroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
    document.querySelector(".fiches").innerHTML=""
    genererPieces(piecesOrdonnees)
});

// Bouton trier par prix décroissant
const boutonTrierDecroissant = document.querySelector(".btn-trier-décroissant");
boutonTrierDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnees);
    document.querySelector(".fiches").innerHTML=""
    genererPieces(piecesOrdonnees)
});

// Bouton filtres pièces abordables
const boutonFiltrerPrix = document.querySelector(".btn-filtrer-prix");
boutonFiltrerPrix.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees)
    document.querySelector(".fiches").innerHTML=""
    genererPieces(piecesFiltrees)
});

// Bouton filtres pièces avec description
const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description");
boutonFiltrerDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description !== "";
    });
    console.log(piecesFiltrees)
    document.querySelector(".fiches").innerHTML=""
    genererPieces(piecesFiltrees)
});

// Récupérer seulement le nom des pièces
const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1)
   }
}
console.log(noms)

//Liste des pièces abordables
//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = noms[i];
   abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
   .appendChild(abordablesElements)

// Liste des pièces disponibles
const disponiblesElements = document.createElement("ul")

// Récupérer les pièces disponnibles
const nomsDispo = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].disponibilite === "non"){
       nomsDispo.splice(i,1)
   }
}
console.log(nomsDispo)

// Récupérer le prix des pieces dispo
const prixDispo = pieces.map(piece => piece.prix)
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].disponibilite === "non"){
        prixDispo.splice(i,1)
    }
 }
 console.log(prixDispo)

// Concaténation nom et prix des pièces dispo
for (let i = 0; i < prixDispo.length; i++) {
    let nomsPrixDispo = `${nomsDispo[i]} - ${prixDispo[i]}€`
    console.log(nomsPrixDispo)
    let listeNomsPrixDispo = document.createElement("li")
    listeNomsPrixDispo.innerText = nomsPrixDispo
    disponiblesElements.appendChild(listeNomsPrixDispo)
}

// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.disponibles')
   .appendChild(disponiblesElements)

// Filtre sur le range
const inputRange = document.getElementById("prix-range");
console.log(inputRange)
inputRange.addEventListener('input', function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= inputRange.value;
    });
    console.log(piecesFiltrees)
    document.querySelector(".fiches").innerHTML=""
    genererPieces(piecesFiltrees)
});