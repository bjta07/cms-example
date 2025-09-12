'use client'
import { useState, useEffect } from 'react'
import styles from '@/styles/Modal.module.css'

const ModalInscripcion = ({ isOpen, onClose, congresoTitulo, congresoCodigo }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        ci: "",
        email: "",
        telefono: "",
        departamento: "La Paz",
    });
    
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);
        
        try {
            // Formatear los datos según lo espera el backend
            const formattedData = {
                nombre: formData.nombre,
                apellidos: formData.apellido,  // cambio de apellido a apellidos
                CI: formData.ci,               // cambio de ci a CI
                email: formData.email,
                telefono: formData.telefono,
                departamento: formData.departamento,
                congresoCodigo: congresoCodigo  // Usar el código del congreso
            };
            
            const res = await fetch('/api/inscripciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            // Verificar si la respuesta es HTML (página de error) en lugar de JSON
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('El servidor devolvió una respuesta inválida. Verifica que la API route esté configurada correctamente.');
            }

            const result = await res.json();

            if (!res.ok || !result.success) {
                throw new Error(result.error || `Error ${res.status}: ${res.statusText}`);
            }

            setStatus('✅ Inscripción enviada correctamente');
            setFormData({
                nombre: "",
                apellido: "",
                ci: "",
                email: "",
                telefono: "",
                departamento: "La Paz",
            });
            
            // Cerrar modal después de 2 segundos
            setTimeout(() => {
                onClose();
                setStatus(null);
            }, 2000);

        } catch (error) {
            console.error('Error completo:', error);
            setStatus(`❌ ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        Inscripción - {congresoTitulo}
                    </h2>
                    <button 
                        className={styles.closeButton}
                        onClick={onClose}
                        type="button"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className={styles.formInput}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            name="apellido"
                            placeholder="Apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            className={styles.formInput}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            name="ci"
                            placeholder="Cédula de Identidad"
                            value={formData.ci}
                            onChange={handleChange}
                            className={styles.formInput}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.formInput}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            name="telefono"
                            placeholder="Teléfono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <select
                            name="departamento"
                            value={formData.departamento}
                            onChange={handleChange}
                            className={styles.formInput}
                        >
                            <option value="La Paz">La Paz</option>
                            <option value="Oruro">Oruro</option>
                            <option value="Cochabamba">Cochabamba</option>
                            <option value="Santa Cruz">Santa Cruz</option>
                            <option value="Potosí">Potosí</option>
                            <option value="Chuquisaca">Chuquisaca</option>
                            <option value="Tarija">Tarija</option>
                            <option value="Beni">Beni</option>
                            <option value="Pando">Pando</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Enviando...' : 'Enviar inscripción'}
                    </button>
                </form>

                {status && (
                    <div 
                        className={styles.status}
                        style={{
                            backgroundColor: status.includes('✅') ? '#d1fae5' : '#fee2e2',
                            color: status.includes('✅') ? '#065f46' : '#991b1b',
                            border: `1px solid ${status.includes('✅') ? '#a7f3d0' : '#fecaca'}`
                        }}
                    >
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalInscripcion;