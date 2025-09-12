'use client';

import { usePathname, useParams } from 'next/navigation';
import Title from '@/components/Layout/Title';

export default function WithTitle({ children }) {
  const pathname = usePathname();
  const params = useParams();


  const titles = {
    '/about': 'Sobre Nosotros',
    '/prensa': 'Noticias',
    '/afiliados': 'Nuestros colegios',
    '/documentos': 'Documentos y Circulares',
    '/soc-cientifica': 'Sociedades Cientificas',
    '/cursos': 'Actividad Cientifica',
    '/normativa': 'Normativas y Reglamentos',
    '/certificaciones': 'Certificados otorgados por nuestra institucion',
    '/inscripciones': 'Inscripciones',
    '/postgrado': 'Cursos de Postgrado',
  };

  // Función para generar título dinámico
  const getDynamicTitle = (path) => {
    // Separar segmentos de la ruta
    const segments = path.split('/').filter(Boolean); // elimina strings vacíos

    // Ejemplo: /rev-cientifica/123 → ['rev-cientifica', '123']
    // Si la ruta tiene un segmento numérico o no está en títulos, lo usamos como parámetro
    if (segments.length > 1) {
      const basePath = `/${segments[0]}`;
      const param = segments[1];

      const baseTitle = titles[basePath] || capitalize(segments[0]);
      return `${baseTitle}: ${param}`;
    }

    // Ruta simple
    return titles[path] || capitalize(segments[0] || 'Página');
  };

  // Capitaliza la primera letra de una palabra
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Determinar título
  const currentTitle = getDynamicTitle(pathname);

  return (
    <>
      <Title text={currentTitle} />
      {children}
    </>
  );
}
