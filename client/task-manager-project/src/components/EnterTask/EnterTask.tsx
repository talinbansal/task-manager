// Importing necessary hooks and libraries
import { useState } from "react"; // React hook for managing local component state
import { nanoid } from "nanoid"; // Library to generate unique IDs

interface predictTagProps {
  taskName: string;
}

// Functional component to handle task entry form
function EnterTask({ addTask, reloadTasks }: any) {
  const tags = {
    Study: "📚",
    Work: "💼",
    Personal: "👤",
    Other: "❓",
  };

  // State variables to store input values for task, date, and time
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tag, setTag] = useState("");

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const predictTag = async ({ taskName }: predictTagProps) => {
    console.log("Predicting tag for task:", taskName);
    try {
      // Send a POST request to the backend API to add the task
      const response = await fetch("http://localhost:3000/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName }),
      });

      // Check for successful response
      if (response.ok) {
        const data = await response.json();
        console.log("Predicted Tag:", data.category);
        const formattedTag = capitalizeFirstLetter(data.category);
        setTag(formattedTag); // Set the predicted tag
        console.log(tag);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Function to handle form submission
  const handleTaskSub = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    var taskID = nanoid(10); // Generate a unique ID for the new task
    var NewTask = [taskID, task, date, time, tag];
    console.log(NewTask); // Structure the task as an array

    try {
      // Send a POST request to the backend API to add the task
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(NewTask),
      });

      // Check for successful response
      if (response.ok) {
        const data = await response.json();
        console.log("Task added:", data);
        // Optionally, reset the form after successful submission
        addTask(NewTask);
        reloadTasks();
        setTask("");
        setDate("");
        setTime("");
        setTag("");
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Render the task input form
  return (
    <>
      <div className="card card1">
        <form
          className="task-submit"
          onSubmit={handleTaskSub}
          // style={{ display: "none" }}
        >
          <div className="enter-task">
            <input
              type="text"
              name="task"
              placeholder="Enter Task"
              value={task}
              onChange={async (e) => {
                setTask(e.target.value);
              }}
              onBlur={async () => {
                await predictTag({ taskName: task }); // Trigger prediction on blur (losing focus)
              }}
              required
            />
            <input
              type="date"
              name="task-date"
              placeholder="Choose a Date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              required
            />
            <input
              type="time"
              name="task-time"
              placeholder="Choose a Time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
              required
            />
            <select onChange={(e) => setTag(e.target.value)} value={tag}>
              <option value="" disabled>
                Select a tag
              </option>
              {Object.entries(tags).map(([key, value]) => (
                <option key={key} value={key}>
                  {value} {key}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" name="submit" className="enter-btn">
            Submit Task
          </button>
        </form>
      </div>
    </>
  );
}

export default EnterTask;
