
let citaValores = [];
var petiCita = {};
var petUser = {};
const url_paci = 'http://127.0.0.1:3000/paciente';
const url_cita = 'http://127.0.0.1:3000/sendcita';


function convertirJson(){
    petUser.nombre = citaValores[0];
    petUser.correo = citaValores[1];
    petUser.telefono = citaValores[2];
    petiCita.servicio  = citaValores[3];
    petiCita.fecha_cita  = citaValores[4];
    petiCita.hora_cita = citaValores[5];
}

const fechCita = async() => {
    return await (await fetch(url_cita, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(petiCita),
        headers:{
            'Content-Type': 'application/json'
            }
    }))
}

const fechPaciente = async() => {
    return await (await fetch(url_paci, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(petUser),
        headers:{
            'Content-Type': 'application/json'
            }
    }))
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

            convertirJson(); 
            console.log(petiCita); 
            console.log(petUser); 
            fechCita();
            console.log("DONE");
            fechPaciente();
            console.log("DONE x2 ");
        },  

    },
})


