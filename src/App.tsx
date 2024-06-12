import './App.css'
import PollWidget from './components/PollWidget/index.tsx';

function App() {
  return (
    <PollWidget
      id="test#1"
      questions={[{ id: 'abc', question: '2 + 2', options: ['1', '3'] }]}
    />
  )
}

export default App
