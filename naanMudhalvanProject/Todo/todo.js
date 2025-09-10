    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");

    function addTask() {
      if (taskInput.value.trim() === "") return;

      const li = document.createElement("li");
      li.textContent = taskInput.value;

    
      li.addEventListener("click", () => {
        li.classList.toggle("completed");
      });
      
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = () => li.remove();

      li.appendChild(delBtn);
      taskList.appendChild(li);

      taskInput.value = "";
    }

    addBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", e => {
      if (e.key === "Enter") addTask();
    });