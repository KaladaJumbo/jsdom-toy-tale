let addToy = false;
const TOY_INDEX_URL = "http://localhost:3000/toys/"


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

  fetching(TOY_INDEX_URL)
  formListener()

});


function fetching (url){
  fetch(url)
    .then(res => res.json())
    .then(data => parser(data))
}

function parser(data) {
  for (const i of data) {
    existingCardMaker(i)
  }
}
//h2 img p button

function existingCardMaker(obj) {
  //creation
  let toyCard = document.createElement("div")
  let h2 = document.createElement("h2")
  let image = document.createElement("img")
  let p = document.createElement("p")
  let button = document.createElement("button")
  let div = document.getElementById("toy-collection")
  

  //appending to parents
  toyCard.appendChild(h2)
  toyCard.appendChild(image)
  toyCard.appendChild(p)
  toyCard.appendChild(button)
  div.appendChild(toyCard)

  image.setAttribute("src", obj["image"])
  h2.innerText = obj.name
  p.innerText = "likes: " + obj.likes
  button.innerText = "Like <3"
  
  button.classList.add("like-btn")
  image.classList.add("toy-avatar")
  toyCard.classList.add("card")
  toyCard.id = obj.id

  likeListener(button, obj, p)

}

function newCardMaker(obj, meta) {
  
  fetch("http://localhost:3000/toys", meta )
    .then(response => response.json())
    .then(data => console.log('Success:', data))
 
}

function formListener() {
  let form = document.getElementsByClassName("add-toy-form")[0]
  form.addEventListener("submit", submitListener)
}

function submitListener(event) {
  event.preventDefault()
  let name = document.getElementsByClassName("input-text")[0].value
  let image = document.getElementsByClassName("input-text")[1].value
  let obj = {name: name, image: image, likes: 0}

  meta = {

    method: "post",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify(obj)

  }

  newCardMaker(obj, meta)
  
}

function likeListener(button, obj, p) {
  button.addEventListener("click", () => {
    updateLike(obj, p)
  })
}

function updateLike(obj, p) {
  obj.likes++

  meta = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept":  "application/json"
    },
    body: JSON.stringify({
      "likes": obj.likes
    })
  }

  fetch(TOY_INDEX_URL + `${obj.id}`, meta)
    .then(res => res.json())
    .then(data => obj = data)

  p.innerText = "likes: " + obj.likes

}

// POST http://localhost:3000/toys
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "name": "Jessie",
//   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//   "likes": 0
// })