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

let toyCollectDiv = document.querySelector("#toy-collection")
console.log(toyCollectDiv)

fetch(`http://localhost:3000/toys`)
.then(resp => resp.json())
.then(toyData => {
    // console.log(toyData)
    toyData.forEach(toy => {
        // console.log(toy)
        //calling the function on the forEach iterates through the 8 objects inside the array
        displayToyCard(toy)

    });
})


//make a <div class="card"> for each toy and add it to the toy-collection div.
//create a div class "card" and append it to the toyCollectDiv

function displayToyCard(toy){
    console.log(toy)
const divCard = document.createElement("div") 
// console.log(divCard)
divCard.className = "card"
// console.log(divCard)
const h2 = document.createElement("h2")
h2.innerText = `${toy.name}`
const img = document.createElement("img")
img.className = "toy-avatar"
img.src = `${toy.image}`
console.log(img)
const p = document.createElement("p")
p.innerText = `${toy.likes}`
const button = document.createElement("button")
button.className = "like-btn"
button.innerText = "Like 💙"

divCard.append(h2, img, p, button)
console.log(divCard)
toyCollectDiv.append(divCard)
}























});
