import React from 'react';

export default function Button({
  text,
  handleClick,
  loading,
  disabled
}: {
  loading?: boolean;
  disabled?: boolean;
  text: string;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className="text-white text-lg md:text-[1.5rem] font-medium bg-primary-button rounded-xl md:rounded-xl p-3 md:p-4 mt-3 md:mt-8 hover:opacity-50 w-full"
      onClick={handleClick}
      disabled={disabled}
    >
      {loading ? <div className='h-[]'>
        <div className="flex justify-center ">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-blacks-four h-[40px] w-[40px]">

          </div>
        </div>
      </div> : text}
    </button>
  );
}