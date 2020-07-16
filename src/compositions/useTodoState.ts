import { ref, Ref, watch, computed } from 'vue';

interface TodoItem {
    id: string
    title: string
    completed: boolean
}

const STORAGE_KEY = 'TODOLIST';

const storage = {
    getItem() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    },
    setItem(item) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
    }
}

const todos: Ref<Array<TodoItem>> = ref(storage.getItem());
const remianing = computed(() => todos.value.length);

export default function useTodoState() {

    const commit = {
        createTodoItem(title: string): TodoItem {
            return {
                id: new Date().getTime().toString(),
                title,
                completed: false,
            }
        },

        addTodoItem(title) {
            todos.value.push(commit.createTodoItem(title));
        },
    };

    return {
        todos,
        remianing,
        commit,
    }
}
