const carrito = document.querySelector('#carrito');
const lista_cursos = document.querySelector('#lista-cursos');
const contenedor_carrito = document.querySelector('#lista-carrito tbody');
const limpiarCarrito = document.querySelector('#vaciar-carrito');
let carrito_compras = []; 
cargarEventListeners();
function cargarEventListeners(){
    lista_cursos.addEventListener('click', AgregarNuevoCurso);
    carrito.addEventListener('click', EliminarCurso);
    limpiarCarrito.addEventListener('click', () => {
    carrito_compras = [];
    LimpiarHTML();});
}
function AgregarNuevoCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const datos_html = e.target.parentElement.parentElement;
        LeerdatosCursos(datos_html);
    }
    
}
function EliminarCurso (e){
    if(e.target.classList.contains('borrar-curso')){
        const id = e.target.getAttribute('data-id');
        const existe = carrito_compras.some(curso => curso.id === id && curso.cantidad > 1);
        if(existe) {
            carrito_compras.forEach(curso => {
                if(curso.id === id ) { 
                    curso.cantidad --;
                }
            })
        }else{
           carrito_compras = carrito_compras.filter(curso => curso.id !== id);
        }
    }
    carritoHTML();
}
function LeerdatosCursos(e){
    curso = {
        imagen : e.querySelector('img').src,
        nombre: e.querySelector('h4').textContent,
        precio : e.querySelector('.precio span').textContent,
        id: e.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }
    //revisa elemento
    const existe = carrito_compras.some( curso_car => curso.id === curso_car.id );
    if (existe){
        const nuevo_carrito = carrito_compras.map(curso_car => {
            if(curso_car.id === curso.id){
                curso_car.cantidad ++;
                return curso_car;
            }
            else{
                return curso_car;
            }
        })
        carrito_compras = [...nuevo_carrito] ;
    } else{
        carrito_compras = [...carrito_compras, curso];
    }
    
    // console.log(curso);
    carritoHTML();
}
function carritoHTML(){
    LimpiarHTML();
    carrito_compras.forEach( (carrito) => {
        const {imagen, nombre, precio, id, cantidad} = carrito;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100" >
        </td>
        <td>
            ${nombre}
        </td>
        <td>
            ${precio}
        </td>
        <td> 
            ${cantidad}
        </td>
        <td> 
            <a hred="" class="borrar-curso" data-id="${id}">X</a>
        </td> 
        `;
        //AGREGAR al TBODY
        contenedor_carrito.appendChild(row);
    })
}
function LimpiarHTML(){
    while(contenedor_carrito.firstChild){
        contenedor_carrito.removeChild(contenedor_carrito.firstChild);
    }
}