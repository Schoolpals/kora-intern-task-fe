import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { signUp } from "../services/user";

const Signup = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: ""
    });

    const handleUserInfoChange = (key: string, value: string) => {
        setUserInfo((prevEvent) => ({
            ...prevEvent,
            [key]: value,
        }));
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError("");
        const { firstName, lastName, email, userName, password } = userInfo;

        if (!firstName || !lastName || !email || !userName || !password) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const data = await signUp({ firstName, lastName, email, userName, password });
            sessionStorage.setItem('access_token', data.token);
            sessionStorage.setItem('userName', data.userName);
            navigate("/dashboard");
        } catch (err) {
            setError("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='py-4 px-6 md:px-16 gap-[40px] lg:px-24'>
                <div>
                    <p className="text-sm text-secondary dark:text-secondary-dark italic mb-3 md:text-xl">
                        Signup
                    </p>
                    <h2 className="text-xl font-medium md:text-4xl">
                        Create your account
                    </h2>
                </div>
                <div className="space-y-4 w-full lg:w-[800px]">
                    <input
                        placeholder='First Name'
                        type='text'
                        value={userInfo.firstName}
                        onChange={(e) => handleUserInfoChange("firstName", e.target.value)}
                        className='bg-white dark:bg-secondary-dark h-14 w-full mt-6 mb-2 p-1 rounded-md text-[24px] pl-[20px]'
                    />
                    <input
                        placeholder='Last Name'
                        type='text'
                        value={userInfo.lastName}
                        onChange={(e) => handleUserInfoChange("lastName", e.target.value)}
                        className='bg-white dark:bg-secondary-dark h-14 w-full mb-2 p-1 rounded-md text-[24px] pl-[20px]'
                    />
                    <input
                        placeholder='Email'
                        type='email'
                        value={userInfo.email}
                        onChange={(e) => handleUserInfoChange("email", e.target.value)}
                        className='bg-white dark:bg-secondary-dark h-14 w-full mb-2 p-1 rounded-md text-[24px] pl-[20px]'
                    />
                    <input
                        placeholder='Username'
                        type='text'
                        value={userInfo.userName}
                        onChange={(e) => handleUserInfoChange("userName", e.target.value)}
                        className='bg-white dark:bg-secondary-dark h-14 w-full mb-2 p-1 rounded-md text-[24px] pl-[20px]'
                    />
                    <input
                        placeholder='Password'
                        type='password'
                        value={userInfo.password}
                        onChange={(e) => handleUserInfoChange("password", e.target.value)}
                        className='bg-white dark:bg-secondary-dark h-14 w-full mb-2 p-1 rounded-md text-[24px] pl-[20px]'
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-base pt-[10px]">{error}</p>
                )}
                <Button text="Submit" handleClick={handleSubmit} loading={loading} />
                <p className="text-sm text-center pt-[10px] mb-3 md:text-xl">
                    Have an account? <Link className='hover:underline cursor-pointer' to={'/login'}>Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
