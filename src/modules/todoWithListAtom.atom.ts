import { atom, RecoilState } from 'recoil'
import type { Todo } from '../types/todo'

const TodoListState = atom<Todo[]>({
  key: 'ListAtomTodoList',
  default: [],
})

const requestIdState: RecoilState<number> = atom({
  key: 'ListAtomTodoListRequestId',
  default: 0,
})

const addTodoVisibleState: RecoilState<boolean> = atom<boolean>({
  key: 'ListAtomAddTodoModalVisible',
  default: false,
})

const EmptyTodo = {} as Todo

const currentTodoState: RecoilState<Todo> = atom<Todo>({
  key: 'ListAtomCurrentTodo',
  default: EmptyTodo,
})

export { TodoListState, addTodoVisibleState, currentTodoState, requestIdState, EmptyTodo }
