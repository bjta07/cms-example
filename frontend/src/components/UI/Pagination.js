'use client'

import styles from '@/styles/Pagination.module.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    return (
        <div className={styles.pagination}>
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.paginationButton}
            >
                Anterior
            </button>
            
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`${styles.paginationButton} ${currentPage === page ? styles.active : ''}`}
                >
                    {page}
                </button>
            ))}

            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.paginationButton}
            >
                Siguiente
            </button>
        </div>
    )
}

export default Pagination
