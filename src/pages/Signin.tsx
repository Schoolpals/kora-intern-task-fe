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
            sessionStorage.setItem('access_token', data.token);
            sessionStorage.setItem('userName', data.userName);
            navigate("/dashboard");
        } catch (err) {
            setError("Login failed. UserName or password is incorrect.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <div className='py-4 px-6 md:px-16 gap-[40px] lg:px-24'>
                <div>
                    <p className="text-sm text-secondary dark:text-secondary-dark italic mb-3 md:text-xl">
                        Login
                    </p>
                    <h2 className="text-xl font-medium md:text-4xl">
                        Enter your Username
                    </h2>
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
                    New here? <Link className='hover:underline cursor-pointer' to={'/signup'}>Sign up</Link>
                </p>

            </div>
        </div>
    )
}

export default Signin