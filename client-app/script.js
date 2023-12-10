const apiUrl = 'http://localhost:3000/api';

let todoListElem = document.getElementById("todoList");

document.getElementById("add-btn").addEventListener("click", addNewTodo);
document.getElementById('mark-all-done-btn').addEventListener('click', markAllDone);



document.body.onload = function () {
    fetchAllTodos().catch((e) => {
        console.error(e);
    });
}

async function fetchAllTodos() {
    const response = await fetch(apiUrl + "/readAll.php");
    const todos = await response.json();
    if (todos && todos.length > 0) {
        // create HTML elements
        for (let item of todos) {
            addItem(item);
        }
    }
}

async function addNewTodo() {
    let task = document.getElementById("new-item").value.trim();
    if (task) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task })
        };
        await fetch(apiUrl + "/create.php", options);
        location.reload();
    }
}
async function markAsComplete(e) {
    const data = { id: this.id, done: true };
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    await fetch(apiUrl + "/update.php", options);
    location.reload();
}

async function deleteTodo(e) {
    const data = { id: this.id };
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    await fetch(apiUrl + "/delete.php", options);
    location.reload();
}

function markAllDone() {
    fetch('/api/tasks/markAllDone', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => {
        if (response.ok) {

          console.log('All tasks marked as done');
        } else {
          // Handle the error case
          console.error('Failed to mark all tasks as done');
        }
      })
      .catch(error => {
        // Handle any network or request error
        console.error('An error occurred while marking all tasks as done:', error);
      });
  }

// Create the HTML elements for the new todo item
function addItem(item) {
    let liElem = document.createElement("li");
    liElem.appendChild(document.createTextNode(item.task));
    let spanContainerElem = document.createElement("span");
    spanContainerElem.setAttribute("class", "span-btns");
    let spanCompleteElem = document.createElement("span");
    spanCompleteElem.id = item.id;
    spanCompleteElem.title = "completed";
    spanCompleteElem.addEventListener('click', markAsComplete, false);
    spanCompleteElem.appendChild(document.createTextNode("✓"));
    let spanDeleteElem = document.createElement("span");
    spanDeleteElem.id = item.id;
    spanDeleteElem.title = "delete";
    spanDeleteElem.appendChild(document.createTextNode("X"));
    spanDeleteElem.addEventListener('click', deleteTodo, false);
    spanContainerElem.appendChild(spanCompleteElem);
    spanContainerElem.appendChild(spanDeleteElem);
    liElem.appendChild(spanContainerElem);
    todoListElem.appendChild(liElem);
}

