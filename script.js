//FUNCTIONS
const overlayOnClick = (card, button) => {
  //click iniziale sulla card
  card.addEventListener("click", (e) => {
    if (!card.classList.contains("overlay")) {
      card.classList.add("overlay");
      button.classList.remove("d-none");
    }
  });
  //click sul bottone per uscire
  if (button.classList.contains("d-none")) {
    button.addEventListener("click", () => {
      button.classList.add("d-none");
      card.classList.remove("overlay");
    });
  }
};

//HTML ELEMENTS
const postsGroupEl = document.getElementById("posts-group");

const postsNumber = 6;

//prendo i dati dall'api
fetch("https://jsonplaceholder.typicode.com/photos?_limit=" + postsNumber)
  .then((res) => res.json())
  .then((postsArray) => {
    //genero le cards in base ai dati presi
    postsArray.forEach((post) => {
      postsGroupEl.innerHTML += `      
        <div class="col container-fluid mb-5">
        <div class="card post-card" id="${post.id}">
          <img class="pin" src="./img/pin.svg">
          <img class="post-image" src="${post.url}">
          <p>${post.title}</p>
        </div>
        <button class="btn d-none border bg-white" type="button" id="overlay-exit${post.id}"><i class="fa-solid fa-x"></i></button>
      </div>`;
    });
    //gestisco l'overlay quando si clicca sulle carte
    const postCardsEl = document.querySelectorAll(".post-card");
    const postsButtons = [];
    postCardsEl.forEach((card, index) => {
      postsButtons[index] = document.getElementById(`overlay-exit${card.id}`);
      overlayOnClick(card, postsButtons[index]);
    });
  })
  //gestisco l'eventualità non vada il servizio api
  .catch((error) => {
    console.log(error);
    postsGroupEl.innerHTML += `
      <div class="col-12">
        <div class="alert alert-danger">
          ${error}
        </div>
      </div>
    `;
  });
