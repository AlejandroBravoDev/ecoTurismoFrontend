import { BrowserRouter, Routes, Route } from "react-router-dom";

//Importacion de componentes
import VerHospedajes from "/components/VerHospedajes/VerHospedajes.jsx";

//Importacion de pages
import Lugares from "./pages/Lugares.jsx";
import Hospedajes from "./pages/Hospedajes.jsx";
import VerLugares from "./pages/VerLugares.jsx";
import PerfilUser from "./pages/PerfilUser.jsx";
import Home from "./pages/Home.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Login from "./pages/login.jsx";
import Registro from "./pages/registro.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lugares" element={<Lugares />} />;
      <Route path="/lugares/:id" element={<VerLugares />} />
      <Route path="/hospedajes" element={<Hospedajes />} />;
      <Route path="/hospedajes/:id" element={<VerHospedajes />} />
      <Route path="/perfil" element={<PerfilUser />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
    </Routes>
  );
}

export default App;