import axios from "../../axios.config";
import apiRoutes from "../utils/apiroutes";

const baseUrl = "https://quiz-app-syso.onrender.com/"


export const startQuiz = async (username: string) => {
    try {
        const response = await axios.post(`${baseUrl}${apiRoutes.startQuiz}`, {username})
        console.log(response)
        if (response.status === 200) {
            if (response.data.success === true) {
                return response.data.data
            } else {
                throw new Error(response.data.message);
            }
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error('Failed to start user');
    }
}

interface IpropsQuestion {
    quesId: number,
    quizId: string
}
export const getKoraQuestions = async ({quesId, quizId}: IpropsQuestion) => {
    try {
        const response = await axios.post(`${baseUrl}${apiRoutes.koraQuiz}`, {quesId, quizId})
        if (response.status === 200) {
            if (response.data.success === true) {
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