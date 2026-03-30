import React, { useState, useEffect } from "react";
import styles from "./PerfilUser.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import placeholderFotoUsuario from "../../assets/usuarioDemo.webp";
import bannerFondo from "../../assets/img4.webp";

const API = import.meta.env.VITE_API_URL;

function PerfilUsuario() {
  const [usuario, setUsuario] = useState(() => {
    const cached = localStorage.getItem("usuario_perfil_cache");
    return cached ? JSON.parse(cached) : null;
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getImageUrl = (imageUrl, isBanner = false) => {
    if (imageUrl && typeof imageUrl === "string") {
      return imageUrl;
    }
    return isBanner ? bannerFondo : placeholderFotoUsuario;
  };

  const cargarPerfil = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get(`${API}/perfil`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = res.data.usuario;
      setUsuario(userData);
      localStorage.setItem("usuario_perfil_cache", JSON.stringify(userData));
      setError(null);
    } catch (err) {
      console.error(
        "Error al cargar el perfil:",
        err.response?.data || err.message || err,
      );
      setError("No se pudo cargar el perfil. Por favor, inicie sesión.");

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario_perfil_cache");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await axios.post(`${API}/logout`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.warn(
          "Advertencia: No se pudo revocar el token en el servidor. Limpiando localmente.",
        );
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("usuario_perfil_cache");
    navigate("/");
  };

  return (
    <main className={styles.estructuraPaginaPerfil}>
      <div
        className={styles.bannerSuperior}
        style={{
          backgroundImage: `url(${getImageUrl(usuario?.banner_url, true)})`,
        }}
      ></div>
      <div className={styles.contenedorPrincipalPerfil}>
        <div className={styles.contenidoCabeceraPerfil}>
          <img
            src={getImageUrl(usuario?.avatar_url)}
            alt="Perfil"
            className={styles.avatarPerfil}
          />
          <div className={styles.bloqueInfoUsuario}>
            <h3>{usuario?.nombre_completo || "Usuario"}</h3>
            <p className={styles.textoEmailUsuario}>{usuario?.email || ""}</p>
            <span className={styles.idCuentaUsuario}>
              ID: {usuario?.id || "..."}
            </span>
          </div>
          <div className={styles.contenedorAcciones}>
            <button className={styles.botonCerrarSesion} onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PerfilUsuario;
