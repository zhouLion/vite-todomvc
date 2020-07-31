<template>
  <footer class="footer" v-show="todos.length">
    <span class="todo-count">
      <strong v-text="remaining"></strong> 条待办
    </span>
    <ul class="filters">
      <li><a href="#/all" :class="{selected: visibility == 'all'}">All</a></li>
      <li><a href="#/active" :class="{selected: visibility == 'active'}">Active</a></li>
      <li><a href="#/completed" :class="{selected: visibility == 'completed'}">Completed</a></li>
    </ul>
    <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
      Clear completed
    </button>
  </footer>
</template>

<script lang="ts">
import { ref, defineComponent, computed, onMounted } from 'vue';
import useTodoStore from '../compositions/useStore';

export default defineComponent({
  setup(props, ctx) {
    const { 
      todos,
      todoType,
      commit,
    } = useTodoStore();

    onMounted(async () => {
      // @ts-ignore
      const router = new window.Router();
      router.on('all', () => {
        commit.changeType('all');
      });
      router.on('completed', () => {
        commit.changeType('completed');
      });
      router.on('active', () => {
        commit.changeType('active');
      });
      router.configure({
        notfound: () => {
          window.location.hash = '';
          commit.changeType('all');
        }
      });
      router.init();
    });

    const remaining = computed(() => {
      return todos.value.filter((todo) => !todo.completed).length;
    });

    const { removeCompleted } = commit;
    return {
      todos,
      visibility: todoType,
      removeCompleted,
      remaining,
    };
  }
});
</script>
