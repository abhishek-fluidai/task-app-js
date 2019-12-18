  const inp = document.getElementById('input');
  const btn = document.getElementById('addBtn');
  let ids = 0;
    function addTask() {
        let val = inp.value;
        val== "" ||val == null ? alert('Please enter a Task!') : 
        document.getElementById('todo-list').innerHTML += `
        <li class="todo-item " id="${ids+1}" >
        <input type="checkbox" class="${ids+1}"  onclick="completeTask(${ids+1})"/> <span class="itemi">${val} </span>
        <span class="close-icon" onclick="removeTask(${ids+1})">&#10006;</span>
    </li>`;
        inp.value = "";
        ids += 1;
      
    }
    const completeTask = (e) => {
        
        let task = document.getElementById(e);
        let check = document.getElementsByClassName(e)[0];
        // if (check.checked== true) {
        //   task.classList.add('checked')
        // }
        // else if (check.checked == false) {
        //   task.classList.remove('checked')
        // }
       check.checked ? task.classList.add('checked') : task.classList.remove('checked')
    }

    function removeTask(e) {
      var a = document.getElementById(e);
        // a.style.display = "none"
        a.remove()
    }
    const clearAlltasks = () => {
      let a = document.querySelectorAll('.checked');
      for(let i=0; i< a.length; i++){
        a[i].remove();
        console.log(i)
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

 
//PWA Settings 
window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}

