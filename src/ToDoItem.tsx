import React from "react";

interface Task {
  id: string;
  name: string;
  done: boolean;
}

interface ToDoItemProps {
  tasks: Task[];
}

export default function ToDoItem({ tasks }: ToDoItemProps) {
  return (
    <div className="todo-item-container">
      {tasks.map((task) => (
        <div key={task.id} className={`todo-item ${task.done ? "done" : ""}`}>
          <input
            type="checkbox"
            // checked={task.done}
            // onChange={() => {
            //   // Handle checkbox change
            // }}
          />
          <span className={`todo-name ${task.done ? "done" : ""}`}>
            {task.name}
          </span>
        </div>
      ))}
    </div>
  );
}
