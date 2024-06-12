import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PollResults from './index.tsx';

describe('PollResults Component', () => {
  const mockResults = {
    q1: 'Answer 1',
    q2: 'Answer 2',
    q3: 'Answer 3',
  };

  test('renders the component', () => {
    render(<PollResults results={mockResults} />);

    // Check if the preformatted JSON is rendered correctly
    expect(screen.getByText(/"q1": "Answer 1"/)).toBeInTheDocument();
    expect(screen.getByText(/"q2": "Answer 2"/)).toBeInTheDocument();
    expect(screen.getByText(/"q3": "Answer 3"/)).toBeInTheDocument();
  });

  test('renders an empty results object', () => {
    render(<PollResults results={{}} />);

    // Check if the empty object is rendered correctly
    expect(screen.getByText('{}')).toBeInTheDocument();
  });
});
