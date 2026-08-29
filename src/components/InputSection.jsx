import "./InputSection.css";
import { ChevronDown, Plus } from "lucide-react";

function InputSection({
  task,
  priority,
  setTask,
  setPriority,
  setDueDate,

  onAddTask,
  onHandleKeyDown,
}) {
  return (
    <section className="addtask-section">
      <div className="input-section">
        <input
          onChange={(event) => {
            setTask(event.target.value);
          }}
          onKeyDown={onHandleKeyDown}
          type="text"
          placeholder="Enter a task"
          value={task}
          className="input-field"
        />
      </div>

      <div className="task-controls">
        <div className="task-info">
          <div className="select-wrapper">
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="input-field priority-select"
            >
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>

            <ChevronDown size={18} className="select-icon" />
          </div>

          <input
            type="date"
            onInput={(event) => {
              const date = event.target.value;

              setDueDate(date);
            }}
            className="input-field"
          />
        </div>

        <button onClick={onAddTask} className="add-button">
          <Plus size={22} />
          Add Task
        </button>
      </div>
    </section>
  );
}

export default InputSection;
