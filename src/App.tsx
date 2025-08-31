import './App.css'
import TodoList from '@/components/TodoList.tsx'

function App() {
  return (
    <>
      <TodoList id={1} name="Test" items={[{id:0, itemText: "Test", isFinished: true},{id:1, itemText: "Test2", isFinished: false}]} />
      <TodoList id={2} name="Test2" />
    </>
  )
}

export default App
