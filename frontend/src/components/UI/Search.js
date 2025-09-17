'use client'
import { useState, useEffect, useMemo } from 'react'
import styles from '@/styles/SearchFilters.module.css'

const SearchFilters = ({ onSearch, title = "Búsqueda de Personas" }) => {
    // Estados para los filtros
    const [filters, setFilters] = useState({
        apellido: '',
        ci: '',
        nombre: '',
        departamento: '',
        especialidad: ''
    })
    
    // Estados para loading y resultados
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState([])
    const [hasSearched, setHasSearched] = useState(false)

    // Departamentos de Bolivia
    const departamentos = [
        { value: '', label: 'Todos los departamentos' },
        { value: 'la-paz', label: 'La Paz' },
        { value: 'cochabamba', label: 'Cochabamba' },
        { value: 'santa-cruz', label: 'Santa Cruz' },
        { value: 'oruro', label: 'Oruro' },
        { value: 'potosi', label: 'Potosí' },
        { value: 'tarija', label: 'Tarija' },
        { value: 'chuquisaca', label: 'Chuquisaca' },
        { value: 'beni', label: 'Beni' },
        { value: 'pando', label: 'Pando' }
    ]

    // Especialidades
    const especialidades = [
        { value: '', label: 'Todas las especialidades' },
        { value: 'medico-quirurgica', label: 'Medico Quirurgica' },
        { value: 'enfermeria-quirurgica', label: 'Enfermeria Quirurgica' },
        { value: 'enfermeria-ginecoobstetricia', label: 'Enfermeria Ginecoobstetricia' },
        { value: 'enfermeria-pediatrica', label: 'Enfermeria Pediatrica' },
        { value: 'enfermeria-de-salud-mental', label: 'Enfermeria de Salud Mental' },
        { value: 'enfermeria-salud-publica', label: 'Enfermeria Salud Publica' },
        { value: 'enfermeria-administracion-de-servicios-de-salud', label: 'Enfermeria Administracion de Servicios de Salud' },
        { value: 'educacion', label: 'Educacion' },
        { value: 'investigacion', label: 'Investigacion' },
        { value: 'enfermeria-en-medicina-critica-y-terapia-intensiva', label: 'Enfermeria en Medicina Critica y Terapia Intensiva' },
        { value: 'geriatria-y-gerontologia', label: 'Geriatria y Gerontologia'}
    ]

    // Función para actualizar filtros
    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }))
    }

    // Función para limpiar filtros
    const clearFilters = () => {
        setFilters({
            apellido: '',
            ci: '',
            nombre: '',
            departamento: '',
            especialidad: ''
        })
        setResults([])
        setHasSearched(false)
    }

    // Función para realizar búsqueda
    const handleSearch = async () => {
        // Verificar que al menos un filtro tenga valor
        const hasFilters = Object.values(filters).some(value => value.trim() !== '')
        
        if (!hasFilters) {
            alert('Por favor, ingresa al menos un criterio de búsqueda')
            return
        }

        setIsLoading(true)
        setHasSearched(true)

        try {
            // Construir los parámetros de búsqueda
            const searchParams = new URLSearchParams()
            
            // Agregar solo los filtros que tienen valor
            Object.entries(filters).forEach(([key, value]) => {
                if (value && value.trim() !== '') {
                    searchParams.append(key, value.trim())
                }
            })

            // Realizar la petición a la API
            const response = await fetch(`${apiEndpoint}?${searchParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)
            }

            const data = await response.json()
            setResults(data.results || data || [])
        } catch (error) {
            setResults([])
            alert('Error al realizar la búsqueda. Por favor, intenta nuevamente.')
        } finally {
            setIsLoading(false)
        }
    }

    // Verificar si hay filtros aplicados
    const hasActiveFilters = useMemo(() => {
        return Object.values(filters).some(value => value.trim() !== '')
    }, [filters])

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>

            {/* Formulario de filtros */}
            <div className={styles.filtersForm}>
                <div className={styles.filtersGrid}>
                    {/* Filtro por Apellido */}
                    <div className={styles.filterGroup}>
                        <label htmlFor="apellido" className={styles.filterLabel}>
                            Apellido
                        </label>
                        <input
                            id="apellido"
                            type="text"
                            placeholder="Ingresa el apellido..."
                            value={filters.apellido}
                            onChange={(e) => handleFilterChange('apellido', e.target.value)}
                            className={styles.filterInput}
                        />
                    </div>

                    {/* Filtro por CI */}
                    <div className={styles.filterGroup}>
                        <label htmlFor="ci" className={styles.filterLabel}>
                            Cédula de Identidad
                        </label>
                        <input
                            id="ci"
                            type="text"
                            placeholder="Ingresa el CI..."
                            value={filters.ci}
                            onChange={(e) => handleFilterChange('ci', e.target.value)}
                            className={styles.filterInput}
                        />
                    </div>

                    {/* Filtro por Nombre */}
                    <div className={styles.filterGroup}>
                        <label htmlFor="nombre" className={styles.filterLabel}>
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Ingresa el nombre..."
                            value={filters.nombre}
                            onChange={(e) => handleFilterChange('nombre', e.target.value)}
                            className={styles.filterInput}
                        />
                    </div>

                    {/* Filtro por Departamento */}
                    <div className={styles.filterGroup}>
                        <label htmlFor="departamento" className={styles.filterLabel}>
                            Departamento
                        </label>
                        <select
                            id="departamento"
                            value={filters.departamento}
                            onChange={(e) => handleFilterChange('departamento', e.target.value)}
                            className={styles.filterSelect}
                        >
                            {departamentos.map((dept) => (
                                <option key={dept.value} value={dept.value}>
                                    {dept.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filtro por Especialidad */}
                    <div className={styles.filterGroup}>
                        <label htmlFor="especialidad" className={styles.filterLabel}>
                            Especialidad
                        </label>
                        <select
                            id="especialidad"
                            value={filters.especialidad}
                            onChange={(e) => handleFilterChange('especialidad', e.target.value)}
                            className={styles.filterSelect}
                        >
                            {especialidades.map((esp) => (
                                <option key={esp.value} value={esp.value}>
                                    {esp.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className={styles.actionButtons}>
                    <button
                        onClick={handleSearch}
                        disabled={!hasActiveFilters || isLoading}
                        className={styles.searchButton}
                    >
                        {isLoading ? 'Buscando...' : 'Buscar'}
                    </button>
                    
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className={styles.clearButton}
                        >
                            Limpiar Filtros
                        </button>
                    )}
                </div>
            </div>

            {/* Mostrar contador de filtros activos */}
            {hasActiveFilters && (
                <div className={styles.activeFilters}>
                    <p>Filtros activos:</p>
                    <div className={styles.filterTags}>
                        {filters.apellido && (
                            <span className={styles.filterTag}>
                                Apellido: {filters.apellido}
                            </span>
                        )}
                        {filters.ci && (
                            <span className={styles.filterTag}>
                                CI: {filters.ci}
                            </span>
                        )}
                        {filters.nombre && (
                            <span className={styles.filterTag}>
                                Nombre: {filters.nombre}
                            </span>
                        )}
                        {filters.departamento && (
                            <span className={styles.filterTag}>
                                Departamento: {departamentos.find(d => d.value === filters.departamento)?.label}
                            </span>
                        )}
                        {filters.especialidad && (
                            <span className={styles.filterTag}>
                                Especialidad: {especialidades.find(e => e.value === filters.especialidad)?.label}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Mostrar loading */}
            {isLoading && (
                <div className={styles.loading}>
                    <p>Buscando...</p>
                </div>
            )}

            {/* Mostrar resultados */}
            {hasSearched && !isLoading && (
                <div className={styles.results}>
                    {results.length > 0 ? (
                        <>
                            <p className={styles.resultsCount}>
                                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                            </p>
                            <div className={styles.resultsList}>
                                {results.map((person, index) => (
                                    <div key={person.id || index} className={styles.resultItem}>
                                        <div className={styles.personInfo}>
                                            <h3 className={styles.personName}>
                                                {person.nombre} {person.apellido}
                                            </h3>
                                            <p className={styles.personDetails}>
                                                CI: {person.ci}
                                            </p>
                                            {person.departamento && (
                                                <p className={styles.personDetails}>
                                                    Departamento: {person.departamento}
                                                </p>
                                            )}
                                            {person.especialidad && (
                                                <p className={styles.personDetails}>
                                                    Especialidad: {person.especialidad}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className={styles.noResults}>
                            No se encontraron resultados con los criterios de búsqueda
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchFilters