import { NavLink } from "react-router-dom";
import { useContext } from "react";
import BoardContext from "../context/BoardContext";

function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(BoardContext);

  return (
    <nav className="flex min-h-16 items-center justify-between gap-3 bg-slate-800 px-4 py-3 text-white shadow-md transition-colors sm:px-6 md:px-10 dark:bg-slate-950">
      <h2 className="shrink-0 text-lg font-bold sm:text-xl md:text-2xl">
        Trello Clone
      </h2>

      <div className="flex items-center gap-3 text-sm sm:gap-5 sm:text-base">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-semibold transition ${
              isActive ? "border-b-2 border-white pb-1" : "hover:text-slate-300"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/board"
          className={({ isActive }) =>
            `font-semibold transition ${
              isActive ? "border-b-2 border-white pb-1" : "hover:text-slate-300"
            }`
          }
        >
          Board
        </NavLink>

        <button
          type="button"
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg border border-slate-500 px-2 text-lg transition hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          {darkMode ? "☀" : "☾"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
