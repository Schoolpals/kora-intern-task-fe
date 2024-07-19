import React from 'react';

export default function HeaderCategory({
  category,
}: {
  category: string | string[];
}) {
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
          <p className="text-lg md:text-[1.75rem] font-medium uppercase">
            {category === "" ? "Home" : category}
          </p>
        </div>
    </>
  );
}