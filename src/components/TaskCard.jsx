import { useContext, useState } from "react";
import BoardContext from "../context/BoardContext";

function TaskCard({ columnId, task }) {
  const { columns, deleteTask, moveTask, editTask } = useContext(BoardContext);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = () => {
    if (newTitle.trim() === "") return;

    editTask(columnId, task.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div
      draggable={!isEditing}
      onDragStart={(e) => {
        if (isEditing) return;

        e.dataTransfer.setData("taskId", task.id.toString());

        e.dataTransfer.setData("columnId", columnId.toString());
      }}
      className="cursor-grab rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing dark:border-slate-700 dark:bg-slate-900"
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="mb-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleEdit}
              type="button"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300 active:translate-y-0"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300 active:translate-y-0 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-4 text-base font-semibold text-slate-800 dark:text-slate-100">
            {task.title}
          </p>

          <div className="mb-3 flex flex-wrap gap-2">
            <button
              onClick={() => setIsEditing(true)}
              type="button"
              className="inline-flex h-9 min-w-16 items-center justify-center rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 active:translate-y-0"
            >
              Edit
            </button>

            <button
              onClick={() => deleteTask(columnId, task.id)}
              type="button"
              className="inline-flex h-9 min-w-16 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 text-sm font-semibold text-red-700 transition hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-100 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 active:translate-y-0"
            >
              Delete
            </button>
          </div>

          <select
            defaultValue=""
            onChange={(e) =>
              moveTask(columnId, task.id, Number(e.target.value))
            }
            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="" disabled>
              Move to...
            </option>

            {columns
              .filter((column) => column.id !== columnId)
              .map((column) => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
          </select>
        </>
      )}
    </div>
  );
}

export default TaskCard;
