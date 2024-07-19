import { useState } from "react";
import IMAGES from "../assets/index";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className={`${darkMode && "dark"}`}>
      <div>
        <div
          className="flex flex-row absolute  dark:bg-slate-700 right-[400px] p-7  top-14 mt-[150px]  "
          onClick={toggleDarkMode}
        >
          <div className="mr-3">
            <img
              className={`${!darkMode && "hidden"}`}
              src={IMAGES.logo5}
              alt="day"
              width={35}
              height={35}
            />{" "}
          </div>
          <button className=" bg-slate-900 w-[65px] font-bold rounded-3xl dark:text-slate-900 text-slate-200 dark:bg-slate-200">
            {/* <div className="bg-slate-200 w-[20px] h-[20px] rounded-full hidden m-2 font-thin text-[10px] mr-5 ">
              {" "}
            </div>
            <div className="bg-blue-900 w-[20px] h-[20px] rounded-full m-2 hidden font-thin text-[10px] ml-9 ">
              {" "}
            </div> */}
            {darkMode ? "LTH" : "DRK"}
          </button>
          <div className="ml-4">
            <img
              className={`${darkMode && "hidden"}`}
              src={IMAGES.logo6}
              alt="dark"
              width={30}
              height={10}
            />{" "}
          </div>
        </div>
        <main className=" h-screen flex items-center justify-center font-sans  text-[20px]  dark:bg-slate-700 ">
          <div className=" flex flex-col  justify-evenly gap-40 subpixel-antialiased md:flex-row md:m-20  dark:bg-slate-700 ">
            <div className=" mt-2 ">
              {" "}
              <h1 className=" text-start text-7xl font-light text-slate-800  tracking-wider dark:text-[#F5F5F5] ">
                Welcome to the
                <br />{" "}
                <span className="font-extrabold tracking-wide ">
                  Frontend Qiuz!
                </span>
              </h1>
              <p className="mt-12 font-bold  text-slate-800  tracking-wider dark:text-[#F5F5F5]  ">
                <i>Pick a subject to get started.</i>
              </p>
            </div>
            <div className=" text-3xl md:text-2xl ">
              <div
                className=" flex mb-7 bg-slate-500 w-[600px]  text-center items-center p-5 rounded-3xl text-[#F5F5F5] font-semibold hover:transition ease-in-out hover:delay-150 delay-300 duration-200 hover:p-5 hover:-translate-y-1 hover:scale-110"
                onClick={() => {
                  navigate;
                  ("/");
                }}
              >
                {" "}
                <div className="mr-9  bg-yellow-100 p-3 rounded-xl ">
                  {" "}
                  <img
                    src={IMAGES.logo3}
                    alt="html"
                    width={35}
                    height={35}
                  />{" "}
                </div>
                HTML{" "}
              </div>
              <div
                className="flex mb-7 bg-slate-500 w-[600px]  text-center items-center p-5 rounded-3xl text-[#F5F5F5] font-semibold hover:transition ease-in-out hover:delay-150 delay-300 duration-200 hover:p-5 hover:-translate-y-1 hover:scale-110"
                onClick={() => {
                  navigate;
                  ("/");
                }}
              >
                {" "}
                <div className="mr-9  bg-orange-300 p-3 rounded-xl ">
                  {" "}
                  <img
                    src={IMAGES.logo1}
                    alt="css"
                    width={35}
                    height={35}
                  />{" "}
                </div>{" "}
                CSS
              </div>
              <div
                className="flex mb-7 bg-slate-500 w-[600px]  text-center items-center p-5 rounded-3xl text-[#F5F5F5] font-semibold hover:transition ease-in-out hover:delay-150 delay-300 duration-200 hover:p-5 hover:-translate-y-1 hover:scale-110"
                onClick={() => {
                  navigate;
                  ("/accessibility");
                }}
              >
                {" "}
                <div className="mr-9  bg-red-300 p-3 rounded-xl ">
                  {" "}
                  <img
                    src={IMAGES.logo4}
                    alt="js"
                    width={35}
                    height={35}
                  />{" "}
                </div>{" "}
                Javascript
              </div>
              <div
                className="flex mb-7 bg-slate-500 w-[600px] text-center items-center p-5 rounded-3xl text-[#F5F5F5] font-semibold hover:transition ease-in-out hover:delay-150 delay-300 duration-200 hover:p-5 hover:-translate-y-1 hover:scale-110"
                onClick={() => {
                  navigate;
                  ("/");
                }}
              >
                {" "}
                <div className="mr-9  bg-blue-200 p-3 rounded-xl ">
                  {" "}
                  <img
                    src={IMAGES.logo2}
                    alt="access"
                    width={35}
                    height={35}
                  />{" "}
                </div>{" "}
                Accessibility
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Landing;
