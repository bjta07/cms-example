import Image from "next/image"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { getAbout } from "@/lib/get-about"
import AboutCards from "@/components/UI/AboutCards"
import Articles from "@/components/UI/Articles"
import styles from '@/styles/About.module.css'

const About = async () => {
    const {titulo, descripcion, image} = await getAbout()
    return(
        <div className={styles.dashboard}>
            <div className={styles.welcome}>
                <h3>{titulo}</h3>
                    <div>
                        <Image
                            src={image}
                            alt="hero"
                            className={styles.aboutImage}
                            width={140}
                            height={140}
                        />
                        <BlocksRenderer content={descripcion}></BlocksRenderer>
                    </div>
            </div>
            <div className={styles.cards}>
                <AboutCards filter="Mision"/>
                <AboutCards filter="Vision"/>
            </div>
            <div className={styles.articles}>
                <h3>Articulos de Interes</h3>
                <Articles/>
            </div>
        </div>
    )
}

export default About