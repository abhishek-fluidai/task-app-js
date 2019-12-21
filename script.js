  const inp = document.getElementById('input');
  const btn = document.getElementById('addBtn');
  let taskList =  document.getElementById('todo-list')
  let taskArrey =[];
   let ids = 0;
    function addTask() {
        let val = inp.value;
        
        val== "" ||val == null ? alert('Please enter a Task!') : 
        taskList.innerHTML += `
        <li class="todo-item false" id="${ids+1}" >
        <input type="checkbox" class="${ids+1}"   onclick="completeTask(${ids+1})"/> <span class="itemi">${val} </span>
        <span class="close-icon" onchange="removeTask(${ids+1})">&#10006;</span>
    </li>`;
      // Storing Dat In Localstorage
     taskArrey.push({"id": `${ids+1}`, "contant": `${val}`, "completed": "false"});  
     localStorage.setItem('taskArrey', JSON.stringify(taskArrey));
        inp.value = "";
        ids += 1;
      
    }
    const completeTask = (e) => {
        let task = document.getElementById(e);
        let check = document.getElementsByClassName(e)[0];
        if (check.checked== true ) {
         task.classList.add('checked');
         task.classList.remove('false');
        check.setAttribute("checked", ""); 

         
          for (var i =0; i < taskArrey.length; i++)
          if (taskArrey[i].id == e) {
              taskArrey[i].completed = "checked"
                            
              break;
         }
        //  console.log(taskArrey)
        localStorage.removeItem('taskArrey');
        localStorage.setItem('taskArrey', JSON.stringify(taskArrey));
        }
        else if (check.checked == false ) {
          task.classList.remove('checked');
          task.classList.add('false');
          check.removeAttribute("checked")
          // check.checked = ""
          for (var i =0; i < taskArrey.length; i++)
          if (taskArrey[i].id == e) {
              taskArrey[i].completed = "false"
               break;
         }
         localStorage.removeItem('taskArrey');
        localStorage.setItem('taskArrey', JSON.stringify(taskArrey));
       
        }
         }

    function removeTask(e) {
      var a = document.getElementById(e);
              // a.style.display = "none"
        a.remove();
        for (var i =0; i < taskArrey.length; i++)
        if (taskArrey[i].id == e) {
            taskArrey.splice(i,1);
            break;
        }
        localStorage.removeItem('taskArrey');
        localStorage.setItem('taskArrey', JSON.stringify(taskArrey));

      }

  
     const loadTasks = () => {
      let addedTasks = JSON.parse(localStorage.getItem('taskArrey'));
       for (let i =0; i < addedTasks.length; i++) {
          console.log(addedTasks[i])
          taskArrey.push({"id": `${addedTasks[i].id}`, "contant": `${addedTasks[i].contant}`, "completed":`${addedTasks[i].completed}`}); 
        taskList.innerHTML += `
        <li class="todo-item ${addedTasks[i].completed}" id="${addedTasks[i].id}" >
        <input type="checkbox" class="${addedTasks[i].id}"  onchange="completeTask(${addedTasks[i].id})"/> <span class="itemi"> ${addedTasks[i].contant}</span>
        <span class="close-icon" onclick="removeTask(${addedTasks[i].id})">&#10006;</span>
    </li>`;
 
    if (addedTasks[i].completed == "checked" ) {
    document.getElementsByClassName(addedTasks[i].id)[0].setAttribute('checked', '')
         }
       }
     }

   

      document.addEventListener("keypress", (e) => {
        if (e.keyCode == 13 && inp.value !== "") {
          addTask()
        }
        else if (e.keyCode == 13 && inp.value == ""){
          alert('Please enter a Task!')
        }
      });
      window.addEventListener('load', () => {
              loadTasks();
      });
 
// PWA Settings 
window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}

