import axios from "../../axios.config";
import apiRoutes from "../utils/apiroutes";

const baseUrl = "https://kora-intern-task-backend.onrender.com/"


export const startQuiz = async (username: string) => {
    try {
        const response = await axios.post(`${baseUrl}${apiRoutes.startQuiz}`, { username })
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
        throw new Error('Failed to start quiz');
    }
}

interface IpropsQuestion {
    quesId: number,
    quizId: string
}

export const getQuizQuestions = async (categoryId: string) => {
    try {
        const response = await axios.get(`${baseUrl}${apiRoutes.getQuiz}`, {
            params: { categoryId },
        })
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
        throw new Error('Failed to fetch quiz');
    }
}

export const getKoraQuestions = async ({ quesId, quizId }: IpropsQuestion) => {
    try {
        const response = await axios.get(`${baseUrl}${apiRoutes.koraQuiz}`, {
            params: { quesId, quizId },
        })
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
        throw new Error('Failed to fetch quiz');
    }
}

export const getQuidaxQuestions = async ({ quesId, quizId }: IpropsQuestion) => {
    try {
        const response = await axios.get(`${baseUrl}${apiRoutes.quidaxQuiz}`, {
            params: { quesId, quizId },
        })
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
        throw new Error('Failed to fetch quiz');
    }
}

export const getPiggyvestQuestions = async ({ quesId, quizId }: IpropsQuestion) => {
    try {
        const response = await axios.get(`${baseUrl}${apiRoutes.piggyQuiz}`, {
            params: { quesId, quizId },
        })
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
        throw new Error('Failed to fetch quiz');
    }
}

interface IpropsScores {
    quizId: string;
    score: number;
}

export const sendUserScores = async ({ quizId, score }: IpropsScores) => {
    try {
        const response = await axios.post(
            `${baseUrl}${apiRoutes.displayScore}`,
            { score },
            { params: { quizId } }
        );

        if (response.status === 200) {
            if (response.data.success === true) {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error('Failed to fetch quiz');
    }
};

interface IUpload {
    question: string;
    options: string[];
    answer: number;
    categoryId: string
}

export const uploadQuestion = async ({ categoryId, question, answer, options }: IUpload) => {
    try {
        const response = await axios.post(`${baseUrl}${apiRoutes.uploadQuiz}`,
            { question, options, answer },
            { params: { categoryId } }
        );
        console.log(response.data.data)
        if (response.status === 200) {
            if (response.data.message === "Quiz uploaded successfully") {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error('Failed to upload question');
    }
};

export const createCategory = async (categoryName: string) => {
    try {
        const response = await axios.post(`${baseUrl}${apiRoutes.createCategory}`, { categoryName });

        if (response.status === 200) {
            if (response.data.success === true) {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error('Failed to upload question');
    }
};

export const getCategory = async (categoryName: string) => {
    try {
        const response = await axios.get(`${baseUrl}${apiRoutes.getUserCategories}`, {
            params: { categoryName },
        })
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
        throw new Error('Failed to fetch quiz');
    }
}

export const getCategoryName = async () => {
    try {
        const response = await axios.get(`${baseUrl}${apiRoutes.getUserCategoriesNmae}`, {
        })
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
        throw new Error('Failed to fetch quiz');
    }
}