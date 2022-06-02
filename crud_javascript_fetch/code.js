//Definición de variables
const url = 'http://localhost:3000/api/evento/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const id_cliente = document.getElementById('id_cliente')
const id_servicio = document.getElementById('id_servicio')
const detalles = document.getElementById('detalles')
const fecha_registro = document.getElementById('fecha_registro')
const estado = document.getElementById('estado')

var opcion = ''

btnCrear.addEventListener('click', ()=>{
    id_cliente.value = ''
    id_servicio.value = ''
    detalles.value = ''
    fecha_registro.value = ''
    estado.value = ''
    modalArticulo.show()
    opcion = 'crear'
})

//funcion para mostrar los resultados
const mostrar = (eventos) => {
    eventos.forEach(evento => {
        resultados += `<tr>
                            <td>${evento.id_evento}</td>
                            <td>${evento.id_cliente}</td>
                            <td>${evento.id_servicio}</td>
                            <td>${evento.detalles}</td>
                            <td>${evento.fecha_registro}</td>
                            <td>${evento.estado}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                       </tr>
                    `    
    })
    contenedor.innerHTML = resultados
    
}

//Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))

  
const on = (element, event, selector, handler) => {
    //console.log(element)
    //console.log(event)
    //console.log(selector)
    //console.log(handler)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Procedimiento Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.", 
    function  (){
        fetch(url+id, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( ()=> location.reload())
        //alertify.success('Ok')
    },
    function(){
        alertify.error('Cancel')
    })
})

//Procedimiento Editar
let idForm = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const id_clienteForm = fila.children[1].innerHTML
    const id_servicioForm = fila.children[2].innerHTML
    const detallesForm = fila.children[3].innerHTML
    const fecha_registroForm = fila.children[4].innerHTML
    const estadoForm = fila.children[5].innerHTML
    id_cliente.value =  id_clienteForm
    id_servicio.value =  id_servicioForm
    detalles.value =  detallesForm
    fecha_registro.value =  fecha_registroForm
    estado.value =  estadoForm
    opcion = 'editar'
    modalArticulo.show()
     
})

//Procedimiento para Crear y Editar
formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id_cliente:id_cliente.value,
                id_servicio:id_servicio.value,
                detalles:detalles.value,
                fecha_registro:fecha_registro.value,
                estado:estado.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoArticulo = []
            nuevoArticulo.push(data)
            mostrar(nuevoArticulo)
        })
    }
    if(opcion=='editar'){    
        //console.log('OPCION EDITAR')
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id_cliente:id_cliente.value,
                id_servicio:id_servicio.value,
                detalles:detalles.value,
                fecha_registro:fecha_registro.value,
                estado:estado.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalArticulo.hide()
})

