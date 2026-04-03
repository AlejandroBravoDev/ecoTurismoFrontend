import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PerfilUser.module.css";
import defaultAvatar from "../../../assets/img4.webp";
import defaultBanner from "../../../assets/fondo-hospedajes.webp";
import Swal from "sweetalert2";

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre_completo: "",
    email: "",
  });
  const [newAvatar, setNewAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [newBanner, setNewBanner] = useState(null);
  const [previewBanner, setPreviewBanner] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/usuarios/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setUser(data.data);
        setFormData({
          nombre_completo: data.data.nombre_completo,
          email: data.data.email,
        });
        setPreviewAvatar(data.data.avatar_url || defaultAvatar);
        setPreviewBanner(data.data.banner_url || defaultBanner);
      }
    } catch (error) {
      console.error("Error al cargar usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBanner(file);
      setPreviewBanner(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("_method", "PUT");
      form.append("nombre_completo", formData.nombre_completo);
      form.append("email", formData.email);

      if (newAvatar) {
        form.append("avatar", newAvatar);
      }
      if (newBanner) {
        form.append("banner", newBanner);
      }

      const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: form,
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 422 && errorData.errors) {
          let errorMsg = "Error de validación: \n";
          for (const key in errorData.errors) {
            errorMsg += `- ${errorData.errors[key].join(", ")}\n`;
          }
          Swal.fire({
            icon: "error",
            text: errorMsg,
          });
        } else {
          alert(
            `Error al actualizar usuario (Código ${response.status}): ${errorData.message || "Error desconocido"}`,
          );
        }
        console.error("API Error Response:", errorData);
        return;
      }

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          text: "Usuario actualizado correctamente",
          icon: "success",
        });
        setEditing(false);
        fetchUser();
      } else {
        alert(
          "Error al actualizar usuario: " +
            (data.message || "La API devolvió un éxito falso."),
        );
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error de conexión o configuración al guardar los cambios.");
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.",
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          text: "Usuario Eliminado",
        });
        navigate("/admin/usuarios");
      } else {
        alert("Error al eliminar usuario");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar el usuario");
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({
      nombre_completo: user.nombre_completo,
      email: user.email,
    });
    setPreviewAvatar(user.avatar_url || defaultAvatar);
    setPreviewBanner(user.banner_url || defaultBanner);
    setNewAvatar(null);
    setNewBanner(null);
  };

  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        Cargando información del usuario...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        Usuario no encontrado
      </div>
    );
  }

  return (
    <div className={styles.pageBackground}>
    </div>
  );
};

export default EditarUsuario;