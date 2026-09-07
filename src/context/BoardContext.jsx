import { createContext } from "react";
import { useEffect, useState } from "react";
import { useBoard } from "../hooks/useBoard";

const BoardContext = createContext();

export function BoardProvider({ children }) {
  const board = useBoard();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  return (
    <BoardContext.Provider
      value={{
        ...board,
        darkMode,
        toggleDarkMode: () => setDarkMode((current) => !current),
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export default BoardContext;
