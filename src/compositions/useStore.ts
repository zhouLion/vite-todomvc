import { ref, Ref, computed, watch, watchEffect } from 'vue';

export type TodoTypes = 'all' | 'active' | 'completed';
export interface TodoItem {
  id: number
  title: string
  completed: boolean
};

const STORAGE_KEY = 'TODO_LIST';

export const todoStorage = {
  fetch: function () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

/** todo列表元素 */
const todos: Ref<Array<TodoItem>> = ref(todoStorage.fetch());

/** todo的状态 */
const todoType: Ref<TodoTypes> = ref('all');

/** 编辑todo时的todo元素的title缓存 */
const beforeEditCache: Ref<string> = ref(null);

/** 正在编辑的todo元素 */
const todoOnEditting: Ref<TodoItem> = ref(null);

watch(todos.value, (newTodos) => {
  todoStorage.save(newTodos);
});

export default function useTodoStore() {
  const filteredTodos = computed(() => {
    if (todoType.value === 'all') {
      return todos.value;
    }
    return todos.value.filter((todo) => {
      return todo.completed === (todoType.value === 'completed');
    })
  });

  const commit = {
    pluralize: (word, count) => {
      return word + (count === 1 ? '' : 's');
    },

    addTodo: (title: string) => {
      if (!title) {
        return;
      }
      const newTodoItem: TodoItem = {
        id: todos.value.length + 1,
        title,
        completed: false,
      }
      todos.value.push(newTodoItem);
    },

    removeTodo: (todo: TodoItem) => {
      const index = todos.value.indexOf(todo);
      todos.value.splice(index, 1);
    },
    
    /** 编辑item */
    editTodo: (todo: TodoItem) => {
      console.log(todo);
      beforeEditCache.value = todo.title;
      todoOnEditting.value = todo;
    },

    doneEdit: (todo: TodoItem) => {
      if (!todoOnEditting.value) {
        return;
      }
      todoOnEditting.value = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        commit.removeTodo(todo);
      }
    },

    cancelEdit: (todo: TodoItem) => {
      todoOnEditting.value = null;
      todo.title = beforeEditCache.value;
    },

    /** 激活所有或者完成✅所有 */
    compeletOrActiveAllTodos(flag: boolean) { 
      todos.value.forEach((todo) => todo.completed = flag);
    },

    removeCompleted: () => {
      todos.value = todos.value.filter((todo) => !todo.completed);
    },

    changeType: (type: TodoTypes) => {
      todoType.value = type;
    }
  };

  return {
    todos,
    filteredTodos,
    todoType,
    commit,
    todoOnEditting,
  };
}
