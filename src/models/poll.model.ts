interface PollQuestion {
  id: string;
  question: string;
}

export interface PollQuestionWithOptions<T = string> extends PollQuestion {
  options: T[];
}

export interface PollAnswer extends PollQuestion {
  answer: string;
}

export interface PollWidgetHTMLProps {
  id: string;
  questions: PollQuestionWithOptions[];
}
