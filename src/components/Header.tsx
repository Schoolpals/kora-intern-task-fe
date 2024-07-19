'use client';

import React, { useEffect, useState } from 'react';
import useDarkSide from '../hooks/useDarkMode';
import Category from './Category';
import { useLocation, useParams } from 'react-router-dom';

export default function Header() {
    const location = useLocation();
    const [colorTheme, setTheme] = useDarkSide();
    const [darkModeOn, setDarkSide] = useState(colorTheme === 'light' ? true : false);

    const handleToggle = () => {
        //@ts-ignore
        setTheme(darkModeOn ? 'light' : 'dark');
        setDarkSide(!darkModeOn);
    };

    return (
        <header className="flex justify-between items-center py-4 px-6 md:px-16 gap-[40px] lg:px-24  mb-5">
            <>
                <Category category={location.pathname.slice(6)} />
            </>
            <div className="flex items-center gap-[5px] cursor-pointer" onClick={handleToggle}>
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
        </header>
    );
}