import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BoardPage from "./pages/BoardPage";
import Navbar from "./components/Navbar";

import { BoardProvider } from "./context/BoardContext";

function App() {
  return (
    <BrowserRouter>
      <BoardProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<BoardPage />} />
        </Routes>
      </BoardProvider>
    </BrowserRouter>
  );
}

export default App;