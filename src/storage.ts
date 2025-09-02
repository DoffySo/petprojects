import {atomWithStorage, RESET } from 'jotai/utils'
import type {TodoListItemProps, TodoListProps} from '@/components/TodoList.tsx'

export const todosAtom = atomWithStorage<TodoListProps[]>('todos', []);
