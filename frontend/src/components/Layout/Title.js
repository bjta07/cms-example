import styles from "@/styles/Title.module.css"

const Title = ({text}) => {
    return(
        <div className={styles.titleContainer}>
            <h2>{text}</h2>
        </div>
    )
}

export default Title