'use strict';

let itemId;

// Get a single project
function getProjectInfo(callbackFn, id) {
    console.log(id);
    $.ajax({
        url: "/api/projects/project-read" + id,
        type: 'GET',
        contentType: 'application/json',
        success: callbackFn,
        error: function (error) {
            console.log('error', error);
        },
    });
}

function displayProjectInfo(data) {
    // Display header info
    let headerInfo = projectHeaderUpdateTemplate(data)
    $('.js-project-info').append(headerInfo);

    // Display tasks info
    let tasksInfo = data.tasks.map((task) => projectTasksUpdateTemplate(task));
    $('.js-project-info').append(tasksInfo);
}

function displayProject() {
    // Get current url
    const url = window.location.search;
    // Get the id of the selected project from the url
    itemId = getParamValFromUrl(url, 'id');
    if (!itemId) {
        alert('Project id is missing');
        return;
    }
    getProjectInfo(displayProjectInfo, itemId);
}

function addTaskClick() {
    $('.add-task-button').click(event => {
        let newTask = `
        <div>
        <label for="description">Description:</label>
        <input type="text" name="description" class="description">
        </div>
        <div>
        <label for="hours">Hours:</label>
        <input type="text" name="hours" class="hours">
        </div>
        `;
        console.log(newTask);
        $('.js-project-info').append(newTask);
    });
}

function buildProjectData(fields, formData) {
    let task = {};
    let tasks = [];
    
    jQuery.each(fields, function (i, field) {
        //console.log(field.name);
        //console.log(field.value);
        if (field.name == 'description') {
            task = {};
            task[field.name] = field.value;
        }
        if (field.name == 'hours') {
            task[field.name] = field.value;
            tasks.push(task);
            console.log(tasks);
        }
        else {
            formData[field.name] = field.value;
        }
    });

    formData['tasks'] = tasks;
    //task.companyName = 'blahblah';
    //task.hours = 10;
    
    console.log(tasks);
    return formData;
}

$('.project-update-form').submit(event => {
    event.preventDefault();
    // Fetch all the the data from the form
    let fields = $("form").serializeArray();
    //console.log(fields);
    // Build an object with all the form's fields
    let task = {};
    let tasks = [];
    let formData = {};
    
    formData = buildProjectData(fields, formData);
    
    console.log(formData);
    $.ajax({
        url: "/api/projects/project-update/" + itemId,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (data) {
            // Upon success go back to project-list page
            window.location.href = "projects-list.html";
        },
        error: function (error) {
            console.log('error', error);
        },
    });
});

function handleProject() {
    displayProject();
    addTaskClick();
}

$(handleProject);