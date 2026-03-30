import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./verLugares.module.css";
import imgMeerkat from "../../assets/img4.webp";
import imgLion from "../../assets/img6.webp";
import imgParrot from "../../assets/img1.webp";
import { FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;
const defaultImageUrls = [imgMeerkat, imgLion, imgParrot];

function VerLugares() {
  const { id } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lugar, setLugar] = useState(null);
  const [position, setPosition] = useState([
    4.81415861127678, -75.71023222513418,
  ]);

  const imageSources =
    lugar?.todas_las_imagenes && lugar.todas_las_imagenes.length > 0
      ? lugar.todas_las_imagenes
      : defaultImageUrls;

  const totalSlides = imageSources.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const fetchLugar = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API}/lugares/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setLugar(res.data);

      if (res.data.coordenadas && typeof res.data.coordenadas === "string") {
        const coords = res.data.coordenadas.split(",").map(Number);
        if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
          setPosition(coords);
        }
      }
    } catch (err) {
      console.error("Error al cargar lugar:", err);
    }
  };

  useEffect(() => {
    fetchLugar();
  }, [id]);

  return (
    <>
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className="font-bold text-[#20A217]">
            {lugar?.nombre || "Explora este destino"}
          </h1>
        </section>

        <section className={styles.gallery}>
          <div className={styles.mainImage}>
            <img
              src={imageSources[0]}
              alt="Principal"
              onError={(e) => (e.target.src = defaultImageUrls[0])}
            />
          </div>
          <div className={styles.sideImages}>
            <img
              src={imageSources[1] || defaultImageUrls[1]}
              alt="Lateral 1"
              onError={(e) => (e.target.src = defaultImageUrls[1])}
            />
            <img
              src={imageSources[2] || defaultImageUrls[2]}
              alt="Lateral 2"
              onError={(e) => (e.target.src = defaultImageUrls[2])}
            />
          </div>
        </section>

        <section className={styles.mobileSlider}>
          <div
            className={styles.sliderTrack}
            style={{
              transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
            }}
          >
            {imageSources.map((imgSrc, index) => (
              <div key={index} className={styles.sliderItem}>
                <img
                  src={imgSrc}
                  alt="Slide"
                  onError={(e) => (e.target.src = defaultImageUrls[index % 3])}
                />
              </div>
            ))}
          </div>
          <button
            className={`${styles.sliderControl} ${styles.prev}`}
            onClick={prevSlide}
          >
            <FaChevronLeft />
          </button>
          <button
            className={`${styles.sliderControl} ${styles.next}`}
            onClick={nextSlide}
          >
            <FaChevronRight />
          </button>
          <div className={styles.sliderDots}>
            {imageSources.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        <section className={styles.infoSection}>
          <div className="w-full sm:w-[65%]">
            <h3 className="font-bold font-xl">Acerca de</h3>
            <p>{lugar?.descripcion || "Cargando detalles del lugar..."}</p>
          </div>
          <div className={styles.location}>
            <FaMapMarkerAlt className={styles.locationIcon} />
            <div className={styles.locationText}>
              <h3>Ubicado en</h3>
              <p>{lugar?.ubicacion || "Ubicación en proceso..."}</p>
            </div>
          </div>
        </section>

        <section className={styles.reviewSection}>
          <Mapa key={`${position[0]}-${position[1]}`} positions={position} />
        </section>
      </main>
    </>
  );
}

export default VerLugares;
