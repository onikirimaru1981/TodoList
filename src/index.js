// Al utilizar esta sintaxis puedo exportar tantas classes como desee,ya que ira a la carpeta Classes
//leera el index.js y vera las exportaciones de mis classes

import './style.css';
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

// console.log(todoList.todos);
todoList.todos.forEach(todo => crearTodoHtml(todo));
// todoList.todos.forEach( crearTodoHtml);// Cuando recibe solo un argumento podemos optar por esta sintaxis

// console.log('todos', todoList.todos);

// const tarea = new Todo('Hola mi app preferida!!');

// todoList.nuevoTodo(tarea);

// console.log(todoList);

// crearTodoHtml(tarea);

// localStorage.setItem('Mi_key', 'abc1233')
// sessionStorage.setItem('Mi_key', 'abc1233')
// setTimeout(() => {
//     localStorage.removeItem('Mi_key')

// }, 1500);





