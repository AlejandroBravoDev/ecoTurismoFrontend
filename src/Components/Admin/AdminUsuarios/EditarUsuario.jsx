import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PerfilUser.module.css";
import defaultAvatar from "../../../assets/img4.webp";
import defaultBanner from "../../../assets/fondo-hospedajes.webp";
import Swal from "sweetalert2";

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
    </div>
  );
};

export default EditarUsuario;