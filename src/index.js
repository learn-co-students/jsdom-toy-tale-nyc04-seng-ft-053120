let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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

  let toyCollection = document.querySelector("#toy-collection")

  let toyForm = document.querySelector(".add-toy-form")

  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then((toysArray) => {
      toysArray.forEach((toysObj) => {
        turnToyIntoHTML(toysObj)
      })
    })

  let turnToyIntoHTML = (toyObj) => {
    let cardDiv = document.createElement("div")
    cardDiv.className = "card"

    let nameHeader = document.createElement("h2")
    nameHeader.innerText = `${toyObj.name}`

    let toyImg = document.createElement("img")
    toyImg.className = "toy-avatar"
    toyImg.src = `${toyObj.image}`

    let likes = document.createElement("p")
    likes.innerText = `${toyObj.likes} Likes`

    let likeButton = document.createElement("button")
    likeButton.className = "like-btn"
    likeButton.innerText = "Like ❤️"

    cardDiv.append(nameHeader, toyImg, likes, likeButton)

    toyCollection.append(cardDiv)

    // update likes
    likeButton.addEventListener("click", (evt) => {
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
      .then(res => res.json())
      .then((updatedToy) => {
        likes.innerText = `${updatedToy.likes} Likes`
      })
  
    })

  }

  toyForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    let toyName = evt.target.name.value
    let toyImage = evt.target.image.value

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 0
      })
    })
    .then(res => res.json())
    .then((toyObj) => {
      turnToyIntoHTML(toyObj)
      evt.target.reset()
    })
  })



});
