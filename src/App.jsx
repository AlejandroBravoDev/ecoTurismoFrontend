import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lugares from "./pages/Lugares.jsx";

function App() {
  return <Route path="/lugares" element={<Lugares />} />;
}

export default App;
