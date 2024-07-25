import React from "react"
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="flex flex-col gap-10 pt-8 px-6 lg:px-0 lg:grid lg:grid-cols-2 w-[100vw] lg:w-[800px]">
      <div className="mb-10 md:mb-16">
        <p className="text-[2.5rem] md:text-[4rem] font-light leading-10 md:leading-[100%]">
          Welcome to
        </p>
        <h1 className="text-[2.5rem] md:text-[4rem] font-medium leading-10 md:leading-[100%]">
          Quizzer
        </h1>
        <p className="italic text-sm md:text-xl font-normal text-secondary dark:text-secondary-dark mt-4 leading-5">
          Pick a quiz to get started.
        </p>
      </div>
      <div>
        <ul className="flex flex-col gap-3 md:gap-6">
          {[{name: "Kora", href: "quiz/kora"}, {name: "Quidax", href: "quiz/quidax"}, {name: "PiggyVest", href: "quiz/piggyvest"}].map((e, id) => {
            return (
              <Link to={`${e.href}`} key={id}>
                <li className="flex items-center gap-3 md:gap-8 p-3 bg-primary dark:bg-secondary-dark rounded-xl text-lg md:text-[1.75rem] font-medium leading-6 cursor-pointer">
                  <img
                    className="⁠p-1 rounded-md md:rounded-xl md:w-[2em] md:h-[2em]"
                    src={"https://th.bing.com/th/id/R.e11e59e5fc95798a8206dad08e982446?rik=Hm1L8dxfT9oz0A&pid=ImgRaw&r=0"}
                    alt=""
                    width={30}
                    height={30}
                  />
                  {e.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Landing