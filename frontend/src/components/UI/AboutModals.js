"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import styles from '@/styles/Modal.module.css';

const Modal = ({ isOpen, onClose, title, description, image }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {image && (
                    <Image
                        src={image}
                        alt={title || 'Modal image'}
                        width={300}
                        height={200}
                        className={styles.modalImage}
                    />
                )}
                <h2>{title}</h2>
                
                {/* Contenedor scrollable para la descripción */}
                <div className={styles.modalBody}>
                    {description && Array.isArray(description) ? (
                        <BlocksRenderer content={description} />
                    ) : (
                        <p>No hay descripción disponible</p>
                    )}
                </div>
                
                <button className={styles.closeButton} onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Modal;

