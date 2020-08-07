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


const toyContainer = document.querySelector("#toy-collection")
const toyForm = document.querySelector('.add-toy-form')

fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((toysArray) => {
    toysArray.forEach((singleToy) => {
      convertToHTML(singleToy)
    })
  });

  //HELPER METHOD
  const convertToHTML = (singleToy) => {
    //this is the outer box, aka our "bookbag"
    const toyDiv = document.createElement('div')
    toyDiv.className = "card"
      //this is the stuff inside the box, aka the "crap inside our bookbag"
      const toyName = document.createElement('h2')
      toyName.innerText = singleToy.name
      toyDiv.append(toyName)

      const toyImage = document.createElement('img')
      toyImage.className = "toy-avatar"
      toyImage.src = singleToy.image
      toyDiv.append(toyImage)

      const toyLikes = document.createElement('p')
      toyLikes.innerText = `${singleToy.likes} Likes`
      toyLikes.className = "toy-likes"
      toyDiv.append(toyLikes)

      const toyButton = document.createElement('button')
      toyButton.className = "like-btn"
      toyButton.innerText = `Like <3`
      toyDiv.append(toyButton)
    //slapping our outer box on the DOM!
    toyContainer.append(toyDiv)

    //creating an event listener for the button now, still inside convertToHTML
    let findToyButton = toyDiv.querySelector(".like-btn")
    let findToyLikes = toyDiv.querySelector(".toy-likes")

    toyButton.addEventListener('click', (event)=> {
      singleToy.likes += 1

      fetch(`http://localhost:3000/toys/${singleToy.id}`, {
        method: "PATCH",
        headers: {

          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          likes: singleToy.likes
        })
      })//end of fetch
        .then(response => response.json())
        .then((updatedLikes) => {
          findToyLikes.innerText = `${updatedLikes.likes} Likes`
        })
    }) //end of our button event listener



  }//end of our helper method

//event listener for our FORM 
toyForm.addEventListener('submit',(event) => {
  event.preventDefault()

  let toyName = event.target.name.value
  let toyImage = event.target.image.value

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
    })
  })
    .then(response => response.json())
    .then((newToy) => {
      convertToHTML(newToy)
      event.target.reset()
    })
})//END of our form eventlistener