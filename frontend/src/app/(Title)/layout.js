'use client';

import { usePathname } from 'next/navigation';
import Title from '@/components/Layout/Title';

export default function WithTitle({ children }) {
  const pathname = usePathname();

  // mapa de rutas → títulos
  const titles = {
    '/about': 'Sobre Nosotros',
    '/prensa': 'Noticias',
    '/documentos': 'Documentos y Circulares',
    '/normativa': 'Normativas y Reglamentos'
  };

  const currentTitle = titles[pathname] || 'Página';

  return (
    <>
      <Title text={currentTitle} />
      {children}
    </>
  );
}
