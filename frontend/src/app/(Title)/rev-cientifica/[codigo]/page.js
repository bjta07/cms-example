// app/revista/[codigo]/page.js
import { getRevistaByCodigo } from "@/lib/get-revista"
import PDFViewer from "@/components/UI/PDFViewer"
import { notFound } from 'next/navigation'
import styles from '@/styles/RevistaPage.module.css'

const RevistaPage = async ({ params }) => {
    const { codigo } = params
    
console.log('Código recibido:', codigo)

    const revista = await getRevistaByCodigo(codigo)
    
    
    if (!revista) {
        notFound()
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>{revista.titulo}</h1>
                    <p className={styles.fecha}>Fecha: {revista.fecha}</p>
                    <p className={styles.codigo}>Código: {revista.codigo}</p>
                </div>
            </div>
            
            <PDFViewer pdfUrl={revista.url} />
        </div>
    )
}

export default RevistaPage