import axios from "../../axios.config";
import apiRoutes from "../utils/apiroutes";

const baseUrl = "https://quiz-app-syso.onrender.com/"


export const startQuiz = async (userName: any) => {
    try {
        const response = await axios.post(`${baseUrl}${apiRoutes.startQuiz}`, userName)
        if (response.status === 200) {
            if (response.data.code === 200) {
                return response.data.data
            } else {
                throw new Error(response.data.message);
            }
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error('Failed to create user');
    }
}
