import React from 'react'
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom'
interface Question {
    question: string;
    options: string[];
    answer: number;
}

const Dashboard = () => {
    const name = sessionStorage.getItem('userName');
    const navigate = useNavigate();

    return (
        <main className='flex flex-col gap-10 pt-8 px-6 lg:px-0 w-[100vw] lg:w-[800px]'>
            <h2 className="text-xl font-medium md:text-4xl capitalize">
                Welcome {name}
            </h2>

            <div className='flex gap-[40px]'>
                <Button text="Create a Quiz" handleClick={() => {navigate("/dashboard/create") }} loading={false} />
                <Button text="View Quizzes" handleClick={() => { navigate("/dashboard/view")}} loading={false} />
            </div>
        </main>
    )
}

export default Dashboard