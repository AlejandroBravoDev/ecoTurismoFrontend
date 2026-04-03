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

  return (
    <div>
    </div>
  );
};

export default EditarUsuario;