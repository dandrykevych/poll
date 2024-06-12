import { PollQuestionWithOptions } from '../../models/poll.model.ts';
import PollQuestion from '../PollQuestion';
import { useEffect, useMemo, useState } from 'react';

interface PollProps {
  data: PollQuestionWithOptions[];
  answersMap: Record<string, string>;
  submit: (payload: Record<string, string>) => void;
}

const Poll = ({ data, submit, answersMap }: PollProps) => {
  const [current, setCurrent] = useState(data[0].id);
  const [answers, setAnswers] = useState(answersMap);

  const isLast = useMemo(() => {
    return current === data[data.length - 1].id;
  }, [data, current]);

  const isFinished = useMemo(() => {
    return Object.values(answers).every(Boolean);
  }, [answers]);

  useEffect(() => {
    if (isFinished) {
      submit(answers);
    }
  }, [isFinished, submit, answers]);

  const onSetAnswer = (id: string, answer: string) => {
    setAnswers(prevState => ({
      ...prevState,
      [id]: answer
    }));
    onNext();
  }

  const onNext = () => {
    if (!isLast) {
      const currentIndex = data.findIndex(question => question.id === current);
      setCurrent(data[currentIndex + 1].id);
      return;
    }
  }

  return (
    <div>
      {data.map(item => {
        return (
          <PollQuestion
            key={item.id}
            question={item.question}
            options={item.options}
            active={current === item.id}
            isLast={isLast}
            submit={(answer) => onSetAnswer(item.id, answer)}
          />
        )
      })}
    </div>
  )
}

export default Poll;
