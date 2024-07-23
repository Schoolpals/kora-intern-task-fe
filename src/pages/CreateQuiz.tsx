import React, { ChangeEvent, FormEvent, useState } from 'react'
import Button from '../components/Button';
import { createCategory, uploadQuestion } from '../services/quiz';
import { useNavigate } from 'react-router-dom';

interface Question {
  question: string;
  options: string[];
  answer: number;
}


const CreateQuiz = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [count, setCount] = useState(0)
  const [categoryName, setCategoryName] = useState('')
  const [isCategoryName, setIsCategoryName] = useState(false)
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleAnswerChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAnswer(parseInt(e.target.value));
  };

  const handleCreate = () => {
    createCategory(categoryName.toLocaleLowerCase()).then((data) => {
      console.log(data.message.categoryId)
      setCategoryId(data.message.categoryId)
      setIsCategoryName(true)
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const result = await uploadQuestion({ categoryId, question, options, answer });
      console.log(result)
      setCount(count + 1)
      setQuestion("")
      setAnswer(0)
      setOptions(['', '', '', ''])
      setSuccessMessage('Question uploaded successfully!');
      setTimeout(() => {
        setSuccessMessage("")
      }, 2000)
    } catch (error) {
      setErrorMessage('Error uploading question');
      setTimeout(() => {
        setErrorMessage("")
      }, 2000)
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='py-4 px-6 md:px-16 gap-[40px] lg:px-0 w-[100vw] lg:w-[800px]'>
      <div>
        {!isCategoryName && <div className=''>
          <div>
            <p className="text-sm text-secondary dark:text-secondary-dark italic mb-3 md:text-xl">
              Create a Quiz
            </p>
            <h2 className="text-xl font-medium md:text-4xl">
              Enter your Category Name
            </h2>
          </div>
          <input
            placeholder='Category'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className='bg-white dark:bg-secondary-dark h-12 w-[100%] mt-6 mb-2 p-1 rounded-md text-[24px] pl-[20px]' />
          <Button loading={loading} text="Submit" handleClick={handleCreate} />
          {errorMessage && <p className="text-red-500 text-base pt-[10px]">{errorMessage}</p>}
        </div>}

        {isCategoryName &&
          <div>
            {count < 10 ? <form onSubmit={handleSubmit}>
              <div className='flex justify-between'>
                <h2 className="text-xl font-medium md:text-4xl">
                  Enter your Quiz Details
                </h2>
              </div>
              <p className="text-sm text-secondary dark:text-secondary-dark italic mb-3 md:text-xl pt-[5px]">
                Add the details for your Quiz <br />
                NB: Our servers only permit 10 questions for now
              </p>
              <p className="flex justify-end py-[20px] text-xl font-normal text-secondary dark:text-secondary-dark">Questions Added: {count}/10</p>
              <div className='flex gap-[20px] items-center'>
                <label className="text-xl font-medium md:text-3xl">Question:</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className='bg-white dark:bg-secondary-dark h-12 w-[100%] mt-6 mb-2 p-1 rounded-md text-[24px] pl-[20px]'
                  required
                />
              </div>
              <div className='flex items-center gap-[20px]'>
                <label className="text-xl font-medium md:text-3xl">Options:</label>
                {options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleInputChange(e, index)}
                    className='bg-white dark:bg-secondary-dark h-12 w-[100%] mt-6 mb-2 p-1 rounded-md text-[24px] pl-[20px]'
                    required
                  />
                ))}
              </div>
              {options[0].length > 1 && <div className='flex items-center gap-[20px]'>
                <label className="text-xl font-medium md:text-4xl">Answer:</label>
                <select
                  value={answer}
                  onChange={handleAnswerChange}
                  className='bg-white dark:bg-secondary-dark h-12 w-[100%] mt-6 mb-2 p-1 rounded-md text-[24px] pl-[20px]'
                  required
                >
                  {options.map((option, index) => (
                    <option key={index} value={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>}
              <div className='pt-[20px]'>
                {successMessage && <p className="text-green-400 text-base">{successMessage}</p>}
                {errorMessage && <p className="text-red-400 text-base">{errorMessage}</p>}
              </div>
              <div className='flex gap-[40px]'>
                <Button text="Upload Question" handleClick={() => { }} loading={loading} />
                <Button text="Finish Upload" handleClick={() => { navigate("/dashboard") }} />
              </div>
            </form>
              :
              <div>
                <h1 className="text-xl font-medium md:text-4xl">You've Can't add any more  Quiz Question again</h1>
                <div className='flex gap-[40px]'>
                  <Button text="Dashboard" handleClick={() => { navigate("/dashboard") }} loading={false} />
                  <Button text="View Quizzes" handleClick={() => { navigate("/dashboard/view") }} loading={false} />
                </div>
              </div>}
          </div>
        }
      </div>
    </div>
  )
}

export default CreateQuiz