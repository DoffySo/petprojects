import TodoListItem from "@/components/TodoListItem.tsx";

interface TodoListItemProps {
    id: number;
    itemText: string;
    isFinished?: boolean;
}

interface TodoListProps {
 id: number;
 name: string;
 items?: TodoListItemProps[];
}

function TodoList({id, name, items}: TodoListProps) {
    return ( 
        <>
            <div className="todo-list" data-id={id}>
                <div className="todo-list__container">
                    <h1 className="todo-list__title">{name}</h1>
                    <div className="todo-list__items">
                        {/* <TodoListItem itemText="Item 1" />
                        <TodoListItem itemText="Item 2" />
                        <TodoListItem itemText="Item 3" />
                        <TodoListItem itemText="Item 4" /> */}
                        {items?.map(item => (
                            <TodoListItem key={item.id} itemText={item.itemText} isFinished={item.isFinished} />
                        ))}
                    </div>
                </div>
            </div>
        </>
     );
}

export default TodoList;