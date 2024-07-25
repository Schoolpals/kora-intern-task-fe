import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategoryName } from '../services/quiz';
import useDarkSide from '../hooks/useDarkMode';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard: React.FC = () => {
    const [userQuizzes, setUserQuizzes] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        getCategoryName().then((data) => {
            setUserQuizzes(data.categoryNames)
            setLoading(false)
        })
    }, [])
    return (
        <DashboardLayout>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Total Quizzes</h3>
                    <p className="text-4xl font-bold">{userQuizzes.length}</p>
                </div>
                <div className="bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Quizzes Completed</h3>
                    <p className="text-4xl font-bold">0</p>
                </div>
                <div className="bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Pending Quizzes</h3>
                    <p className="text-4xl font-bold">0</p>
                </div>
            </section>
            <section className="bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
               {loading ?  "" : <ul>
                    <li className="mb-2 text-sm md:text-xl capitalize">Created Quiz: {userQuizzes[userQuizzes.length - 1]}</li>
                    <li className="mb-2 text-sm md:text-xl capitalize">Created Quiz: {userQuizzes[userQuizzes.length - 2]}</li>
                    <li className="mb-2 text-sm md:text-xl capitalize">Created Quiz: {userQuizzes[userQuizzes.length - 3]}</li>
                </ul> }
            </section>
        </DashboardLayout>
    );
};

export default Dashboard;
