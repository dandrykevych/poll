import { useState } from 'react';

interface PollQuestionProps {
  question: string;
  options: string[];
  active: boolean;
  isLast: boolean;
  submit: (answer: string) => void;
}

const PollQuestion = ({ question, options, active, isLast, submit }: PollQuestionProps) => {
  const [selected, setSelected] = useState('');

  if (!active) {
    return null;
  }

  return (
    <div className="question">
      <div className="question__title">{question}</div>
      {options.map((option, index) => {
        const classes = `question__option ${option === selected ? 'active' : ' '}`;

        return (
          <div
            className={classes}
            onClick={() => setSelected(option)}
            key={`${option}_${index}`}
          >{option}</div>
        )
      })}
      <button
        onClick={() => submit(selected)}
        disabled={!selected}
        className="btn full-width"
      >{!isLast ? 'Next' : 'Complete'}</button>
    </div>
  )
}

export default PollQuestion;
