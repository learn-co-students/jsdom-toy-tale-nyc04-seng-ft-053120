
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
});

let toyCollection = document.querySelector("#toy-collection")
let toyForm = document.querySelector(".add-toy-form")

fetch("http://localhost:3000/toys")
.then(r => r.json())
.then((toysArray) => {
  toysArray.forEach((singleToy) => {
    turnToyToHTML(singleToy)
  })
})

let turnToyToHTML = (toyObj) => {

  let toyDiv = document.createElement("div")
  toyDiv.classname = "card"

  toyDiv.innerHTML = `<h2>${toyObj.name}</h2>
  <img src="${toyObj.image}" class="toy-avatar"/>
  <p>${toyObj.likes} Likes </p>
  <button class="like-btn">Like <3</button>`

toyCollection.append(toyDiv)

let likesButton = toyDiv.querySelector(".like-btn")
let likesP = toyDiv.querySelector("p")

likesButton.addEventListener("click", (evt) => {
 toyObj.likes += 1

 fetch(`http://localhost:3000/toys/${toyObj.id}`, {
   method : "PATCH",
   headers : {
  "Content-Type": "application/json",
  'Accept': "application/json"
},
body: JSON.stringify({
  likes : toyObj.likes
})
 })
.then(r => r.json())
.then((updatedToy) => {
  likesP.innerText = `${updatedToy.likes} Likes`
  })
})
}

toyForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  let toyName = evt.target.name.value
  let toyImg = evt.target.image.value

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-type": "Application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImg,
      likes: 0 
    })
  })
    .then(res => res.json())
    .then((newlyCreatedToy) => {
      turnToyToHTML(newlyCreatedToy)
    })
})
