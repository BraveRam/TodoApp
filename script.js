const input = document.querySelector("#input");
const submitBtn = document.querySelector("#sbm-btn");
const todoListDiv = document.querySelector(".todo-lists");

let todos = []; 

const checkTodos = () => {
  if (todos.length === 0) {
    todoListDiv.innerHTML = "";
    const noTodos = document.createElement("h1");
    noTodos.innerText = "No todos yet.";
    noTodos.classList.add("no-todos");
    todoListDiv.appendChild(noTodos);
  }
};

const removeTodo = (event) => {
  todos = todos.filter((todo) => todo.id !== event.target.id);
  saveTodos();
  render(); 
};


const addTodo = (todo) => {
  todos.push({
    id: new Date().getTime().toString(),
    name: todo,
    checked: false,
  });
  saveTodos();
  render(); 
};


submitBtn.addEventListener("click", () => {
  let todo = input.value.trim();
  if (todo) {
    addTodo(todo);
    input.value = null; 
  } else {
    alert("Enter a todo.");
  }
});

const isChecked = (event)=>{
  todos.forEach(todo=>{
    if (todo.id === event.target.id) {
      if(todo.checked === true){
        todo.checked = false
      } else{
        todo.checked = true
      }
      saveTodos();
    }
  })
}

const render = () => {
  todoListDiv.innerHTML = "";
  checkTodos();
  if (todos.length > 0) {
    todos.forEach((todo, index) => {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-item");
      todoDiv.style.position = "relative";
      const li = document.createElement("li");
      li.innerHTML = todo.name;
      li.classList.add("todo");
      const checkBtn = document.createElement("input");
      checkBtn.type = "checkbox";
      checkBtn.checked = todo.checked;
      checkBtn.classList.add("check-btn");
      checkBtn.id = todo.id
      checkBtn.addEventListener("change", isChecked)
      const delBtn = document.createElement("button");
      delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
      delBtn.style.backgroundColor = "red";
      delBtn.id = todo.id;
      delBtn.addEventListener("click", removeTodo);
      todoDiv.appendChild(li);
      todoDiv.appendChild(checkBtn)
      todoDiv.appendChild(delBtn);

      todoListDiv.appendChild(todoDiv);
    });
  }
};

const loadTodos = ()=>{
  todos = JSON.parse(localStorage.getItem("todo.key")) || [];
}

const saveTodos = ()=>{
  localStorage.setItem("todo.key", JSON.stringify(todos));
  render();
}

loadTodos();
render();