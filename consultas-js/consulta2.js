const url = 'http://localhost:3000/api/orderBy2/'
const contenedor = document.querySelector('tbody')
let resultados = ''
//funcion para mostrar los resultados de forma ascendente  
const mostrar = (eventos) => {
    eventos.forEach(evento => {
        resultados += `<tr>
                            <td>${evento.id_evento}</td>
                            <td>${evento.id_cliente}</td>
                            <td>${evento.id_servicio}</td>
                            <td>${evento.detalles}</td>
                            <td>${evento.fecha_registro}</td>
                            <td>${evento.estado}</td>
                       </tr>
                    `    
    })
    contenedor.innerHTML = resultados
    
}
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))
 
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
 }