"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import styles from '@/styles/NewsModal.module.css';

const NewsModal = ({ isOpen, onClose, titulo, fecha, contenido, imagenes }) => {
    if (!isOpen) return null;

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

                {/* Contenedor scrollable para imágenes y contenido */}
                <div className={styles.modalBody}>
                    {/* Galería de imágenes */}
                    {imagenes && imagenes.length > 0 && (
                        <div className={styles.imageGallery}>
                            {imagenes.map((imagen, index) => (
                                <div key={index} className={styles.imageContainer}>
                                    <Image
                                        src={imagen}
                                        alt={`${titulo} - Imagen ${index + 1}`}
                                        width={500}
                                        height={300}
                                        className={styles.newsImage}
                                    />
                                </div>
                            ))}
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