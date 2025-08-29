import Image from "next/image"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { getAbout } from "@/lib/get-about"
import AboutCards from "@/components/UI/AboutCards"
import ArticlesWrapper from "@/components/UI/ArticlesWrapper"
import styles from '@/styles/About.module.css'

const About = async () => {
    const {titulo, descripcion, image} = await getAbout()
    return(
        <div className={styles.dashboard}>
            <div className={styles.welcome}>
                        <Image
                            src={image}
                            alt="hero"
                            className={styles.aboutImage}
                            width={493}
                            height={534}
                        />
                        <div className={styles.content}>
                            <h3>{titulo}</h3>
                            <BlocksRenderer content={descripcion}></BlocksRenderer>
                        </div>
            </div>
            <div className={styles.cards}>
                <AboutCards filter="Mision"/>
                <AboutCards filter="Vision"/>
            </div>
            <div className={styles.articles}>
                <h3>Articulos de Interes</h3>
                <ArticlesWrapper/>
            </div>
        </div>
    )
}

export default About