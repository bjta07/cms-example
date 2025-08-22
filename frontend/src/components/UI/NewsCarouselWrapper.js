// components/NewsCarouselWrapper.js
import { getNews } from "@/lib/get-news";
import NewsCarousel from "./NewsCarousel";

const NewsCarouselWrapper = async () => {
    try {
        const news = await getNews();
        
        if (!news || !Array.isArray(news)) {
            console.error('News data is not in the expected format:', news);
            return <div>Error: No se pudieron cargar las noticias</div>;
        }

        return <NewsCarousel news={news} />;
    } catch (error) {
        console.error('Error loading news:', error);
        return <div>Error cargando las noticias</div>;
    }
};

export default NewsCarouselWrapper;