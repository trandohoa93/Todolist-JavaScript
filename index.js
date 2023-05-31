// Selectors
const todoInput = document.querySelector('.new-todo')
const todoList = document.querySelector('.todo-list')
const toggleAll = document.querySelector('.toggle-all')


//Event Listeners
todoInput.addEventListener('keypress', addTodo) ;
todoList.addEventListener('click', deleteCheck);
toggleAll.addEventListener('click', toggleCheck)
todoList.addEventListener('dblclick', edit)
//Functions
function addTodo(event) {
    if (event.key === "Enter" && event.target.value) {

    const newTodo = document.createElement('li');
    newTodo.setAttribute("data-id", Date.now())
    newTodo.className = "";

    const todoDiv = document.createElement('div');
    todoDiv.className = "view"
    newTodo.appendChild(todoDiv)

    const inputTodo = document.createElement('input');
    inputTodo.type = "checkbox";
    inputTodo.className = "toggle"
    todoDiv.appendChild(inputTodo)

    const labelInput = document.createElement('label');
    labelInput.innerText = todoInput.value
    todoDiv.appendChild(labelInput)

    const buttonTodo = document.createElement('button');
    buttonTodo.className = "destroy"
    todoDiv.appendChild(buttonTodo)

    // Append to list
    todoList.appendChild(newTodo)
    // Clear 
    todoInput.value = ""
}
}

function deleteCheck(e) {
    const item = e.target
    const todoDiv = item.parentElement;
    const todoLi = todoDiv.parentElement;
    // delete
    if(item.classList[0] === "destroy") {
        todoLi.remove();
    }

    // completed
    if(item.classList[0] === "toggle") {
        todoLi.classList.toggle("completed");
    }
}

function edit(e) {
    const item = e.target;
    const todoLi = item.closest("li");

    if (item.tagName === "LABEL" && !todoLi.classList.contains("editing")) {
        todoLi.classList.add("editing");

        const input = document.createElement('input');
        input.className = "edit";
        input.value = item.innerText; // Đặt giá trị của input thành giá trị hiện tại của label
        todoLi.appendChild(input);

        // Xử lý sự kiện nhấn Enter trong input
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                item.innerText = input.value; // Cập nhật giá trị của label thành giá trị mới của input
                todoLi.classList.remove("editing");
                if (todoLi.contains(input)) {
                    todoLi.removeChild(input); // Xóa input nếu nó có trong DOM
                }
            }
        });

        // Xử lý sự kiện click ra ngoài input
        document.addEventListener("click", function(event) {
            const target = event.target;
            if (target !== input && target !== item && !todoLi.contains(target)) {
                item.innerText = input.value; // Cập nhật giá trị của label thành giá trị mới của input
                todoLi.classList.remove("editing");
                if (todoLi.contains(input)) {
                    todoLi.removeChild(input); // Xóa input nếu nó có trong DOM
                }
            }
        });
    }
}



function toggleCheck() {
    const checkBoxAll = todoList.querySelectorAll(".toggle");
    const liElements = todoList.children;
    var isAllChecked = true;

    for (var i = 0; i < checkBoxAll.length; i++) {
        if (!checkBoxAll[i].checked) {
            isAllChecked = false;
            break;
        }
    }
    
    for (var b = 0; b < checkBoxAll.length; b++) {
        checkBoxAll[b].checked = !isAllChecked;
        liElements[b].classList.toggle("completed", checkBoxAll[b].checked);
    }
}

// Filters

const spanTodoCount = document.createElement('span');
spanTodoCount.className = 'todo-count';
spanTodoCount.innerHTML = '<strong>0</strong> items left';

const containerElement = document.getElementById('container');
containerElement.appendChild(spanTodoCount);