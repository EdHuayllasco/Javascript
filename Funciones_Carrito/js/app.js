const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listacursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articuloscarrito = [];
cargarEventListeners();
function cargarEventListeners(){
    //agregar un curso haciendo click en agregar carrito
    listacursos.addEventListener('click', agregarCurso);
    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    //vaciar carrito de compras
    vaciarCarritoBtn.addEventListener('click' , () => {
        articuloscarrito = [];
        limpiarHTML();
    });
}

//FUNCIONES 

function agregarCurso(e){
    // para que una vez que le demos click no se ponga al incio de la pagina
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')){
        const cursoseleccionado = e.target.parentElement.parentElement ;
        // console.log(cursoseleccionado);
        LeerdatosCurso(cursoseleccionado);
    }
}
//Eliminar curso del carrito 
function eliminarCurso (e){
    console.log(e.target);
    if(e.target.classList.contains('borrar-curso')){
        const cursoID = e.target.getAttribute('data-id');
        // eliminar del arreglo por el data-id
        const existe = articuloscarrito.some(curso => curso.id === cursoID && curso.cantidad > 1);
        if(existe) {
            articuloscarrito.forEach(curso => {
                if(curso.id === cursoID && curso.cantidad > 1) {
                    // console.log(curso.cantidad);
                    curso.cantidad--;
                }
            })
        }else {
            articuloscarrito = articuloscarrito.filter ( curso => curso.id !== cursoID );
        }        
        carritoHTML();
    }
}
// Lee el cotenido del html al que le dimos click y extrae la informacion del curso
function LeerdatosCurso(curso){
    // console.log(curso);
    // crear un objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,  
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1 

    }
    //revisar si ese elemento ya existe, solo aumentamos cantidad
    const existe = articuloscarrito.some(curso => curso.id === infoCurso.id);
    if(existe) { 
        const cursos = articuloscarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actaulizados
            }else {
                return curso; //retorna objetos que no son duplicados
            }
        })
        //asignamos la copia
        articuloscarrito = [...cursos];
    }else {
        // agrega el objeto al carrito
        articuloscarrito = [...articuloscarrito, infoCurso];
    }
    
    carritoHTML();
    console.log(articuloscarrito);
}
// muestra el carrito de compras en el html
function carritoHTML () {
    //limpiar html 
    limpiarHTML();
    //recorre el carrito y genera el html
    articuloscarrito.forEach((curso)=>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${imagen}" width = "115">
        </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td> <a href="#" class="borrar-curso" data-id= "${id}"> X </td>
        `;
        // agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//eliminar los cursos del table body
function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}