import { useEffect } from "react";

interface TodoListItemProps {
    itemText: string;
    isFinished?: boolean;
}

function TodoListItem({itemText, isFinished}: TodoListItemProps) {

    useEffect(() => {
        const handleDragStart = (e: DragEvent) => {
            const target = e.target as HTMLElement;
            target.classList.add("dragging");
        }
        const handleDragEnd = (e: DragEvent) => {
            const target = e.target as HTMLElement;
            target.classList.remove("dragging");
        }
        const handleOnDragEnter = (e: DragEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains("todo-list")) {
                target.children[0].children[1].appendChild(document.querySelector(".dragging")!)
            }
        }
        document.addEventListener("dragstart", handleDragStart);
        document.addEventListener("dragend", handleDragEnd);
        document.addEventListener("dragenter", handleOnDragEnter);
        return () => {
            document.removeEventListener("dragstart", handleDragStart);
            document.removeEventListener("dragend", handleDragEnd);
            document.removeEventListener("dragenter", handleOnDragEnter);
        }
    }, [])

    return ( 
        <>
            <div draggable className="todo-list__item">{itemText} <span>{isFinished ? "true" : "false"}</span></div>
        </>
     );
}

export default TodoListItem;