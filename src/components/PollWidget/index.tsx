import styles from '../../styles/widget.scss?inline';
import { PollQuestionWithOptions } from '../../models/poll.model.ts';
import Poll from '../Poll';
import { useMemo, useState } from 'react';
import PollResults from '../PollResults';
import { useStorage } from '../../hooks/useStorage.hook.tsx';

export interface PollWidgetProps {
  id: string;
  questions: PollQuestionWithOptions<string>[];
}

const PollWidget = ({ questions, id }: PollWidgetProps) => {
  const [results, setResults] = useState<Record<string, string>>(null);
  const storage = useStorage(id);

  const answersMap = useMemo(() => {
    return questions.reduce((acc: Record<string, string>, curr: PollQuestionWithOptions) => {
      acc[curr.id] = null
      return acc;
    }, {})
  }, [questions]);

  const onSaveResults = (results: Record<string, string>) => {
    storage.setItem(results);
    setResults(results);
  }

  return (
    <div className="widget">
      <style>{styles}</style>
      <div className="wrapper">
        {!results ? (
          <Poll
            data={questions}
            answersMap={answersMap}
            submit={onSaveResults}
          />
        ) : (
          <PollResults results={results}/>
        )}
      </div>
    </div>
  )
}

export default PollWidget;
