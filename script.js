let addBtn=document.querySelector("#addBtn");
let input=document.querySelector("input");
let ul=document.querySelector("ul");
let category=document.querySelector("select");

let savedTasks=localStorage.getItem("tasks");
let tasks=JSON.parse(savedTasks) || [];

let currentFilter="All";
let emptyListLines=document.querySelector(".noListLines");

let progressText =document.querySelector("#progress-updation-text");
let customFill = document.querySelector("#customFill");

displayTasks(tasks);

addBtn.addEventListener("click", function(){
    let userInput=input.value;
    let userCategory=category.value;


    let task={
        userInp:userInput,
        userCat:userCategory,
        userStat:"Active"
    };

    

    if(userInput!=""){
        tasks.push(task);
        saveTasks();
        updateDisplay(); 
        updateProgress();     
        updateProgressText();
    }
    input.value="";
    
});

    ul.addEventListener("click", function(event){
    if(event.target.nodeName=="BUTTON"){
        for(let i=0;i<tasks.length;i++){
            if(tasks[i].userInp == event.target.dataset.task){
                tasks.splice(i,1);
                saveTasks();
                updateDisplay();
                updateProgress();
                updateProgressText();
            }
        }  
    }else if(event.target.nodeName == "I"){
        for(let i=0;i<tasks.length;i++){
            if(tasks[i].userInp == event.target.parentElement.dataset.task){
                tasks.splice(i,1);
                saveTasks();
                updateDisplay();
                updateProgress();
                updateProgressText();
            }
        }   
    }else if(event.target.nodeName=="INPUT"){
        if(event.target.checked==true){
            for(let i=0;i<tasks.length;i++){
                if(tasks[i].userInp==event.target.dataset.task){
                    tasks[i].userStat="Completed";
                }
            }   
            saveTasks();
            updateProgress();
            updateProgressText();
            if(currentFilter=="Active"){
                displayTasks(getActiveTasks());
            } 
        }else{
            for(let i=0;i<tasks.length;i++){
                if(tasks[i].userInp==event.target.dataset.task){
                    tasks[i].userStat="Active";
                }
            } 
            saveTasks();
            updateProgress();
            updateProgressText();
            if(currentFilter=="Completed"){
                displayTasks(getCompletedTasks());
            }
        }
    }
});

let allBtn=document.querySelector(".all");
let activeBtn=document.querySelector(".active");
let completedBtn=document.querySelector(".completed");

allBtn.addEventListener("click", function(){
    currentFilter = "All";
    updateSelectedButton();
    displayTasks(tasks);
});

activeBtn.addEventListener("click", function(){
    currentFilter = "Active";
    updateSelectedButton();
    displayTasks(getActiveTasks());
});

completedBtn.addEventListener("click", function(){
    currentFilter = "Completed";
    updateSelectedButton();
    displayTasks(getCompletedTasks());
});


function displayTasks(taskList){
    ul.innerHTML="";
    if(taskList.length!=0){
        emptyListLines.style.display="none";
        }else{
            emptyListLines.style.display="block";
        }
    for(let i=0; i<taskList.length;i++){
        let task=taskList[i];
        let checkBox=document.createElement("input");
        checkBox.classList.add("task-checkbox");
        checkBox.type="checkbox";
        checkBox.dataset.task = task.userInp;
        if(task.userStat == "Completed"){
            checkBox.checked=true;
        }
        let delBtn=document.createElement('button');
        delBtn.innerHTML='<i class="fa-regular fa-trash-can"></i>';
        delBtn.classList.add("delete");
        delBtn.dataset.task = task.userInp; 

        let taskContent=document.createElement("div");
        taskContent.classList.add("task-content");


        let taskText=document.createElement("span");
        taskText.classList.add("task-text");
        taskText.innerText=task.userInp;

        let categoryText=document.createElement("span");
        categoryText.classList.add("text-category");


        if(task.userCat=="Personal"){
            categoryText.innerText="🌸 Personal";
        }else if(task.userCat=="Work"){
            categoryText.innerText="💻 Work";
        }else if(task.userCat=="Study"){
            categoryText.innerText="📚 Study";
        }else{
            categoryText.innerText="🛍️ Other";
        }


        taskContent.appendChild(taskText);
        taskContent.appendChild(categoryText);


        let item=document.createElement('li');
        item.classList.add("task-item");

        item.appendChild(checkBox);
        item.appendChild(taskContent);
        item.appendChild(delBtn);

        ul.appendChild(item);

    }
}

function updateDisplay(){
    if(currentFilter=="Active"){
        displayTasks(getActiveTasks());
    }else if(currentFilter=="Completed"){
        displayTasks(getCompletedTasks());
    }else if(currentFilter=="All"){
        displayTasks(tasks);
    }
}

function getActiveTasks(){
    let activeTasks=tasks.filter((task) =>{
        return task.userStat=="Active";
    });
    return activeTasks;
}

function getCompletedTasks(){
    let completedTasks=tasks.filter((task) =>{
        return task.userStat=="Completed";      
    });
    return completedTasks;
}

function updateProgress(){
    if(tasks.length!=0){
        let percentage = (getCompletedTasks().length / tasks.length) * 100;
        customFill.style.width = percentage + "%";
    }else{
        customFill.style.width="0%";
    }
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



function updateProgressText(){
    progressText.innerText=`${getCompletedTasks().length} of ${tasks.length} tasks completed`;
}


updateProgress();
updateProgressText();

function updateSelectedButton(){
    allBtn.classList.remove("selected");
    activeBtn.classList.remove("selected");
    completedBtn.classList.remove("selected");

    if(currentFilter=="All"){
        allBtn.classList.add("selected");
    }else if(currentFilter=="Active"){
        activeBtn.classList.add("selected");
    }else{
        completedBtn.classList.add("selected");
    }
}

updateSelectedButton();

