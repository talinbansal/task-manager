import { useState } from "react";
import { useEffect } from "react";

import EditTaskForm from "../EditTask/EditTask";

interface AddTaskProps {
  lst: [string, string, string, string, string][];
  reloadTasks: () => void;
}

interface EditProps {
  task: [string, string, string, string, string];
}

interface DeleteProps {
  taskID: string;
}

function AddTask({ lst, reloadTasks }: AddTaskProps) {
  const tags = {
    Study: "📚",
    Work: "💼",
    Personal: "👤",
    Other: "❓",
  };

  const [editableTask, setEditableTask] = useState<
    [string, string, string, string, string] | null
  >(null);

  const [tasks, setTasks] = useState(lst);

  useEffect(() => {
    // Compare lengths or implement deep comparison if needed
    if (JSON.stringify(lst) !== JSON.stringify(tasks)) {
      setTasks(lst);
    }
  }, [lst]);

  const handleDeleteTask = async ({ taskID }: DeleteProps) => {
    try {
      const response = await fetch("http://localhost:3000/delete_tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskID }),
      });

      // Check for successful response
      if (response.ok) {
        const data = await response.json();
        console.log("Task deleted:", data);
        reloadTasks();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }

    setTasks((prevTasks) => prevTasks.filter((task) => task[0] !== taskID));
  };

  const handleUpdateTask = async (
    updatedTask: [string, string, string, string, string]
  ) => {
    try {
      const response = await fetch("http://localhost:3000/update_tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      // Check for successful response
      if (response.ok) {
        const data = await response.json();
        console.log("Task updated:", data);
        reloadTasks();
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task[0] === updatedTask[0] ? updatedTask : task))
    );
  };

  return (
    <>
      {lst.length === 0 && <p>No Tasks Added</p>}
      {Object.keys(tags).map((category) => (
        <div className={`card card${category}`} key={category}>
          <h4>{category}</h4>
          <ul className="list-group">
            {tasks
              .filter((task) => task[4] === category)
              .map((task) => (
                <li key={task[0]} className={`list-group-item task${category}`}>
                  <div className="task-info">
                    <div className="task-title">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value={task[0]}
                        aria-label="..."
                        onChange={() => {
                          handleDeleteTask({ taskID: task[0] });
                        }}
                      />
                      {task[1]}
                    </div>
                    <div className="task-meta">
                      Due on <b>{task[2]}</b> at <b>{task[3]}</b>
                    </div>
                  </div>
                  <div className="task-btns">
                    <button
                      className="edit-btn"
                      value={task[0]}
                      onClick={() => setEditableTask(task)}
                    >
                      Edit Task
                    </button>
                    <button
                      className="delete-btn"
                      value={task[0]}
                      onClick={() => handleDeleteTask({ taskID: task[0] })}
                    >
                      Delete Task
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ))}
      {/* If edit button is clicked it gives editableTask a truthy value */}
      {editableTask && (
        <div className="popup-overlay">
          <div className="popup-card">
            {/* Popup to edit task. Here EditTask.tsx is called and the editable task is used as input */}
            <EditTaskForm
              editableTask={editableTask}
              onSubmit={handleUpdateTask}
              onClose={() => setEditableTask(null)}
              reloadTasks={reloadTasks}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AddTask;
