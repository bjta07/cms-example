import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getProducts } from '../../lib/get-products';
import styles from '../../styles/Products.module.css';
import Image from 'next/image';

const Products = async () => {
  const products = await getProducts() // Ahora products es un array
   
  return (
    <div className={styles.products}>
      <div className={styles.container}>
        <h1>Nuestros Productos</h1>
        <div className={styles.productGrid}>
          {products?.map((product) => (
            <div key={product.id} className={styles.productCard}>
              {product.image && (
                <Image 
                  src={product.image}
                  alt={product.cover?.alternativeText || product.nombre}
                  className={styles.productImage}
                  width={300}
                  height={200}
                />
              )}
              <h3>{product.nombre}</h3>
              <BlocksRenderer content={product.descripcion}></BlocksRenderer>
              <span className={styles.price}>${product.precio}</span>
              <p>Categoría: {product.categoria}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;