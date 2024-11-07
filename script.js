//FUNCTIONS
const overlayOnClic = (card, overlayHandler) => {
  card.addEventListener("click", () => {
    if (isOverlayOn) {
      card.classList.remove("overlay");
      isOverlayOn = false;
    } else {
      card.classList.add("overlay");
      isOverlayOn = true;
    }
  });
};

//HTML ELEMENTS
const postsGroupEl = document.getElementById("posts-group");

const postsNumber = 6;
let isOverlayOn = false;

//prendo i dati dall'api
fetch("https://jsonplaceholder.typicode.com/photos?_limit=" + postsNumber)
  .then((res) => res.json())
  .then((postsArray) => {
    //genero le cards in base ai dati presi
    postsArray.forEach((post, index) => {
      postsGroupEl.innerHTML += `      
        <div class="col">
        <div class="card post-card" id="${post.id}">
          <img class="pin" src="./img/pin.svg">
          <img class="post-image" src="${post.url}">
          <p>${post.title}</p>
        </div>
      </div>`;
    });
    //gestisco l'overlay quando si clicca sulle carte
    const postCardsEl = document.querySelectorAll(".post-card");
    postCardsEl.forEach((card) => {
      overlayOnClic(card, isOverlayOn);
    });
  });
