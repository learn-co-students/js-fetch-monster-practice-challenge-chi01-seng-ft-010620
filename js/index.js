const monContainer = document.querySelector('#monster-container')
//document.addEventListener('DOMContentLoaded', function() {
  fetchMosters();
  createMonsterCard();
  forwardButton()
//});

function fetchMosters() {
  fetch('http://localhost:3000/monsters')
    .then(resp => resp.json())
     //.then(data => console.log(data))
   .then(data => renderMonster(data));
}

function renderMonster(data) {
  const monContainer = document.querySelector('#monster-container');
  const ul = document.createElement('ul');
  monContainer.append(ul);
  data.forEach(monster => {
      if (monster.id > (data.length - 50 )){
    const li = `<li data-id= ${monster.id}>Name:${monster.name}</li>
<li>Age: ${monster.age}</li>
<li>Description: ${monster.description}</li></br></br>`;
    monContainer.innerHTML = li + monContainer.innerHTML 
  }
 })
}
function createMonsterCard() {
  const form = document.getElementById('monster-create-form');
  form.addEventListener('submit', function() {
    event.preventDefault();
    const monsterName = event.target.children[1].value;
    const monsterAge = event.target.children[3].value;
    const monsterDes = event.target.children[5].value;

    const monsterData = {
      name: `${monsterName}`,
      age: `${monsterAge}`,
      description: `${monsterDes}`
    };
    event.target.reset();
    const configObj = {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(monsterData)
    };
    fetch('http://localhost:3000/monsters', configObj)
      .then(resp => resp.json())
      //.then(data => console.log("Created!", data))
      .then(data => renderNewMonster(data));
  });
}
function renderNewMonster(newData){
    const list = document.querySelector("#monster-container")
    const newLi = `<li data-id= ${newData.id}>Name:${newData.name}</li>
<li>Age: ${newData.age}</li>
<li>Description: ${newData.description}</li></br></br>`;
    monContainer.innerHTML = newLi + monContainer.innerHTML 
}

function forwardButton(){
    const forwardB = document.getElementById("forward")
    forwardB.addEventListener("click", function(){
        fetch('http://localhost:3000/monsters/?_limit=100&_page=3')
        .then(resp => resp.json())
        .then(data =>renderMonster(data))
    })
}