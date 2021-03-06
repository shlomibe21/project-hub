'use strict';

function getUTCDateUSShort(date) {
    let utcDate = date.getUTCMonth() +1 + '/' + date.getUTCDate() +'/'+ date.getUTCFullYear();
    return utcDate;
}

function datePicker() {
    $('.js-projects-info').on('focus', '.date-picker', event => {
        $(".date-picker").datepicker({
            gotoCurrent: true
        });
    });
}

function datePickerSelect() {
    $('.js-projects-info').on('change', '.date-picker', event => {
        let currentField = $(event.currentTarget).attr('name')
        let startingDate = $("input[name=startingDate]").val();
        let endingDate = $("input[name=endingDate]").val();
        if ((startingDate.length > 0) && (endingDate.length > 0)) {
            if (Date.parse(startingDate) > Date.parse(endingDate)) {
                if (currentField === 'startingDate') {
                    alert('Starting Date cannot be after Ending Date!');
                    $("input[name=startingDate]").val('');
                }
                else if (currentField === 'endingDate') {
                    alert('Ending Date cannot be before Starting Date!');
                    $("input[name=endingDate]").val('');
                }
            }
        }
    });
}

// Build a read template for the header of the current project
function projectHeaderReadTemplate(item) {
    // Format dates before displaying them
    let dueDate = item.dueDate ? getUTCDateUSShort(new Date(item.dueDate)) : "";
    let startingDate = item.startingDate ? getUTCDateUSShort(new Date(item.startingDate)) : "";
    let endingDate = item.endingDate ? getUTCDateUSShort(new Date(item.endingDate)) : "";
    
    const projectInfo = `
    <input type="hidden" name="id" value=${item.id}>
    <div class="row">
    <div class="col-12">
    <label>Project:</label>
    <p>${item.projectName ? item.projectName : ""}</p>
    </div>
    </div>
    <div class="row">
    <div class="col-12">
    <label>Company:</label>
    <p>${item.companyName ? item.companyName : ""}</p>
    </div>
    </div>
    <div class="row">
    <div class="col-4">
    <label>Due Date:</label>
    <p>${dueDate ? dueDate : ""}</p>
    </div>
    <div class="col-4">
    <label>Status:</label>
    <p>${item.projectStatus ? item.projectStatus : ""}</p>
    </div>
    <div class="col-4">
    <label>Total Hours:</label>
    <p>${item.totalHours ? item.totalHours : ""}</p>
    </div>
    </div>
    <div class="row">
    <div class="col-4">
    <label>Starting Date:</label>
    <p>${startingDate ? startingDate : ""}</p>
    </div>
    <div class="col-4">
    <label>Ending Date:</label>
    <p>${endingDate ? endingDate : ""}</p>
    </div>
    </div>
    `;

    return projectInfo;
}

// Build a read template for all the tasks of the current project
function projectTasksReadTemplate(task) {
    // Format dates before displaying them
    task.taskDueDate = task.taskDueDate ? $.datepicker.formatDate("mm/dd/yy", new Date(task.taskDueDate)) : "";
    task.taskStartingDate = task.taskStartingDate ? $.datepicker.formatDate("mm/dd/yy", new Date(task.taskStartingDate)) : "";

    const taskTemplate = `
    <div class="task-container">
    <input type="hidden" name="task-id" value=${task._id}>
    <div class="row">
    <div class="col-12">
    <label>Task:</label>
    <text>${task.taskName ? task.taskName : ""}</text>
    </div>
    </div>
    <div class="row">
    <div class="col-4">
    <label>Due Date:</label>
    <p>${task.taskDueDate ? task.taskDueDate : ""}</p>
    </div>
    <div class="col-4">
    <label>Starting Date:</label>
    <p>${task.taskStartingDate ? task.taskStartingDate : ""}</p>
    </div>
    <div class="col-4">
    <label>Hours:</label>
    <p>${task.hours ? task.hours : ""}</p>
    </div>
    </div>
    <div class="row">
    <div class="col-12">
    <label>Description:</label>
    <div>
    <text>${task.description ? task.description : ""}</text>
    </div>
    </div>
    </div>
    </div>
    `;

    return taskTemplate;
}

