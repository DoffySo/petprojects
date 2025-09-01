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
            if (target.classList.contains("todo-list") || target.parentElement!.classList.contains("todo-list") || target.parentElement!.parentElement!.classList.contains("todo-list")) {
                target.children[0].children[1].appendChild(document.querySelector(".dragging")!)
            }
        }
        const hanldeMoveItem = (e: DragEvent) => {
            const target = e.target as HTMLElement;
            const draggingItem = document.querySelector('.dragging');
            if (target.classList.contains("todo-list__item") && draggingItem && target !== draggingItem) {
                const bounding = target.getBoundingClientRect();
                const offset = e.clientY - bounding.top;
                const middle = bounding.height / 2;
                const parent = target.parentElement;
                if (parent) {
                    if (offset < middle) {
                    parent.insertBefore(draggingItem, target);
                    } else {
                    parent.insertBefore(draggingItem, target.nextSibling);
                    }
                }
            }
        }
        document.addEventListener("dragstart", handleDragStart);
        document.addEventListener("dragend", handleDragEnd);
        document.addEventListener("dragenter", handleOnDragEnter);
        document.addEventListener("dragenter", hanldeMoveItem);
        return () => {
            document.removeEventListener("dragstart", handleDragStart);
            document.removeEventListener("dragend", handleDragEnd);
            document.removeEventListener("dragenter", handleOnDragEnter);
            document.removeEventListener("dragenter", hanldeMoveItem);
        }
    }, [])

    return ( 
        <>
            <div draggable className="todo-list__item">{itemText} <span>{isFinished ? "true" : "false"}</span></div>
        </>
     );
}

export default TodoListItem;