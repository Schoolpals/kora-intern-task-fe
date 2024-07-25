import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useDarkSide from '../hooks/useDarkMode';
import { AlignJustify } from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const name = sessionStorage.getItem('userName');
    const [showNav, setShowNav] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const [colorTheme, setTheme] = useDarkSide();
    const [darkModeOn, setDarkSide] = useState(colorTheme === 'light' ? true : false);

    const handleToggle = () => {
        //@ts-ignore
        setTheme(darkModeOn ? 'light' : 'dark');
        setDarkSide(!darkModeOn);
    };
    return (
        <div className="min-h-screen text-secondary dark:text-secondary-dark flex">
            <aside className={`relative bg-[#F4F6FA] dark:bg-primary-dark ${showNav ? "w-fit" : "hidden sm:block"} z-[1] sm:w-64 p-6 lg:bg-transparent lg:dark:bg-transparent`}>
                <div className="text-2xl font-bold mb-8">Dashboard</div>
                <nav className="flex flex-col gap-4 cursor-pointer text-sm md:text-xl">
                <Link to={"/dashboard"} className={`flex gap-2 py-2 rounded-md hover:dark:text-white hover:scale-[1.05] ${location.pathname === "/dashboard" && "dark:text-white font-bold"}`}>
                        Overview
                    </Link>
                    <Link to={"/dashboard/create"} className={`flex gap-2 py-2 rounded-md hover:dark:text-white hover:scale-[1.05] ${location.pathname === "/dashboard/create" && "dark:text-white font-bold"}`}>
                        Create Quiz
                    </Link>
                    <Link to={"/dashboard/view"} className={`flex gap-2 py-2 rounded-md  hover:dark:text-white hover:scale-[1.05] ${location.pathname === "/dashboard/view" && "dark:text-white font-bold"}`}>
                        View Quiz
                    </Link>
                    <div className='absolute bottom-5'>
                        <Link to={"/"} onClick={() => {
                            sessionStorage.removeItem('access_token');
                            sessionStorage.removeItem('userName');
                        }} className="cursor-pointer text-sm md:text-base text-white md:text-[1rem] font-medium bg-primary-button rounded-xl md:rounded-xl px-10 py-2 w-full">Logout</Link>
                    </div>
                </nav>
            </aside>
            <main className="flex-1 p-6 h-[100vh] overflow-y-scroll no-scrollbar-firefox no-scrollbar">
                <header className="flex justify-between gap-[20px] sm:gap-0 items-center mb-8">
                    <p onClick={() => {setShowNav(!showNav)}} className='text-xl font-bold block cursor-pointer sm:hidden'><AlignJustify /></p>
                    {location.pathname === '/dashboard' ? <div className="text-base sm:text-lg capitalize">Welcome Back,  {name}</div> :
                        <p onClick={() => navigate("/dashboard")} className="text-lg font-medium hidden sm:flex items-center gap-[5px] cursor-pointer hover:text-dark-purple">
                            <span className='text-xl'>&#10229;</span> Back
                        </p>}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center justify-end gap-[5px] cursor-pointer" onClick={handleToggle}>
                            {darkModeOn ? (
                                <img src={"/images/icon-sun-light.svg"} alt="light mode" />
                            ) : (
                                <img src={"/images/icon-sun-dark.svg"} alt="light mode" />
                            )}

                            <div className="bg-primary-button flex items-center w-[30px] p-[3px] rounded-xl">
                                <div
                                    className={`translate-y-[0.5px] bg-white w-[12px] h-[12px] rounded-full transition-transform duration-300  ${darkModeOn && "translate-x-[12px]"}`}
                                ></div>
                            </div>

                            {darkModeOn ? (
                                <img src={"/images/icon-moon-light.svg"} alt="dark mode" />
                            ) : (
                                <img src={"/images/icon-moon-dark.svg"} alt="dark mode" />
                            )}
                        </div>
                    </div>
                </header>
                <div className=''>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
