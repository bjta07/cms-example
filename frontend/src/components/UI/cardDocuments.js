'use client'
import { useMemo } from 'react'
import Icon from "./Icons"
import styles from '@/styles/CardDocuments.module.css'

const CardDocuments = ({ documents, title = "Documentos Recientes", limit = 4 }) => {
    // Procesar documentos: ordenar por fecha y limitar cantidad
    const processedDocuments = useMemo(() => {
        if (!documents || documents.length === 0) return []

        // Ordenar por fecha (más recientes primero) y tomar solo los primeros 'limit'
        return documents
            .sort((a, b) => {
                const dateA = new Date(a.fecha)
                const dateB = new Date(b.fecha)
                return dateB - dateA // desc order
            })
            .slice(0, limit)
    }, [documents, limit])

    if (!documents || documents.length === 0) {
        return (
            <div className={styles.cardContainer}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.noDocuments}>No hay documentos disponibles</p>
            </div>
        )
    }

    return (
        <div className={styles.cardContainer}>
            <h3 className={styles.cardTitle}>{title}</h3>
            
            <div className={styles.documentsGrid}>
                {processedDocuments.map((document) => (
                    <div key={document.id} className={styles.documentCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconContainer}>
                                <Icon name="pdf" />
                            </div>
                            <div className={styles.cardDate}>
                                {new Date(document.fecha).toLocaleDateString('es-ES', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    timeZone: 'UTC'
                                })}
                            </div>
                        </div>
                        
                        <div className={styles.cardContent}>
                            <h4 className={styles.cardDocumentTitle}>{document.titulo}</h4>
                        </div>
                        
                        {document.document && (
                            <div className={styles.cardFooter}>
                                <a 
                                    href={document.document} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={styles.cardLink}
                                >
                                    Ver documento
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardDocuments