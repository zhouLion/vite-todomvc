<template>
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo"
      autofocus
      autocomplete="off"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo">
  </header>
</template>

<script lang="ts">
import { ref, defineComponent, computed, Ref } from 'vue';
import useTodoStore from '../compositions/useStore';

export default defineComponent({
  setup(props, ctx) {
    const newTodo: Ref<string> = ref('');
    const {
      commit,
    } = useTodoStore();

    const addTodo = () => {
      commit.addTodo(newTodo.value);
      newTodo.value = '';
    };

    return {
      newTodo,
      addTodo,
    }
  }
});
</script>
