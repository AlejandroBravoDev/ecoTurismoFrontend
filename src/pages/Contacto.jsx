import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Leaf,
  Compass,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import Header from "../Components/header/index";
import Footer from "../Components/footer/index";
import fondoContacto from "../assets/portadaProyecto3.webp";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function Contacto() {
  return (
    <div className="min-h-screen bg-black flex flex-col font-sans overflow-x-hidden">
      <Header />
      <main className="flex-grow relative pt-20">
        {/* Contenido principal aquí */}
      </main>
      <Footer />
    </div>
  );
}

export default Contacto;