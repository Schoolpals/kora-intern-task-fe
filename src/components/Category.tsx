import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function HeaderCategory({
  // category,
}: {
  }) {
  const location = useLocation();
  const navigate = useNavigate();
  const name = sessionStorage.getItem('userName');

  return (
    <>
      <div className="flex items-center gap-4 md:gap-6">
        {!name ? location.pathname === '/' && (
          <Link className="text-lg md:text-[1.75rem] font-medium uppercase cursor-pointer hover:text-dark-purple" to={'/login'}>
            Login
          </Link>
        ) :
          <Link className="text-lg md:text-[1.75rem] font-medium uppercase cursor-pointer hover:text-dark-purple" to={'/dashboard'}>
            Dashboard
          </Link>}
        {location.pathname === '/dashboard' && (
          <Link className="text-lg md:text-[1.75rem] font-medium uppercase cursor-pointer hover:text-dark-purple" to={'/login'}>
            Logout
          </Link>
        )}
        <div>
          {(location.pathname !== '/') && <p onClick={() => navigate(-1)} className="text-lg md:text-[1.75rem] font-medium flex items-center gap-[5px] cursor-pointer hover:text-dark-purple">
            <span className='text-xl'>&#10229;</span> Back
          </p>}
        </div>
      </div>
    </>
  );
}
