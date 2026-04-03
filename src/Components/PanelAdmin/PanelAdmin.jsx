import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import imgHospedajes from "../../assets/img4.webp";
import imgLugares from "../../assets/img1.webp";
import imgUsuarios from "../../assets/img6.webp";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function PanelAdmin(){
    const adminCards = [
    {
      title: "Hospedajes",
      description: "Gestiona hoteles, fincas y sitios de alojamiento.",
      image: imgHospedajes,
      link: "/hospedajes",
      buttonText: "Gestionar Hospedajes",
      color: "text-[#20A217]",
    },
    {
      title: "Lugares",
      description: "Administra los destinos turísticos y puntos de interés.",
      image: imgLugares,
      link: "/lugares",
      buttonText: "Gestionar Lugares",
      color: "text-[#20A217]",
    },
    {
      title: "Usuarios",
      description: "Controla los perfiles, roles y accesos de la comunidad.",
      image: imgUsuarios,
      link: "/admin/usuarios",
      buttonText: "Gestionar Usuarios",
      color: "text-[#20A217]",
    },
  ];

  
}