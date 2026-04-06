import React from "react";
import Header from "../Components/header/index.jsx";
import Footer from "../Components/footer/index.jsx";
import ScrollToTop from "../components/ScrollToTop";
import { Link } from "react-router-dom";
import portada from "../assets/destinosDestacados1.webp";
import geolocalizacion from "../assets/geolocalizacion.webp";
import sistemaValoracion from "../assets/sistemaValoracion.webp";

function QueOfrecemosPage() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen bg-white overflow-hidden pt-20">
      </main>
      <Footer />
    </>
  );
}

export default QueOfrecemosPage;