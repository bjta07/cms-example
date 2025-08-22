'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { extractPlainText, truncateText } from "@/utils/textUtils";
import styles from '@/styles/NewsCarousel.module.css';

const NewsCarousel = ({ news }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [latestNews, setLatestNews] = useState([]);

    useEffect(() => {
        if (news && Array.isArray(news)) {
            // Ordenar noticias por fecha (más recientes primero) y tomar las 3 primeras
            const sortedNews = [...news]
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .slice(0, 3);
            setLatestNews(sortedNews);
        }
    }, [news]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === latestNews.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? latestNews.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    if (!latestNews || latestNews.length === 0) {
        return <div>No hay noticias disponibles</div>;
    }

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carousel}>
                {/* Botón Anterior */}
                <button 
                    className={`${styles.carouselButton} ${styles.prevButton}`}
                    onClick={prevSlide}
                    aria-label="Noticia anterior"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Contenido del carousel */}
                <div className={styles.carouselContent}>
                    <div 
                        className={styles.carouselTrack}
                        style={{ 
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: 'transform 0.5s ease-in-out',
                            width: `${latestNews.length * 40}%`
                        }}
                    >
                        {latestNews.map((newsItem, index) => (
                            <div 
                                key={newsItem.id} 
                                className={styles.carouselSlide}
                            >
                                <div className={styles.newsCard}>
                                    {newsItem.imagen && (
                                        <div className={styles.imageContainer}>
                                            <Image
                                                className={styles.newsImage}
                                                src={newsItem.imagen}
                                                alt={newsItem.titulo}
                                                width={250}
                                                height={250}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                    <div className={styles.newsContent}>
                                        <h3 className={styles.newsTitle}>{newsItem.titulo}</h3>
                                        <p className={styles.newsDate}>
                                            {new Date(newsItem.fecha).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                timeZone: 'UTC'
                                            })}
                                        </p>
                                        <p className={styles.newsDescription}>
                                            {truncateText(extractPlainText(newsItem.contenido), 120)}
                                        </p>
                                        <button className={styles.readMoreButton}>
                                            Leer más
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botón Siguiente */}
                <button 
                    className={`${styles.carouselButton} ${styles.nextButton}`}
                    onClick={nextSlide}
                    aria-label="Siguiente noticia"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            {/* Indicadores de posición */}
            <div className={styles.indicators}>
                {latestNews.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${
                            index === currentIndex ? styles.indicatorActive : ''
                        }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Ir a la noticia ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewsCarousel;
