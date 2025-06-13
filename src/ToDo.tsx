import { useState, useEffect } from "react";

export default function ToDo() {
  type Task = {
    id: string;
    name: string;
    done: boolean;
  };

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("todo-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      name: input.trim(),
      done: false,
    };
    setTasks([newTask, ...tasks]);
    setInput("");
  };

  const toggleDone = (id: string) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    if (!taskToToggle) return;

    const toggledTask = { ...taskToToggle, done: !taskToToggle.done };
    const remainingTasks = tasks.filter((task) => task.id !== id);

    if (toggledTask.done) {
      // Move to end
      setTasks([...remainingTasks, toggledTask]);
    } else {
      // Move to beginning
      setTasks([toggledTask, ...remainingTasks]);
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Save to localStorage when todos change
  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="todo container">
      <div className="content">
        <div className="todo-input-container">
          <input
            type="text"
            className="todo-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a task"
          />
          <button className="todo-button" onClick={addTask}>
            +
          </button>
        </div>
        <div className="todo-list">
          <ul style={{ listStyle: "none", padding: 0 }}>
            {tasks.map((task) => (
              <li key={task.id} className="todo-item">
                <input
                  type="checkbox"
                  id={task.id}
                  className="todo-checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(task.id)}
                />
                <label
                  htmlFor={task.id}
                  style={{
                    textDecoration: task.done ? "line-through" : "none",
                  }}
                >
                  {task.name}
                </label>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="todo-button delete"
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
