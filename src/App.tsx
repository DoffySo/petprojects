import './App.css'
// import TodoList from '@/components/TodoList.tsx'
// import type {TodoListItemProps, TodoListProps} from '@/components/TodoList.tsx'
import { useEffect, useState } from 'react'
import {todosAtom} from '@/storage.ts'
import { useAtom } from 'jotai'
import TodoList from '@/components/TodoList'
import type {TodoListItemProps, TodoListProps} from "@/components/TodoList"
import { DndContext } from '@dnd-kit/core'
import { RESET } from 'jotai/utils'


function App() {
  const [todos, setTodos] = useAtom<TodoListProps[]>(todosAtom);
  

  const [todoListName, setTodoListName] = useState<string | null>();

  const handleCreateTodoList = () => {
    if(todoListName?.trim() == null 
    || todoListName?.trim() == undefined 
    || todoListName?.trim() == ""
  ) return alert("Please, enter todo list name!")
    
    try {
      setTodos(prev=> [
        ...prev,
        {id: todos.length+1, name: todoListName!, items: []}
      ])
      setTodoListName("")
    } catch (e) {
        console.error(e)
    }
  }

  useEffect( () => {
    // console.log(todos);
  }, [todos])

  function handleDragEnd(event) {
    const { over } = event;
    if (!over) return;

    const dropTarget = event.collisions[0].data.droppableContainer.node.current;
    const currentParent = event.activatorEvent.target.parentNode
    if(!dropTarget) return
    if(!currentParent) return
    if(dropTarget == currentParent) return

    const todoName = event.activatorEvent.target.dataset.todoName;
    const todoId = event.activatorEvent.target.dataset.todoId;
    const itemId = Number(event.activatorEvent.target.dataset.itemId);
    const targetTodoName = dropTarget.dataset.todoName;
    const targetTodoId = Number(dropTarget.dataset.todoId);

    const currentTodo = todos[todoId-1];
    if (!currentTodo) return;
    const movedItem = currentTodo.items[itemId];
    if (!movedItem) return;



    setTodos(prev =>
      prev.map(list => {
        if (list.name === todoName && list.id == todoId) {
          return {
            ...list,
            items: (list.items || []).filter((_, idx: number) => idx !== itemId),
          };
        }

        if (list.name === targetTodoName && list.id === targetTodoId) {
          return {
            ...list,
            items: [...(list.items || []), movedItem],
          };
        }

      return list;
    }));
  }


  return (
    <>
      <div className="container">
        <div className="form">
          <input className="form-input" value={todoListName!} onChange={e => setTodoListName(e.target.value)} type="text" placeholder="Todo List name..." />
          <button className="form-submit" onClick={handleCreateTodoList} type="submit">Create</button>
        </div>
        <div className="todo-lists">
          {/* <TodoList id={1} name="Test" items={itemsList} />
          <TodoList id={2} name="Test2" /> */}
          <DndContext onDragEnd={handleDragEnd}>
            {
              todos && todos.length > 0 ? (
                <>
                  {todos
                    .slice()
                    .sort((a: TodoListProps, b: TodoListProps) => a.id - b.id)
                    .map((item: TodoListProps, idx: number) => (
                      <TodoList key={item.id} idx id={item.id} name={item.name} items={item.items} />
                    ))}
                </>
              ) : (
                <span>No Todo Lists...</span>
              )
            }
          </DndContext>
        </div>
      </div>
    </>
  )
}

export default App
