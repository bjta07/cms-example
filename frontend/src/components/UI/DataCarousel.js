'use client'; 

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/DataCarousel.module.css';

const ChevronLeft = ({ className }) => (
  <svg 
    className={className}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg 
    className={className}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ExternalLink = ({ className }) => (
  <svg 
    className={className}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
    />
  </svg>
);

const ItemCard = ({ item, onButtonClick }) => (
  <div className={styles.card}>
    <div className={styles.cardContent}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        {item.imagen ? (
          <Image 
            src={item.imagen} 
            alt={`Logo ${item.titulo}`}
            className={styles.logoImage}
            width={201}
            height={184}
          />
        ) : (
          <div className={styles.logoPlaceholder}></div>
        )}
      </div>
      
      {/* Título */}
      <h3 className={styles.title}>
        {item.titulo}
      </h3>
      
      {/* Descripción */}
      <p className={styles.description}>
        {item.descripcion}
      </p>
      
      {/* Botón */}
      <button
        onClick={() => onButtonClick(item.url)}
        className={styles.button}
      >
        Ver más
        <ExternalLink className={styles.buttonIcon} />
      </button>
    </div>
  </div>
);

const DataCarousel = ({ 
    items,
    title, 
    onItemClick,
    className = "",
    showTitle = true 
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const maxVisibleItems = 5;
    const showCarousel = items.length > maxVisibleItems;

    const handlePrevious = () => {
        setCurrentIndex(prev => 
            prev === 0 ? Math.max(0, items.length - maxVisibleItems) : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex(prev => 
            prev >= items.length - maxVisibleItems ? 0 : prev + 1
        );
    };

    const handleItemClick = (url) => {
        if (onItemClick) {
            onItemClick(url);
        } else {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const visibleItems = showCarousel 
        ? items.slice(currentIndex, currentIndex + maxVisibleItems)
        : items.slice(0, maxVisibleItems);

    return (
        <div className={`${styles.container} ${className}`}>
            {showTitle && (
                <h2 className={styles.containerTitle}>{title}</h2>
            )}
            
            <div className={styles.carouselWrapper}>
                <div className={styles.itemsContainer}>
                    {visibleItems.map((item) => (
                        <ItemCard 
                            key={item.id} 
                            item={item} 
                            onButtonClick={handleItemClick}
                        />
                    ))}
                </div>

                {showCarousel && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className={`${styles.navButton} ${styles.navButtonLeft}`}
                            aria-label="Anterior"
                        >
                            <ChevronLeft className={styles.navIcon} />
                        </button>
                        
                        <button
                            onClick={handleNext}
                            className={`${styles.navButton} ${styles.navButtonRight}`}
                            aria-label="Siguiente"
                        >
                            <ChevronRight className={styles.navIcon} />
                        </button>
                    </>
                )}
            </div>

            {showCarousel && (
                <div className={styles.indicators}>
                    {Array.from({ length: Math.ceil(items.length / maxVisibleItems) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index * maxVisibleItems)}
                            className={`${styles.indicator} ${
                                Math.floor(currentIndex / maxVisibleItems) === index
                                    ? styles.indicatorActive
                                    : ''
                            }`}
                            aria-label={`Ir a la página ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DataCarousel;
