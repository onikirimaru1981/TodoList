// Referencia en el HTML

import { Todo } from "../classes";
import { todoList } from "../index";

const divTodoList = document.querySelector('.todo-list');
const txtImput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro')

export const countTodo = document.querySelector('.todo-count');
export const crearTodoHtml = (todo) => {

    const htmlTodo = ` <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox"${(todo.completado) ? 'checked' : ''} >
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li> `


    const div = document.createElement('div');

    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);// En este caso,para poder insertar todos los elementos html
    // de una sola vez con sus clases no interesaba hacerlo dentro de un div,pero realmente en el html
    // resultante nos interesa solo coger la lista ordenada,por ese motivo utilizamos la intruccion 
    //.firstElementChild,esto hara que coga el primer elemento hijo del padre

    return div.firstElementChild;

}


// Eventos

txtImput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && txtImput.value.length > 0) {

        const nuevoTodo = new Todo(txtImput.value)
        todoList.nuevoTodo(nuevoTodo)

        crearTodoHtml(nuevoTodo);
        txtImput.value = ''

    }
});
divTodoList.addEventListener('click', (event) => {
    // Con este codigo almacenamos en la const que es concretamente en lo que 
    //hacemos click(button,label,etc)

    const nombreElemento = (event.target.localName);

    // Con este codigo hacemos referencia al li,ponemos doble parentElement para bajar un nivel en linea de codigo
    const todoElemento = event.target.parentElement.parentElement;

    // Estas lineas de codigo son para extraer el id de la tarea
    const todoId = todoElemento.getAttribute('data-id')
    // console.log(nombreElemento);

    if (nombreElemento.includes('input')) {// Click en el check

        todoList.marcarCompletado(todoId);

        todoElemento.classList.toggle('completed')

    } else if (nombreElemento.includes('button')) {// Hay que borrar el todo

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento)// Se borra el elemento en el HTML
    }
    // console.log(todoList);

})


btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {// Aqui aplicamos un for inverso,
        const elemento = divTodoList.children[i];               //es muy simple,si elminamos desde el indice 0,en adelante,puede caber la posibilidad
        // console.log(elemento);                               // de que se reasignen los indices y falle el programa,haciendolo esta forma,eliminamos
        if (elemento.classList.contains('completed')) {        //desde el ultimo al primero y evitamos un posible fallo de ejecucion
            divTodoList.removeChild(elemento);
        }

    }

})

ulFiltros.addEventListener('click', (event) => {

    console.log(event.target.text);

    const filtro = event.target.text;

    if (!filtro) {
        return;
    };

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {

        elemento.classList.remove('hidden');

        const completado = elemento.classList.contains('completed');

        switch (filtro) {

            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden')
                }

                break;

            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden')
                }

                break;
        }
    }


})