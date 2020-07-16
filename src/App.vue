<template>
  <section class="todoapp">
    <todo-header></todo-header>
    <todo-list></todo-list>
    <todo-footer></todo-footer>
  </section>
</template>

<script lang="ts">
import TodoHeader from './components/TodoHeader.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';
import { ref, defineComponent } from 'vue';

export default defineComponent({
  components: {
    TodoHeader,
    TodoList,
    TodoFooter,
  },
  name: 'App',
  setup() {

  }
});
</script>
