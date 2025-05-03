import { useState } from "react";
import { useEffect } from "react";

import EnterTask from "./components/EnterTask/EnterTask";
import AddTask from "./components/AddTask/AddTask";

import "./components/AddTask/AddTask.css";
import "./components/EnterTask/EnterTask.css";

function App() {
  const [tasks, setTasks] = useState<
    [string, string, string, string, string][]
  >([]);

  const handleSavedTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/populate_tasks");
      console.log("Response:", response);
      if (response.ok) {
        const data = await response.json();
        const transformedData = data.map((row) => [
          row.taskID,
          row.task,
          row.date,
          row.time,
          row.tag,
        ]);
        setTasks(transformedData);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    handleSavedTasks();
  }, []);

  const handleTasks = (newTask: [string, string, string, string, string]) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <>
      <div>
        <EnterTask addTask={handleTasks} reloadTasks={handleSavedTasks} />
        <AddTask lst={tasks} reloadTasks={handleSavedTasks} />
      </div>
    </>
  );
}

export default App;
