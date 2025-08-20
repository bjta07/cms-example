// components/UI/Icons.js
const IconPaths = {
    // Documentos y archivos
    pdf: (
        <path 
            fillRule="evenodd" // ✅ React usa fillRule, no fill-rule
            d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 15 15.375v-1.75A2.626 2.626 0 0 0 12.375 11H11Zm1 5v-3h.375a.626.626 0 0 1 .625.626v1.748a.625.625 0 0 1-.626.626H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z" 
            clipRule="evenodd" // ✅ React usa clipRule, no clip-rule
        />
    ),
    
    // Puedes agregar más iconos aquí
    externalLink: (
        <>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15,3 21,3 21,9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </>
    ),

    calendar: (
        <>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </>
    ),

    search: (
        <>
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
        </>
    )
};

const Icon = ({
    name,
    size = 24,
    className = "",
    color = "currentColor",
    fill = false, // Para iconos que usan fill en lugar de stroke
    ...props
}) => {
    // ✅ Cambié 'icons' por 'IconPaths'
    const iconElement = IconPaths[name];

    if (!iconElement) {
        console.warn(`Icon "${name}" not found. Available icons:`, Object.keys(IconPaths));
        return null;
    }

    // Configuración especial para el PDF (usa fill)
    const isPdfIcon = name === 'pdf';

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={isPdfIcon || fill ? color : "none"}
            stroke={isPdfIcon || fill ? "none" : color}
            strokeWidth={isPdfIcon || fill ? "0" : "2"}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {iconElement}
        </svg>
    );
};

export default Icon;

// ============================================
// EJEMPLOS DE USO
// ============================================

// Uso básico:
// <Icon name="pdf" size={18} />
// <Icon name="externalLink" size={14} />
// <Icon name="calendar" size={20} />

// Con estilos:
// <Icon name="pdf" size={24} className="text-red-500" />
// <Icon name="search" size={16} className="text-gray-400" />

// Con color personalizado:
// <Icon name="pdf" size={32} color="#EF4444" />