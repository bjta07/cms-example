'use client';
import { useState, useEffect } from 'react';
import { getNews } from "@/lib/get-news";
import NewsCarousel from "./NewsCarousel";

const NewsCarouselWrapper = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await getNews(1, 10); // Traer más noticias para el carousel
                
                if (!response || !response.data || !Array.isArray(response.data)) {
                    throw new Error('News data is not in the expected format');
                }
                
                setNews(response.data);
            } catch (err) {
                setError('Error cargando las noticias');
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (isLoading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                Cargando noticias...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                {error}
            </div>
        );
    }

    if (!news || news.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                No hay noticias disponibles
            </div>
        );
    }

    return <NewsCarousel news={news} />;
};

export default NewsCarouselWrapper;