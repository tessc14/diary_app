const URL = "http://localhost:3000/"

// const diary = document.getElementById('diary');

// const Diary = require("../server/models/Diary");

const form = document.querySelector('form');
const btn = document.querySelector('button');

const submitForm = (e) => {
    e.preventDefault();
    const h2 = document.querySelector('h2');
    const input = document.querySelector('#text');
    const category = document.querySelector('#category');

    h2.textContent = "You submitted a new entry:" + input.value;
    category.value = '';
    input.value = '';
}

async function getEntries() {
    const res = await fetch('http://localhost:3000/diary');
    const data = await res.json();
    console.log(data);
    
    // const div = document.getElementById('diary');
    const h2 = document.getElementById('category');
    const text = document.getElementById('text');
    const date = document.getElementById('date');
    h2.textContent = data[0].category;
    text.textContent = data[0].text;
    date.textContent = data[0].date;
}

// function createEntryCard(diary) {
//     const card = document.createElement('div');
//     card.classList.add('entry');
//     const header = document.createElement('h2');
//     header.textContent = diary["diary_category"];
//     card.appendChild(header);
//     diary.appendChild(card);
// }

// async function getEntries() {  
//     const res = await fetch('http://localhost:3000/diary');
//     const data = await res.json();
//     data.forEach(d => createEntryCard(d))
// }

// getEntries();


form.addEventListener('submit', submitForm);
btn.addEventListener('click', getEntries);

//  const getAll() {
//     const response = await fetch(`${URL}diary`);
//     const entries = await response.json();

//     const diaryContainer = document.createElement('div');
//     diaryContainer.classList.add('diary-container');
//     diaryContainer.textContent = entries;
//     document.appendChild(diaryContainer);
// }
