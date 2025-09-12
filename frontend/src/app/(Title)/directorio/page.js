import React from 'react'
import SearchFilters from '@/components/UI/Search'

const SearchPage = () => {
    return (
        <div>
            {/* Opción 1: Usando el endpoint por defecto */}
            <SearchFilters 
                title="Búsqueda de Profesionales"
            />
        </div>
    )
}

export default SearchPage

