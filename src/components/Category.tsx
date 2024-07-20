import React from 'react';
import { Link, useLocation } from "react-router-dom";

export default function HeaderCategory({
  category,
}: {
  category: string | string[];
}) {
  const location = useLocation();

  return (
    <>
      <div className="flex items-center gap-4 md:gap-6">
        {/* <img
            className={`p-1 rounded-md md:rounded-xl md:h-14 md:w-14 scale-[1.3]`}
            src="https://i.pinimg.com/564x/34/ce/f4/34cef4a90c0a7b8bea15342850fd2a7f.jpg"
            width={40}
            height={40}
            alt=""
          /> */}
        {location.pathname === '/' && (
          <Link className="text-lg md:text-[1.75rem] font-medium uppercase" to={'/login'}>
            Login
          </Link>
        )}
        {(location.pathname === '/login' || location.pathname === "/signup") && (
          <Link className="text-lg md:text-[1.75rem] font-medium uppercase" to={'/'}>
            Back
          </Link>
        )}
        {(location.pathname === '/dashboard') && (
          <Link className="text-lg md:text-[1.75rem] font-medium uppercase" to={'/'}>
            Dashboard
          </Link>
        )}
        <p className="text-lg md:text-[1.75rem] font-medium uppercase">
          {location.pathname.includes("quiz") && category}
        </p>
      </div>
    </>
  );
}