// Build an editable template for the header of the current project
function projectHeaderUpdateTemplate(item) {
    // Format dates before displaying them
    let dueDate = item.dueDate ? getUTCDateUSShort(new Date(item.dueDate)) : "";
    let startingDate = item.startingDate ? getUTCDateUSShort(new Date(item.startingDate)) : "";
    let endingDate = item.endingDate ? getUTCDateUSShort(new Date(item.endingDate)) : "";

    const projectInfo = `
    <fieldset>
    <input type="hidden" name="id" value=${item.id}>
    <div class="row">
    <div class="col-12">
    <label for="projectName">*Project:</label>
    <input type="text" value="${item.projectName ? item.projectName : ""}" name="projectName" id="project-name" class="form-input" required>
    </div>
    </div>
    <div class="row">
    <div class="col-12">
    <label for="companyName">*Company:</label>
    <input type="text" value="${item.companyName ? item.companyName : ""}" name="companyName" id="company-name" class="form-input" required>
    </div>
    </div>
    <div class="row last-row">
    <div class="col-4">
    <label for="dueDate">Due Date:</label>
    <input type="text" value="${dueDate ? dueDate : ""}" name="dueDate" id="due-date" class="date-picker form-input" autocomplete="off">
    </div>
    <div class="col-4">
    <label for="projectStatus">Status:</label>
    <select name="projectStatus" id="project-status" class="form-input">
        <option value="" disabled selected>${item.projectStatus ? item.projectStatus : ""}</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
        <option value="Waiting for payment">Waiting for payment</option>
        <option value="Payment recieved">Payment recieved</option>
    </select>
    </div>
    <div class="col-4">
    <label for="totalHours">Total Hours:</label>
    <input type="text" value="${item.totalHours ? item.totalHours : ""}" name="totalHours" id="total-hours" class="form-input">
    </div>
    </div>
    <div class="row">
    <div class="col-4">
    <label for="startingDate">Starting Date:</label>
    <input type="text" value="${startingDate ? startingDate : ""}" name="startingDate" id="starting-date" class="date-picker form-input" placeholder="When you started working on it" autocomplete="off">
    </div>
    <div class="col-4">
    <label for="endingDate">Ending Date:</label>
    <input type="text" value="${endingDate ? endingDate : ""}" name="endingDate" id="ending-date" class="date-picker form-input" placeholder="When you finished working on it" autocomplete="off">
    </div>
    </div>
    </fieldset>
    `;

    return projectInfo;
}

// Build an editable template for all the tasks of the current project
function projectTasksUpdateTemplate(task) {
    // Format dates before displaying them
    task.taskDueDate = task.taskDueDate ? $.datepicker.formatDate("mm/dd/yy", new Date(task.taskDueDate)) : "";
    task.taskStartingDate = task.taskStartingDate ? $.datepicker.formatDate("mm/dd/yy", new Date(task.taskStartingDate)) : "";

    const taskTemplate = `
    <li>
    <div class="task-container">
    <input type="hidden" name="taskid" value=${task._id}>
    <div class="row">
    <div class="col-12">
    <label for="taskName">*Task:</label>
    <input type="text" value="${task.taskName ? task.taskName : ""}" name="taskName" class="form-input" required>
    </div>
    </div>
    <div class="row">
    <div class="col-4">
    <label for="dueDate">Due Date:</label>
    <input type="text" value="${task.taskDueDate ? task.taskDueDate : ""}" name="taskDueDate" class="date-picker form-input" autocomplete="off">
    </div>    
    <div class="col-4">
    <label for="startingDate">Starting Date:</label>
    <input type="text" value="${task.taskStartingDate ? task.taskStartingDate : ""}" name="taskStartingDate" class="date-picker form-input" autocomplete="off">
    </div>
    <div class="col-4">
    <label for="hours">Hours:</label>
    <input type="text" value="${task.hours ? task.hours : ""}" name="hours" class="form-input">
    </div>
    </div>
    <div class="row">
    <div class="col-12">
    <label for="description">Description:</label>
    <textarea name="description" class="form-input">${task.description ? task.description : ""}</textarea>
    </div>
    </div>
    <div>
    <button type="button" class="delete-task-button">Delete Task</button>
    </div>
    </div>
    </li>
    `;

    return taskTemplate;
}