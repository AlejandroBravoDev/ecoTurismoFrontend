import React from "react";
import Header from "../Components/header/index.jsx";
import Footer from "../Components/footer/index.jsx";
import ScrollToTop from "../components/ScrollToTop";
import { Link } from "react-router-dom";
import portada from "../assets/destinosDestacados1.webp";
import geolocalizacion from "../assets/geolocalizacion.webp";
import sistemaValoracion from "../assets/sistemaValoracion.webp";

function QueOfrecemosPage() {
  const servicios = [
    {
      icon: "fas fa-leaf",
      title: "Visibilidad Ecoturística",
      desc: "Damos voz a los tesoros naturales ocultos de Risaralda. Nuestra misión es conectar la majestuosidad de la selva y la montaña con el mundo entero.",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
      delay: "0",
    },
    {
      icon: "fas fa-map-marked-alt",
      title: "Geolocalización Precisa",
      desc: "Navega con confianza. Integramos tecnología de mapas avanzada para que cada cascada, sendero o mirador esté a un solo clic de distancia.",
      image: geolocalizacion,
      delay: "200",
    },
    {
      icon: "fas fa-star-half-alt",
      title: "Sistema de Valoración",
      desc: "La opinión de la comunidad es muy importante. Descubre los destinos favoritos basados en experiencias reales de otros viajeros.",
      image: sistemaValoracion,
      delay: "400",
    },
  ];

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen bg-white overflow-hidden pt-20">
        <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={portada}
              className="w-full h-full object-cover scale-110 animate-pulse-slow"
              alt="Background"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white"></div>
          </div>

          <div className="relative z-10 text-center px-6 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 drop-shadow-2xl pb-2">
              Nuestra <span className="text-[#20A217]">Propuesta</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-100 leading-relaxed text-white">
              Transformando la forma en que descubres el pulmón verde de
              Colombia.
            </p>
          </div>
        </section>

        {/* Tarjetas y CTA aquí */}
      </main>
      <Footer />
    </>
  );
}

export default QueOfrecemosPage;