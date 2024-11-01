// document.addEventListener('DOMContentLoaded', function () {

//     let isEditMode = false;
//     let edittingId;
//     const tasks = [{
//         id: 1,
//         title: "Complete project report",
//         description: "Prepare and submit the project report",
//         dueDate: "2024-12-01",
//         comments: [{
//             id:1, 
//             comment: "Its a big proyect!!"
//         },
//         {
//             id:2, 
//             comment: "Its a huge proyect!!"
//         }]
//     },
//     {
//         id: 2,
//         title: "Team Meeting",
//         description: "Get ready for the season",
//         dueDate: "2024-12-01",
//         comments: [{
//             id:1, 
//             comment: "Get ready"
//         }]
        
//     },
//     {
//         id: 3,
//         title: "Code Review",
//         description: "Check partners code",
//         dueDate: "2024-12-01",
//         comments: []
//     },
//     {
//         id: 4,
//         title: "Deploy",
//         description: "Check deploy steps",
//         dueDate: "2024-12-01",
//         comments: []
//     }];

    

//     function loadTasks() {
//         const taskList = document.getElementById('task-list');
//         taskList.innerHTML = '';
//         tasks.forEach(function (task) {
//             const taskCard = document.createElement('div');
//             taskCard.className = 'col-md-4 mb-3';
//             taskCard.innerHTML = `
//             <div class="card">
//                 <div class="card-body">
//                     <h5 class="card-title">${task.title}</h5>
//                     <p class="card-text">${task.description}</p>
//                     <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small> </p>
//                     <a href="#" class="add-comment" data-id="${task.id}">Add comment</a>
//                     <div class="comments-list"> <h6>Comments:</h6> 
                        
//                     </div> 
                    
//                 </div>

//                 <div class="card-footer d-flex justify-content-between">
//                     <button class="btn btn-secondary btn-sm edit-task"data-id="${task.id}">Edit</button>
//                     <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
//                 </div>
//             </div>
//             `;
//             taskList.appendChild(taskCard);
//         });

//         document.querySelectorAll('.edit-task').forEach(function (button) {
//             button.addEventListener('click', handleEditTask);
//         });

//         document.querySelectorAll('.delete-task').forEach(function (button) {
//             button.addEventListener('click', handleDeleteTask);
//         });
//     }

//     function loadComments(){
//         const commentList = document.getElementById('comments-list');
//         commentList.innerHTML = '';
//         comments.forEach(function (comment) {
//             const commentList = document.createElement('div'); 

//         });
//     }

//     function handleEditTask(event) {
//         try {
//             // alert(event.target.dataset.id);
//             //localizar la tarea quieren editar
//             const taskId = parseInt(event.target.dataset.id);
//             const task = tasks.find(t => t.id === taskId);
//             //cargar los datos en el formulario 
//             document.getElementById('task-title').value = task.title;
//             document.getElementById('task-desc').value = task.description;
//             document.getElementById('due-date').value = task.dueDate;
//             //ponerlo en modo edicion
//             isEditMode = true;
//             edittingId = taskId;
//             //mostrar el modal
//             const modal = new bootstrap.Modal(document.getElementById("taskModal"));
//             modal.show();
            

//         } catch (error) {
//             alert("Error trying to edit a task");
//             console.error(error);
//         }
//     }


//     function handleDeleteTask(event) {
//         // alert(event.target.dataset.id);
//         const id = parseInt(event.target.dataset.id);
//         const index = tasks.findIndex(t => t.id === id);
//         tasks.splice(index, 1);
//         loadTasks();
//     }

//     document.getElementById('task-form').addEventListener('submit', function (e) {
//         e.preventDefault();
        
//         const title = document.getElementById("task-title").value;
//         const description = document.getElementById("task-desc").value;
//         const dueDate = document.getElementById("due-date").value;

//         if(isEditMode){
//             //todo editar
//             const task = tasks.find(t => t.id === edittingId);
//             task.title = title;
//             task.description = description;
//             task.dueDate = dueDate;
//         }else{
//             const newTask = {
//                 id: tasks.length + 1,
//                 title: title,
//                 description: description,
//                 dueDate: dueDate
//             };
//             tasks.push(newTask);
//         }
//         const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
//         modal.hide();
//         loadTasks();
//     });
    

//     document.getElementById('taskModal').addEventListener('show.bs.modal',function(){
//         if(!isEditMode){
//             document.getElementById('task-form').reset();
//             // document.getElementById('task-title').value = "";
//             // document.getElementById('task-desc').value = "";
//             // document.getElementById('due-date').value = "";
//         }
//     });

//     document.getElementById("taskModal").addEventListener('hidden.bs.modal', function(){
//         edittingId = null;
//         isEditMode = false;
//     })
//     loadTasks();

// });

