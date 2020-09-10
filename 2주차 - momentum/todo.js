const toDoFormList = document.querySelector(".js-toDoForm"),
    toDoInput = toDoFormList.querySelector("input");
const toDoListUl = document.querySelector(".js-toDoList");
const removeBtn = document.querySelector(".js-toDoList li button.btn_remove");
const checkBtn = document.querySelector(".js-toDoList li button.btn_check");

const TO_DO = "toDoList";

// function 안에서 처리하는 방법 공부
let listId = 0;
// 로컬 스토리지의 index와 일치 시키기 위해서 증가연산자 사용
function setId() {
    return listId++;
}

// 로컬 스토리지 저장하고 저장된 리스트 화면 렌더링

function saveLocaleStorage(toDo) {
    const toDoListInLocale = JSON.parse(localStorage.getItem(TO_DO));
    toDoListInLocale[listId] = toDo;
    localStorage.setItem(TO_DO, JSON.stringify(toDoListInLocale));
}

function saveList() {
    const toDoListLocale = JSON.parse(localStorage.getItem(TO_DO));
    Object.values(toDoListLocale).forEach((todo) => {
        addToDo(todo);
    });
}

function renderList() {
    toDoFormList.addEventListener("submit", handleToDoList);
    saveList();
}

function addToDo(toDo) {
    const id = setId();
    const li = document.createElement("li");
    li.innerHTML = `<button class = 'btn_check' ><i class="far fa-check-square"></i></button>${toDo}<button class = 'btn_remove'><i class = 'far fa-trash-alt' ></i></button>`;
    li.addEventListener("click", handleClickEventInList);
    li.id = id;
    toDoListUl.appendChild(li);
}

// --------------------------------------

// 받아온 input value 를 화면에 addToDO() 함수에 정의된대로 렌더링하고
//로컬 스토리지에 리스트 형태로 저장
function handleToDoList(e) {
    e.preventDefault();
    const toDo = toDoInput.value;
    if (toDo === "") {
        alert("할일이 없나요? 할일을 적어주세요~!");
    } else {
        saveLocaleStorage(toDo);
        addToDo(toDo);
    }
    toDoInput.value = "";
}
// 이벤트 위임으로 제거 / 완료 클릭 이벤트 만들기

function handleClickEventInList(e) {
    // trash button
    if (e.target.parentNode === e.currentTarget.childNodes[2]) {
        removeList(e);
    }
    // check button
    else if (e.target.parentNode === e.currentTarget.childNodes[0]) {
        completeList(e);
    }
}

function removeList(e) {
    const removeTarget = e.currentTarget;
    toDoListUl.removeChild(removeTarget);
    const toDoListLocale = JSON.parse(localStorage.getItem(TO_DO));
    delete toDoListLocale[e.currentTarget.id];
    localStorage.setItem(TO_DO, JSON.stringify(toDoListLocale));
}

function completeList(e) {
    const completeTarget = e.currentTarget;
    completeTarget.classList.add("complete");
    completeTarget.childNodes[0].innerHTML =
        "<i class = 'fas fa-check-square'></i>";
}

function init() {
    // getItem 이 있으면 새로운 setItem list 만들필요없음..
    //새로고침할때 todolist가 로컬 스토리지에서 없어지는 것 방지
    if (!localStorage.getItem(TO_DO)) {
        localStorage.setItem(TO_DO, JSON.stringify({}));
        renderList();
    } else {
        renderList();
    }
}

init();