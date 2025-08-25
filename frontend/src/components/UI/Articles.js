'use client';
import { useState } from 'react';
import Image from "next/image";
import Modal from "@/components/UI/AboutModals"; // Ajusta la ruta según tu estructura
import styles from '@/styles/Articles.module.css';

const Articles = ({ articles }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedArticle(null);
    };

    if (!articles || articles.length === 0) {
        return <div>No hay artículos disponibles</div>;
    }

    return (
        <div className={styles.articleContainer}>
            {articles.map((article) => (
                <div 
                    key={article.id} 
                    className={styles.item}
                    onClick={() => handleArticleClick(article)}
                    style={{ cursor: 'pointer' }}
                >
                    {article.image && (
                        <Image
                            src={article.image}
                            alt={article.titulo}
                            className={styles.articleImage}
                            width={114}
                            height={64}
                        />
                    )}
                    <h4>{article.titulo}</h4>
                </div>
            ))}

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedArticle?.titulo}
                description={selectedArticle?.description}
                image={selectedArticle?.image}
            />
        </div>
    );
};

export default Articles;