document.addEventListener('DOMContentLoaded', function() {
    let tasks = [
        { 
            id: 1, 
            title: "Complete project report", 
            description: "Prepare and submit the project report", 
            dueDate: "2024-12-01", 
            comments: [{
                id: 1, 
                comment: "It's a big project!"
            },
            {
                id: 2, 
                comment: "Comming soon!!!"
            },]                      
        },
        { 
            id: 2,
             title: "Team Meeting", 
             description: "Get ready for the season", 
             dueDate: "2024-12-01", 
             comments: [{id: 1, comment: "Get ready"}] },
        { 
            id: 3, 
            title: "Code Review", 
            description: "Check partners code", 
            dueDate: "2024-12-01", 
            comments: [] },
        { 
            id: 4, 
            title: "Deploy", 
            description: "Check deploy steps", 
            dueDate: "2024-12-01", 
            comments: [] }
    ];

    let taskIdForComment;

    function loadTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${task.title}</h5>
                        <p class="card-text">${task.description}</p>
                        <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
                        <div class="comments">
                            <h6>Comments:</h6>
                            <ul  id="comments-list-${task.id}">
                                ${task.comments.map(comment => `<li class=" mb-2 comment-list">${comment.comment} 
                                <button class="btn btn-danger btn-sm delete-comment" data-task-id="${task.id}" data-comment-id="${comment.id}">Delete</button></li>`).join('')}
                            </ul>
                            <button class="btn btn-primary btn-sm add-comment" data-id="${task.id}" data-bs-toggle="modal" data-bs-target="#commentModal">Add Comment</button>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                    </div>
                </div>
            `;
            taskList.appendChild(taskCard);
        });
        document.querySelectorAll('.add-comment').forEach(button => button.addEventListener('click', handleAddComment));
        document.querySelectorAll('.delete-comment').forEach(button => button.addEventListener('click', handleDeleteComment));
        document.querySelectorAll('.edit-task').forEach(function (button) {
            button.addEventListener('click', handleEditTask);
        });

        document.querySelectorAll('.delete-task').forEach(function (button) {
            button.addEventListener('click', handleDeleteTask);
        });
    }

    function handleEditTask(event) {
        try {
            // alert(event.target.dataset.id);
            //localizar la tarea quieren editar
            const taskId = parseInt(event.target.dataset.id);
            const task = tasks.find(t => t.id === taskId);
            //cargar los datos en el formulario 
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-desc').value = task.description;
            document.getElementById('due-date').value = task.dueDate;
            //ponerlo en modo edicion
            isEditMode = true;
            edittingId = taskId;
            //mostrar el modal
            const modal = new bootstrap.Modal(document.getElementById("taskModal"));
            modal.show();
            

        } catch (error) {
            alert("Error trying to edit a task");
            console.error(error);
        }
    }


    function handleDeleteTask(event) {
        // alert(event.target.dataset.id);
        const id = parseInt(event.target.dataset.id);
        const index = tasks.findIndex(t => t.id === id);
        tasks.splice(index, 1);
        loadTasks();
    }

    document.getElementById('task-form').addEventListener('submit', function (e) {
        e.preventDefault();
        
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-desc").value;
        const dueDate = document.getElementById("due-date").value;

        if(isEditMode){
            //todo editar
            const task = tasks.find(t => t.id === edittingId);
            task.title = title;
            task.description = description;
            task.dueDate = dueDate;
        }else{
            const newTask = {
                id: tasks.length + 1,
                title: title,
                description: description,
                dueDate: dueDate
            };
            tasks.push(newTask);
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
        modal.hide();
        loadTasks();
    });
    

    document.getElementById('taskModal').addEventListener('show.bs.modal',function(){
        if(!isEditMode){
            document.getElementById('task-form').reset();
            // document.getElementById('task-title').value = "";
            // document.getElementById('task-desc').value = "";
            // document.getElementById('due-date').value = "";
        }
    });

    document.getElementById("taskModal").addEventListener('hidden.bs.modal', function(){
        edittingId = null;
        isEditMode = false;
    })

    function handleAddComment(event) {
        taskIdForComment = parseInt(event.target.dataset.id);
        document.getElementById('modal-comment-input').value = '';
    }

    document.getElementById('save-comment-btn').addEventListener('click', function() {
        const task = tasks.find(t => t.id === taskIdForComment);
        const commentInput = document.getElementById('modal-comment-input');
        const commentText = commentInput.value.trim();

        if (commentText) {
            const newComment = { id: task.comments.length + 1, comment: commentText };
            task.comments.push(newComment);
            const commentsList = document.getElementById(`comments-list-${taskIdForComment}`);
            const newCommentElement = document.createElement('li');
            newCommentElement.innerHTML = `${commentText} <button class="btn btn-danger btn-sm delete-comment" mb3 data-task-id="${taskIdForComment}" data-comment-id="${newComment.id}">Delete</button>`;
            commentsList.appendChild(newCommentElement);
            newCommentElement.querySelector('.delete-comment').addEventListener('click', handleDeleteComment);
        } else {
            alert("Please enter a comment.");
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
        modal.hide();
    });

    function handleDeleteComment(event) {
        const taskId = parseInt(event.target.dataset.taskId);
        const commentId = parseInt(event.target.dataset.commentId);
        const task = tasks.find(t => t.id === taskId);
        const commentIndex = task.comments.findIndex(c => c.id === commentId);
        task.comments.splice(commentIndex, 1);
        loadTasks();
    }

    loadTasks();
});