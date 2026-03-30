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
  const [formData, setFormData] = useState({
    nombre_completo: usuario?.nombre_completo || "",
    email: usuario?.email || "",
  });

  const [pestanaActiva, setPestanaActiva] = useState("editar");

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
      setFormData({
        nombre_completo: userData.nombre_completo || "",
        email: userData.email || "",
      });
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

  const handleEditChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const data = new FormData();
      data.append("nombre_completo", formData.nombre_completo);
      data.append("email", formData.email);

      if (formData.profilePictureFile) {
        data.append("profilePictureFile", formData.profilePictureFile);
      }
      if (formData.bannerFile) {
        data.append("bannerFile", formData.bannerFile);
      }

      const res = await axios.post(`${API}/perfil/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUser = res.data.usuario;
      setUsuario(updatedUser);
      localStorage.setItem("usuario_perfil_cache", JSON.stringify(updatedUser));

      Swal.fire({
        title: "Perfil actualizado con exito",
        icon: "success",
      });
    } catch (err) {
      console.error(
        "Error al actualizar perfil:",
        err.response?.data || err.message || err,
      );
      let errorMsg = "Error al actualizar. Revisa los datos.";
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.response?.data?.errors) {
        const firstErrorKey = Object.keys(err.response.data.errors)[0];
        errorMsg = err.response.data.errors[firstErrorKey][0];
      }
      Swal.fire({
        title: "Error",
        text: errorMsg,
        icon: "error",
      });
    }
  };

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

  const renderizarContenidoPerfil = () => {
    if (!usuario)
      return <p className={styles.mensajeVacio}>Cargando datos...</p>;

    return (
      <div className={styles.contenedorFormularioEdicion}>
        <h3 className={styles.tituloSeccion}>Editar perfil</h3>
        <form
          className={styles.formularioEdicionPerfil}
          onSubmit={handleUpdate}
        >
          <label htmlFor="nombre_completo">Nombre</label>
          <input
            id="nombre_completo"
            type="text"
            name="nombre_completo"
            value={formData.nombre_completo || ""}
            onChange={handleEditChange}
          />
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleEditChange}
          />
          <label htmlFor="profilePictureFile">Foto de perfil</label>
          <div className={styles.areaCargaArchivo}>
            <span>
              {formData.profilePictureFile
                ? formData.profilePictureFile.name
                : "Agrega una nueva imagen"}
            </span>
            <input
              id="profilePictureFile"
              type="file"
              name="profilePictureFile"
              className={styles.inputArchivoOculto}
              onChange={handleFileChange}
            />
          </div>
          <label htmlFor="bannerFile">Foto de portada</label>
          <div className={styles.areaCargaArchivo}>
            <span>
              {formData.bannerFile
                ? formData.bannerFile.name
                : "Agrega una nueva imagen"}
            </span>
            <input
              id="bannerFile"
              type="file"
              name="bannerFile"
              className={styles.inputArchivoOculto}
              onChange={handleFileChange}
            />
          </div>
          <label htmlFor="userId">ID</label>
          <input
            id="userId"
            type="text"
            value={usuario.id || ""}
            readOnly
            className={styles.campoSoloLectura}
          />
          <button type="submit" className={styles.botonGuardarPerfil}>
            Guardar
          </button>
        </form>
      </div>
    );
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
        <div className={styles.areaContenidoPestana}>
          {renderizarContenidoPerfil()}
        </div>
      </div>
    </main>
  );
}

export default PerfilUsuario;
