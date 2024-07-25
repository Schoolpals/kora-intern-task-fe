import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import { signIn } from "../services/user"

const Signin = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError("");

        if (!userName || !userPassword) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const data = await signIn({ userName, password: userPassword });
            const now = new Date();
            sessionStorage.setItem("time", JSON.stringify(now.getTime() + 7200000));
            sessionStorage.setItem('access_token', data.data.token);
            sessionStorage.setItem('userName', data.data.userName);
            navigate("/dashboard");
        } catch (err) {
            setError("Login failed. UserName or password is incorrect.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <div className='py-4 px-6 lg:px-0 w-[100vw] lg:w-[800px]'>
                <div>
                    <p className="text-sm text-secondary dark:text-secondary-dark italic md:text-2xl">
                        Enter your Details
                    </p>
                    {/* <h2 className="text-xl font-medium md:text-3xl">
                        Enter your Details
                    </h2> */}
                </div>
                <div className="space-y-4 w-full lg:w-[800px] pb-[20px]">
                    <input
                        placeholder='Enter UserName'
                        type='text'
                        value={userName}
                        onChange={(e) => { setUserName(e.target.value) }}
                        className='bg-white dark:bg-secondary-dark h-14 w-[100%] mt-6 mb-2 p-1 rounded-md text-[24px] pl-[20px]'></input>
                    <input
                        placeholder='Enter Password'
                        type='password'
                        value={userPassword}
                        onChange={(e) => { setUserPassword(e.target.value) }}
                        className='bg-white dark:bg-secondary-dark h-14 w-[100%] mt-6 mb-2 p-1 rounded-md text-[24px] pl-[20px]'></input>
                </div>
                {error && (
                    <p className="text-red-500 text-base pt-[10px]">{error}</p>
                )}
                <Button text="Submit" loading={loading} handleClick={handleSubmit} />
                <p className="text-sm text-center pt-[10px] mb-3 md:text-xl">
                    New here? <Link className='hover:underline hover:text-dark-purple cursor-pointer' to={'/signup'}>Sign up</Link>
                </p>

            </div>
        </div>
    )
}

export default Signin