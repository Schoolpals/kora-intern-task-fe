import React, { useEffect, useState } from 'react'
import { getCategoryName } from '../services/quiz'
import useCopyToClipboard from '../hooks/useCopyToClipBoard';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const ViewQuiz = () => {
  const { copyToClipboard } = useCopyToClipboard();
  const [userQuizzes, setUserQuizzes] = useState([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    getCategoryName().then((data) => {
      setUserQuizzes(data.categoryNames)
      setLoading(false)
    })
  }, [])
  return (
    <DashboardLayout>
      <div className='py-4 px-6 md:px-16 gap-[40px] lg:px-0 w-fit lg:w-[800px]'>
        <p className="text-sm text-secondary dark:text-secondary-dark italic mb-3 md:text-xl">
          Click on the quiz to copy the link and share it
        </p>
        {loading ? <div className=''>
          <div className="flex justify-center pt-[200px] sm:pt-[150px]">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-blacks-four h-[100px] w-[100px]"></div>
          </div>
        </div> :
          <div className='mt-[20px]'>
            <div className='grid grid-cols-2 sm:grid-cols-2 gap-[20px]'>
              {userQuizzes.map((e, id) => {
                return (
                  <p key={id} onClick={() => {

                    copyToClipboard(`https://funny-sorbet-827420.netlify.app/quiz/${e}`)
                    alert(`${e} quiz copied to clipboard`)
                  }
                  }>
                    <li className="flex items-center gap-1 capitalize md:gap-8 p-3 bg-primary dark:bg-secondary-dark rounded-xl text-lg md:text-[1rem] font-medium leading-6 cursor-pointer">
                      <img
                        className="⁠p-1 rounded-md md:rounded-xl md:w-[2em] md:h-[2em]"
                        src={"https://th.bing.com/th/id/R.e11e59e5fc95798a8206dad08e982446?rik=Hm1L8dxfT9oz0A&pid=ImgRaw&r=0"}
                        alt=""
                        width={30}
                        height={30}
                      />
                      {e}
                    </li>
                  </p>
                )
              })}
            </div>
          </div>
        }
      </div>
    </DashboardLayout>
  )
}

export default ViewQuiz