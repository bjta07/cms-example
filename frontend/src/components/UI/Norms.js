'use client'

import { useState, useMemo } from "react"
import Icon from "./Icons"
import styles from "@/styles/Documents.module.css"

const Norms = ({ norms, title = "normas" }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState('desc')

    const processedDocuments = useMemo(() => {
        if (!norms || norms.length === 0) return []

        let filtered = norms

        if (searchTerm) {
            filtered = norms.filter(norm => {
                const titleMatch = norm.titulo.toLowerCase().includes(searchTerm.toLocaleLowerCase())
                const dateMatch = new Date(norm.fecha).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: ' long',
                    day: 'numeric',
                    timeZone: 'UTC'
                }).toLowerCase().includes(searchTerm.toLocaleLowerCase())

                return titleMatch || dateMatch
            })
        }

        return filtered.sort((a, b) => {
            const dateA = new Date(a.fecha)
            const dateB = new Date(b.fecha)
            
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
        })
    }, [norms, searchTerm, sortOrder])

    if (!norms || norms.length === 0) {
        return (
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.noDocuments}>No hay documentos</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
             {/* Barra de búsqueda y ordenamiento */}
            <div className={styles.controls}>
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Buscar documentos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.sortControl}>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className={styles.sortSelect}
                    >
                        <option value="desc">Más recientes primero</option>
                        <option value="asc">Más antiguos primero</option>
                    </select>
                </div>
            </div>

            {/* Mostrar contador de resultados */}
            {searchTerm && (
                <p className={styles.resultsCount}>
                    {processedDocuments.length} de {documents.length} documentos encontrados
                </p>
            )}

            {/* Lista de documentos */}
            {processedDocuments.length === 0 ? (
                <p className={styles.noResults}>
                    No se encontraron documentos que coincidan con tu búsqueda
                </p>
            ) : (
                <div className={styles.documents}>
                    {processedDocuments.map((document) => (
                        <div key={document.id} className={styles.document}>
                            <div className={styles.documentInfo}>
                                <div className={styles.documentIcon}>
                                    <Icon name="pdf" />
                                </div>
                                <div className={styles.documentDetails}>
                                    <h3 className={styles.documentTitle}>{document.titulo}</h3>
                                    <p className={styles.documentDate}>
                                        {new Date(document.fecha).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            timeZone: 'UTC'
                                        })}
                                    </p>
                                </div>
                            </div>
                            {document.document && (
                                <a 
                                    href={document.document} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={styles.documentLink}
                                >
                                    ver / descargar
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Norms