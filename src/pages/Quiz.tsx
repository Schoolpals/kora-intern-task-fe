import React, { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom';
import QuizOption from '../components/QuizOption';
import quizData from '../constants/data..json';
import Button from '../components/Button';
import Results from '../components/Result';
import ProgressBar from '../components/ProgressBar';

const Quiz = () => {
    const { id } = useParams();
    const [userName, setUserName] = useState("")
    const [isUserNameSet, setisUserNameSet] = useState(false)
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answerChoice, setAnswerChoice] = useState('');
    const [score, setScore] = useState(0);
    const [correct, setCorrect] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [buttonChange, setButtonChange] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [error, setError] = useState(false);

    const filteredQuiz = quizData.quizzes.filter(
        quiz => quiz.title.toLowerCase() === id
    );
    const answer = filteredQuiz[0]?.questions[questionIndex].answer;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswerChoice(event.target.value);
    };

    const isCorrect = (option: string) => {
        if (option === answer) {
            setScore(currScore => currScore + 1);
            return true;
        }
        setWrong(true);
        return false;
    };

    const handleAnswerSubmit = () => {
        if (answerChoice != '') {
            setCorrect(isCorrect(answerChoice));
            setButtonChange(true);
            setDisabled(true);
            setError(false);
        } else {
            setError(true);
        }
    };

    const handleNextQuestion = () => {
        if (questionIndex < filteredQuiz[0].questions.length - 1) {
            setQuestionIndex(currIndex => currIndex + 1);
            setAnswerChoice('');
            setCorrect(false);
            setWrong(false);
            setButtonChange(false);
            setDisabled(false);
        } else {
            setQuizFinished(true);
            setQuestionIndex(0);
        }
    };

    return (
        <div>
            {!isUserNameSet ? <div className='py-4 px-6 md:px-16 gap-[40px] lg:px-24'>
                <div>
                    <p className="text-sm text-secondary dark:text-secondary-dark italic mb-3 md:text-xl">
                        Quiz
                    </p>
                    <h2 className="text-xl font-medium md:text-4xl">
                        Enter your Username
                    </h2>
                </div>
                <input
                    onChange={(e) => setUserName(e.target.value)}
                    className='bg-white dark:bg-secondary-dark h-12 w-[100%] mt-6 mb-2 p-1 rounded-md text-[24px] pl-[10px]' ></input>
                <Button text="Submit" handleClick={() => setisUserNameSet(true)} />
            </div>
                :
                <div>
                    {quizFinished === false ? (
                        <div>
                            {filteredQuiz.map((quiz, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-col gap-10 pt-8 px-6 lg:grid lg:grid-cols-2 md:px-16 lg:px-24"
                                    >
                                        <div className='flex flex-col justify-between'>
                                            <div>
                                                <p className="text-sm text-secondary dark:text-secondary-dark italic mb-3 md:text-xl">
                                                    Question {questionIndex + 1} of {quiz.questions.length}
                                                </p>
                                                <h2 className="text-xl font-medium md:text-4xl">
                                                    {quiz.questions[questionIndex].question}
                                                </h2>
                                            </div>
                                            <ProgressBar progress={questionIndex + 1} />
                                        </div>
                                        <div>
                                            <ul className="flex flex-col gap-3">
                                                {quiz.questions[questionIndex].options.map((option, idx) => {
                                                    return (
                                                        <QuizOption
                                                            key={idx}
                                                            option={option}
                                                            selectedOption={answerChoice}
                                                            answer={answer}
                                                            id={idx}
                                                            selected={answerChoice === option}
                                                            correct={answer === option && correct}
                                                            wrong={wrong}
                                                            disabled={disabled}
                                                            handleChange={handleChange}
                                                        />
                                                    );
                                                })}
                                            </ul>
                                            {buttonChange ? (
                                                <Button text="Next Question" handleClick={handleNextQuestion} />
                                            ) : (
                                                <Button text="Submit Answer" handleClick={handleAnswerSubmit} />
                                            )}
                                            {error && (
                                                <span className="flex gap-3 justify-center items-center mt-3 w-full">
                                                    <img src={"/images/icon-sun-dark.svg"} width={24} height={24} alt="error" />
                                                    <p className="text-error">Please select an answer</p>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <Results
                            userName={userName}
                            score={score}
                            icon={filteredQuiz[0].icon}
                            quizType={filteredQuiz[0].title}
                        />
                    )}
                </div>
            }
        </div>
    )
}

export default Quiz