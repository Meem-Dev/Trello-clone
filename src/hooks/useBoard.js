import { useState, useEffect } from "react";

export function useBoard() {
  const [search, setSearch] = useState("");
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem("columns");

    if (savedColumns) {
      return JSON.parse(savedColumns);
    }

    return [
      {
        id: 1,
        title: "Todo",
        tasks: [
          {
            id: 1,
            title: "Learn React",
          },
          {
            id: 2,
            title: "Build Trello Clone",
          },
        ],
      },
      {
        id: 2,
        title: "In Progress",
        tasks: [
          {
            id: 3,
            title: "Learn useEffect",
          },
        ],
      },
      {
        id: 3,
        title: "Done",
        tasks: [
          {
            id: 4,
            title: "HTML & CSS",
          },
        ],
      },
    ];
  });

  const addTask = (columnId, taskTitle) => {
    if (taskTitle.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
    };

    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: [...column.tasks, newTask],
        };
      }

      return column;
    });

    setColumns(updatedColumns);
  };

  const deleteTask = (columnId, taskId) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        };
      }

      return column;
    });

    setColumns(updatedColumns);
  };

  const editTask = (columnId, taskId, newTitle) => {
    if (newTitle.trim() === "") return;

    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.map((task) => {
            if (task.id === taskId) {
              return {
                ...task,
                title: newTitle.trim(),
              };
            }

            return task;
          }),
        };
      }

      return column;
    });

    setColumns(updatedColumns);
  };

  const moveTask = (columnId, taskId, targetColumnId) => {
    let taskToMove = null;

    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        taskToMove = column.tasks.find((task) => task.id === taskId);

        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        };
      }

      return column;
    });

    const finalColumns = updatedColumns.map((column) => {
      if (column.id === targetColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, taskToMove],
        };
      }

      return column;
    });

    setColumns(finalColumns);
  };
  const filteredColumns = columns.map((column) => {
  return {
    ...column,
    tasks: column.tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    ),
  };
});
  

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  return {
    columns,
    addTask,
    deleteTask,
    editTask,
    moveTask,
    search,
  setSearch,
  filteredColumns,
  };
}