import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./VerHospedaje.module.css";
import Header from "../header";
import Footer from "../footer";
import imgMeerkat from "../../assets/img4.webp";
import imgLion from "../../assets/img6.webp";
import imgParrot from "../../assets/img1.webp";
import Mapa from "../mapa/map";
import ScrollToTop from "../ScrollToTop";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import { FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import noImagen from "../../assets/noImage.webp";

const API = import.meta.env.VITE_API_URL;
const defaultImageUrls = [imgMeerkat, imgLion, imgParrot];

function VerHospedaje() {
  useAuthRedirect();
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hospedaje, setHospedaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [position, setPosition] = useState([
    4.81415861127678, -75.71023222513418,
  ]);

  const imageSources = useMemo(
    () =>
      hospedaje?.imagenes && hospedaje.imagenes.length > 0
        ? hospedaje.imagenes
        : defaultImageUrls,
    [hospedaje],
  );

  const totalSlides = imageSources.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const fetchHospedaje = useCallback(async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await axios.get(`${API}/hospedajes/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setHospedaje(res.data);
      setPosition(res.data.coordenadas.split(",").map(Number));
      setImagenes(res.data.todas_las_imagenes);
      setError(null);
    } catch (err) {
      setError(
        `No se pudo cargar el hospedaje. ${err.response?.data?.message || ""}`,
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchHospedaje();
  }, [id, fetchHospedaje]);

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.pageContainer}>
          <main className={styles.mainContent}>
            <p className={styles.textWait}>Cargando hospedaje...</p>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className={styles.pageContainer}>
          <main className={styles.mainContent}>
            <p
              style={{
                textAlign: "center",
                padding: "50px",
                fontSize: "1.2rem",
                color: "#e74c3c",
              }}
            >
              {error}
            </p>
            <button
              onClick={() => navigate("/hospedajes")}
              style={{
                display: "block",
                margin: "20px auto",
                padding: "12px 30px",
                backgroundColor: "#4b8236",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Volver a hospedajes
            </button>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className={styles.pageContainer}>
        <main className={styles.mainContent}>
          <section className={styles.titleSection}>
            <h1>{hospedaje?.nombre || "Hospedaje"}</h1>
          </section>

          <section className={styles.gallery}>
            <div className={styles.mainImage}>
              <img
                src={imagenes[0] || noImagen}
                alt={hospedaje?.nombre}
                onError={(e) => {
                  e.target.src = noImagen;
                }}
              />
            </div>
            <div className={styles.sideImages}>
              <img
                src={imagenes[1] || noImagen}
                alt={hospedaje?.nombre}
                onError={(e) => {
                  e.target.src = defaultImageUrls[1];
                }}
              />
              <img
                src={imagenes[2] || noImagen}
                alt={hospedaje?.nombre}
                onError={(e) => {
                  e.target.src = defaultImageUrls[2];
                }}
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
                    alt={`${hospedaje?.nombre} - ${index + 1}`}
                    onError={(e) => {
                      e.target.src =
                        defaultImageUrls[index % defaultImageUrls.length];
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              className={`${styles.sliderControl} ${styles.prev}`}
              onClick={prevSlide}
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              className={`${styles.sliderControl} ${styles.next}`}
              onClick={nextSlide}
            >
              <FaChevronRight size={24} />
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
              <h3>Acerca de</h3>
              <p>{hospedaje?.descripcion || "Descripción no disponible"}</p>
            </div>
            <div className={styles.location}>
              <FaMapMarkerAlt className={styles.locationIcon} />
              <div className={styles.locationText}>
                <h3>Ubicado en</h3>
                <p>{hospedaje?.ubicacion || "Ubicación no disponible"}</p>
              </div>
            </div>
          </section>

          <section className={styles.reviewSection}>
            <Mapa positions={position} />
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default VerHospedaje;
