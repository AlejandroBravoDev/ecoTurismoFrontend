import { BrowserRouter, Routes, Route } from "react-router-dom";

//Importacion de componentes
import VerHospedajes from "/components/VerHospedajes/VerHospedajes.jsx";

//Importacion de pages
import Lugares from "./pages/Lugares.jsx";
import Hospedajes from "./pages/Hospedajes.jsx";
import VerLugares from "./pages/VerLugares.jsx";
import PerfilUser from "./pages/PerfilUser.jsx";
import Home from "./pages/Home.jsx";

import Contacto from "./pages/Contacto";
import QueOfrecemosPage from "./pages/QueOfrecemos";
import FaqEcoturismoPage from "./pages/PreguntasFrecuentesPage";
import Politicas from "./pages/Politicas.jsx";
//importación de rutas para el admin
import PanelAdminPage from "./pages/Admin/PanelAdminPage.jsx";
import AdminUsuariosPage from "./pages/Admin/AdminUsuariosPage.jsx";
import EditarUsuarioPage from "./pages/Admin/EditarUsuarioPage.jsx";
import AdminCrearPage from "./pages/Admin/AdminCrearPage.jsx";
import EditarUniversalPage from "./pages/Admin/EditarUniversalPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/lugares" element={<Lugares />} />;
      <Route path="/lugares/:id" element={<VerLugares />} />

      <Route path="/hospedajes" element={<Hospedajes />} />;
      <Route path="/hospedajes/:id" element={<VerHospedajes />} />

      <Route path="/perfil" element={<PerfilUser />} />

      <Route path="/ofrecemos" element={<QueOfrecemosPage />} />
      <Route path="/preguntasFrecuentes" element={<FaqEcoturismoPage />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/politicas" element={<Politicas />} />
      {/* Rutas del admin */}
      <Route path="/PanelAdmin" element={<PanelAdminPage />} />
      <Route path="/PanelAdmin/usuarios" element={<AdminUsuariosPage />} />
      <Route path="/PanelAdmin/usuarios/:id" element={<EditarUsuarioPage />} />
      <Route path="/PanelAdmin/crear/:tipo" element={<AdminCrearPage />} />
      <Route
        path="/PanelAdmin/editar/:tipo/:id"
        element={<EditarUniversalPage />}
      />
    </Routes>
  );
}

export default App;
