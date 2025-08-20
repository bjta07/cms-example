'use Client'
import { FileText, ExternalLink } from "lucide"
import Icon from "./Icons"
import styles from '@/styles/Documents.module.css'

const Documents = ({ documents, title = "documentos" }) => {
    if(!documents || documents.lenght === 0) {
        return (
            <div>
                <h3>{title}</h3>
                <p>No hay documentos</p>
            </div>
        )
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                {documents.map((document) =>(
                    <div key={document.id} className={styles.container}>
                        <div className={styles.content}>
                            <Icon name="pdf" size={48}/>
                            <h4>{document.titulo}</h4>
                            <p>
                                {new Date(document.fecha).toLocaleDateString('es-ES',{
                                    year: 'numeric',
                                    month: 'long',
                                    day:'numeric',
                                    timeZone: 'UTC'
                                })}
                            </p>
                        </div>
                        {document.document && (
                            <a
                                href={document.document}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="ver documento"
                            >
                                ver PDF
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
} 


export default Documents