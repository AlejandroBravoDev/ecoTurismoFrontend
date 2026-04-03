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

  return (
    <div className="w-full min-h-screen flex items-center justify-evenly py-40 bg-gray-100 px-6">
    </div>
  );
}

export default CrearUniversal;