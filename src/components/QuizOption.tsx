import React from 'react';

export function handleLetter(option: number) {
  switch (option) {
    case 0:
      return 'A';
    case 1:
      return 'B';
    case 2:
      return 'C';
    case 3:
      return 'D';
  }
}

export default function QuizOption({
  option,
  selectedOption,
  answer,
  id,
  selected,
  correct,
  wrong,
  disabled,
  handleChange,
}: {
  option: string;
  selectedOption: string;
  answer: string;
  id: number;
  selected: boolean;
  correct: boolean;
  wrong: boolean;
  disabled: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const letter = handleLetter(id);

  return (
    <li className="group flex items-center text-lg md:text-[1.75rem] font-medium cursor-pointer">
      <input
        type="radio"
        name="choice"
        id={`choice-${id}`}
        value={option}
        className="hidden peer"
        onChange={handleChange}
        disabled={disabled}
        checked={selectedOption === option}
      />
      <label
        className={`${correct ? 'peer-checked:border-success ' : ''} ${wrong ? 'peer-checked:border-error ' : 'peer-checked:border-primary '
          }flex items-center bg-white dark:bg-secondary-dark p-3 gap-4 md:gap-8 rounded-xl md:rounded-3xl peer-checked:border-[3px] cursor-pointer w-full`}
        htmlFor={`choice-${id}`}
      >
        <span
          className={`${correct ? 'bg-success ' : ''} ${wrong && selected ? 'bg-error ' : ''
            } ${selected && !wrong
              ? 'bg-primary-button dark:text-white '
              : 'bg-[#F4F6FA] '
            }flex shrink-0 justify-center items-center dark:text-icon-dark h-10 w-10 md:h-14 md:w-14 rounded-md md:rounded-xl group-hover:bg-light-purple group-hover:text-dark-purple`}
        >
          {letter}
        </span>
        <p>{option}</p>
        {correct ? (
          <img
            className="ml-auto md:h-8 md:w-8"
            src={"/images/icon-correct.svg"}
            width={24}
            height={24}
            alt=""
          />
        ) : null}
        {wrong && answer === option ? (
          <img
            className="ml-auto md:h-8 md:w-8"
            src={"/images/icon-correct.svg"}
            width={24}
            height={24}
            alt=""
          />
        ) : null}
        {wrong && selected ? (
          <img
            className="ml-auto md:h-8 md:w-8"
            src={"/images/icon-incorrect.svg"}
            width={24}
            height={24}
            alt=""
          />
        ) : null}
      </label>
    </li>
  );
}