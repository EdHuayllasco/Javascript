document.addEventListener('DOMContentLoaded', function(){
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    };
    //SELECCIONAR LOS ELEMENTOS DE LA INTERFAZ
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const inputDestinatario = document.querySelector('#destinatario');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    // ASIGNAR EVENTO
    // BLUR ANALIZA CUANDO EL EVENTO HA PERDIDO SU FOCO
    // CUANDO TE SALES DEL EVENTO
    // INPUT ANALIZA EN TIEMPO REAL, NO CUANDO PIERDES EL FOCO
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    inputDestinatario.addEventListener('blur', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click',function(e){
        e.preventDefault();
        resetFormulario();
    });
    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        setTimeout(()=>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            
            // reiniciar datos
            resetFormulario();
            
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
            alertaExito.textContent='Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);
            setTimeout(()=>{
                alertaExito.remove();
            },3000);
        },3000);
    }   
    function validar(e){
        const men = e.target.id; 
        const ref = e.target.parentElement;
        // target nos muestra el contenido que propicia el event listener
        // value nos muestra exactamente que se tipeo
        // TRIM ELIMINA ESPACIO EN BLANCE PARA QUE NO RELLENES CON ESPACIOS
        if(e.target.value.trim() === '' && men !== 'destinatario'){
            mostrarAlerta(`El campo ${men} es obligatorio`, ref);
            e.target.value = '';
            comprobaremail();
            return; 
        } 
        if(men === 'email' || (men === 'destinatario' && e.target.value.trim() !== '') ){
            if(!validarEmail(e.target.value)){
                mostrarAlerta(`El ${men} no es valido`, ref);
                e.target.value='';
                comprobaremail();
                return;
            }
        }
        limpiarAlerta(ref);
        // ASIGNAR LOS VALORES
        email[e.target.name] = e.target.value.trim().toLowerCase();
        // COMPROBAR EL OBJETO EMAIL
        comprobaremail();        
    }
    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia);
        // ALERTA CON HTML
        const error = document.createElement(   'P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2' , 'text-center');
        //INYECTA EL ERROR EL FORMULARIO
        //AGREGAR UN NUEVO ELEMENTO HIJO
        referencia.appendChild(error);
    }
    // comprueba si ya existe esa alerta
    function limpiarAlerta(ref){
        const alerta = ref.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }   
    }
    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }
    function comprobaremail(){
        // verficamos con el include si algun parametro del objeto email esta vacio
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }
    function resetFormulario(){
        email.email = '';
        email.mensaje = '';
        email.asunto = '';
        formulario.reset();
        comprobaremail();
    }
});