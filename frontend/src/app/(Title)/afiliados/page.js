'use client'

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DataCarouselWrapper from '@/components/UI/DataCarouselWrapper';
import { getRegionales } from '@/lib/get-regionales';
import { getDepartamentales } from '@/lib/get-departamentales';
import styles from '@/styles/Afiliados.module.css'

export default function Afiliados() {
  const router = useRouter();

  const handleItemClick = useCallback((url) => {
    
    if (url.startsWith('http') || url.startsWith('https')) {
        window.open(url, '_blank', 'noopener,noreferrer');
        return;
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        
        
        {/* Carrusel de Departamentales */}
        <DataCarouselWrapper
          title="Departamentales"
          dataFetcher={getDepartamentales}
          onItemClick={handleItemClick}
          showTitle={true}
          className={styles.carouselSection}
        />
        
        {/* Carrusel de Regionales */}
        <DataCarouselWrapper
          title="Regionales"
          dataFetcher={getRegionales}
          onItemClick={handleItemClick}
          showTitle={true}
          className={styles.carouselSection}
        />
      </main>
    </div>
  );
}