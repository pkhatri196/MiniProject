const taskContainer = document.querySelector(".task__container");

//Global Store
const globalStore=[];

const newTask = 
    ({id,
    taskTitle,
    taskDescription,
    targetDate,
    priority}) => `
<div class="col-md-4" id=${id}>
          <div class="logout shadow mx-auto mt-4"  style="max-width: 18rem;">
            <div class="card-header">
              <button type="button" class="btn btn-outline-dark">
                <i class="fas fa-check"></i>
              </button>
            </div>
            <div class="card-body">
              <h5 class="card-title">${taskTitle}</h5>
              <p class="card-text">${taskDescription}</p>

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
`

const loadInitialTasks =() => {
//access localstorage
const getInitialData = localStorage.getItem("tasky");
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