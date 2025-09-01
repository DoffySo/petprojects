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

  const [todoListName, setTodoListName] = useState<string | null>(null);

  const handleCreateTodoList = () => {
    if(todoListName?.trim() == null 
    || todoListName?.trim() == undefined 
    || todoListName?.trim() == ""
  ) return alert("Please, enter todo list name!")
    todoLists.push({id: todoLists.length+1, name: todoListName!, items: []})
    setTodoListName(null)
  }

  return (
    <>
      <div className="container">
        <div className="form">
          <input className="form-input" onChange={e => setTodoListName(e.target.value)} type="text" placeholder="Todo List name..." />
          <button className="form-submit" onClick={handleCreateTodoList} type="submit">Create</button>
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
