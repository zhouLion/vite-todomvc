<template>
	<section class="main" v-show="todos.length">
		<input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone" />
		<label for="toggle-all">Mark all as complete</label>
		<ul class="todo-list">
			<li
				class="todo"
				v-for="todo in filteredTodos"
				:key="todo.id"
				:class="{completed: todo.completed, editing: todo == editedTodo}"
			>
				<div class="view">
					<input class="toggle" type="checkbox" v-model="todo.completed" />
					<label @dblclick="editTodo(todo)">{{todo.title}}</label>
					<button class="destroy" @click="removeTodo(todo)"></button>
				</div>
				<input
					class="edit"
					type="text"
					v-model="todo.title"
					v-todo-focus="todo == editedTodo"
					@blur="doneEdit(todo)"
					@keyup.enter="doneEdit(todo)"
					@keyup.esc="cancelEdit(todo)"
				/>
			</li>
		</ul>
	</section>
</template>

<script>
import useTodoState from '../compositions/useTodoState';

export default {
	setup() {
		const {  } = useTodoState();
	}
};
</script>

<style>
</style>