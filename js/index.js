const createMonster = document.getElementById("create-monster")


function fetchMonsters(limit='20', page='1') {
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
        .then(resp => resp.json())
        .then(monsterObjs => renderMonsters(monsterObjs))
}

function renderMonsters(monsterObjs){
    monsterObjs.forEach(monster => renderMonster(monster))
}

function renderMonster(monster){
    const monContainerDiv = document.querySelector('div#monster-container')
    const monDiv = document.createElement('div')

    const h2 = document.createElement('h2')
    h2.innerText = monster.name

    const h4 = document.createElement('h4')
    h4.innerText = 'Age: ' + monster.age

    const p = document.createElement('p')
    p.innerText = 'Bio: ' + monster.description


    monDiv.append(h2, h4, p)
    monContainerDiv.appendChild(monDiv)
}

function createFormListener(){
    CreateMonster.addEventListener('submit', function(e){
      e.preventDefault()
      const formData = {
        name: e.target[0].value,
        age: e.target[1].value,
        descripton: e.target[2].value;
      }
      
  
      e.target.reset()
  
    
       reqObj = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      }
  
  
  
      fetch('http://localhost:3000/toys', reqObj)
        .then(resp => resp.json())
        .then(monster => {
          renderMonster(monster)
        })
  
  
    })
  }




renderMonsters(monsterObjs);
createFormListener();
