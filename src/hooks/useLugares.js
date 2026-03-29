import { useEffect, useState } from "react";
import { getLugares, deleteLugar } from "../services/lugaresServices";
import { mapLugar } from "../utils/lugaresMapper";
import Swal from "sweetalert2";
export default function useLugares() {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [lugarAEliminar, setLugarAEliminar] = useState(null);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      cargarLugares();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);
  const cargarLugares = async () => {
    try {
      setLoading(true);
      const response = await getLugares({
        search: searchQuery || undefined,
      });
      const procesados = (response.data || []).map(mapLugar);
      setLugares(procesados);
      setError(null);
    } catch (e) {
      setError(
        e.response?.status === 429
          ? "Demasiadas peticiones. Espera..."
          : "Error al cargar",
      );
    } finally {
      setLoading(false);
    }
  };
  const eliminar = async () => {
    if (!lugarAEliminar) return;
    try {
      await deleteLugar(lugarAEliminar);
      setLugares((prev) => prev.filter((l) => l.id !== lugarAEliminar));
    } catch (e) {
      setError("No se pudo eliminar.");
    } finally {
      setShowModal(false);
      setLugarAEliminar(null);
    }
  };
  return {
    lugares,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    showModal,
    setShowModal,
    setLugarAEliminar,
    eliminar,
  };
}
