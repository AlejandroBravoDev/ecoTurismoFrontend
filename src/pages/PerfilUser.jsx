import React from "react";
import PerfilUsuario from "./components/PerfilUser/index.jsx";
import useAuthRedirect from "../hooks/useAuthRedirect.jsx";

function PerfilUser() {
  useAuthRedirect();
  return (
    <div className="nueva-interfaz-page">
      <PerfilUsuario className="pt-20" />
    </div>
  );
}

export default PerfilUser;
