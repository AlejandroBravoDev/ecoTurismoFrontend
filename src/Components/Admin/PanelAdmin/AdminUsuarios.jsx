import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import noImage from "../../../assets/noImage.webp";

const AdminUsers = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState(() => {
    const cache = localStorage.getItem("admin_users_cache");
    return cache ? JSON.parse(cache) : [];
  });

  const [loading, setLoading] = useState(users.length === 0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const fetchedUsers = Array.isArray(data) ? data : data.data || [];

      setUsers(fetchedUsers);
      localStorage.setItem("admin_users_cache", JSON.stringify(fetchedUsers));
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const rolLimpio = String(user.rol || "")
        .toLowerCase()
        .trim();
      const isNotAdmin = rolLimpio !== "admin" && rolLimpio !== "administrador";
      const matchesSearch =
        user.nombre_completo
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      return isNotAdmin && matchesSearch;
    });
  }, [users, searchTerm]);

  const SkeletonCard = () => (
    <div className="bg-white rounded-[2.5rem] p-4 w-full max-w-[360px] border border-slate-100 animate-pulse">
      <div className="h-56 bg-slate-200 rounded-[2rem] mb-6"></div>
      <div className="h-6 bg-slate-200 rounded w-3/4 mb-4 ml-6"></div>
      <div className="h-4 bg-slate-100 rounded w-1/2 mb-6 ml-6"></div>
      <div className="flex justify-between px-6 pb-4">
        <div className="h-8 bg-slate-100 rounded w-20"></div>
        <div className="h-10 bg-slate-200 rounded-xl w-28"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center w-full">
      <main className="w-full flex flex-col items-center flex-grow pt-20">

      </main>
    </div>
  );
};

export default AdminUsers;