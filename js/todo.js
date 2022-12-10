const root = document.getElementById("root");
const toDoForm = document.createElement("form");
toDoForm.id = "todo-form";
root.appendChild(toDoForm);
const toDoInput = document.createElement("input");
toDoForm.appendChild(toDoInput);
const toDoList = document.createElement("ul");
toDoList.id = "todo-list";
root.appendChild(toDoList);

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((todo) => todo.id !== parseInt(li.id));
  //filter() 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.
  //parseInt() 함수는 문자열 인자를 파싱하여 특정 진수(수의 진법 체계에서 기준이 되는 값)의 정수를 반환합니다.
  saveToDos();
}

//newTodoObj를 인수로 받아와 .id .text를 가질 수 있었던거다
function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  const secondSpan = document.createElement("span");
  span.innerText = newTodo.text;
  secondSpan.innerText = newTodo.time;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  span.appendChild(secondSpan);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let finalTime = year + "/" + month + "/" + date;
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    time: finalTime,
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
