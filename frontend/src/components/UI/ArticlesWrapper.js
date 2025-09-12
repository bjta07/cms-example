// components/ArticlesWrapper.js
import { getArticles } from "@/lib/get-articles";
import Articles from "./Articles";

const ArticlesWrapper = async () => {
    try {
        const articles = await getArticles();
        
        if (!articles || !Array.isArray(articles)) {
            return <div>Error: No se pudieron cargar los artículos</div>;
        }

        return <Articles articles={articles} />;
    } catch (error) {
        return <div>Error cargando los artículos</div>;
    }
};

export default ArticlesWrapper;