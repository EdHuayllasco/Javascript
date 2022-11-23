document.addEventListener('DOMContentLoaded', function(){
    //SELECCIONAR LOS ELEMENTOS DE LA INTERFAZ
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');

    // ASIGNAR EVENTO
    // BLUR ANALIZA CUANDO EL EVENTO HA PERDIDO SU FOCO
    // CUANDO TE SALES DEL EVENTO
    // INPUT ANALIZA EN TIEMPO REAL, NO CUANDO PIERDES EL FOCO
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    function validar(e){
        // target nos muestra el contenido que propicia el event listener
        // value nos muestra exactamente que se tipeo
        console.log(e.target.value);
    }
});