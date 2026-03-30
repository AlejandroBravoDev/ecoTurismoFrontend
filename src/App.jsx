import { BrowserRouter, Routes, Route } from "react-router-dom";

//Importacion de componentes
import VerHospedajes from "/components/VerHospedajes/VerHospedajes.jsx";

//Importacion de pages
import Lugares from "./pages/Lugares.jsx";
import Hospedajes from ".pages/Hospedajes.jsx";

function App() {
  return (
    <Routes>
      <Route path="/lugares" element={<Lugares />} />;
      <Route path="/hospedajes" element={<Hospedajes />} />;
      <Route path="/hospedajes/:id" element={<VerHospedajes />} />
    </Routes>
  );
}

export default App;
