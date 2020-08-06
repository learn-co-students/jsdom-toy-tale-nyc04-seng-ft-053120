let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollectionDiv = document.querySelector("#toy-collection");
const toyForm = document.querySelector(".add-toy-form");

fetchToys();
toyForm.addEventListener("submit", postToy);
toyCollectionDiv.addEventListener("click", addLikeToToy);
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});


function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toyArray => {
    toyArray.forEach(toyObject => {
      addToyDivToDOM(createToyCard(toyObject));
    })
  })
}


function createToyCard(toyObject) {
  // return a div with class="card" for a toy object
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.id = toyObject.id;
  cardDiv.innerHTML = `
    <h2>${toyObject.name}</h2>
    <img src=${toyObject.image} class="toy-avatar" />
    <p class="toy-likes">${toyObject.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  `
  return cardDiv
}

function addToyDivToDOM(cardDiv) {
  toyCollectionDiv.append(cardDiv);
}


function postToy(evt) {
  evt.preventDefault();

  const form = evt.target;
  const toyNameInput = form.name.value;
  const toyImageInput = form.image.value; 

  const toyBody = { 
    name: toyNameInput,
    image: toyImageInput,
    likes: 0
  }

  const postConfig = {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json" 
    },
    body: JSON.stringify(toyBody)
  }

  fetch("http://localhost:3000/toys", postConfig)
    .then(response => response.json())
    .then(toyObject => addToyDivToDOM(createToyCard(toyObject)))

  form.reset();
}


function addLikeToToy(evt) {
  if (evt.target.tagName === "BUTTON") {
    const button = evt.target;
    const toyId = button.parentElement.id;
    const likeParagraph = button.parentElement.querySelector(".toy-likes")
    // parseInt will parse a string into an integer if the integer appears first
    const currentNumLikes = parseInt(likeParagraph.innerText);
    const newNumLikes = currentNumLikes + 1;    

    const patchConfig = {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json" 
      },
      body: JSON.stringify({
        "likes": newNumLikes
      })
    }

    fetch(`http://localhost:3000/toys/${toyId}`, patchConfig)
      .then(response => response.json())
      .then(_ => {
        likeParagraph.innerText = `${newNumLikes} Likes`
      })
  }
}