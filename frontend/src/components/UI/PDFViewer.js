'use client'

import { useState, useEffect } from 'react'
import styles from '@/styles/PDFViewer.module.css'

const PDFViewer = ({ pdfUrl }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [scale, setScale] = useState(1.0)
    const [pdfDoc, setPdfDoc] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [viewMode, setViewMode] = useState(1) // 1 = una página, 2 = dos páginas
    const [isRendering, setIsRendering] = useState(false)

    useEffect(() => {
        // Cargar PDF.js dinámicamente
        const loadPDF = async () => {
            try {
                const pdfjsLib = await import('pdfjs-dist')
                
                // Configurar el worker de PDF.js
                pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js'
                
                const loadingTask = pdfjsLib.getDocument(pdfUrl)
                const pdf = await loadingTask.promise
                setPdfDoc(pdf)
                setTotalPages(pdf.numPages)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        }
        
        loadPDF()
    }, [pdfUrl])

    const renderPage = async (pageNumber, canvasId) => {
        if (!pdfDoc || isRendering) return
        
        try {
            const page = await pdfDoc.getPage(pageNumber)
            const viewport = page.getViewport({ scale })
            
            const canvas = document.getElementById(canvasId)
            if (!canvas) return
            
            const context = canvas.getContext('2d')
            canvas.height = viewport.height
            canvas.width = viewport.width
            
            // Limpiar el canvas antes de renderizar
            context.clearRect(0, 0, canvas.width, canvas.height)
            
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            }
            
            await page.render(renderContext).promise
        } catch (error) {
            console.error('Error rendering page:', error)
        }
    }

    useEffect(() => {
        if (pdfDoc && currentPage && !isRendering) {
            setIsRendering(true)
            
            if (viewMode === 1) {
                // Una página
                renderPage(currentPage, `page-${currentPage}`)
            } else {
                // Dos páginas
                renderPage(currentPage, `page-left-${currentPage}`)
                if (currentPage + 1 <= totalPages) {
                    renderPage(currentPage + 1, `page-right-${currentPage + 1}`)
                }
            }
            
            setTimeout(() => setIsRendering(false), 100)
        }
    }, [pdfDoc, currentPage, scale, viewMode])

    useEffect(() => {
        const handleKeyPress = (event) => {
            switch(event.key) {
                case 'ArrowLeft':
                    prevPage()
                    break
                case 'ArrowRight':
                    nextPage()
                    break
                case 'f':
                case 'F':
                    toggleFullscreen()
                    break
                case 'Escape':
                    if (isFullscreen) exitFullscreen()
                    break
            }
        }
        
        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [currentPage, totalPages, viewMode, isFullscreen])

    const nextPage = () => {
        if (viewMode === 1) {
            if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1)
            }
        } else {
            if (currentPage + 1 < totalPages) {
                setCurrentPage(currentPage + 2)
            }
        }
    }

    const prevPage = () => {
        if (viewMode === 1) {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
            }
        } else {
            if (currentPage > 2) {
                setCurrentPage(currentPage - 2)
            } else {
                setCurrentPage(1)
            }
        }
    }

    const toggleFullscreen = () => {
        const element = document.getElementById('pdf-viewer-container')
        
        if (!document.fullscreenElement) {
            element.requestFullscreen().then(() => {
                setIsFullscreen(true)
                setScale(1.2)
            })
        } else {
            exitFullscreen()
        }
    }

    const exitFullscreen = () => {
        document.exitFullscreen().then(() => {
            setIsFullscreen(false)
            setScale(1.0)
        })
    }

    const zoomIn = () => {
        setScale(Math.min(scale + 0.1, 2.5))
    }

    const zoomOut = () => {
        setScale(Math.max(scale - 0.1, 0.5))
    }

    const switchViewMode = (mode) => {
        setViewMode(mode)
        if (mode === 2 && currentPage % 2 === 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.loadingContent}>
                    <div className={styles.loadingIcon}>📖</div>
                    <p className={styles.loadingText}>Cargando revista...</p>
                </div>
            </div>
        )
    }

    return (
        <div 
            id="pdf-viewer-container"
            className={`${styles.container} ${isFullscreen ? styles.fullscreen : ''}`}
        >
            <div className={styles.viewer}>
                {/* Barra de controles superior */}
                <div className={styles.topControls}>
                    <div className={styles.viewModeControls}>
                        <button
                            onClick={() => switchViewMode(1)}
                            className={`${styles.viewModeButton} ${viewMode === 1 ? styles.active : ''}`}
                        >
                            📄 Una página
                        </button>
                        <button
                            onClick={() => switchViewMode(2)}
                            className={`${styles.viewModeButton} ${viewMode === 2 ? styles.active : ''}`}
                        >
                            📖 Dos páginas
                        </button>
                    </div>
                    
                    <div className={styles.pageInfo}>
                        {viewMode === 1 
                            ? `Página ${currentPage} de ${totalPages}`
                            : `Páginas ${currentPage}-${Math.min(currentPage + 1, totalPages)} de ${totalPages}`
                        }
                    </div>
                    
                    <div className={styles.actionControls}>
                        <div className={styles.zoomControls}>
                            <button onClick={zoomOut} className={styles.zoomButton}>
                                <span className={styles.icon}>➖</span>
                            </button>
                            <span className={styles.zoomLevel}>
                                {Math.round(scale * 100)}%
                            </span>
                            <button onClick={zoomIn} className={styles.zoomButton}>
                                <span className={styles.icon}>➕</span>
                            </button>
                        </div>
                        
                        <button onClick={toggleFullscreen} className={styles.fullscreenButton}>
                            {isFullscreen ? '📥 Salir' : '📺 Pantalla completa'}
                        </button>
                    </div>
                </div>
                
                {/* Contenedor del PDF con controles laterales */}
                <div className={styles.pdfContainer}>
                    {/* Flecha izquierda */}
                    <button
                        onClick={prevPage}
                        disabled={currentPage <= 1}
                        className={`${styles.sideArrow} ${styles.leftArrow} ${currentPage <= 1 ? styles.disabled : ''}`}
                    >
                        <span className={styles.arrowIcon}>‹</span>
                    </button>
                    
                    {/* Visor de PDF */}
                    <div className={styles.pdfWrapper}>
                        {viewMode === 1 ? (
                            // Vista de una página
                            <canvas
                                id={`page-${currentPage}`}
                                className={styles.pdfCanvas}
                            />
                        ) : (
                            // Vista de dos páginas
                            <div className={styles.twoPageView}>
                                <canvas
                                    id={`page-left-${currentPage}`}
                                    className={`${styles.pdfCanvas} ${styles.leftPage}`}
                                />
                                {currentPage + 1 <= totalPages && (
                                    <canvas
                                        id={`page-right-${currentPage + 1}`}
                                        className={`${styles.pdfCanvas} ${styles.rightPage}`}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    
                    {/* Flecha derecha */}
                    <button
                        onClick={nextPage}
                        disabled={
                            viewMode === 1 
                                ? currentPage >= totalPages 
                                : currentPage + 1 >= totalPages
                        }
                        className={`${styles.sideArrow} ${styles.rightArrow} ${
                            (viewMode === 1 ? currentPage >= totalPages : currentPage + 1 >= totalPages) 
                                ? styles.disabled : ''
                        }`}
                    >
                        <span className={styles.arrowIcon}>›</span>
                    </button>
                </div>
                
                {/* Ayuda de navegación */}
                <div className={styles.helpText}>
                    <p>
                        Usa las flechas ← → del teclado para navegar | 
                        Presiona <strong>F</strong> para pantalla completa | 
                        <strong>Escape</strong> para salir
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PDFViewer