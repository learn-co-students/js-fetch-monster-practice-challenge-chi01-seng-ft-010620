MONSTERS_URL = "http://localhost:3000/monsters"
const monsterContainer = document.querySelector('#monster-container')
const addMonsterForm = document.querySelector('.add-monster')
const forwardButton = document.querySelector('#forward')
const backButton = document.querySelector('#backward')

const fetchMonsters = () => {
  fetch(MONSTERS_URL)
  .then(resp => resp.json())
  .then(monstersData => renderMonsters(monstersData))
  .catch(err => console.log(err))
}

const renderMonsters = (monstersData) => {
  console.log(monstersData[0])
    const firstFiftyMonsters = monstersData.filter(monster => monster.id <= 50)

  firstFiftyMonsters.forEach(monster => {
    const monsterCard = `<div class="monster-card" data-id="${monster.id}">
      <h1 class ="monster-name">${monster.name}</h1>
      <h2 class="monster-age">${monster.age}</h2>
      <p class="monster-description">${monster.description}</p>
      <button type="button" name="edit-monster" data-id="${monster.id}">Edit ${monster.name}</button>
    </div>`
    monsterContainer.innerHTML += monsterCard
  })
}

const createNewMonster = (event) => {
  event.preventDefault()
  console.log(event.target)
  const name = event.target[0].value
  const age = event.target[1].value
  const description = event.target[2].value
  fetch(MONSTERS_URL, newMonsterObj(name, age, description))
  .then(resp => resp.json())
  .then(newMonster => renderNewMonster(newMonster))
  .catch(err => console.log(err))
}

const newMonsterObj = (name, age, description) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      age: age,
      description: description
    })
  }
}

const renderNewMonster = (newMonster) => {
  const monsterCard = `<div class="monster-card" data-id="${newMonster.id}">
    <h1 class ="monster-name">${newMonster.name}</h1>
    <h2 class="monster-age">${newMonster.age}</h2>
    <p class="monster-description">${newMonster.description}</p>
    <button type="button" name="edit-monster" data-id="${newMonster.id}">Edit ${newMonster.name}</button>
  </div>`
  monsterContainer.innerHTML += monsterCard
}

const editMonster = (event) => {
  if (event.target.tagName === "BUTTON") {
    const clicked = event.target
    createEditForm(clicked)
  }
}

const createEditForm = (clicked) => {
  const div = document.createElement('div')
  clicked.parentElement.append(div)
  div.id = "edit-monster-div"
  div.innerHTML =
    `<form class="edit-monster" action="index.html" method="post">
      <input type="text" name="name" value="${clicked.parentElement.children[0].innerText}">
      <input type="text" name="age" value="${clicked.parentElement.children[1].innerText}">
      <input type="text" name="description" value="${clicked.parentElement.children[2].innerText}">
      <input type="submit" name="submit" value="Update Monster" data-id="${clicked.dataset.id}">
    </form>`
    const editMonsterForm = document.querySelector('.edit-monster')
    editMonsterForm.addEventListener('submit', patchMonster)
}

const patchMonster = (event) => {
  event.preventDefault()
  const clicked = event.target
  const name = event.target.name.value
  const age = event.target.age.value
  const description = event.target.description.value
  const id = event.target.children[3].dataset.id
  fetch(`${MONSTERS_URL}/${id}`, patchObj(name, age, description))
  .then(resp => resp.json())
  .then(updatedMonster => renderUpdatedMonster(event.target, updatedMonster))
  .catch(err => console.log(err))
}

const renderUpdatedMonster = (eventTarget, updatedMonster) => {
  console.log(updatedMonster)
  console.log(eventTarget)
  const monsterId = parseInt(eventTarget.parentElement.parentElement.dataset.id)
  const monsterName = updatedMonster.name
  const monsterAge = updatedMonster.age
  const monsterDescription = updatedMonster.description
  eventTarget.parentElement.parentElement.children[0].innerText = monsterName
  eventTarget.parentElement.parentElement.children[1].innerText = monsterAge
  eventTarget.parentElement.parentElement.children[2].innerText = monsterDescription
}

const patchObj = (name, age, description) => {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      age: age,
      description: description
    })
  }
}

const nextFiftyMonsters = (event) => {

}



addMonsterForm.addEventListener('submit', createNewMonster)
monsterContainer.addEventListener('click', editMonster)
forwardButton.addEventListener('click', nextFiftyMonsters)


fetchMonsters()
