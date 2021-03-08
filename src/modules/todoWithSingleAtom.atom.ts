import { atomFamily, atom, RecoilState, SerializableParam } from 'recoil'
import { Todo } from 'types/todo'

const todosState: (param: SerializableParam) => RecoilState<Todo> = atomFamily<
  Todo,
  SerializableParam
>({
  key: 'SingleAtomTodos',
  default: {} as Todo,
})

const requestIdState: RecoilState<number> = atom({
  key: 'SingleAtomTodoListRequestId',
  default: 0,
})

const todoListState: RecoilState<string[]> = atom<string[]>({
  key: 'SingleAtomTodoList',
  default: [],
})

const currentTodoState: RecoilState<string> = atom<string>({
  key: 'SingleAtomCurrentTodo',
  default: '',
})

const addTodoVisibleState: RecoilState<boolean> = atom<boolean>({
  key: 'SingleAtomShowTodo',
  default: false,
})

export { todosState, todoListState, currentTodoState, addTodoVisibleState, requestIdState }
