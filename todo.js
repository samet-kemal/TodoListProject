//ELEMENTLERİ SEÇME
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ 
form.addEventListener("submit",addTodo);
document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
secondCardBody.addEventListener("click",deleteTodo);
filter.addEventListener("keyup",filterTodos);
clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    //Arayüzden todo temizleme

    if(confirm("tümünü silmek istediğinize emin misiniz?")){
        //todoList.innerHTML = ""; // yavaş Yöntem
        while(todoList.firstElementChild != null){
        todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");

    }
}






// tahminimce targettan kaynaklı bir problem var filtreleme yapmıyor.
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filterValue)=== -1){
            //bulunmaması hali
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    })
 console.log(e.target.value);
}







function deleteTodo(e){

if(e.target.className === "fa fa-remove"){  // listitem itemlarının yanında x yok o yüzden bir şey değişmiyor.
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
   
    showAlert("success","silme başarılı");
      console.log("silme işlemi");
      e.target.parentElement.parentElement.remove();
      //loadAllTodosToUI();
}

}





function deleteTodoFromStorage(deleteTodo){
let todos= getTodosFromStorage();

todos.forEach( function(todo,index){
    if(todo === deleteTodo){
               todos.splice(index,1); // Array dan değer silmek için.
    }
})

localStorage.setItem("todos",JSON.stringify(todos))
}





function loadAllTodosToUI(){
let todos = getTodosFromStorage(); 
todos.forEach(function(todo){
    addTodoToUI(todo);
})
}








function addTodo(e){

    const newTodo=todoInput.value.trim();
    if(newTodo ===""){
      
        showAlert("danger","Lütfen bir todo girin ama ...");
    
    }else{

    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success","O da Olumlu ...");
}
    e.preventDefault();
}






function getTodosFromStorage(){ // Storage dakai Todo Ları almak için
    let todos;

    if(localStorage.getItem("todos")=== null){
        todos=[];
    }else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}







function addTodoToStorage(newTodo){
let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}





function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = "alert alert-" + type;
    alert.textContent=message;
   
    firstCardBody.appendChild(alert);

    setTimeout(function(){
       alert.remove(); 
    },1000);
    
}






function addTodoToUI(newTodo){//ALDIĞI STRİNG DEĞERİNİ LİST İTEM OLARAK EKLİYOR

    
    /*
    <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>
                        */

       //LİST ITEM OLUŞTURMA
         const listItem = document.createElement("li");
           console.log(listItem);
         //LİNK OLUŞTURMA
         const link = document.createElement("a");
         link.href="#";
         link.className = "delete-item";
         link.innerHTML = "<i class = 'fa fa-remove' style= 'font-size:24px' ></i>";//html kodunu direkt olarak burda verdik
        listItem.className = "list-group-item d-flex justify-content-between"
        //Text Node EKLeme
        listItem.appendChild(document.createTextNode(newTodo));
        listItem.appendChild(link);

        //TODOlİST E LİST ITEM I EKLEME
        todoList.appendChild(listItem);
        todoInput.value="";


        

}