
let citaValores = [];
var petiCita = {};
var petUser = {};

const url_paci = 'http://127.0.0.1:3000/paciente';
const url_cita = 'http://127.0.0.1:3000/sendcita';
const url_servicios = 'http://127.0.0.1:3000/servicios';


function convertirJson(){
    petUser.nombre = citaValores[0];
    petUser.correo = citaValores[1];
    petUser.telefono = citaValores[2];
    petiCita.servicio  = citaValores[3];
    petiCita.fecha_cita  = citaValores[4];
    petiCita.hora_cita = parseInt(citaValores[5],10);
    petiCita.nombre_paciente = citaValores[0];
}

const fechCita = async() => {
    return await (await fetch(url_cita, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(petiCita),
        headers:{
            'content-type': 'application/json'
            }
    }).then(function(response) {
        if(response.ok) {
            return response.text()
        } else {
            throw "Error en la llamada Ajax";
        }
     
     })
     .then(function(texto) {
        console.log(texto);
     })
     .catch(function(err) {
        console.log(err);
     }))
}

const fechPaciente = async() => {
    return await (await fetch(url_paci, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(petUser),
        headers:{
            'content-type': 'application/json'
            }
    }).then(function(response) {
        if(response.ok) {
            return response.text()
        } else {
            throw "Error en la llamada Ajax";
        }
     
     })
     .then(function(texto) {
        console.log(texto);
     })
     .catch(function(err) {
        console.log(err);
     })
    )
}

const fechServicios = async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return await (await fetch(url_servicios)).json();
}



const agendar = new Vue({
    el: '#agendar-cita',
  
    data:{
        todos : [
            {id : 'fullName', type : 'text', name: 'nombre_completo' ,des: 'Nombre completo', valor: ''},
            {id : 'email', type : 'email',  name: 'correo' ,des: 'Correo' , valor: ''},
            {id : 'phone', type : 'number', name: 'telefono' , des: 'Telefono' , valor: ''},
            {id : 'service', type : 'text', name: 'servicio' , des: 'Servicio' , valor: ''},
            {id : 'date', type : 'date', name: 'fecha' , des: 'Fecha' , valor: ''},
            {id : 'time', type : 'time',  name: 'hora' ,des: 'Hora' , valor: ''}
        ]
    },

    methods:{
        agregar_form(){
            this.todos.forEach(todo => {
                this.valor=todo.valor;
                citaValores.push(this.valor);
            });

            convertirJson() 
            //console.log(petiCita); 
            //console.log(petUser); 
            fechPaciente();
            fechCita();
            alert("Cita creada con exito");
            //console.log(fechServicios());
        }

    },
})



