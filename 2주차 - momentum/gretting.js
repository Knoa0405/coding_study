const form = document.querySelector(".js-form"),
    nameInput = form.querySelector("input");
const myName = document.querySelector(".js-clock h2 span.name");
const toDoForm = document.querySelector(".js-toDoForm");

const MY_NAME = "myName";

function handleNameValue(e) {
    e.preventDefault();
    const nameValue = nameInput.value;
    localStorage.setItem(MY_NAME, nameValue);
    myName.textContent = nameValue;
    nameInput.classList.add("form");
    toDoForm.classList.remove("form");
}

function init() {
    form.addEventListener("submit", handleNameValue);
    if (localStorage.getItem(MY_NAME)) {
        myName.textContent = localStorage.getItem(MY_NAME);
        nameInput.classList.add("form");
        toDoForm.classList.remove("form");
    }
}

init();