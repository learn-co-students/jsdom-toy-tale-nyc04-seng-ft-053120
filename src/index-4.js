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

let toyCollectionDiv = document.querySelector("#toy-collection")
let toyForm = document.querySelector(".add-toy-form")

fetch(`http://localhost:3000/toys`)
.then(res => res.json())
.then(toysArr => {
    // console.log(toyData)
    toysArr.forEach(singleToy => {
        // console.log(singleToy)
        // calling the function on the forEach iterates through the 8 objects
        turnToyToHTML(singleToy)
    
    })
})

let turnToyToHTML = (toyObj) => {
    //{id: 1, name: "Woody", likes: 2} -> <div></div>
        //React's Render Method

    // 1) Create the outer most method    
    let outerToyDiv = document.createElement("div")
        outerToyDiv.className = "card"
        // console.log(outerToyDiv)

    // 2) Fill the contents of the box    
    let nameH2 = document.createElement("h2")
        nameH2.innerText = toyObj.name

    let toyImage = document.createElement("img")
        toyImage.src = toyObj.image
        toyImage.className = "toy-avatar"

    let likesP = document.createElement("p")
        likesP.innerText = `${toyObj.likes} likes`

    let likeButton = document.createElement("button")
        likesP.className = "like-btn"
        likeButton.innerText = "Like 💙"

    outerToyDiv.append(nameH2, toyImage, likesP, likeButton)
    console.log(outerToyDiv)

    // 3) // Slap the box on the DOM
    toyCollectionDiv.append(outerToyDiv)

    // 4) Find the elements in the box (completed in Step 3 b/c we created variables for each element)
    // 5) Add Event Listeners

    likeButton.addEventListener("click", (evt) => {
    // UPdate the object in memory {}
        toyObj.likes += 1
    //This fetch will change the number of likes on the backend
        fetch(`http://localhost:3000/toys/${toyObj.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
    //the body of your fetch should be the attribute you're updating (i.e. likes)
                likes: toyObj.likes
            })
        })
        .then(res => res.json())
        .then((updatedToy) => {
    //updates what the user sees on the DOM
            likesP.innerText = `${updatedToy.likes} Likes`
            
        })
    })


}

toyForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let toyName = evt.target.name.value
    let toyImg = evt.target.image.value

    fetch(`http://localhost:3000/toys`, {
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
    .then(resp => resp.json())
    .then((newlyCreatedToy) => {
        turnToyToHTML(newlyCreatedToy)
    })
    
})





