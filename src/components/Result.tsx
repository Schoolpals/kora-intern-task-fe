'use client';

import { useNavigate } from 'react-router-dom';
import React from 'react';
import Button from './Button';

export default function Results({
  userName,
  score,
  quizType,
  setQuizFinished,
}: {
  userName: string
  score: number;
  quizType: string;
  setQuizFinished: any,
}) {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-10 pt-8 px-6 lg:px-0 lg:grid lg:grid-cols-2 w-[100vw] lg:w-[800px]">
      <div>
        <p className=" text-[2.5rem] md:text-[3rem] font-light leading-[100%]">
          Quiz Completed,
        </p>
        <p className="text-[2.5rem] md:text-[4rem] pt-[10px] font-medium mb-10 md:mb-16 leading-[100%]">
         {(score > 3 && score < 7) && "Not Bad,"} {score > 6 && "Well Done,"} {userName}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col justify-center items-center bg-white dark:bg-secondary-dark p-8 md:p-12 rounded-xl md:rounded-3xl shadow-sm">
          <div className="flex items-center gap-4 md:gap-4">
            <p  className="text-lg md:text-2xl text-secondary dark:text-secondary-dark font-light">Your Score in</p>
            {/* <span
              className={`flex items-center p-1 rounded-md md:rounded-xl`}
            >
              <img
                className="md:h-14 md:w-14"
                src={icon}
                height={30}
                width={30}
                alt=""
              />
            </span> */}
            <p className="text-lg md:text-[1.75rem] font-medium capitalize">{quizType}</p>
          </div>
          <p className="text-[5.5rem] md:text-[7rem] py-[50px] font-medium">{score}</p>
          <p className="text-lg md:text-2xl text-secondary dark:text-secondary-dark font-light">
            out of 10
          </p>
        </div>
        <Button text="Play Again" handleClick={() => { 
          setQuizFinished(false)
          } } loading={false}></Button>
      </div>
    </section>
  );
}