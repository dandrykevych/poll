import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Poll from './index.tsx';
import { PollQuestionWithOptions } from '../../models/poll.model.ts';

const mockSubmit = jest.fn();

const mockData: PollQuestionWithOptions[] = [
  { id: 'q1', question: 'Question 1?', options: ['Option 1', 'Option 2'] },
  { id: 'q2', question: 'Question 2?', options: ['Option 1', 'Option 2'] },
];

const mockAnswersMap = {
  q1: '',
  q2: ''
};

describe('Poll Component', () => {
  beforeEach(() => {
    mockSubmit.mockClear();
  });

  test('renders the component', () => {
    render(<Poll data={mockData} submit={mockSubmit} answersMap={mockAnswersMap}/>);

    expect(screen.getByText('Question 1?')).toBeInTheDocument();
  });
});
