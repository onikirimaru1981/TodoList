import { Todo } from "./todo.class";
import { countTodo } from "../js/componentes";

export class TodoList {

    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();
        this.countTodo();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
        this.countTodo()
    }

    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id)// En esta linea de codigo,
        this.guardarLocalStorage()                          // se nos regresa un nuevo areglo,excluyendo el 'todo' que coincida con el 
        //                                                 //id que tenga,gracias al metodo filter
        this.countTodo()

    }

    marcarCompletado(id) {

        for (const todo of this.todos) {
            // console.log(id, todo, id);
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                this.countTodo()
                break;

            }
        }

    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado)
        this.guardarLocalStorage;

    }

    guardarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));// Con JSON.stringify,convierto mi areglo de 'todos'
        // en un json perfecto


    }
    cargarLocalStorage() {
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];

        // this.todos = this.todos.map(obj => Todo.fromJson(obj));// Mismo caso explicado anteriormente,podemos resumir esta linea en el codigo de abajo
        this.todos = this.todos.map(Todo.fromJson);
    }

    countTodo() {
        let pendientes = 0;
        let countBox = countTodo.firstElementChild;
        for (let todo of this.todos) {
            (!todo.completado === true) ? pendientes++ : null;
        }
        countBox.innerHTML = pendientes;
    }
}