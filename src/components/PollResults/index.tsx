interface PollResultsProps {
  results: Record<string, string>;
}

const PollResults = ({ results }: PollResultsProps) => {
  return (
    <div>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  )
}

export default PollResults;
