let addToy = false;

const toyCollection = document.querySelector("#toy-collection")
const addToyForm = document.querySelector(".add-toy-form")

const toyToDom = (toyJson) => {

  const toyDiv = document.createElement("div")
  toyDiv.className = "card"

  const toyH2 = document.createElement("h2")
  toyH2.innerText = toyJson.name
  toyDiv.append(toyH2)

  const toyImage = document.createElement("img")
  toyImage.src = toyJson.image
  toyImage.className = "toy-avatar"
  toyDiv.append(toyImage)

  const toyPtag = document.createElement("p")
  toyPtag.id = toyJson.id.toString()
  toyPtag.innerText = `${toyJson.likes} Likes`
  toyDiv.append(toyPtag)

  const toyLikeButton = document.createElement("button")
  toyLikeButton.innerText = "Like <3"
  toyDiv.append(toyLikeButton)

  toyLikeButton.addEventListener("click", (evt) => incrementLikes(toyJson))

  toyCollection.append(toyDiv)
}

const updateToyDom = (toy) => {
  const select = `#${toy.id}`
  const toyPt = document.getElementById(`${toy.id}`)
  toyPt.innerText = `${toy.likes} Likes`
}

const incrementLikes = (toy) => {
  console.log(toy)
  toy.likes += 1;

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy)
  }
  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
    .then(res => res.json())
    .then(toy => {
      updateToyDom(toy)
    })
}


document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toyArray => {
      toyArray.forEach(toyJson => toyToDom(toyJson))
    })

  addBtn.addEventListener("click", (evt) => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  addToyForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    console.log(evt.target)

    let formData = {
      name: evt.target["name"].value,
      image: evt.target["image"].value,
      likes: 0
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch("http://localhost:3000/toys", configObj)
      .then(res => res.json())
      .then(toy => {
        toyToDom(toy)
      })
  })


});


