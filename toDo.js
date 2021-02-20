const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-pending"),
    finishedList = document.querySelector(".js-finished");
  
const TODOS_LS = "toDos";
const FINISHED_LS = "finished";

let toDos = [];
let finishedToDos = [];

function deleteFinished(event) {
	const btn = event.target;
	const li = btn.parentNode;

	finishedList.removeChild(li);
	const cleanFinish = finishedToDos.filter(function(finish) {
		return finish.id !== parseInt(li.id);
	});
	finishedToDos = cleanFinish;
	saveToDos();
}

function moveToDo(event){// finished -> pending
    const btn = event.target;
    const li = btn.parentNode;
    
    toDoList.appendChild(li);
    btn.innerHTML = "✔️";
    btn.removeEventListener("click",moveToDo);
    const delBtn = btn.nextSibling;
    btn.addEventListener("click", checkToDo);
    delBtn.removeEventListener("click", deleteFinished);
    delBtn.addEventListener("click", deleteToDo);

    let text = li.querySelector("span").innerHTML;
    let id = parseInt(li.id);
    const toDoObj = {
        text: text,
        id : id
    }
    toDos.push(toDoObj);
    
    const deleteFinish = finishedToDos.filter(function(finish){
        return finish.id !== parseInt(li.id);
    });
    finishedToDos = deleteFinish;
    saveToDos();
} 

function deleteToDo(event) {
	const btn = event.target;
	const li = btn.parentNode;
	toDoList.removeChild(li);
	const cleanToDos = toDos.filter(function(toDo) {
		return toDo.id !== parseInt(li.id);
	});
	toDos = cleanToDos;
	saveToDos();
}

function checkToDo(event) { //pending -> finished
	const btn = event.target;
	const li = btn.parentNode;
	finishedList.appendChild(li);
	btn.innerHTML = "🔺";
	btn.addEventListener("click", moveToDo);
	const delBtn = btn.nextSibling;
	delBtn.removeEventListener("click", deleteToDo);
	delBtn.addEventListener("click", deleteFinished);

	let text = li.querySelector("span").innerHTML;
	let id = parseInt(li.id);
	const finishObj = {
		text: text,
		id: id
	}
	finishedToDos.push(finishObj);

	const deleteToDos = toDos.filter(function(toDo) {
		return toDo.id !== parseInt(li.id);
	});
	toDos = deleteToDos;
	saveToDos();
}

function paintToDo(text) {
    const li = document.createElement("li");
    const checkBtn = document.createElement("checkBtn");
    const delBtn = document.createElement("deleteBtn");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerHTML = text;
    checkBtn.innerHTML = "✔️";
    delBtn.innerHTML = "❌";
    checkBtn.addEventListener("click", checkToDo);
    delBtn.addEventListener("click", deleteToDo);

    li.appendChild(span);
    li.id = newId;
    li.appendChild(checkBtn);
    li.appendChild(delBtn);
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function paintFinished(text) {
	const li = document.createElement("li");
	const delBtn = document.createElement("deleteBtn");
    const backBtn = document.createElement("backBtn");
    const span = document.createElement("span");
    const newId = finishedToDos.length + 1;
    span.innerHTML = text;
    backBtn.innerHTML = "🔺";
    delBtn.innerHTML = "❌";
	backBtn.addEventListener("click", moveToDo);
    delBtn.addEventListener("click", deleteFinished);
    
	li.appendChild(span);
    li.id = newId;
	li.appendChild(backBtn);
	li.appendChild(delBtn);
	finishedList.appendChild(li);
	
    const finishObj = {
		text: text,
		id: newId
	};
	finishedToDos.push(finishObj);
	saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedToDos));
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loadedFinished = localStorage.getItem(FINISHED_LS);

    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
    
    if(loadedFinished !== null) {
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(function(finish){
            paintFinished(finish.text);
        });
    }
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue); 
    toDoInput.value = "";
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();