'use client';
import { useState, useEffect } from 'react';
import DataCarousel from './DataCarousel';
import styles from '@/styles/DataCarouselWrapper.module.css'

const DataCarouselWrapper = ({ title, dataFetcher, onItemClick, className = "", showTitle = true }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await dataFetcher();
                
                if (!data || !Array.isArray(data)) {
                    throw new Error('Data is not in the expected format');
                }
                
                setItems(data);
            } catch (err) {
                setError('Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dataFetcher]);

    if (loading) {
        return (
            <div className={`${styles.container} ${className}`}>
                {showTitle && <h2 className={styles.containerTitle}>{title}</h2>}
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <span className={styles.loadingText}>Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${styles.container} ${className}`}>
                {showTitle && <h2 className={styles.containerTitle}>{title}</h2>}
                <div className={styles.errorContainer}>
                    <p className={styles.errorText}>{error}</p>
                </div>
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div className={`${styles.container} ${className}`}>
                {showTitle && <h2 className={styles.containerTitle}>{title}</h2>}
                <div className={styles.emptyContainer}>
                    <p className={styles.emptyText}>No hay elementos disponibles.</p>
                </div>
            </div>
        );
    }

    return (
        <DataCarousel 
            items={items}
            title={title}
            onItemClick={onItemClick}
            className={className}
            showTitle={showTitle}
        />
    );
};

export default DataCarouselWrapper;