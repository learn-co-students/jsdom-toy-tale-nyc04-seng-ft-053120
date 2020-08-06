let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyForm = toyFormContainer.querySelector('.add-toy-form');
const toyCollectionDiv = document.querySelector("#toy-collection");

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

toyForm.addEventListener('submit', postToy);

fetchAndShowToys();

function postToy(e) {
  e.preventDefault();
  
  const form = e.target;
  const toyName = form.name.value;
  const toyURL = form.image.value;
  const toyLikes = 0;
  toyObj = {
    name: toyName,
    image: toyURL,
    likes: toyLikes
  }

  const postConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  }
  
  fetch('http://localhost:3000/toys', postConfig)
    .then(resp => resp.json())
    .then(toy => addToyOnPage(toy));

  form.reset();
}

function fetchAndShowToys() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => toys.forEach(toy => addToyOnPage(toy)));
}

function addToyOnPage(toy) {
  toyCard = createToyCardDiv(toy);
  toyCollectionDiv.append(toyCard);
}

function createToyCardDiv(toy) {
  const toyDiv = document.createElement('div');
  toyDiv.classList.add('card');
  toyDiv.id = toy.id;
  
  const h2 = document.createElement('h2');
  h2.innerText = toy.name;

  const img = document.createElement('img');
  img.src = toy.image;
  img.classList.add('toy-avatar');

  const p = document.createElement('p');
  p.innerText = `${toy.likes} Likes`;

  const button = document.createElement('button');
  button.innerText = "Like <3";
  button.classList.add('like-btn');
  button.addEventListener('click', addLike);

  toyDiv.append(h2, img, p, button);

  return toyDiv;
}

function addLike(e) {
  e.preventDefault();
  const likeButton = e.target;
  const toyId = likeButton.parentElement.id;
  const toyLikesP = likeButton.previousSibling;
  const toyLikes = parseInt(toyLikesP.innerText);
  const newToyLikes = toyLikes + 1;

  const patchConfig = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: newToyLikes
    })
  }

  fetch(`http://localhost:3000/toys/${toyId}`, patchConfig)
    .then(resp => resp.json())
    .then(toy => toyLikesP.innerText = `${toy.likes} Likes`)
}