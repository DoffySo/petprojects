import { useAtom } from "jotai";
import { todosAtom } from "@/storage.ts";
import { useEffect, useState } from "react";
import {useDroppable} from '@dnd-kit/core';
import TodoListItem from "./TodoListItem";
import {useSortable} from '@dnd-kit/sortable';


export type TodoListProps = {
  id: number,
  name: string,
  items?: TodoListItemProps[],
  idx?: number
}

export type TodoListItemProps = {
  itemText: string,
  isFinished: boolean
}

export default function TodoList({idx, id, name, items}:TodoListProps) {
  const [todos, setTodos] = useAtom(todosAtom);
  const [newTaskName, setNewTaskName] = useState<string | undefined>("");

  const {isOver, setNodeRef} = useDroppable({
    // id: idx+"-"+name+'-droppable-'+id,
    id: `${idx}-${name}-droppable-${id}`
  });
  const style = {
    background: isOver ? 'rgba(120,120,120, .4)' : undefined,
  };

  const handleCreateTask = () => {
    if(
      newTaskName?.trim() === "" || 
      newTaskName?.trim() === undefined || 
      newTaskName?.trim() === null
    ) return alert("Please, Enter Task Name!")

    console.log(newTaskName)

    setTodos((prev: TodoListProps[]) =>
      prev.map(list =>
        list.id === id
          ? {
              ...list,
              items: [
                ...(list.items || []),
                { itemText: newTaskName, isFinished: false },
              ],
            }
          : list
      )
    );

    setNewTaskName("")
  }
  

  return (
    <>
      <div className="todo-list">
        <div className="todo-list__container">
          <div className="todo-list__title">
            {String(name)}
          </div>
          <div className="todo-list__items" data-todo-id={id} data-todo-name={name} ref={setNodeRef} style={style}>
            {
              items ? 
                items.map( (item, idx) => (
                  // <div key={idx} className="todo-list__item">{item.itemText}</div>
                  <TodoListItem key={idx} id={idx} text={item.itemText} finished={item.isFinished} droppableName={name} droppableId={id} />
                )
              ) : <span>No Items</span>
            }
          </div>
          <div className="todo-list__additem">
            <input type="text" value={newTaskName} onChange={e => setNewTaskName(e.target.value)} placeholder="Task name..." />
            <button type="submit" onClick={handleCreateTask}>Create</button>
          </div>
        </div>
      </div>
    </>
  );
}
