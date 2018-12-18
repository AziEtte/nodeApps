import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import { Todo } from '../resources/data/todo-object';



@inject(Router, Todo)
export class Todos  {
    constructor(router, todos) {
        this.router = router;
        this.todos = todos;
        this.message = 'Todos';
        this.showTodoEditForm = false;
    }

    async activate() {
        await this.getTodos();
    }

    attached() {
        feather.replace();
    }

    async getTodos() {
        await this.todos.getTodos();
    }

    newTodo() {
        this.todo = {
            todo: "",
            priotity: "Low"
            
        }
        this.openEditForm();
    }

    editTodo(todo) {
        this.todo = todo;
        this.openEditForm();
    }

    openEditForm() {
        this.showTodoEditForm = true;
        setTimeout(() => { $("#todo").focus(); }, 500);
    }

    changeActive(todo) {
        this.todo = todo;
        this.save();
    }

    async save() {
        if (this.todo && this.todo.todo && this.todo.priotity ) {
            await this.todos.saveTodo(this.todo);
            await this.getTodos();
            this.back();
        }
    }


    async delete() {
        if (this.todo) {
            await this.todos.delete(this.todo);
            await this.getTodos();
            this.back();
        }
    }


    back() {
        this.showTodoEditForm = false;
    }

}
