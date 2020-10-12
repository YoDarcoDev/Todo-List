const form = document.querySelector('form');
const liste = document.querySelector('ul');
const input = document.querySelector('input');
let toutesLestaches = [];

form.addEventListener('submit', event => {
    event.preventDefault();

    const text = input.value.trim()  // Récupère l'input et enleve les espaces
    
    if (text !== "") {
        rajouterUneTache(text);
        input.value = ""             // Vider l'input
    }
})


// AJOUTER UNE TACHE AVEC UN TEXT ET UN ID 
function rajouterUneTache(text) {
    
    const todo = {
        text,
        id: Date.now()       // Créer un id à partir de la date en ms
    }

    afficherListe(todo);
}



// AFFICHER LISTE EN Y INCLUANT CHAQUE ELEMENT DANS LES LI

function afficherListe(todo) {                          // CREATION LI

    const item = document.createElement('li');          // ID
    item.setAttribute('data-key', todo.id);

    const input = document.createElement('input');      // CHECKBOX
    input.setAttribute('type', 'checkbox');
    input.addEventListener('click', tacheFaite);
    item.appendChild(input);

    const txt = document.createElement('span');         // TEXTE
    txt.innerText = todo.text;
    item.appendChild(txt);

    const btn = document.createElement('button');       // BUTTON
    btn.addEventListener('click', supprimerTache);
    const img = document.createElement('img');
    img.setAttribute('src', 'ressources/fermer.svg');
    btn.appendChild(img)
    item.appendChild(btn);

    liste.appendChild(item);
    toutesLestaches.push(item);
    console.log(toutesLestaches);
}


// AJOUTER CLASSE POUR BARRER LA TACHE 
function tacheFaite(e) {
    e.target.parentNode.classList.toggle('finDeTache');
}


// SUPPRIMER TACHE DU DOM ET DU TABLEAU
function supprimerTache(e) {

    toutesLestaches.forEach(el => {

        // e.target => bouton et on regarde son parent li qui a l'attribut data-key avec don id

        if (e.target.parentNode.getAttribute('data-key') === el.getAttribute('data-key')) {  
            el.remove();            // Permet de l'enlever du DOM

            toutesLestaches = toutesLestaches.filter(li => li.dataset.key !== el.dataset.key); // Garder les li avec id différent de l'élément li que l'on supprime
        }
    })
}