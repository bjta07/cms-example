import { getAboutCards } from '@/lib/get-aboutCards'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import styles from '@/styles/AboutCards.module.css'
import { Children } from 'react'

const AboutCards = async ({ filter }) => {
    const aboutCards = await getAboutCards()

    const filteredCards = filter 
        ?aboutCards.filter((card)=>card.titulo.toLowerCase() === filter.toLowerCase())
        : aboutCards

    return (
        <div className={styles.cardsContainer}>
            {filteredCards?.map((aboutCard) => (
                <div key={aboutCard.id} className={styles.item}>
                    <h3>{aboutCard.titulo}</h3>
                    <div>
                        <BlocksRenderer 
                            content={aboutCard.descripcion}
                        ></BlocksRenderer>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AboutCards