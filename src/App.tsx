import './App.css'
import TodoList from '@/components/TodoList.tsx'
import type {TodoListItemProps} from '@/components/TodoList.tsx'
import { useState } from 'react'

const itemsList: TodoListItemProps = [
  {
    itemText: "Test1",
    isFinished: true
  },
  {
    itemText: "Test2",
    isFinished: true
  },
  {
    itemText: "Test3",
    isFinished: false
  },
]

function App() {
  const [todoLists] = useState([
    {id: 1, name: "Test", items: []},
    {id: 2, name: "Test2", items: itemsList},
    {id: 3, name: "Test3", items: []},
  ]);

  return (
    <>
      <div className="container">
        <div className="form">
          <input className="form-input" type="text" placeholder="Todo List name..." />
          <button className="form-submit" type="submit">Create</button>
        </div>
        <div className="todo-lists">
          {/* <TodoList id={1} name="Test" items={itemsList} />
          <TodoList id={2} name="Test2" /> */}
          {
            todoLists
              .slice()
              .sort((a, b) => a.id - b.id)
              .map(item => (
                <TodoList key={item.id} id={item.id} name={item.name} items={item.items} />
              ))
          }
        </div>
      </div>
    </>
  )
}

export default App
