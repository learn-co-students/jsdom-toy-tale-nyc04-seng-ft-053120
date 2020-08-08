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

  const createToy = document.querySelector(".add-toy-form");
  console.log(createToy)
 createToy.addEventListener("submit", (evt) => {
   
   evt.preventDefault()

    let newToy = evt.target.name.value 
    let imageToy = evt.target.image.value
   

   fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: newToy,
        image: imageToy,
        likes: 0
    })
    })
    .then(res => res.json())
    .then((newToy) => {
        toyToHtml(newToy)
        evt.target.reset()
       
    })
})

});
 
 let toyDiv= document.querySelector("#toy-collection")

fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then((toys) => { 
    toys.forEach((eachToy) => {
    
      toyToHtml(eachToy)


    });

  });
   
 let toyToHtml = (toyObj) => {
   // 1) Create the outer box
 let toyCard = document.createElement("div")
   toyCard.classList.add("card")
   // 2) Fill the contents of the box
   toyCard.innerHTML = `<h2>${toyObj.name}</h2>
   <img src=${toyObj.image} class="toy-avatar" />
   <p>${toyObj.likes} likes </p>
   <button class="like-btn">Like <3</button>`
  
   // 3) Slap the outer box on the DOM

   toyDiv.append(toyCard)

   let increaseLikeBtn = toyCard.querySelector(".like-btn")
   let likesP = toyCard.querySelector("p")
   increaseLikeBtn.addEventListener("click", (evt) => {
    toyObj.likes += 1

    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: "PATCH",
      headers: {
      'Content-Type': 'application/json',
       'Accept': 'Application/json'
  },
    body: JSON.stringify({
      likes:toyObj.likes
     
    })
     
   })
   .then(res => res.json())
   .then((updatedToy) => { 
   likesP.innerText = `${updatedToy.likes} likes`
    
  
 })
})
 }