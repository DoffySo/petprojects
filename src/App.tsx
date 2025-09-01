import './App.css'
import TodoList from '@/components/TodoList.tsx'

function App() {
  return (
    <>
      <div className="container">
        <div className="form">
          <input className="form-input" type="text" placeholder="Todo List name..." />
          <button className="form-submit" type="submit">Create</button>
        </div>
        <div className="todo-lists">
          <TodoList id={1} name="Test" items={[{id:0, itemText: "Test", isFinished: true},{id:1, itemText: "Test2", isFinished: false}]} />
          <TodoList id={2} name="Test2" />
        </div>
      </div>
    </>
  )
}

export default App
