import axios from 'axios';

const API_KEY = '0R-5pl0-aKzccl8kfrYuZ9sc-jC9I-5yPZmdMbKBfNAI8q8n';
const BASE_URL = 'https://api.currentsapi.services/v1';

const fetchLatestNews = async (category) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            headers: {
                Authorization: API_KEY,
            },
            params: {
                keywords: category, // Dùng từ khóa để lọc theo thể loại
            },
        });
        return response.data.news;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
};

export default fetchLatestNews;