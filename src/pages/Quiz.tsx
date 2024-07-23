import React, { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import QuizOption from '../components/QuizOption';
import Button from '../components/Button';
import Results from '../components/Result';
import ProgressBar from '../components/ProgressBar';
import { startQuiz, getKoraQuestions, getPiggyvestQuestions, getQuidaxQuestions, sendUserScores, getQuizQuestions, getCategory } from "../services/quiz"
interface Question {
    question: string;
    options: string[];
    answer: number;
}
const Quiz = () => {
    const { id } = useParams<string>();
    const [userName, setUserName] = useState<string>("");
    const [isUserNameSet, setIsUserNameSet] = useState<boolean>(false);
    const [questionIndex, setQuestionIndex] = useState<number>(1);
    const [answerChoice, setAnswerChoice] = useState<string>("");
    const [score, setScore] = useState<number>(0);
    const [correct, setCorrect] = useState<boolean>(false);
    const [wrong, setWrong] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [buttonChange, setButtonChange] = useState<boolean>(false);
    const [quizFinished, setQuizFinished] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [quizId, setQuizId] = useState<string>("");
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const name = sessionStorage.getItem('userName');

    const fetchNextQuestion = (Id: number, QuizId: string) => {
        setLoading(true);
        if (id === "kora") {
            getKoraQuestions({ quesId: Id, quizId: QuizId })
                .then((data) => {
                    setCurrentQuestion(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch Question:", err);
                    setErrorMessage("Failed to fetch Questions");
                    setLoading(false);
                });
        } else if (id === "quidax") {
            getQuidaxQuestions({ quesId: Id, quizId: QuizId })
                .then((data) => {
                    setCurrentQuestion(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch Question:", err);
                    setErrorMessage("Failed to fetch Questions");
                    setLoading(false);
                });
        }
        else if (id === "piggyvest") {
            getPiggyvestQuestions({ quesId: Id, quizId: QuizId })
                .then((data) => {
                    setCurrentQuestion(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch Question:", err);
                    setErrorMessage("Failed to fetch Questions");
                    setLoading(false);
                });
        } else {
            getQuizQuestions({ quesId: Id, quizId: QuizId })
                .then((data) => {
                    setCurrentQuestion(data.message);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch Question:", err);
                    setErrorMessage("Failed to fetch Questions");
                    setLoading(false);
                });
        }
    };

    const handleUserNameSubmit = () => {
        if (!userName) {
            setErrorMessage("Username not set");
            return;
        }
        setLoading(true);
        startQuiz(userName)
            .then((data) => {
                if (id !== "kora" && id !== "piggyvest" && id !== "quidax") {
                    if (id) {
                        getCategory(id).then((data) => {
                            setQuizId(data.category.quizId)
                            fetchNextQuestion(questionIndex, data.category.quizId)
                        })
                    }
                } else {
                    setQuizId(data);
                    fetchNextQuestion(questionIndex, data)
                }
                setIsUserNameSet(true);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to start quiz:", err);
                setErrorMessage("Failed to start Quiz");
                setLoading(false);
            });
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswerChoice(event.target.value);
    };

    const isCorrect = (option: string) => {
        if (option === currentQuestion?.options[currentQuestion?.answer]) {
            setScore((currScore) => currScore + 1);
            return true;
        }
        setWrong(true);
        return false;
    };

    const handleAnswerSubmit = () => {
        if (answerChoice !== '') {
            setCorrect(isCorrect(answerChoice));
            setButtonChange(true);
            setDisabled(true);
            setErrorMessage("");
        } else {
            setErrorMessage("Please select an answer");
        }
    };

    const handleNextQuestion = () => {
        if (questionIndex < 10) {
            setQuestionIndex((currIndex) => currIndex + 1);
            setAnswerChoice('');
            fetchNextQuestion(questionIndex + 1, quizId)
            setCorrect(false);
            setWrong(false);
            setButtonChange(false);
            setDisabled(false);
        } else {
            setQuizFinished(true);
            setQuestionIndex(1);
        }
    };

    useEffect(() => {
        if (quizFinished) {
            sendUserScores({ quizId, score })
        } else {
            if (score > 0) {
                fetchNextQuestion(questionIndex, quizId)
                setScore(0)
            }
        }
    }, [quizFinished])

    useEffect(() => {
        if (name) {
            setUserName(name)
        }
    }, [])

    useEffect(() => {
        if (userName) {
            handleUserNameSubmit()
        }
    }, [name])


    return (
        <div>
            {!isUserNameSet ? (
                <div className='py-4 px-6 md:px-16 gap-[40px] lg:px-0 w-[100vw] lg:w-[800px]'>
                    <div>
                        <p className="text-sm text-secondary dark:text-secondary-dark italic mb-3 md:text-xl">
                            Quiz
                        </p>
                        <h2 className="text-xl font-medium md:text-4xl">
                            Enter your Username
                        </h2>
                    </div>
                    <input
                        placeholder='UserName'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className='bg-white dark:bg-secondary-dark h-12 w-[100%] mt-6 mb-2 p-1 rounded-md text-[24px] pl-[20px]' />
                    <Button loading={loading} text="Submit" handleClick={handleUserNameSubmit} />
                    {errorMessage && <p className="text-red-500 text-base pt-[10px]">{errorMessage}</p>}
                </div>
            ) : (
                <div>
                    {!quizFinished ? (
                        <div>
                            {!loading ? (
                                <div className="flex flex-col gap-10 pt-8 px-6 lg:px-0 lg:grid lg:grid-cols-2 w-[100%] lg:w-[800px]">
                                    {currentQuestion && (
                                        <>
                                            <div className='flex flex-col justify-between'>
                                                <div>
                                                    <p className="text-sm text-secondary dark:text-secondary-dark italic mb-3 md:text-xl">
                                                        Question {questionIndex} of 10
                                                    </p>
                                                    <h2 className="text-xl font-medium md:text-4xl">
                                                        {currentQuestion.question}
                                                    </h2>
                                                </div>
                                                <ProgressBar progress={questionIndex} />
                                            </div>
                                            <div>
                                                <ul className="flex flex-col gap-3">
                                                    {currentQuestion?.options.map((option: string, idx: number) => (
                                                        <QuizOption
                                                            key={idx}
                                                            option={option}
                                                            selectedOption={answerChoice}
                                                            answer={currentQuestion.options[currentQuestion.answer]}
                                                            id={idx}
                                                            selected={answerChoice === option}
                                                            correct={correct && answerChoice === option}
                                                            wrong={wrong && answerChoice === option}
                                                            disabled={disabled}
                                                            handleChange={handleChange}
                                                        />
                                                    ))}
                                                </ul>
                                                {buttonChange ? (
                                                    <Button text="Next Question" loading={loading} handleClick={handleNextQuestion} />
                                                ) : (
                                                    <Button text="Submit Answer" loading={loading} handleClick={handleAnswerSubmit} />
                                                )}
                                                {errorMessage && (
                                                    <span className="flex gap-3 justify-center items-center mt-3 w-full">
                                                        <p className="text-red-500 text-base pt-[10px]">{errorMessage}</p>
                                                    </span>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className=''>
                                    <div className="flex justify-center pt-[200px] sm:pt-[150px]">
                                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-blacks-four h-[100px] w-[100px]"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Results
                            setQuizFinished={setQuizFinished}
                            userName={userName}
                            score={score}
                            quizType={`${id}`}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default Quiz;
