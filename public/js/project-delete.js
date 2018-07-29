'use strict';

function deleteProject() {
    $('.delete-project-button').click(event => {
        event.preventDefault();
        // Get current url
        const url = window.location.search;
        // Get the id of the selected project from the url
        let itemId = getParamValFromUrl(url, 'id');

        console.log(itemId);
        $.ajax({
            url: "/api/projects/project-delete/" + itemId,
            type: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify({ id: itemId }),
            success: function (data) {
                // Upon success go back to project-list page
                window.location.href = "projects-list.html";
            },
            error: function (error) {
                console.log('error', error);
            },
        });
    });
}

function handleProjectDelete() {
    deleteProject();
}

$(handleProjectDelete);