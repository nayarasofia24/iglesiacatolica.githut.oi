const url = 'http://localhost:3000/api/left/'
const contenedor = document.querySelector('tbody')
let resultados = ''
//funcion para mostrar los resultados de forma ascendente  
const mostrar = (citas) => {
    citas.forEach(cita => {
        resultados += `<tr>
                            <td>${cita.probando}</td>
                            <td>${cita.probando2}</td>
                            <td>${cita.id_evento}</td>
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