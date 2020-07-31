<template>
  <!-- vue3 允许使用fragment碎片  -->
  <TodoHeader></TodoHeader>
  <TodoList></TodoList>
  <TodoFooter></TodoFooter>
</template>

<script lang="ts">
import TodoHeader from './TodoHeader.vue';
import TodoList from './TodoList.vue';
import TodoFooter from './TodoFooter.vue';
import { defineComponent, onMounted } from 'vue';
import useTodoStore from '../compositions/useStore';

export default defineComponent({
  components: {
    TodoHeader,
    TodoList,
    TodoFooter
  },
})
</script>

<style scoped>
h1 {
  color: #4fc08d;
}

h1, p {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
