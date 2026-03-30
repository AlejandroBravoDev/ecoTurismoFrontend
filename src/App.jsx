import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lugares from "./pages/Lugares.jsx";
import Hospedajes from ".pages/Hospedajes.jsx";

function App() {
  return (
    <Routes>
      <Route path="/lugares" element={<Lugares />} />;
      <Route path="/hospedajes" element={<Hospedajes />} />;
    </Routes>
  );
}

export default App;
