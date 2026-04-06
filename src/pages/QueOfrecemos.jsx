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

        <div className="flex flex-col items-center w-full pb-10 md:pb-20">
          <div className="max-w-7xl w-full px-4 sm:px-6 -mt-16 md:-mt-20 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 justify-items-center pb-10">
              {servicios.map((s, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white rounded-[24px] md:rounded-[30px] overflow-hidden shadow-2xl hover:shadow-[#20A217]/20 transition-all duration-500 hover:-translate-y-4 w-full max-w-[380px]"
                  style={{ animationDelay: `${s.delay}ms` }}
                >
                  <div className="h-56 md:h-64 overflow-hidden relative">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl">
                      <i
                        className={`${s.icon} text-xl md:text-2xl text-[#20A217]`}
                      ></i>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4 group-hover:text-[#20A217] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm md:text-gray-600 leading-relaxed mb-4 pb-5">
                      {s.desc}
                    </p>
                    <div className="w-12 h-1 bg-[#20A217] rounded-full transition-all duration-500 group-hover:w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default QueOfrecemosPage;