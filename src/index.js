let addToy = false;
const toyCollection  = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")

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


fetch("http://localhost:3000/toys")
.then(res => res.json())
.then((toysArray)=>{ 
  toysArray.forEach((singleToyObj) => {

    turnToytoHTML(singleToyObj)
    

  })
    

})

let turnToytoHTML = (toyObj) => {

    let toyDiv = document.createElement("div")
    // let toyButton = toyDiv.querySelector(".like-btn")
    toyDiv.classList.add("card")
    toyDiv.innerHTML = ` <h2>${toyObj.name}</h2>
    <img src="${toyObj.image}" class="toy-avatar" />
    <p class = "toyLikes"> ${toyObj.likes}Likes </p>
    <button class="like-btn">Like <3</button> `
    // let incrementButton = toyObj.likes
    let toyButton = toyDiv.querySelector(".like-btn")
    let likeIncrease = toyDiv.querySelector(".toyLikes")
    toyButton.addEventListener("click", (event) =>{
      
      toyObj.likes += 1
      //  incrementButton += 1
      
      //  event.preventDefault()
      
      fetch(`http://localhost:3000/toys/${toyObj.id}`, {
        
        
        method: "PATCH", 
        headers : {
          'Content-Type' : 'application/json',
          
        },
        body: JSON.stringify({ 
          
          // name: toyName, 
          // image: toyImage,
          likes: (toyObj.likes)
        })
        
      })
      .then(res =>res.json())
      .then((addLike)=> {
        
        
        // turnToytoHTML(addLike)
        likeIncrease.innerText = `${addLike.likes} likes`
        
      })
      
      
    })
    // l.addEventListener
    toyCollection.append(toyDiv)
  

    // debugger;
  }
  
  
  toyForm.addEventListener("submit", (event) => {
    
    event.preventDefault()
    let toyName = event.target.name.value
    // debugger;
    let toyImage = event.target.image.value
    
    
    fetch("http://localhost:3000/toys", {
      
      method: "POST", 
      headers : {
        'Content-Type' : 'application/json',
        
      },
     body: JSON.stringify({ 

       name: toyName, 
       image: toyImage,
       likes: 0
     })

    
})

   .then(res => res.json())
   .then((newToy)=>{

        turnToytoHTML(newToy)
        event.target.reset()
         

        // likes.addEventListener

   })

 })