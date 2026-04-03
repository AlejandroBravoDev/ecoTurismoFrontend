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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center w-full">
      <main className="w-full flex flex-col items-center flex-grow pt-20">
      
      </main>
    </div>
  );
};

export default AdminUsers;