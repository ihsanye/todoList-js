const form = document.querySelector('#todoAddForm');
const addInput = document.querySelector('#todoName');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const clearButton = document.querySelector('#clearButton');
const filterInput = document.querySelector("#todoSearch");
let todos = [];

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoFromUI);
    clearButton.addEventListener("click", allTodosEverywhere);
    filterInput.addEventListener("keyup", filterSearch);
}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach((todo) => {
        addTodoToUI(todo)
    })
}

function filterSearch(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoList = document.querySelectorAll(".list-group-item");

    if (todoList.length > 0) {
        todoList.forEach(todo => {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display:block justify-content:space-between !important");
            } else {
                todo.setAttribute("style", "display:none !important");
            }
        })
    } else {
        showAlert("warning", "Listede aktivite yok!")

    }
}

function removeTodoFromUI(e) {
    if (e.target.className === "fa fa-remove") {
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        removeTodoFromStorage(todo.textContent);
        showAlert("success", "Basariyla silindi!")
    }
}

function removeTodoFromStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach((todo, index) => {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos));
}

function allTodosEverywhere() {
    const todoList = document.querySelectorAll(".list-group-item");
    if (todoList.length > 0) {
        todoList.forEach(function (todo) {
            todo.remove();
        });

        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success", "Liste basariyla temizlendi!");
    } else {
        showAlert("warning", "Liste zaten bos");
    }
}

function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "Lutfen aktivite giriniz");
    } else {
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "Basariyla eklendi!");
    }
    e.preventDefault();
}

function addTodoToUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {
    // <div class="alert alert-warning" role="alert">
    //     This is a warning alert-check it out!
    // </div>
    const div = document.createElement("div");
    div.className = "alert alert-" + type;
    div.style.margin = "15px 0 -15px 0";
    div.textContent = message;
    firstCardBody.appendChild(div);
    setTimeout(() => div.remove(), 2500)
}