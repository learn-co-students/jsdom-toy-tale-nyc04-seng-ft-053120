let addToy = false;

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionDiv = document.querySelector("#toy-collection");
  
  fetch(`http://localhost:3000/toys`)
  .then(res => res.json())
  .then((arrayToys) => {
    arrayToys.forEach((singleToyObject) => {
      turnToyToHTML(singleToyObject)
      // turnToyToHtml({id: 1, name: “Woody”, image: “http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png”, likes: 7})
    })
  })
  let turnToyToHTML = (toyObject) => {
    let toyDiv = document.createElement("div")
    toyDiv.classList.add("card")
    toyDiv.innerHTML =`<div class="card">
    <h2>${toyObject.name}</h2>
    <img src = ${toyObject.image} class="toy-avatar" />
    <p>${toyObject.likes}Likes </p>
    <button class="like-btn">Like <3</button>
    </div>`
    toyCollectionDiv.append(toyDiv)
    // let increaseButton = toyDiv.querySelector(“.increase”)
    let likeCount = toyDiv.querySelector(".like-btn")
    likeCount.addEventListener("click", (evt) =>{
      toyObject.likes++
      fetch(`http://localhost:3000/toys/${toyObject.id}`,{
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'Application/json'
        },
        body: JSON.stringify({
          likes: toyObject.likes
        })
      })
        .then(res => res.json())
        .then((updatedToy)=>{
          likeCount.innerText = updatedToy.likes
        })
    })
  }
  const newToyForm = document.querySelector(".add-toy-form")
  newToyForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let toyName = evt.target.name.value
    let toyImage = evt.target.image.value
    fetch(`http://localhost:3000/toys`, {
      method: 'POST',
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({
         name: toyName,
         image: toyImage,
         likes: 1
      })
    })
    .then(r =>r.json())
    .then((newToyCreated)=> {
      turnToyToHTML(newToyCreated)
      // reset the form to have user info in the bottom of list
      evt.target.reset()
    })
  })


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

