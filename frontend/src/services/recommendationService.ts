import axios from "axios";

export async function getRecommendations(companyName: string) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/recommend/${companyName}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return { error: "Unable to fetch recommendations" };
    }
}
