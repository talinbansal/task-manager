import { useState } from "react";

import "./EditTask.css";

//Need to Add Task Update Functionality after submit is clicked

interface EditTaskProps {
  editableTask: [string, string, string, string, string];
  onSubmit: (updatedTask: [string, string, string, string, string]) => void;
  onClose: () => void;
  reloadTasks: () => void;
}

function EditTaskForm({
  editableTask,
  onSubmit,
  onClose,
  reloadTasks,
}: EditTaskProps) {
  const [TaskChange, setNewTask] = useState(editableTask[1]);
  const [TaskDateChange, setNewTaskDate] = useState(editableTask[2]);
  const [TaskTimeChange, setNewTaskTime] = useState(editableTask[3]);

  const handleSubmit = () => {
    const updatedTask: [string, string, string, string, string] = [
      editableTask[0],
      TaskChange,
      TaskDateChange,
      TaskTimeChange,
      editableTask[4],
    ];
    onSubmit(updatedTask);
    onClose();
    reloadTasks();
  };

  return (
    <>
      <div className="card">
        <label>Update Task</label>
        <input
          type="text"
          className="form-control"
          value={TaskChange}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
        />

        <label>Update Date</label>
        <input
          type="date"
          className="form-control"
          value={TaskDateChange}
          onChange={(e) => {
            setNewTaskDate(e.target.value);
          }}
        />

        <label>Update Time</label>
        <input
          type="time"
          className="form-control"
          value={TaskTimeChange}
          onChange={(e) => {
            setNewTaskTime(e.target.value);
          }}
        />

        <button className="submit-btn" type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}

export default EditTaskForm;
