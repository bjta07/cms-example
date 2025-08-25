export async function getNews(page = 1, pageSize = 3) {
    try {
        const response = await fetch(`/api/news?page=${page}&pageSize=${pageSize}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}