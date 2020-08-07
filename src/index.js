let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

const toyCollection = document.querySelector('div#toy-collection');
const addToyForm = document.querySelector('form.add-toy-form');

fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toysObjArray => {
    toysObjArray.forEach((toyObj) => turnToyToHTML(toyObj))
  });

function turnToyToHTML(toyObj) {
  let toyCard = document.createElement('div'),
      toyName = document.createElement('h2'),
      toyImg = document.createElement('img'),
      toyLikes = document.createElement('p'),
      toyLikesBtn = document.createElement('button');

  toyCard.className = 'card';
  toyName.innerText = `${toyObj.name}`;
  toyImg.src = `${toyObj.image}`;
  toyImg.className = 'toy-avatar';
  toyLikes.innerText = `${toyObj.likes} Likes`;
  toyLikesBtn.className = 'like-btn';
  toyLikesBtn.innerText = 'Like <3';

  toyCard.append(toyName, toyImg, toyLikes, toyLikesBtn);
  toyCollection.append(toyCard);

  toyLikesBtn.addEventListener('click', (e) => {
    toyObj.likes += 1
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        likes: toyObj.likes
      })
    })
    .then(response => response.json())
    .then(toyObj => {
      toyLikes.innerText = `${toyObj.likes} Likes`
    })
  });

};

addToyForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let newToyName = e.target.name.value;
  let newToyImage = e.target.image.value;
  let newToyObj = {
    name: newToyName,
    image: newToyImage,
    likes: 0
  };

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(newToyObj)
  })
  .then(response => response.json())
  .then(toyObj => {
    turnToyToHTML(toyObj);
    e.target.reset()
  });
});