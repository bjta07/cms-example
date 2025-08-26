'use client'

import { getNews } from "@/lib/get-news";
import Image from "next/image";
import { extractPlainText, truncateText } from "@/utils/textUtils";
import styles from '@/styles/News.module.css'
import Pagination from "./Pagination";
import NewsModal from "./NewsModal";
import { useState, useEffect } from "react";

const News = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Estados para el modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                console.log('Fetching news for page:', currentPage);
                
                const response = await getNews(currentPage);
                
                console.log('Full response:', response);
                console.log('Response data:', response?.data);
                
                if (!response || !response.data) {
                    throw new Error('No se pudieron cargar las noticias');
                }
                
                setNews(response.data);
                setTotalPages(response.meta.pagination.pageCount);
                
            } catch (err) {
                console.error('Error fetching news:', err);
                console.error('Error details:', err.message);
                setError(`Error al cargar las noticias: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Funciones para manejar el modal
    const handleLeerMas = (newsItem) => {
        console.log('Opening modal for news item:', newsItem);
        setSelectedNews(newsItem);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedNews(null);
    };

    // Función para determinar si un archivo es video
    const isVideoFile = (url) => {
        if (!url) return false;
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov'];
        return videoExtensions.some(ext => url.toLowerCase().includes(ext));
    };

    // Función para renderizar media (imagen o video)
    const renderMedia = (newsItem) => {
        // Verificar si hay imagen
        if (newsItem.imagen) {
            if (isVideoFile(newsItem.imagen)) {
                return (
                    <div className={styles.mediaContainer}>
                        <video
                            className={styles.newVideo}
                            controls
                            width={269}
                            height={179}
                            poster={newsItem.thumbnail || undefined} // Si tienes thumbnails
                        >
                            <source src={newsItem.imagen} type="video/mp4" />
                            Tu navegador no soporta el elemento video.
                        </video>
                    </div>
                );
            } else {
                return (
                    <div className={styles.mediaContainer}>
                        <Image
                            className={styles.newImage}
                            src={newsItem.imagen}
                            alt={newsItem.titulo}
                            width={269}
                            height={179}
                        />
                    </div>
                );
            }
        }

        // Si no hay imagen principal, verificar si hay imágenes/videos adicionales
        if (newsItem.imagenes && newsItem.imagenes.length > 0) {
            const firstMedia = newsItem.imagenes[0];
            if (isVideoFile(firstMedia)) {
                return (
                    <div className={styles.mediaContainer}>
                        <video
                            className={styles.newVideo}
                            controls
                            width={269}
                            height={179}
                            poster={newsItem.thumbnail || undefined}
                        >
                            <source src={firstMedia} type="video/mp4" />
                            Tu navegador no soporta el elemento video.
                        </video>
                    </div>
                );
            } else {
                return (
                    <div className={styles.mediaContainer}>
                        <Image
                            className={styles.newImage}
                            src={firstMedia}
                            alt={newsItem.titulo}
                            width={269}
                            height={179}
                        />
                    </div>
                );
            }
        }

        return null; // No hay media para mostrar
    };

    if (isLoading) {
        return <div className={styles.loading}>Cargando noticias...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!news || news.length === 0) {
        return <div className={styles.empty}>No hay noticias disponibles</div>;
    }

    return(
        <>
            <div className={styles.newsContainer}>
                {news.map((newsItem) => {
                    return (
                        <div key={newsItem.id} className={styles.newItem}>
                            {renderMedia(newsItem)}
                            <h4>{newsItem.titulo}</h4>
                            <p className={styles.newFecha}>
                                {new Date(newsItem.fecha).toLocaleDateString('es-ES',{
                                    year: 'numeric',
                                    month:'long',
                                    day: 'numeric',
                                    timeZone: 'UTC'
                                })}
                            </p>
                            <p className={styles.newDescripcion}>
                                {truncateText(extractPlainText(newsItem.contenido))}
                            </p>
                            <a 
                                className={styles.leerMas}
                                onClick={() => handleLeerMas(newsItem)}
                                style={{ cursor: 'pointer' }}
                            >
                                Leer más
                            </a>
                        </div>
                    );
                })}
            </div>
            
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {/* Modal para mostrar la noticia completa */}
            <NewsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                titulo={selectedNews?.titulo}
                fecha={selectedNews?.fecha}
                contenido={selectedNews?.contenido}
                imagenes={selectedNews?.imagenes}
                imagen={selectedNews?.imagen} // Pasamos también la imagen principal
            />
        </>
    )
}

export default News;