import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PollQuestion from './index.tsx';

const mockSubmit = jest.fn();

describe('PollQuestion Component', () => {
  beforeEach(() => {
    mockSubmit.mockClear();
  });

  const questionProps = {
    question: 'Sample Question?',
    options: ['Option 1', 'Option 2', 'Option 3'],
    active: true,
    isLast: false,
    submit: mockSubmit,
  };

  test('renders the component', () => {
    render(<PollQuestion {...questionProps} />);

    expect(screen.getByText('Sample Question?')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('does not render when not active', () => {
    const inactiveProps = { ...questionProps, active: false };
    render(<PollQuestion {...inactiveProps} />);

    expect(screen.queryByText('Sample Question?')).not.toBeInTheDocument();
  });

  test('selects an option and updates state', () => {
    render(<PollQuestion {...questionProps} />);

    fireEvent.click(screen.getByText('Option 1'));
    expect(screen.getByText('Option 1')).toHaveClass('active');
  });

  test('enables submit button when an option is selected', () => {
    render(<PollQuestion {...questionProps} />);

    const option1 = screen.getByText('Option 1');
    const submitButton = screen.getByText('Next');

    expect(submitButton).toBeDisabled();

    fireEvent.click(option1);
    expect(submitButton).toBeEnabled();
  });

  test('calls submit function with selected option', () => {
    render(<PollQuestion {...questionProps} />);

    fireEvent.click(screen.getByText('Option 1'));
    fireEvent.click(screen.getByText('Next'));

    expect(mockSubmit).toHaveBeenCalledWith('Option 1');
  });

  test('displays "Complete" on the last question', () => {
    const lastQuestionProps = { ...questionProps, isLast: true };
    render(<PollQuestion {...lastQuestionProps} />);

    expect(screen.getByText('Complete')).toBeInTheDocument();
  });
});
