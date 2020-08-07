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

const toyCollection = document.querySelector('#toy-collection')
const toyForm = document.querySelector('.add-toy-form')

fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then((toyArray) => {
    toyArray.forEach((singleToy) => {
      turnToyToHtml(singleToy)
    })
  })

  let turnToyToHtml = (toyObj) => {

    // CREATE OUTER BOX
    let toysDiv = document.createElement("div")
    toysDiv.classList.add("card")

    // FILL  THE CONTENTS OF THE BOX
    toysDiv.innerHTML = `<h2>${toyObj.name}</h2>
    <img src="${toyObj.image}" class="toy-avatar" />
    <p class="toy-likes">${toyObj.likes} Likes </p>
    <button class="like-btn">Like <3</button>`

    // SLAP THE OUTER BOX ON THE DOM
    toyCollection.append(toysDiv)

    // event listener for the likes button
    const likeToyButton = toysDiv.querySelector(".like-btn")
    let parToy = toysDiv.querySelector(".toy-likes")
    //debugger

    likeToyButton.addEventListener('click', (evt) => {
      // UPDATING THE OBJECT IN MEMORY
      toyObj.likes += 1
      // UPDATING THE BACKEND
      fetch(`http://localhost:3000/toys/${toyObj.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          likes: toyObj.likes 
        })
      }) // FETCH ENDS 
          .then(resp => resp.json())
          .then((updatedLikes) => {
            // UPDATING WHAT THE USER SEES ON THE DOM
              parToy.innerText = updatedLikes.likes
      })
    })
  } // END OF HELPER METHOD

  toyForm.addEventListener('submit', (evt) => {
    evt.preventDefault()

    let toyName = evt.target.name.value 
    let toyImage = evt.target.image.value 
   
   fetch("http://localhost:3000/toys", {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       name: toyName,
       image: toyImage,
       likes: 0
     })
   })
   .then(resp => resp.json())
   .then((newToy) => {
     turnToyToHtml(newToy)
     evt.target.reset()
   })
 })
