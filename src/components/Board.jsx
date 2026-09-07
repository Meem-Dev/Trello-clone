import { useContext } from "react";
import Column from "./Column";
import BoardContext from "../context/BoardContext";

function Board() {
  const {
    filteredColumns,
    search,
    setSearch,
    addTask,
    deleteTask,
    editTask,
    moveTask,
  } = useContext(BoardContext);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-100 px-3 py-5 transition-colors sm:px-5 sm:py-6 md:px-8 dark:bg-slate-900">
      <div className="mx-auto mb-6 flex w-full max-w-7xl flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl dark:text-slate-100">
            My Board
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your tasks and track your progress
          </p>
        </div>

        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 pb-6 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredColumns.map((column) => (
          <Column
            key={column.id}
            title={column.title}
            tasks={column.tasks}
            columnId={column.id}
            addTask={addTask}
            deleteTask={deleteTask}
            editTask={editTask}
            moveTask={moveTask}
          />
        ))}
      </div>
    </main>
  );
}

export default Board;
