let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyFormContainer = document.querySelector('.container');
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = 'block';
    } else {
      toyFormContainer.style.display = 'none';
    }
  });
});

const toyCollection = document.querySelector('#toy-collection');
const addToyForm = document.querySelector('.container');

fetch('http://localhost:3000/toys')
  .then((response) => response.json())
  .then((toysArray) => {
    toysArray.forEach((toyObject) => {
      htmlConversion(toyObject);
    });
  });

const htmlConversion = (toyObject) => {
  const toyDiv = document.createElement('div');
  toyDiv.classList.add('card');

  toyDiv.innerHTML = `<h2>${toyObject.name}</h2>
    <img src='${toyObject.image}' class="toy-avatar" />
    <p id='p-likes'>${toyObject.likes} Likes </p>
    <button class="like-btn">Like <3</button>`;

  const toyButton = toyDiv.querySelector('.like-btn');
  const pToy = toyDiv.querySelector('#p-likes');

  toyButton.addEventListener('click', (event) => {
    toyObject.likes += 1;

    fetch(`http://localhost:3000/toys/${toyObject.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        likes: toyObject.likes,
      }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        pToy.innerText = `${updatedToy.likes} Likes`;
      });
  });

  toyCollection.append(toyDiv);
};

addToyForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const toyName = event.target.name.value;
  const toyImage = event.target.image.value;

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0,
    }),
  })
    .then((response) => response.json())
    .then((newToy) => {
      htmlConversion(newToy);
      event.target.reset();
    });
});
