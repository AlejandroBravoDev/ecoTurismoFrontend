import { useState, useEffect } from "react";
import api from "../services/api";
import Swal from "sweetalert2";
function useHospedajes() {
  const [hospedajes, setHospedajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hospedajeAEliminar, setHospedajeAEliminar] = useState(null);
  // Cargar hospedajes cuando cambian los filtros
  useEffect(() => {
    const fetchHospedajes = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (searchQuery) {
          params.append("search", searchQuery);
        }
        const response = await api.get(`/hospedajes?${params}`);
        setHospedajes(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar hospedajes:", err);
        setError("Error al cargar los hospedajes. Por favor intenta de nuevo.");
        setLoading(false);
      }
    };
    fetchHospedajes();
  }, [searchQuery]);
  // Función para eliminar hospedaje
  const eliminar = async () => {
    if (!hospedajeAEliminar) return;
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para realizar esta acción.");
      return;
    }
    try {
      await api.delete(`/hospedajes/${hospedajeAEliminar}`);
      setHospedajes(hospedajes.filter((h) => h.id !== hospedajeAEliminar));
      setShowModal(false);
      setHospedajeAEliminar(null);
      Swal.fire({
        icon: "success",
        text: "Hospedaje eliminado correcatamente",
      });
    } catch (err) {
      console.error("Error al eliminar hospedaje:", err);
      alert("Error al eliminar el hospedaje.");
      setShowModal(false);
      setHospedajeAEliminar(null);
    }
  };
  return {
    hospedajes,
    loading,
    error,
    searchQuery,
    showModal,
    setShowModal,
    setHospedajeAEliminar,
    setSearchQuery,
    eliminar,
  };
}
export default useHospedajes;
