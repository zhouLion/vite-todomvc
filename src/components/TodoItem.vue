<template>
  <li class="todo"
    :class="todoListClass">
    <div class="view">
      <input class="toggle" type="checkbox" v-model="todo.completed">
      <label @dblclick="editTodo(todo)">{{todo.title}}</label>
      <button class="destroy" @click="removeTodo(todo)"></button>
    </div>
    <input
      class="edit" type="text" v-model="todo.title"
      v-todo-focus="todo === todoOnEditting"
      @blur="doneEdit(todo)"
      @keyup.enter="doneEdit(todo)"
      @keyup.esc="cancelEdit(todo)">
  </li>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import useTodoStore from '../compositions/useStore';

export default defineComponent({
  props: {
    todo: {
      type: Object,
    }
  },
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  },
  setup(props, ctx) {
    const {
      commit,
      todoOnEditting,
    } = useTodoStore();

    const todoListClass = computed(() => {
      const result = {
        completed: props.todo ? props.todo.completed : '',
        editing: props.todo === todoOnEditting
      };
      console.log(result);
      return result;
    });

    const { doneEdit, cancelEdit, removeTodo, editTodo } = commit;
    return {
      todoOnEditting,
      doneEdit,
      cancelEdit,
      removeTodo,
      editTodo,
      todoListClass,
    }
  },
})
</script>
