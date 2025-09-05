'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/LogosCarousel.module.css';

export default function LogosCarousel({ regionalesData = [], departamentalesData = [] }) {
  const [logos, setLogos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const logosPerSlide = 4;

  useEffect(() => {
    try {
      // Procesar los datos que ya vienen del servidor
      const allLogos = [...regionalesData, ...departamentalesData]
        .filter(item => item && item.imagen) // Solo elementos con imagen
        .map(item => ({
          id: item.id,
          titulo: item.titulo,
          imagen: item.imagen,
          url: item.url
        }));

      setLogos(allLogos);
    } catch (error) {
      console.error('Error processing logos:', error);
      setLogos([]);
    } finally {
      setIsLoading(false);
    }
  }, [regionalesData, departamentalesData]);

  // Auto-scroll cada 3 segundos
  useEffect(() => {
    if (logos.length === 0) return;

    const totalSlides = Math.ceil(logos.length / logosPerSlide);
    
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex >= totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [logos.length]);

  // Funciones para navegación manual
  const goToNext = () => {
    const totalSlides = Math.ceil(logos.length / logosPerSlide);
    setCurrentIndex(prevIndex => 
      prevIndex >= totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    const totalSlides = Math.ceil(logos.length / logosPerSlide);
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (logos.length === 0) {
    return (
      <div className={styles.noDataContainer}>
        No se encontraron logos para mostrar
      </div>
    );
  }

  const totalSlides = Math.ceil(logos.length / logosPerSlide);
  const startIndex = currentIndex * logosPerSlide;
  const currentLogos = logos.slice(startIndex, startIndex + logosPerSlide);

  return (
    <div className={styles.carouselWrapper}>
      {/* Carrusel Container */}
      <div className={styles.carouselContainer}>
        
        {/* Botón Anterior */}
        <button
          onClick={goToPrev}
          className={styles.navButton}
          aria-label="Anterior"
        >
          <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Logos Container */}
        <div className={styles.logosWrapper}>
          <div className={styles.logosGrid}>
            {currentLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${currentIndex}-${index}`}
                className={styles.logoCard}
              >
                <div className={styles.logoImageWrapper}>
                  <Image
                    src={logo.imagen}
                    alt={logo.titulo}
                    width={150}
                    height={150}
                    className={styles.logoImage}
                    sizes="80px"
                  />
                </div>
                <h3 className={styles.logoTitle}>
                  {logo.titulo}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={goToNext}
          className={`${styles.navButton} ${styles.nextButton}`}
          aria-label="Siguiente"
        >
          <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicadores de paginación */}
      {totalSlides > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.paginationDot} ${
                index === currentIndex ? styles.paginationDotActive : ''
              }`}
              aria-label={`Ir a diapositiva ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}