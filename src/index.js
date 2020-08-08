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
// need acess to location of were we are adding the toys to
const divToyContainer = document.querySelector("#toy-collection")

fetch("http://localhost:3000/toys")
.then(response => (response.json()))
.then(data => {
  data.forEach(toy => {
    turnToHtml(toy)
  })
})

function turnToHtml(dataElement){
  // this function creates the div and appends
  const newToyDiv = document.createElement("div")
   newToyDiv.className = "card"
  // newToyDiv.innerHTML = ` 
  //   <h2>${dataElement.name}</h2>
  //   <img src= ${dataElement.image} class="toy-avatar" />
  //   <p> ${dataElement.likes} Likes </p>
  //   <button class="like-btn"> Like ❤️ </button>`
  // divToyContainer.append(newToyDiv)
  const toyName = document.createElement("h2")
    toyName.innerText = dataElement.name
  const toyImg = document.createElement("img")
    toyImg.className = "toy-avatar"
    toyImg.src = dataElement.image
  const toyLikes = document.createElement("p")
    toyLikes.innerText = `${dataElement.likes} Likes`
  const likeBtn = document.createElement("button")
    likeBtn.className = "like-btn"
    likeBtn.innerText = "Like ❤️ "
  
   newToyDiv.append(toyName, toyImg, toyLikes, likeBtn)
   divToyContainer.append(newToyDiv) 
  //  when creating a new html need to apply that creations event listeners

  likeBtn.addEventListener("click", evt => {
    dataElement.likes += 1
    fetch(`http://localhost:3000/toys/${dataElement.id}`, {
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      // json.stringfy only accepts hashes
      body: JSON.stringify({
        "likes": dataElement.likes
      })
    })
      .then(resp =>resp.json())
      .then(updatedToy =>{
        toyLikes.innerText = `${updatedToy.likes} Likes`
      })

  })
}

const newToyForm = document.querySelector(".add-toy-form")

newToyForm.addEventListener("submit", (evt)=>{
  evt.preventDefault()
  console.log()
  const newToy = { 
    name: evt.target.name.value,
    image: evt.target.image.value,
    likes: 0 
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newToy)
    // this posts it to the back end
  })
  .then(response => response.json())
  .then( toy =>(
    // what do we want to to do with the new data?>
    turnToHtml(toy))
  )


})