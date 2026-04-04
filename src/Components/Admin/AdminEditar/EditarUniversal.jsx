import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import api from "../../services/api";
import "../panelAdmin/tailwind.css";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";

function Editar() {
  const { tipo, id } = useParams();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenesExistentes, setImagenesExistentes] = useState([]);
  const [imagenesNuevas, setImagenesNuevas] = useState([]);
  const [ubicacion, setUbicacion] = useState("");
  const [coordenadas, setCoordenadas] = useState("");
  
  const endpoints = useMemo(
    () => ({
      lugares: `lugares/${id}`,
      hospedajes: `hospedajes/${id}`,
      usuario: `usuario/${id}`,
    }),
    [id],
  );
  
  const navigate = useNavigate();
  const endpoint = endpoints[tipo];

  const fetchData = useCallback(async () => {
    if (!endpoint) return;
    try {
      const { data } = await api.get(endpoint);
      setNombre(data.nombre || "");
      setDescripcion(data.descripcion || "");
      setImagenesExistentes(data.todas_las_imagenes || []);
      setCoordenadas(data.coordenadas);
      setUbicacion(data.ubicacion);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-evenly py-10 lg:py-20 bg-gray-50 gap-10 px-4">
    </div>
  );
}

export default Editar;