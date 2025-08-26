"use client";
import { useState } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import styles from '@/styles/NewsModal.module.css';

const NewsModal = ({ isOpen, onClose, titulo, fecha, contenido, imagenes, imagen }) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    
    if (!isOpen) return null;

    // Función para determinar si un archivo es video
    const isVideoFile = (url) => {
        if (!url) return false;
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.mkv'];
        return videoExtensions.some(ext => url.toLowerCase().includes(ext));
    };

    // Combinar imagen principal con imágenes adicionales
    const getAllMedia = () => {
        const allMedia = [];
        
        // Agregar imagen principal si existe
        if (imagen) {
            allMedia.push(imagen);
        }
        
        // Agregar imágenes adicionales si existen
        if (imagenes && imagenes.length > 0) {
            // Evitar duplicados si la imagen principal ya está en imagenes
            imagenes.forEach(media => {
                if (!allMedia.includes(media)) {
                    allMedia.push(media);
                }
            });
        }
        
        return allMedia;
    };

    const mediaList = getAllMedia();

    const nextMedia = () => {
        setCurrentMediaIndex((prev) => 
            prev === mediaList.length - 1 ? 0 : prev + 1
        );
    };

    const prevMedia = () => {
        setCurrentMediaIndex((prev) => 
            prev === 0 ? mediaList.length - 1 : prev - 1
        );
    };

    const goToMedia = (index) => {
        setCurrentMediaIndex(index);
    };

    // Función para renderizar media (imagen o video)
    const renderMedia = (mediaUrl, index) => {
        if (isVideoFile(mediaUrl)) {
            return (
                <video
                    controls
                    className={styles.newsVideo}
                    width={500}
                    height={300}
                    poster={undefined} // Puedes agregar thumbnails si los tienes
                >
                    <source src={mediaUrl} type="video/mp4" />
                    <source src={mediaUrl} type="video/webm" />
                    <source src={mediaUrl} type="video/ogg" />
                    Tu navegador no soporta el elemento video.
                </video>
            );
        } else {
            return (
                <Image
                    src={mediaUrl}
                    alt={`${titulo} - Imagen ${index + 1}`}
                    width={500}
                    height={300}
                    className={styles.newsImage}
                />
            );
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {/* Header con título y fecha */}
                <div className={styles.modalHeader}>
                    <h2>{titulo}</h2>
                    {fecha && (
                        <p className={styles.fecha}>
                            {new Date(fecha).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                timeZone: 'UTC'
                            })}
                        </p>
                    )}
                </div>

                {/* Contenedor scrollable para media y contenido */}
                <div className={styles.modalBody}>
                    {/* Carrusel de media (imágenes y videos) */}
                    {mediaList && mediaList.length > 0 && (
                        <div className={styles.carousel}>
                            <div className={styles.carouselContainer}>
                                {/* Botón anterior */}
                                {mediaList.length > 1 && (
                                    <button 
                                        className={`${styles.carouselButton} ${styles.prevButton}`}
                                        onClick={prevMedia}
                                        aria-label="Media anterior"
                                    >
                                        ‹
                                    </button>
                                )}
                                
                                {/* Contenedor de media con transición */}
                                <div className={styles.imageSlider}>
                                    <div 
                                        className={styles.imageTrack}
                                        style={{
                                            transform: `translateX(-${currentMediaIndex * 100}%)`,
                                        }}
                                    >
                                        {mediaList.map((media, index) => (
                                            <div key={index} className={styles.imageSlide}>
                                                {renderMedia(media, index)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Botón siguiente */}
                                {mediaList.length > 1 && (
                                    <button 
                                        className={`${styles.carouselButton} ${styles.nextButton}`}
                                        onClick={nextMedia}
                                        aria-label="Media siguiente"
                                    >
                                        ›
                                    </button>
                                )}
                            </div>
                            
                            {/* Indicadores de posición */}
                            {mediaList.length > 1 && (
                                <div className={styles.carouselIndicators}>
                                    {mediaList.map((media, index) => (
                                        <button
                                            key={index}
                                            className={`${styles.indicator} ${
                                                index === currentMediaIndex ? styles.activeIndicator : ''
                                            } ${isVideoFile(media) ? styles.videoIndicator : styles.imageIndicator}`}
                                            onClick={() => goToMedia(index)}
                                            aria-label={`Ir a ${isVideoFile(media) ? 'video' : 'imagen'} ${index + 1}`}
                                            title={isVideoFile(media) ? 'Video' : 'Imagen'}
                                        />
                                    ))}
                                </div>
                            )}
                            
                            {/* Contador de media */}
                            {mediaList.length > 1 && (
                                <div className={styles.imageCounter}>
                                    <span className={styles.mediaType}>
                                        {isVideoFile(mediaList[currentMediaIndex]) ? '📹' : '🖼️'}
                                    </span>
                                    {currentMediaIndex + 1} / {mediaList.length}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Contenido de la noticia */}
                    <div className={styles.newsContent}>
                        {contenido && Array.isArray(contenido) ? (
                            <BlocksRenderer content={contenido} />
                        ) : (
                            <p>No hay contenido disponible</p>
                        )}
                    </div>
                </div>

                <button className={styles.closeButton} onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default NewsModal;