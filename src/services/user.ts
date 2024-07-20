import axios from "../../axios.config";
import apiRoutes from "../utils/apiroutes";

const baseUrl = "https://kora-intern-task-backend.onrender.com"


interface ISignIn {
    userName: string,
    password: string
}

export const signIn = async ({userName,password}:ISignIn) => {
    try {
        const response = await axios.post(`${baseUrl}${apiRoutes.signIn}`, {userName,password})
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

interface ISignUp {
    firstName: string,
    lastName: string,
    email: string,
    userName: string,
    password: string
}
export const signUp = async ({firstName,lastName,email,userName,password}: ISignUp) => {
    try {
        const response = await axios.post(`${baseUrl}${apiRoutes.signUp}`, {firstName,lastName,email,userName,password})
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