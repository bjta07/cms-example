'use client';

import { usePathname } from 'next/navigation';
import Title from '@/components/Layout/Title';

export default function WithTitle({ children }) {
  const pathname = usePathname();

  // mapa de rutas → títulos
  const titles = {
    '/about': 'Sobre Nosotros',
    '/prensa': 'Noticias',
    '/afiliados' : 'Nuestros colegios',
    '/documentos': 'Documentos y Circulares',
    '/rev-cientifica': 'Revistas Cientificas',
    '/rev-cientifica/[codigo]':'[codigo]',
    '/soc-cientifica': 'Sociedades Cientificas',
    '/normativa': 'Normativas y Reglamentos',
    '/certificaciones': 'Certificados otorgados por nuestra institucion',
    '/inscripciones': 'Inscripciones',
    '/postgrado' : 'Cursos de Postrado'
  };

  const currentTitle = titles[pathname] || 'Página';

  return (
    <>
      <Title text={currentTitle} />
      {children}
    </>
  );
}
