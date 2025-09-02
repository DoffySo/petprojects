import { useDraggable } from '@dnd-kit/core';
import { useAtom } from "jotai";
import { todosAtom } from "@/storage.ts";
import { PhDotsSixVertical } from '@/components/icons/PhDotsSixVertical';

type ItemProps = {
    id: number,
    text: string,
    finished?: boolean,
    droppableName: string,
    droppableId: number,
}

function TodoListItem({id, text, finished, droppableName, droppableId}:ItemProps) {
    const [todos, setTodos] = useAtom(todosAtom);
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: `${droppableName}-${droppableId}-draggable-${id}`,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    const handleDeleteTask = () => {
        console.log("r")
        setTodos(prev =>
            prev.map(list => {
                if (list.name === droppableName && list.id == droppableId) {
                return {
                    ...list,
                    items: (list.items || []).filter((_, idx: number) => idx !== id),
                };
            }

        return list;
        }));
    }
  
    return (
        <div className="todo-list__item" data-item-id={id} data-todo-name={droppableName} data-todo-id={droppableId} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <span className="drag-task">
                <PhDotsSixVertical />
            </span>
            <span>{text}</span>
            <span>{String(finished)}</span>
            <button>{finished ? "Unfinish" : "Finish"}</button>
            <button className="remove-task" onClick={(e) => {
                e.stopPropagation();
                handleDeleteTask();
            }}>Remove</button>
        </div>
    );
}

export default TodoListItem;