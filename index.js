const taskContainer = document.querySelector(".task__container");

//Global Store
let globalStore=[];

const newTask = 
    ({id,
    taskTitle,
    taskDescription,
    assignedTo,
    targetDate,
    priority}) => `
<div class="col-md-3" id=${id}>
          <div class="logout shadow mx-auto mt-4"  style="max-width: 18rem;">
            <div class="card-header">
              <button type="button" id=${id} class="btn btn-outline-dark" onclick="deleteTask.apply(this, arguments)">
                <i class="fas fa-check" id=${id} onclick="deleteTask.apply(this, arguments)"></i>
              </button>
            </div>
            <div class="card-body">
              <h5 class="card-title">${taskTitle}</h5>
              <p class="card-text">${taskDescription}</p>
              <p class="card-text">Assigned to: ${assignedTo}</p>

              <button type="button" class="btn btn-outline-dark showhim">
               <i class="far fa-calendar"></i>
                  <div class="showme">${targetDate}</div>
                </button>
              <button type="button" class="btn btn-outline-dark showhim">
                <i class="fas fa-exclamation-triangle"></i>
                <div class="showme">${priority}</div>
              </button>
            </div>
         </div>
`;

const loadInitialTasks =() => {
//access localstorage
const getInitialData = localStorage.tasky;
if(!getInitialData) return;  

//convert stringified-object to object
const {tasks} = JSON.parse(getInitialData);

//map around the array to generate HTML taskcard and inject it to DOM
tasks.map( (taskObject) => {
  const assignNewTask = newTask(taskObject);
  taskContainer.insertAdjacentHTML("beforeend",assignNewTask);
  globalStore.push(taskObject);
});


};


const done = () =>{
    const taskData = {
        id:`${Date.now()}`, //unique number for each task
        taskTitle: document.getElementById("title").value,
        taskDescription: document.getElementById("description").value,
        assignedTo:document.getElementById("person").value,
        targetDate:document.getElementById("target date").value,
        priority:document.getElementById("priority").value,

    };
    
    const assignNewTask = newTask(taskData);
    taskContainer.insertAdjacentHTML("beforeend",assignNewTask);
    globalStore.push(taskData);

    localStorage.setItem("tasky",JSON.stringify({ tasks : globalStore}));
}; 

const deleteTask = (event) => {
//id
event = window.event;
const targetID= event.target.id;
const tagname=event.target.tagName;  //BUTTON
//search the globalStore ,remove the object which matches with the id
const newUpdatedArray = globalStore.filter(
  (taskobject) => taskObject.id !== targetID
  );
  globalStore =newUpdatedArray;


//access DOM to remove the task

if(tagname === "BUTTON"){
  return taskContainer.removeChild(
    event.target.parentNode.parentNode
  );
}

return taskContainer.removeChild(
  event.target.parentNode.parentNode.parentNode
);

};