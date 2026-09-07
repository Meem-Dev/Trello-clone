import TaskCard from "./TaskCard";
import { useState } from "react";

function Column({
  title,
  tasks,
  columnId,
  addTask,
  deleteTask,
  editTask,
  moveTask,
}) {
  const [taskTitle, setTaskTitle] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();

    const taskId = Number(e.dataTransfer.getData("taskId"));

    const sourceColumnId = Number(e.dataTransfer.getData("columnId"));

    if (sourceColumnId === columnId) return;

    moveTask(sourceColumnId, taskId, columnId);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={handleDrop}
      className="w-full min-w-0 rounded-xl bg-slate-200 p-3 shadow-md transition-colors sm:p-4 dark:bg-slate-800"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          {title}
        </h2>

        <span className="rounded-full bg-slate-300 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            columnId={columnId}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="New Task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="mb-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
        />

        <button
          type="button"
          onClick={() => {
            addTask(columnId, taskTitle);
            setTaskTitle("");
          }}
          className="w-full rounded-lg bg-slate-800 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 active:translate-y-0"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Column;
