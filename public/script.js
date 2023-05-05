// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("taskform");
const tasklist = document.getElementById("tasklist");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log(form.elements.taskType.value)

    addTask(
        form.elements.taskName.value,
        form.elements.taskType.value,
        form.elements.taskRate.value,
        form.elements.taskTime.value,
        form.elements.taskClient.value,
    )
    console.log(taskList)
})

/*function displayTask(task) {
    let item = document.createElement("li");
    item.setAttribute("data-id", task.id);
    item.innerHTML = `<p><strong>${task.name}</strong><br>${task.type}</p>`;

    tasklist.appendChild(item);

    // Clear the value of the input once the task has been added to the page
    form.reset();

    // Setup delete button DOM elements
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete");
    delButton.appendChild(delButtonText);
    item.appendChild(delButton); // Adds a delete button to every task

    // Listen for when the delete button is clicked
    delButton.addEventListener("click", function (event) {

        taskList.forEach(function (taskArrayElement, taskArrayIndex) {
            if (taskArrayElement.id == item.getAttribute('data-id')) {
                taskList.splice(taskArrayIndex, 1)
            }
        })

        // Make sure the deletion worked by logging out the whole array
        console.log(taskList)

        item.remove(); // Remove the task item from the page when button clicked
        // Because we used 'let' to define the item, this will always delete the right element

    })


}*/

function displayTasks() {
    tasklist.innerHTML = "";

    let localTasks = JSON.parse(localStorage.getItem('tasks'));

    if (localTasks !== null) {
        localTasks.forEach(function(task) {
            let item = document.createElement('li');
            item.setAttribute("data-id", task-id);
            item.innerHTML = `<p><strong>${task.name}</strong><br>${task.type}</p>`;
            tasklist.appendChild(item);

            form.reset();

            let delButton = document.createElement('button');
            let delButtonText = document.createTextNode("Delete");
            delButton.appendChild(delButtonText);
            item.appendChild(delButton); //add a delete buton to every task

            delButton.addEventListener('click', function(event) {
                localTasks.forEach(function(taskArrayElement, taskArrayIndex) {
                    if (taskArrayElement.id == item.getAttribute('data-id')) {
                        localTasks.splice(taskArrayIndex, 1);
                    }
                })

                //update localStorage with newly spliced array converted to a JSON string
                localStorage.setItem('tasks', JSON.stringify(localTasks));

                item.remove(); //remove the task item from the page when clicked
            })
        })
    }
}

// Create an array called 'taskList'
var taskList = [];

// Create a function called 'addTask'
// Give the function input parameters for: name, type, rate, time, client
// Paste your object definition from above in the function
// Replace the property values with the input paramaters
// Add the object to the taskList array

function addTask(name, type, rate, time, client) {

    // Creating the object, directly passing in the input parameters
    let task = {
        name,
        type,
        id: Date.now(),
        date: new Date().toISOString(),
        rate,
        time,
        client
    }

    let localTasks = JSON.parse(localStorage.getItem('tasks'));

    if (localTasks == null) {
        localTasks = [task]
    } else {
        if (localTasks.find(element => element.id === task.id)) {
            console.log('Task ID already exists')
        } else {
            localTasks.push(task);
        }
    }

    localStorage.setItem('tasks', JSON.stringify(localTasks));
    displayTasks();
    // taskList.push(task);
    // displayTask(task);
}

// Call the function with test values for the input paramaters
addTask("Initial Sketches", "Concept Ideation", 50, 5, "Google");

// Log the array to the console.
console.log(taskList);