'use client'

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import ModalInscripcion from "./ModalInscripcion"
import styles from "@/styles/Cursos.module.css"

const ListaCursos = ({ documents }) => {
    const [serachTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState('desc')
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedCongreso, setSelectedCongreso] = useState(null)
    
    // Estado para el modal de imagen
    const [selectedImage, setSelectedImage] = useState(null)

    const processedDocuments = useMemo(() => {
        if (!documents || documents.length === 0 ) return []
        let filtered = documents

        if(serachTerm){
            filtered = documents.filter(document => {
                const titleMatch = document.titulo.toLowerCase().includes(serachTerm.toLocaleLowerCase())
                const dateMatch = new Date(document.fechaPublicacion).toLocaleDateString('es-ES',{
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'UTC'
                }).toLowerCase().includes(serachTerm.toLocaleLowerCase())
                return titleMatch || dateMatch
            })
        }

        return filtered.sort((a, b) => {
            const dateA = new Date(a.fechaPublicacion)
            const dateB = new Date(b.fechaPublicacion)

            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
        })
    }, [documents, serachTerm, sortOrder])

    // Separar el documento más reciente del resto
    const featuredDocument = processedDocuments.length > 0 ? processedDocuments[0] : null
    const otherDocuments = processedDocuments.slice(1)

    const handleInscripcionClick = (document) => {
        setSelectedCongreso(document)
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setSelectedCongreso(null)
    }

    // Funciones para el modal de imagen
    const openImageModal = (imageData) => {
        setSelectedImage({
            src: imageData.cover,
            alt: imageData.titulo,
            title: imageData.titulo
        })
    }

    const closeImageModal = () => {
        setSelectedImage(null)
    }

    // Controlar scroll del body cuando el modal de imagen está abierto
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [selectedImage])

    // Cerrar modal con tecla Escape
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && selectedImage) {
                closeImageModal()
            }
        }

        if (selectedImage) {
            document.addEventListener('keydown', handleEscapeKey)
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [selectedImage])

    // Componente para renderizar un curso individual
    const CourseItem = ({ document, isFeatured = false }) => (
        <div className={`${styles.itemContainer} ${isFeatured ? styles.featuredItem : ''}`}>
            <h3 className={styles.titulo}>{document.titulo}</h3>
            
            {/* Imagen clickeable con overlay */}
            <div className={styles.imageWrapper}>
                <Image
                    src={document.cover}
                    alt={document.titulo}
                    width={345}
                    height={512}
                    className={styles.clickableImage}
                    onClick={() => openImageModal(document)}
                    style={{ cursor: 'pointer' }}
                />
                {/* Overlay con ícono de zoom */}
                <div 
                    className={styles.imageOverlay}
                    onClick={() => openImageModal(document)}
                >
                    <svg 
                        className={styles.zoomIcon} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" 
                        />
                    </svg>
                </div>
            </div>
            <p className={styles.fecha}>Fecha de publicacion: {" "} {
                new Date(document.fechaPublicacion).toLocaleDateString('es-ES',{
                    year: 'numeric',
                    month:'numeric',
                    day:'numeric',
                    timeZone: 'UTC'
                })
                }</p>
            <p className={styles.fechaLimite}>Fecha limite de inscripcion: {" "} {
                    new Date(document.fecha).toLocaleDateString('es-ES',{
                        year: 'numeric',
                        month:'numeric',
                        day:'numeric',
                        timeZone: 'UTC'
                    })
                }</p>
            <p>codigo del curso: {document.codigo}</p>
            <button
                onClick={document.activo ? () => handleInscripcionClick(document): undefined}
                type="button"
                className={`${styles.inscribeteBtn} ${
        document.activo ? styles.inscribeteBtnActive : styles.inscribeteBtnInactive
    }`}
                disabled={!document.activo}
            >
            {document.activo ? 'Inscríbete' : 'Inscripciones Cerradas'}
            </button>
        </div>
    )

    if (!documents || documents.length === 0) {
        return (
            <div className={styles.container}>
                <p className={styles.noDocuments}>No hay documentos</p>
            </div>
        )
    }

    return(
        <>
            <div className={styles.container}>
                <div className={styles.search}>
                    <div className={styles.searchBar}>
                        <input
                            type='text'
                            placeholder="Buscar cursos"
                            value={serachTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.inputSearch}
                        />
                    </div>
                    <div className={styles.selectOption}>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value={"desc"}>Cursos recientes</option>
                            <option value={"asc"}>Cursos pasados</option>
                        </select>
                    </div>
                </div>
                
                {serachTerm && (
                    <p>{processedDocuments.length} de {documents.length} cursos encontrados</p>
                )}

                {processedDocuments.length === 0 ? (
                    <p>No se encontraron cursos que coincidan</p>
                ): (
                    <>
                        {/* Curso destacado - Primera fila */}
                        {featuredDocument && (
                            <div className={styles.featuredSection}>
                                <CourseItem document={featuredDocument} isFeatured={true} />
                            </div>
                        )}

                        {/* Otros cursos - Grid de 3 columnas */}
                        {otherDocuments.length > 0 && (
                            <div className={styles.coursesGrid}>
                                {otherDocuments.map((document) => (
                                    <CourseItem key={document.id} document={document} />
                                ))}
                            </div>
                        )}
                    </>
                )}
                
                <ModalInscripcion 
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    congresoCodigo={selectedCongreso?.codigo}
                    congresoTitulo={selectedCongreso?.titulo}
                />
            </div>

            {/* Modal para imagen ampliada */}
            {selectedImage && (
                <div className={styles.modalOverlay} onClick={closeImageModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        {/* Botón cerrar */}
                        <button 
                            className={styles.closeButton}
                            onClick={closeImageModal}
                            aria-label="Cerrar imagen"
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Imagen en tamaño completo */}
                        <div className={styles.imageContainer}>
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                width={800}
                                height={1200}
                                className={styles.modalImage}
                                quality={100}
                                priority
                                style={{
                                    width: 'auto',
                                    height: 'auto',
                                    maxWidth: '90vw',
                                    maxHeight: '90vh',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>

                        {/* Título opcional */}
                        {selectedImage.title && (
                            <p className={styles.imageTitle}>{selectedImage.title}</p>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default ListaCursos