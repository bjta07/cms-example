import Header from '../components/Layout/Header';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import './globals.css';

export const metadata = {
  title: 'Mi CMS',
  description: 'CMS creado con Next.js y Strapi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="layout">
          <Header />
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}