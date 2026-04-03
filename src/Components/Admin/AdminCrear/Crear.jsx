import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { ChevronRight } from "lucide-react";

function CrearUniversal() {
  const { tipo } = useParams();
  const navigate = useNavigate();

  const [municipios, setMunicipios] = useState([]);
  const [imagenes, setImagenes] = useState([]);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagenes: "",
    ubicacion: "",
    coordenadas: "",
    municipio_id: "",
  });

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/municipios",
        );
        setMunicipios(
          Array.isArray(response.data.data) ? response.data.data : [],
        );
      } catch (error) {
        console.error(error);
        setMunicipios([]);
      }
    };

    if (tipo === "lugar" || tipo === "hospedaje") {
      fetchMunicipios();
    }
  }, [tipo]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const endpoints = {
    lugar: import.meta.env.VITE_API_URL + "/lugares",
    hospedaje: import.meta.env.VITE_API_URL + "/hospedajes",
    usuario: import.meta.env.VITE_API_URL + "/usuarios",
  };

  const onDrop = (acceptedFiles) => {
    if (imagenes.length + acceptedFiles.length > 3) {
      Swal.fire("Máximo 3 imágenes");
      return;
    }

    setImagenes((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 3,
    onDrop,
  });

  const eliminarImagen = (index) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const endpoint = endpoints[tipo];
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      imagenes.forEach((img) => {
        formDataToSend.append("imagenes[]", img);
      });

      await axios.post(endpoint, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire("Creado", `${tipo} creado correctamente`, "success");
      navigate(-1);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo crear el registro", "error");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-evenly py-40 bg-gray-100 px-6">
    </div>
  );
}

export default CrearUniversal;