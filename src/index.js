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




fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then((toysArray) => {
    toysArray.forEach((singleToy) => {
    turnToyToHTML(singleToy)
  })
})



function turnToyToHTML(toyObj) {

  //container for all of the cards for our toys
let allToys = document.querySelector('#toy-collection')

  //container for each toy
    let newToyDivTag = document.createElement('div')
      newToyDivTag.classList.add('card')

  //   h2 tag with the toy's name
    let newToyH2Tag = document.createElement('h2')
      newToyH2Tag.innerText = toyObj.name
      newToyDivTag.append(newToyH2Tag)

  // img tag with the src of the toy's image attribute and the class name "toy-avatar"
    let imgTag = document.createElement('img')
      imgTag.src = toyObj.image
      imgTag.className = "toy-avatar"
      newToyDivTag.append(imgTag)

  // p tag with how many likes that toy has
  let parTag = document.createElement('p')
    parTag.innerText = toyObj.likes
    newToyDivTag.append(parTag)

  // button tag with a class "like-btn"
  let likebutton = document.createElement('button')
  likebutton.className = "like-btn"
  likebutton.innerText = "Like"
    newToyDivTag.append(likebutton)


  allToys.append(newToyDivTag)

  likebutton.addEventListener("click ", (evt) => {
    //Update the Object in memory
    toyObj.likes += 1
   
    //Update the object in the backend
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: toyObj.likes
      })
    })
      .then(response => response.json())
      .then((data) => {
        parTag.innerText = data.likes
      })  
  }) 
}

const toyForm = document.querySelector("form.add-toy-form")

toyForm.addEventListener ("submit", (evt) => {
    evt.preventDefault()
    let nameInput = evt.target.name.value 
    let imageInput = evt.target.image.value

    

  // console.log(nameInput)
  // console.log(imageInput)

  fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: nameInput,
            image: imageInput,
            likes: 0
        })
    })
        .then(res => res.json())
        .then((newToy) => {
          turnToyToHTML(newToy)
            evt.target.reset()
        })
})



