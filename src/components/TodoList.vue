<template>
  <section class="main" v-show="todos.length">
    <input id="toggle-all"
      class="toggle-all"
      type="checkbox"
      v-model="allDone">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <TodoItem 
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo">
      </TodoItem>
    </ul>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue';
import TodoItem from './TodoItem.vue';
import useStore from '../compositions/useStore';
import useToggle from '../compositions/useToggle';

export default defineComponent({
  components: {
    TodoItem,
  },
  setup(props, ctx) {
    const [ allDone, toggleAllDone ] = useToggle(true);
    const {
      todos,
      filteredTodos,
      commit,
    } = useStore();

    watch(allDone, (newVal) => {
      commit.compeletOrActiveAllTodos(newVal);
    });

    return {
      todos,
      filteredTodos,
      allDone,
    }
  },
});
</script>
